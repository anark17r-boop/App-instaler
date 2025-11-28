// Конфигурация приложений
const apps = [
    {
        id: 'nulls_brawl',
        name: 'Nulls Brawl',
        version: 'v53.234',
        description: 'Модифицированная версия Brawl Stars с неограниченными самоцветами, монетами и уникальными функциями. Получите преимущество в игре!',
        icon: '🎮',
        size: '145 MB',
        updated: 'Декабрь 2024',
        // Для прямой установки нужен manifest.plist
        bundleId: 'com.nulls.brawl',
        directUrl: 'itms-services://?action=download-manifest&url=https://your-site.netlify.app/manifests/nullsbrawl.plist'
    }
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
            <span class="install-badge">Прямая установка</span>
        `;
        
        appCard.addEventListener('click', () => openModal(app));
        appGrid.appendChild(appCard);
    });
}

// Открытие модального окна
function openModal(app) {
    document.getElementById('modalAppIcon').textContent = app.icon;
    document.getElementById('modalAppName').textContent = app.name;
    document.getElementById('modalAppVersion').textContent = `Версия: ${app.version}`;
    document.getElementById('modalAppDescription').textContent = app.description;
    
    // Установка обработчика для кнопки установки
    installButton.onclick = () => installApp(app);
    
    modal.style.display = 'block';
    
    // Анимация появления
    const modalContent = document.querySelector('.modal-content');
    modalContent.style.animation = 'none';
    setTimeout(() => {
        modalContent.style.animation = 'modalSlideIn 0.3s ease';
    }, 10);
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
    if (app.directUrl) {
        // Показываем уведомление о начале установки
        showInstallNotification(app, 'start');
        
        // Прямая установка через itms-services
        setTimeout(() => {
            // Создаем скрытую ссылку для установки
            const installLink = document.createElement('a');
            installLink.href = app.directUrl;
            installLink.style.display = 'none';
            document.body.appendChild(installLink);
            
            // Пытаемся открыть через location.href (основной способ)
            window.location.href = app.directUrl;
            
            // Резервный способ через click
            setTimeout(() => {
                installLink.click();
            }, 100);
            
            // Убираем ссылку
            setTimeout(() => {
                document.body.removeChild(installLink);
            }, 1000);
            
        }, 500);
    }
}

// Показать уведомление об установке
function showInstallNotification(app, type) {
    const notification = document.createElement('div');
    let message = '';
    let bgColor = '';
    
    if (type === 'start') {
        message = `🚀 Запускается установка ${app.name}...`;
        bgColor = '#007bff';
    } else if (type === 'success') {
        message = `✅ ${app.name} успешно устанавливается!`;
        bgColor = '#28a745';
    }
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1001;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    notification.innerHTML = message;
    
    // Удаляем предыдущие уведомления
    const existingNotifications = document.querySelectorAll('[style*="position: fixed"]');
    existingNotifications.forEach(notif => notif.remove());
    
    document.body.appendChild(notification);
    
    // Автоматическое скрытие через 5 секунд
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
    
    // Возможность закрыть по клику
    notification.addEventListener('click', () => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    loadApps();
});
