import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import webExtension from 'vite-plugin-web-extension';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    webExtension({
      manifest: {
        name: "AI Content Summarizer",
        version: "1.0.0",
        description: "Summarize YouTube videos using AI",
        manifest_version: 3,
        permissions: ["activeTab", "storage", "tabs"],
        host_permissions: ["*://*.youtube.com/*"],
        action: {
          default_popup: "index.html",
          default_icon: {
            "16": "icon-16.png",
            "48": "icon-48.png",
            "128": "icon-128.png"
          }
        },
        background: {
          service_worker: "background.js"
        },
        content_scripts: [
          {
            matches: ["*://*.youtube.com/*"],
            js: ["contentScript.js"]
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
});
