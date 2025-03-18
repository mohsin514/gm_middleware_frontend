import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleNotification } from '../redux/notificationsSlice';

const NotificationsPage = () => {
  const notifications = useSelector((state) => state.notifications.notifications);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="mb-4">Resolve on client when certain events occur.</p>
        {notifications.map((notification) => (
          <div key={notification.id} className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={notification.enabled}
                onChange={() => dispatch(toggleNotification(notification.id))}
              />
              <span>{notification.label}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;