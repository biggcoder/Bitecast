import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { copyFileSync, mkdirSync, existsSync } from 'fs';

// Function to copy extension files to build directory
function copyExtensionFiles() {
  return {
    name: 'copy-extension-files',
    closeBundle() {
      const sourceDir = path.resolve(__dirname, 'public');
      const targetDir = path.resolve(__dirname, 'dist');
      
      // Ensure target directory exists
      if (!existsSync(targetDir)) {
        mkdirSync(targetDir, { recursive: true });
      }
      
      // Copy manifest.json, background.js, contentScript.js, and icons
      copyFileSync(path.join(sourceDir, 'manifest.json'), path.join(targetDir, 'manifest.json'));
      copyFileSync(path.join(sourceDir, 'background.js'), path.join(targetDir, 'background.js'));
      copyFileSync(path.join(sourceDir, 'contentScript.js'), path.join(targetDir, 'contentScript.js'));
      
      // Copy icon files too
      ['icon-16.png', 'icon-48.png', 'icon-128.png'].forEach(icon => {
        try {
          copyFileSync(path.join(sourceDir, icon), path.join(targetDir, icon));
        } catch (err) {
          console.warn(`Warning: Could not copy ${icon}: ${err.message}`);
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [
    react(),
    copyExtensionFiles()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      }
    }
  }
});