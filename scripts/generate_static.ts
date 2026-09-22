import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getPortalHtml } from "../src/views/portal_html.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const html = getPortalHtml();

// 1. Ensure target directories exist
const distDir = path.join(rootDir, "dist");
const publicDir = path.join(rootDir, "public");

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 2. Write index.html to dist/, public/, and root /
fs.writeFileSync(path.join(distDir, "index.html"), html, "utf-8");
fs.writeFileSync(path.join(publicDir, "index.html"), html, "utf-8");
fs.writeFileSync(path.join(rootDir, "index.html"), html, "utf-8");

console.log(" Generated index.html in dist/, public/, and root /");

// 3. Write Cloudflare Pages _redirects and _headers
const redirectsContent = `/* /index.html 200\n`;
fs.writeFileSync(path.join(distDir, "_redirects"), redirectsContent, "utf-8");
fs.writeFileSync(path.join(publicDir, "_redirects"), redirectsContent, "utf-8");

const headersContent = `/*
  Access-Control-Allow-Origin: *
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
\n`;
fs.writeFileSync(path.join(distDir, "_headers"), headersContent, "utf-8");
fs.writeFileSync(path.join(publicDir, "_headers"), headersContent, "utf-8");

console.log(" Generated Cloudflare Pages _redirects and _headers");
