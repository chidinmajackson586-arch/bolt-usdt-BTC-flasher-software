const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const isDev = process.env.NODE_ENV === 'development';

// Keep a global reference of the window object
let mainWindow;
let serverProcess;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true
    },
    icon: path.join(__dirname, 'assets/icon.png'), // Add your app icon here
    show: false, // Don't show until ready
    titleBarStyle: 'default'
  });

  // Start the server in production mode
  if (!isDev) {
    startServer();
  }

  // Load the app
  const startUrl = isDev 
    ? 'http://localhost:5000' 
    : 'http://localhost:5000'; // Server runs on same port in production
  
  // Wait longer for server to start in production and add error handling
  setTimeout(() => {
    mainWindow.loadURL(startUrl).catch(err => {
      console.error('Failed to load URL:', err);
      // Show error page or retry
      mainWindow.loadURL('data:text/html,<h1>Starting Crypto Gateway...</h1><p>Please wait while the application loads.</p><script>setTimeout(() => location.reload(), 2000)</script>');
    });
  }, isDev ? 0 : 5000);

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Open DevTools in development or for debugging
    if (isDev || process.env.DEBUG) {
      mainWindow.webContents.openDevTools();
    }
  });

  // Add error handling for failed navigation
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error('Failed to load:', errorCode, errorDescription, validatedURL);
    // Show a retry page
    mainWindow.loadURL('data:text/html,<h1>Crypto Gateway</h1><p>Starting server... Please wait.</p><script>setTimeout(() => location.href="http://localhost:5000", 3000)</script>');
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Create application menu
  createMenu();
}

function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Quit',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// App event listeners
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  // Kill server process when app closes
  if (serverProcess) {
    serverProcess.kill();
  }
  
  // On macOS, keep app running even when all windows are closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS, re-create window when dock icon is clicked
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

function startServer() {
  const serverPath = path.join(__dirname, '../dist/standalone-server.js');
  console.log('Starting server from:', serverPath);
  
  serverProcess = spawn('node', [serverPath], {
    env: { 
      ...process.env, 
      NODE_ENV: 'production',
      PORT: '5000',
      // No database needed for standalone desktop app
    },
    stdio: ['ignore', 'pipe', 'pipe'] // Capture output for debugging
  });

  serverProcess.stdout.on('data', (data) => {
    console.log('Server output:', data.toString());
  });

  serverProcess.stderr.on('data', (data) => {
    console.error('Server error:', data.toString());
  });

  serverProcess.on('error', (err) => {
    console.error('Failed to start server:', err);
  });

  serverProcess.on('close', (code) => {
    console.log('Server process exited with code:', code);
  });
}

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
    
    // Open external links in default browser
    const { shell } = require('electron');
    shell.openExternal(navigationUrl);
  });
});