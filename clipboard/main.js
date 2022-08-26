process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'; //屏蔽安全告警
const {app, BrowserWindow, Tray, Menu} = require("electron");


let mainWindow = null // 主窗口
let trayMenu = Menu.buildFromTemplate([
    {
        label: '打开',
        click: function () {
            mainWindow.show()
        }
    },
    {
        label: '退出',
        click: function () {
            mainWindow = null
            app.exit();
        }
    }
]);

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        width: 800, height: 600, minWidth: 800,
        webPreferences: {
            nodeIntegration: true, //设置开启nodejs环境
            contextIsolation: false,
            enableRemoteModule: true, // 使用remote模块
        },
    })

    let iconTray = new Tray("clipboard/icon.png");
    // 鼠标悬停托盘提示
    iconTray.setToolTip('剪贴板');
    iconTray.setContextMenu(trayMenu);

    mainWindow.openDevTools();

    mainWindow.loadFile("clipboard.html")


    // 任务栏图标双击托盘打开应用
    iconTray.on('double-click', function () {
        mainWindow.show();
    });


    mainWindow.on("close", (e) => {
        e.preventDefault();
        mainWindow.hide();
    })
})


