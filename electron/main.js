const { app, BrowserWindow, shell, Menu, nativeTheme } = require('electron');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

// Use deployed Vercel URL in production, localhost in dev
const PROD_URL = process.env.AURA_URL || 'https://aura-mail-six.vercel.app';
const DEV_URL  = 'http://localhost:3001';

nativeTheme.themeSource = 'dark';

function createWindow() {
  const win = new BrowserWindow({
    width: 1360,
    height: 860,
    minWidth: 920,
    minHeight: 620,
    // macOS native traffic lights + hidden title bar so our UI fills the top
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 16, y: 18 },
    // macOS Liquid Glass vibrancy — blurs whatever is behind the window
    vibrancy: 'under-window',
    visualEffectState: 'active',
    backgroundColor: '#070b16',
    // Rounded corners match the glass panel aesthetic
    roundedCorners: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: true,
    },
    icon: path.join(__dirname, '../public/icon.png'),
  });

  win.loadURL(isDev ? DEV_URL : PROD_URL);

  // Open external hrefs in the system browser
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Smooth fade-in once the page is ready
  win.once('ready-to-show', () => win.show());
}

// macOS menu bar
function buildMenu() {
  const template = [
    {
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    },
    {
      label: 'File',
      submenu: [
        {
          label: 'New Message',
          accelerator: 'CmdOrCtrl+N',
          click: (_, win) => win?.webContents.executeJavaScript(
            'document.querySelector("[data-compose]")?.click()'
          ),
        },
        { type: 'separator' },
        { role: 'close' },
      ],
    },
    { label: 'Edit', submenu: [
      { role: 'undo' }, { role: 'redo' }, { type: 'separator' },
      { role: 'cut' }, { role: 'copy' }, { role: 'paste' },
      { role: 'selectAll' },
    ]},
    { label: 'View', submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' },
    ]},
    { label: 'Window', submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      { type: 'separator' },
      { role: 'front' },
    ]},
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(() => {
  buildMenu();
  createWindow();

  // macOS: re-open window when clicking the dock icon
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
