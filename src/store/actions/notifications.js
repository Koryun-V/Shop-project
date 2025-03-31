// redux/actions/notificationsActions.js
import axios from 'axios';

const serverUrl = 'https://world-of-construction.onrender.com';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTc0MjIyNDMyOCwiZXhwIjoxNzQ0ODE2MzI4fQ.kdcaZw86pLUlElAv62KtISPinRXqMfdyn5_46BS9t-8';

export const loadUnreadNotifications = () => async (dispatch) => {
    try {
        const response = await axios.get(`${serverUrl}/notifications/unread`, {
            headers: {
                Authorization: token,
            },
        });

        dispatch({
            type: 'notifications/setNotifications',
            payload: response.data.notifications,
        });
    } catch (error) {
        console.error('Error loading notifications:', error);
    }
};

export const markNotificationAsRead = (notificationId) => async (dispatch) => {
    try {
        await axios.patch(
            `${serverUrl}/notifications/${notificationId}/read`,
            null,
            {
                headers: {
                    Authorization: token,
                },
            }
        );
        dispatch({
            type: 'notifications/markAsRead',
            payload: notificationId,
        });
    } catch (error) {
        console.error('Error marking notification as read:', error);
    }
};

export const addNotification = (notification) => {
    return {
        type: 'notifications/addNotification',
        payload: notification,
    };
};
