export const refreshNotificationBadge = () => {
    window.dispatchEvent(new CustomEvent('refreshNotificationCount'));
};

export const resetNotificationBadge = () => {
    window.dispatchEvent(new CustomEvent('refreshNotificationCount'));
};
