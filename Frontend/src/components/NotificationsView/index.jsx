import React from "react";

const notifications = [
  {
    id: 1,
    user: {
      name: "John Doe",
      avatarUrl: "https://via.placeholder.com/50", // Replace with real URLs or dynamic image sources
    },
    description: "Your profile has been updated successfully!",
  },
  {
    id: 2,
    user: {
      name: "Jane Smith",
      avatarUrl: "https://via.placeholder.com/50",
    },
    description: "There was an issue processing your request.",
  },
  {
    id: 3,
    user: {
      name: "Alice Johnson",
      avatarUrl: "https://via.placeholder.com/50",
    },
    description: "Your password will expire in 7 days.",
  },
];

const NotificationsView = () => {
  return (
    <>
      <div className="container mx-auto p-4 max-w-lg mt-20">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Notifications
        </h1>
        <ul>
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`flex items-start border-l-4 p-4 mb-4 rounded bg-gray-200 border-gray-500 text-gray-700`}
            >
              <img
                src={notification.user.avatarUrl}
                alt={`${notification.user.name} avatar`}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h2 className="text-lg font-bold">{notification.user.name}</h2>
                <p className="text-sm">{notification.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NotificationsView;
