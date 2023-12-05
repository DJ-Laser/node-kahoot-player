import { app, BrowserWindow } from "electron";
import { join } from "node:path";
import.meta.dirname = join(import.meta.url, "..").replace("file:", "");

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(import.meta.dirname, "preload.cjs")
    }
  });

  win.loadFile("index.html");
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
})
