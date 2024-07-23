import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeIcon, EyeSlashIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

function NotificationsComponent({ isOpen, onClose }) {
    const [notifications, setNotifications] = useState([]);
    const userId = localStorage.getItem('id');  // Fetch the user ID from local storage

    // Hook to fetch notifications whenever the component is opened and a userId is present
    useEffect(() => {
        if (isOpen && userId) {
            fetchNotifications();
        }
    }, [isOpen, userId]);

    // Function to fetch notifications from the server
    const fetchNotifications = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/notifications/user/${userId}`);
            const notificationsWithQuotes = await Promise.all(response.data.slice(0, 5).map(async (notification) => {
                const quoteResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/quotes/${notification.quote_id}`);
                return {
                    ...notification,
                    quoteText: quoteResponse.data.text,
                    quoteAuthor: quoteResponse.data.author,
                };
            }));
            setNotifications(notificationsWithQuotes);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    // Function to mark a notification as read
    const markAsRead = async (notificationId) => {
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/notifications/${notificationId}/read`);
            fetchNotifications();  // Refetch notifications to update the UI
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    // Function to delete a notification
    const deleteNotification = async (notificationId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/notifications/${notificationId}`);
            fetchNotifications();  // Refetch notifications to update the UI
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed z-10 inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose} // Close modal on background click
                >
                    <div className="bg-white p-5 rounded-lg shadow-lg text-center overflow-auto"
                         style={{ maxHeight: '80vh' }}
                         onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
                    >
                        <h2 className="text-xl font-semibold mb-2">Notifications</h2>
                        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                            {userId ? (
                                notifications.length > 0 ? notifications.map(notification => (
                                    <div key={notification.id} className="my-6 p-4 border-b flex justify-between items-center gap-4">
                                        <div className="flex-1">
                                            <p className="text-custom-black font-semibold">Citation du jour : {notification.quoteText} - {notification.quoteAuthor}</p>
                                            <p className="text-sm mt-2 text-gray-600">Reçu le {new Date(notification.date_sent).toLocaleDateString("fr-FR")}</p>
                                        </div>
                                        <div className="flex items-center">
                                            {notification.is_read ? (
                                                <EyeIcon className="h-6 w-6 text-green-500" />
                                            ) : (
                                                <EyeSlashIcon
                                                    className="h-6 w-6 text-red-500 cursor-pointer"
                                                    onClick={() => markAsRead(notification.id)}
                                                />
                                            )}
                                            <TrashIcon
                                                className="h-6 w-6 text-red-500 cursor-pointer ml-2"
                                                onClick={() => deleteNotification(notification.id)}
                                            />
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-custom-black">Vous n'avez aucune notification.</p>
                                )
                            ) : (
                                <div>
                                    <p className="text-custom-black m-4 text-2xl">Connectez-vous pour voir vos notifications.</p>
                                    <Link to="/login" onClick={onClose} className="text-bold p-1 text-blue-500"> Vous pouvez vous connecter ici </Link>
                                </div>
                            )}
                        </div>
                        <button aria-label="Fermer le menu"
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                            onClick={onClose} 
                        >
                            Fermer
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default NotificationsComponent;
