// Конфигурация приложений
const apps = [
    {
        id: 'nulls_brawl',
        name: 'Nulls Brawl',
        version: 'v53.234',
        description: 'Модифицированная версия Brawl Stars с неограниченными самоцветами и монетами',
        icon: '🎮',
        filename: 'Nulls_brawl.ipa',
        size: '145 MB'
    }
    // Добавьте другие приложения здесь по аналогии
];

// DOM элементы
const appGrid = document.getElementById('appGrid');
const modal = document.getElementById('installModal');
const closeBtn = document.querySelector('.close');
const installButton = document.getElementById('installButton');

// Загрузка приложений в сетку
function loadApps() {
    appGrid.innerHTML = '';
    
    apps.forEach(app => {
        const appCard = document.createElement('div');
        appCard.className = 'app-card';
        appCard.innerHTML = `
            <div class="app-icon">${app.icon}</div>
            <h3 class="app-name">${app.name}</h3>
            <p class="app-version">${app.version} • ${app.size}</p>
            <span class="install-badge">Установить</span>
        `;
        
        appCard.addEventListener('click', () => openModal(app));
        appGrid.appendChild(appCard);
    });
}

// Открытие модального окна
function openModal(app) {
    document.getElementById('modalAppIcon').textContent = app.icon;
    document.getElementById('modalAppName').textContent = app.name;
    document.getElementById('modalAppVersion').textContent = `Версия: ${app.version} • ${app.size}`;
    document.getElementById('modalAppDescription').textContent = app.description;
    
    // Установка обработчика для кнопки установки
    installButton.onclick = () => installApp(app);
    
    modal.style.display = 'block';
}

// Закрытие модального окна
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Функция установки приложения
function installApp(app) {
    // Создаем ссылку для установки
    const installUrl = `itms-services://?action=download-manifest&url=${encodeURIComponent(window.location.origin + '/manifest.plist')}`;
    
    // Для тестирования используем прямую ссылку на IPA
    // В реальном проекте вам понадобится сервер и правильно настроенный manifest.plist
    const ipaUrl = `apps/${app.filename}`;
    
    // Создаем временную ссылку для скачивания
    const link = document.createElement('a');
    link.href = ipaUrl;
    link.download = app.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Показываем уведомление
    showInstallNotification(app);
}

// Показать уведомление об установке
function showInstallNotification(app) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1001;
        animation: slideInRight 0.3s ease;
    `;
    
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Начата установка ${app.name}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    loadApps();
    
    // Добавляем стили для анимации уведомления
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});
