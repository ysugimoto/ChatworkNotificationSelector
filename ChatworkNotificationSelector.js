var times = 0;

function ChatworkNotificationSelectorInit() {
    // Consider "loading" view
    if ( ! window.NotificationAPI ) {
        if ( ++times <= 10 ) {
            setTimeout(ChatworkNotificationSelectorInit, 1000);
        }
        return;
    }

    window.NotificationAPI.createNotification = function(icon, title, body) {
        var extensionData = localStorage["CWEXTENSION_DESKTOP_NOTIFICATIONS_LIST"],
            acceptList;

        if ( ! extensionData ) {
            return webkitNotifications.createNotification(icon, title, body);
        }

        acceptList = JSON.parse(extensionData);
        if ( acceptList.threads.indexOf(title) !== -1 ) {
            return webkitNotifications.createNotification(icon, title, body);
        } else {
            return { show: function() {}, close: function() {} };
        }
    };
}

// Inject Script
var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = ChatworkNotificationSelectorInit.toString() + ';ChatworkNotificationSelectorInit();';
document.head.appendChild(script);
