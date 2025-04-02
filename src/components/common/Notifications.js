// src/App.js
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import io from 'socket.io-client';
import {
    addNotification,
    loadUnreadNotifications,
    markNotificationAsRead, setReadStatus,
    setStatus
} from "../../store/actions/notifications";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faEnvelopeCircleCheck} from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import {FallingLines} from "react-loader-spinner";

const serverUrl = 'https://world-of-construction.onrender.com';
const socket = io(serverUrl);


const Notifications = () => {
    const dispatch = useDispatch();

    const notifications = useSelector((state) => state.notifications.notifications);
    const unreadCount = useSelector((state) => state.notifications.unreadCount);
    const user = useSelector(state => state.login.user)
    const statusRead = useSelector(state => state.notifications.statusRead)
    const status = useSelector(state => state.notifications.status)

    const [isNotification, setIsNotification] = useState(false);
    let menuRef = useRef();
    const [id, setId] = useState([])
    console.log(statusRead, 's')
    useEffect(() => {
        if (user.id) {
            socket.emit('register', user.id);

            socket.on('connect', () => {
                console.log('Successfully connected to the server!', socket.id);
            });

            socket.on('disconnect', () => {
                console.log('Disconnected from server');
            });

            socket.on('review_reply', (data) => {
                console.log('New notification:', data);
                dispatch(addNotification(data));
                dispatch(loadUnreadNotifications()); // Загружаем количество непрочитанных
            });

            dispatch(loadUnreadNotifications());

            return () => {
                socket.off('review_reply'); // Очищаем слушатель перед размонтированием
                socket.disconnect();
            };
        }
    }, [user.id, dispatch]);


    // убрали unreadCount


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
    useEffect(() => {
        if (statusRead === "ok" && status === "ok") {
            setId([])
        }
    }, [statusRead, status]);

    const openNotifications = () => {
        if (!isNotification) {
            setIsNotification(true);
        } else {
            setIsNotification(false);
        }
    }
    const handleMarkAsRead = async (id) => {
        setId(prevState => _.uniq([...prevState, id]))
        dispatch(setStatus(""))
        dispatch(setReadStatus(""))
        await dispatch(markNotificationAsRead(id));
        await dispatch(loadUnreadNotifications());
    };

    console.log(notifications, "A")
    return (
        <div ref={menuRef}>
            <div className="bell" onClick={openNotifications}>
                <FontAwesomeIcon icon={faBell} className={isNotification ? "bell-icon-active" : "bell-icon"}/>
                {unreadCount !== 0 ?
                    <div className="count">
                        <strong>{unreadCount}</strong>
                    </div>
                    : null}
            </div>


            {isNotification ? <div className="messages">
                <div className="sur"></div>

                <div className="notifications-header">
                    <h4>Notifications</h4>
                </div>

                <div className="notifications-info">

                    {notifications.length ? notifications.map((notification) => {
                            const date = new Date(notification.createdAt);
                            const day = date.getDate();
                            const month = date.getMonth()
                            const year = date.getFullYear();

                            return (
                                <>
                                    <div className={!id.includes(notification.id) ? `messages-block ${notification.read ? 'read' : 'unread'}` : "messages-loading"} >
                                        <div className="message-block" style={{
                                            opacity:!id.includes(notification.id) ? 1 : 0.2
                                        }}>
                                            <div className="img-block">
                                                {notification.productImage ?
                                                    <div className="message-img">
                                                        <img src={notification.productImage}/>

                                                    </div> : <div className="message-img loading-gradient-n">
                                                    </div>}
                                            </div>

                                            {notification.productName && notification.message && notification.createdAt ?
                                                <div className="message-info">
                                            <span
                                                className="message-data">{day < 10 ? `0${day}` : day}/{month < 10 ? `0${month}` : month}/{year}</span>
                                                    <strong className="message-name">{notification.productName}</strong>
                                                    <span className="message-m">{notification.message}</span>
                                                </div>
                                                :
                                                <div className="message-info loading-gradient-n" style={{
                                                    width: "100%",
                                                    height: 60,
                                                }}>

                                                </div>}
                                        </div>

                                        <FontAwesomeIcon icon={faEnvelopeCircleCheck}
                                                         className={id.includes(notification.id) ? "envelope-active" : "envelope"}
                                                         onClick={() => handleMarkAsRead(notification.id)}/>
                                        {id.includes(notification.id) && (
                                            <div className="loading-n" style={{}}>
                                                <FallingLines
                                                    color="#4fa94d"
                                                    width="100"
                                                    visible={true}
                                                    ariaLabel="falling-circles-loading"
                                                />
                                            </div>)}
                                    </div>
                                </>

                            )
                        }) :
                        status === "ok" ?
                            <div className="notifications-no">
                                <h4>No notification</h4>
                            </div>

                            :

                            Array.from({length: 4}).map((i) => (
                                <div className="messages-block ">
                                    <div className="message-block">
                                        <div className="img-block">
                                            <div className="message-img loading-gradient-n">
                                            </div>
                                        </div>

                                        <div className="message-info loading-gradient-n" style={{
                                            width: "100%",
                                            height: 60,
                                        }}>

                                        </div>
                                    </div>
                                </div>
                            ))
                    }
                </div>
            </div> : null}
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
