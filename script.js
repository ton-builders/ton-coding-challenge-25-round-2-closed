document.addEventListener('DOMContentLoaded', function() {
    // 初始化Telegram WebApp
    const tg = window.Telegram.WebApp;
    
    // 设置Mini App为全屏模式
    tg.expand();
    
    // 通知Telegram应用程序Mini App已准备好
    tg.ready();
});
