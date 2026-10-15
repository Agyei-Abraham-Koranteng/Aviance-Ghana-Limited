import React, { createContext, useContext, useState, useEffect } from 'react';
import { NotificationItem } from '../types';
import { dataService, subscribeToDataChanges } from '../services/dataService';

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => dataService.getNotifications());

  useEffect(() => {
    const unsubscribe = subscribeToDataChanges(() => {
      setNotifications(dataService.getNotifications());
    });
    return unsubscribe;
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    dataService.markNotificationRead(id);
    setNotifications(dataService.getNotifications());
  };

  const markAllAsRead = () => {
    dataService.markAllNotificationsRead();
    setNotifications(dataService.getNotifications());
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within NotificationProvider');
  return context;
};
