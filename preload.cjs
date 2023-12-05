const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("kahoot-api", {
    
})