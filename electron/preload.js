const { contextBridge, ipcRenderer } = require('electron');

// Minimal bridge — expose only what the renderer actually needs
contextBridge.exposeInMainWorld('aura', {
  platform: process.platform,
  onMenuCompose: (cb) => ipcRenderer.on('menu-compose', cb),
});
