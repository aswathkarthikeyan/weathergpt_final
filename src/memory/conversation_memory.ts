import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  orderBy,
  limit as firestoreLimit,
} from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../firebase.js";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

// Local cache store
const conversationStore = new Map<string, ChatMessage[]>();

export async function initDb(): Promise<void> {
  return Promise.resolve();
}

function sanitizeId(id: string): string {
  return id.replace(/[^a-zA-Z0-9_\-]/g, "_") || "default_session";
}

export async function saveMessage(
  conversationId: string,
  role: "user" | "assistant" | "system",
  content: string
): Promise<void> {
  const safeConvId = sanitizeId(conversationId);
  const now = new Date().toISOString();
  const messageData = {
    conversationId: safeConvId,
    role,
    content,
    timestamp: now,
  };

  // 1. Update in-memory cache
  if (!conversationStore.has(safeConvId)) {
    conversationStore.set(safeConvId, []);
  }
  conversationStore.get(safeConvId)!.push(messageData);

  // 2. Persist to Firestore
  const messageId = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const path = `conversations/${safeConvId}/messages/${messageId}`;
  try {
    const docRef = doc(db, "conversations", safeConvId, "messages", messageId);
    await setDoc(docRef, messageData);
  } catch (error) {
    // If permissions or network issues happen, report error per guidelines but do not crash user chat
    console.warn(`Firestore saveMessage warning for path: ${path}`, error);
  }
}

export async function loadMessages(
  conversationId: string,
  limitCount: number = 25
): Promise<Array<[string, string]>> {
  const safeConvId = sanitizeId(conversationId);

  // Try to load from Firestore first
  const path = `conversations/${safeConvId}/messages`;
  try {
    const messagesCol = collection(db, "conversations", safeConvId, "messages");
    const q = query(messagesCol, orderBy("timestamp", "asc"), firestoreLimit(limitCount));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const messages: Array<[string, string]> = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.role && data.content) {
          messages.push([data.role, data.content]);
        }
      });
      return messages;
    }
  } catch (error) {
    console.warn(`Firestore loadMessages fallback for ${path}:`, error);
  }

  // Fallback to in-memory store
  const cached = conversationStore.get(safeConvId) || [];
  const sliced = cached.slice(-limitCount);
  return sliced.map((m) => [m.role, m.content]);
}
