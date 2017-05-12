const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

require('dotenv').config();
require('electron-reload')(__dirname, {
	electron: require('${__dirname}/../../node_modules/electron')
});

let win = null;

app.on('ready', function () {
	// Open new desktop app window with the following dimensions
	win = new BrowserWindow({width: 1000, height: 600});
	if(process.env.PACKAGE === 'true'){
		win.loadURL(url.format({
			pathname: path.join(__dirname, 'dist/index.html'),
			protocol: 'file:',
			slashes: true
		}));
	}
	else
	{
		win.loadURL(process.env.HOST);
		win.webContents.openDevTools();
	}
	// Specify Entry Point
	win.loadURL('http://localhost:4200');
	// Show dev tools
	// Remove this line when in production
	win.webContents.openDevTools()

	// Remove window once app is closed
	win.on('closed', function () {
		win = null;
	});
});

app.on('activate', () => {
	if(win === null) {
		createWindow()
	}
});

app.on('window-all-closed', function () {
	if (process.platform != 'darwin')
	{
		app.quit();
	}
});

