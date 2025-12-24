import React from 'react'

import { formatDistanceToNow } from 'date-fns';

const RecentActivity = ({ activities }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md overflow-y-auto max-h-64 scrollbar-hide">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
            {activities && activities.length > 0 ? (
                activities
                    // Sort by createdAt (most recent first)
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    // Filter out similar activities (you can customize the comparison logic)
                    .filter((activity, index, self) =>
                        index === self.findIndex((a) =>
                            a.studentId?._id === activity.studentId?._id && // Ensure unique student
                            a.acivityType === activity.acivityType && // Ensure unique activity type
                            a.exam === activity.exam // Ensure unique exam
                        )
                    )
                    // Limit to 5 items
                    .slice(0, 5)
                    // Map over the filtered and limited list
                    .map((activity) => (
                        <div key={activity._id} className="flex items-center space-x-3 text-sm">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            <p>
                                <span className="font-medium">{activity.studentId?.name}</span>{' '}
                                <span>{activity.acivityType}</span>{' '}
                                <span className="font-medium">{activity.exam}</span>{' '}
                                <span className="text-gray-500">
                                    {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                                </span>
                            </p>
                        </div>
                    ))
            ) : (
                <p>No activities found.</p>
            )}
        </div>
    </div>
    
    );
};

export default RecentActivity;
