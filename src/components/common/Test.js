// // components/NotificationComponent.js
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {loadUnreadNotifications, markAsRead} from "../../store/actions/notifications";
//
// const Test = () => {
//     const dispatch = useDispatch();
//     const { notifications, unreadCount, loading, error } = useSelector(state => state.notifications);
//
//     useEffect(() => {
//         dispatch(loadUnreadNotifications());
//     }, [dispatch]);
//
//     const handleMarkAsRead = (notificationId) => {
//         dispatch(markAsRead(notificationId));
//     };
//
//     return (
//         <div>
//             <h2>Уведомления ({unreadCount})</h2>
//             {loading && <p>Загрузка...</p>}
//             {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
//             <div id="notifications">
//               {/*  {notifications.map(notification => (*/}
//               {/*      <div key={notification.id} className={`notification ${notification.read ? '' : 'unread'}`}>*/}
//               {/*          <p>{notification.message}</p>*/}
//               {/*          <p><strong>Продукт:</strong> {notification.product.name}</p>*/}
//               {/*          <img src={notification.product.image} alt="Product" style={{ width: '100px', height: '100px' }} />*/}
//               {/*          {!notification.read && (*/}
//               {/*              <span className="mark-read" onClick={() => handleMarkAsRead(notification.id)}>*/}
//               {/*  Пометить как прочитанное*/}
//               {/*</span>*/}
//               {/*          )}*/}
//               {/*      </div>*/}
//               {/*  ))}*/}
//             </div>
//         </div>
//     );
// };
//
// export default Test;
