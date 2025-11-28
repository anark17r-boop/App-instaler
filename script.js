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
        // ПРЯМАЯ ССЫЛКА ИЗ GOOGLE DRIVE
        directUrl: 'https://drive.google.com/uc?export=download&id=1xc0Y6cWLJIZI9RKb_LyACMZhjyg3Asfq'
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
            <span class="install-badge">Бесплатная установка</span>
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
        
        // Открываем прямую ссылку на скачивание
        setTimeout(() => {
            window.open(app.directUrl, '_blank');
            
            // Показываем уведомление об успехе через 2 секунды
            setTimeout(() => {
                showInstallNotification(app, 'success');
            }, 2000);
        }, 1000);
    }
}

// Показать уведомление об установке
function showInstallNotification(app, type) {
    const notification = document.createElement('div');
    let message = '';
    let bgColor = '';
    
    if (type === 'start') {
        message = `🚀 Начинается установка ${app.name}...`;
        bgColor = '#007bff';
    } else if (type === 'success') {
        message = `✅ ${app.name} успешно скачан! Проверьте загрузки.`;
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

// Добавляем красивый ховер эффект для карточек
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
        
        .app-card {
            position: relative;
            overflow: hidden;
        }
        
        .app-card::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.1) 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .app-card:hover::after {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});

// Добавляем обработчик для клавиши ESC
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        modal.style.display = 'none';
    }
});
