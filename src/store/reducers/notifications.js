// redux/slices/notificationsSlice.js
import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    notifications: [],
    unreadCount: 0,
};

const notifications = createReducer(initialState, (builder) => {
    builder
        .addCase('notifications/addNotification', (state, action) => {
            state.notifications.unshift(action.payload);
            state.unreadCount++;
        })
        .addCase('notifications/markAsRead', (state, action) => {
            const notification = state.notifications.find(
                (notif) => notif.id === action.payload
            );
            if (notification) {
                notification.read = true;
                state.unreadCount--;
            }
        })
        .addCase('notifications/setNotifications', (state, action) => {
            state.notifications = action.payload;
            state.unreadCount = action.payload.filter((notif) => !notif.read).length;
        });
});

export default notifications;
