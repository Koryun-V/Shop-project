// src/App.js
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import io from 'socket.io-client';
import {addNotification, loadUnreadNotifications, markNotificationAsRead} from "../../store/actions/notifications";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faEnvelopeCircleCheck, faEnvelopeOpen} from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";

const serverUrl = 'https://world-of-construction.onrender.com';
const socket = io(serverUrl);

const Notifications = () => {
    const notifications = useSelector((state) => state.notifications.notifications);
    const unreadCount = useSelector((state) => state.notifications.unreadCount);
    const dispatch = useDispatch();

    const [isNotification, setIsNotification] = useState(false);
    let menuRef = useRef();

    useEffect(() => {
        const userId = 3; // Example userId, replace with actual logic
        socket.emit('register', userId);

        // socket.on('connect', () => {
        //     console.log('Successfully connected to the server!', socket.id);
        // });
        //
        // socket.on('disconnect', () => {
        //     console.log('Disconnected from server');
        // });

        socket.on('review_reply', (data) => {
            console.log('New notification:', data);
            dispatch(addNotification(data)); // Dispatch new notification to Redux store
        });

        // Load unread notifications when the component mounts
        dispatch(loadUnreadNotifications());

        return () => {
            socket.disconnect();
        };
    }, [dispatch]);

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setIsNotification(false);

            }
        }
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousemove", handler);
        }
    })

    const openNotifications = () => {
        if (!isNotification) {
            setIsNotification(true);
        } else {
            setIsNotification(false);
        }
    }
    const handleMarkAsRead = (id) => {
        dispatch(markNotificationAsRead(id));
    };
    console.log(notifications)
    return (
        <div ref={menuRef}>
            <div className="bell" onClick={openNotifications}>
                <FontAwesomeIcon icon={faBell} className="bell-icon"/>
                <div className="count">
                    <strong>{unreadCount}</strong>
                </div>
            </div>


            {isNotification ? <div className="messages">
                <div className="notifications-header">
                    <h4>Notifications</h4>
                </div>

                <div className="notifications-info">
                    {notifications.map((notification) => {
                        const date = new Date(notification.createdAt);
                        const day = date.getDate();
                        const month = date.getMonth()
                        const year = date.getFullYear();

                        return (
                            <div className="messages-block">
                                <div className="message-block">
                                    <div className="img-block">
                                        <div className="message-img">
                                            <img src={notification.productImage}/>
                                        </div>
                                    </div>

                                    <div className="message-info">
                                    <span
                                        className="message-data">{day < 10 ? `0${day}` : day}/{month < 10 ? `0${month}` : month}/{year}</span>
                                        <strong className="message-name">{notification.productName}</strong>
                                        <span className="message-m">{notification.message}aaaaaaaaaaaaaaaa</span>
                                    </div>
                                </div>
                                <FontAwesomeIcon icon={faEnvelopeCircleCheck} className="envelope"
                                                 onClick={() => handleMarkAsRead(notification.id)}/>

                            </div>

                        )
                    })}

                </div>
            </div> : null}


            {/*<h1>Notifications</h1>*/}
            {/*<div id="notifications">*/}
            {/*    {notifications.map((notification) => (*/}
            {/*        <div*/}
            {/*            key={notification.id}*/}
            {/*            className={`notification ${notification.read ? '' : 'unread'}`}*/}
            {/*        >*/}
            {/*<p>{notification.message}</p>*/}
            {/*<p>*/}
            {/*    <strong>Product:</strong> {notification.product.name}*/}
            {/*</p>*/}
            {/*<img*/}
            {/*    src={notification.product.image}*/}
            {/*    alt="Product"*/}
            {/*    style={{width: '100px', height: '100px'}}*/}
            {/*/>*/}
            {/*            {!notification.read && (*/}
            {/*                <span onClick={() => handleMarkAsRead(notification.id)}>*/}
            {/*    Mark as read*/}
            {/*  </span>*/}
            {/*            )}*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}


        </div>

    );
}

export default Notifications;


// import React, { useState } from 'react';
// import axios from 'axios';
//
// function ProductForm() {
//     const [formData, setFormData] = useState({
//         name: '',
//         size: '',
//         price: '',
//         description: '',
//         brandName: '',
//         productImage: null,
//     });
//
//     const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYxLCJlbWFpbCI6ImFkbWluQG1haWwucnUiLCJpYXQiOjE3NDE1MjA0MDMsImV4cCI6MTc0NDExMjQwM30.OnQGtsVYvHjvOvQ1Xv06ZrJHofwSXDc2e6vJJ61MhUo";
//
//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: files ? files : value,
//         }));
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const categoryId = 24;
//         const form = new FormData();
//         Object.keys(formData).forEach((key) => {
//             if (key === 'productImage' && formData.productImage) {
//                 for (let i = 0; i < formData.productImage.length; i++) {
//                     form.append(key, formData.productImage[i]);
//                 }
//             } else {
//                 form.append(key, formData[key]);
//             }
//         });
//
//         try {
//             const response = await axios.post(
//                 `https://world-of-construction.onrender.com/admin/product/${categoryId}`,
//                 form,
//                 {
//                     headers: {
//                         Authorization: token,
//                     },
//                 }
//             );
//             console.log(response.data);
//         } catch (error) {
//             console.error(error.response ? error.response.data : error.message);
//         }
//     };
//
//     return (
//         <div>
//             <h1>Test</h1>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="Name"
//                 />
//                 <input
//                     type="text"
//                     name="size"
//                     value={formData.size}
//                     onChange={handleChange}
//                     placeholder="Size"
//                 />
//                 <input
//                     type="text"
//                     name="price"
//                     value={formData.price}
//                     onChange={handleChange}
//                     placeholder="Price"
//                 />
//                 <input
//                     type="text"
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     placeholder="Description"
//                 />
//                 <input
//                     type="text"
//                     name="brandName"
//                     value={formData.brandName}
//                     onChange={handleChange}
//                     placeholder="Brand Name"
//                 />
//                 <input
//                     type="file"
//                     name="productImage"
//                     onChange={handleChange}
//                     multiple
//                 />
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// }
//
// export default ProductForm;
