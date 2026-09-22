import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase.js";

// Local cache store
const userMemoryStore = new Map<string, Record<string, string>>();

export async function initUserMemoryDb(): Promise<void> {
  return Promise.resolve();
}

function sanitizeId(id: string): string {
  return id.replace(/[^a-zA-Z0-9_\-]/g, "_") || "default_user";
}

export async function loadUserMemories(userId: string): Promise<Record<string, string>> {
  const safeUserId = sanitizeId(userId);

  try {
    const userDocRef = doc(db, "users", safeUserId);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      const data = snap.data();
      const memories: Record<string, string> = {};
      if (data.persona) memories["persona"] = String(data.persona);
      if (data.preferences) memories["preferences"] = String(data.preferences);
      userMemoryStore.set(safeUserId, memories);
      return memories;
    }
  } catch (error) {
    console.warn(`Firestore loadUserMemories fallback for user ${safeUserId}:`, error);
  }

  return userMemoryStore.get(safeUserId) || {};
}

export async function saveUserMemory(userId: string, key: string, value: string): Promise<void> {
  const safeUserId = sanitizeId(userId);

  if (!userMemoryStore.has(safeUserId)) {
    userMemoryStore.set(safeUserId, {});
  }
  const memories = userMemoryStore.get(safeUserId)!;
  memories[key] = value;

  try {
    const userDocRef = doc(db, "users", safeUserId);
    const updateData: Record<string, any> = {
      userId: safeUserId,
      [key]: value,
      updatedAt: new Date().toISOString(),
    };
    await setDoc(userDocRef, updateData, { merge: true });
  } catch (error) {
    console.warn(`Firestore saveUserMemory error for user ${safeUserId}:`, error);
  }
}

export async function processAndStoreUserMemories(
  userId: string,
  userMessage: string,
  currentMemories: Record<string, string>
): Promise<void> {
  const lower = userMessage.toLowerCase();
  if (lower.includes("farmer") || lower.includes("farming") || lower.includes("crops")) {
    await saveUserMemory(userId, "persona", "Farmer");
  } else if (lower.includes("fisherman") || lower.includes("fishing") || lower.includes("boat")) {
    await saveUserMemory(userId, "persona", "Fisherman");
  } else if (lower.includes("football") || lower.includes("running") || lower.includes("sports") || lower.includes("hiking")) {
    await saveUserMemory(userId, "persona", "Outdoor Athlete / Sports Person");
  }
}
