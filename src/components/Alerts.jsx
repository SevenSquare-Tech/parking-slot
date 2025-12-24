// pages/Alerts.js
import React, { useState } from 'react';
import { Bell, AlertTriangle, CheckCircle } from 'lucide-react';

const Alerts = () => {
    const [notifications] = useState([
        { id: 1, message: 'Slot A1 will be vacant in 30 minutes', type: 'info' },
        { id: 2, message: 'Parking 64% full', type: 'warning' },
        { id: 3, message: 'New vehicle parked in B3', type: 'success' },
    ]);

    return (
        <div className=" space-y-6 mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-800">Notifications & Alerts</h2>

            <div className="space-y-4">
                {notifications.map(notification => (
                    <div
                        key={notification.id}
                        className={`p-4 rounded-lg border-l-4 ${notification.type === 'info' ? 'bg-blue-50 border-blue-400' :
                            notification.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                                'bg-green-50 border-green-400'
                            }`}
                    >
                        <div className="flex items-center">
                            {notification.type === 'info' && <Bell className="h-5 w-5 text-blue-600 mr-3" />}
                            {notification.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3" />}
                            {notification.type === 'success' && <CheckCircle className="h-5 w-5 text-green-600 mr-3" />}
                            <p className="text-gray-800">{notification.message}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* System Status */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">System Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-green-800">Parking System</span>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-green-800">Database</span>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <span className="text-yellow-800">Camera System</span>
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-green-800">Payment Gateway</span>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Alerts;
