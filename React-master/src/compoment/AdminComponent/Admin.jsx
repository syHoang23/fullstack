import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
    const [totals, setTotals] = useState({ totalCustomers: 0, totalProducts: 0, recentAction: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3002/admin');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTotals(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h1>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Total Users</h2>
                    <p className="text-gray-700">{totals.totalCustomers}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold mb-2">Total Products</h2>
                    <p className="text-gray-700">{totals.totalProducts}</p>
                </div>
                <div className="bg-white p-4 rounded shadow col-span-2">
                    <h2 className="text-xl font-bold mb-2">Recent Activities</h2>
                    <ul>
                        {totals.recentAction && totals.recentAction.map((action, index) => (
                            <li key={index} className="text-gray-700">{`User ${action.userName} ${action.action}`}</li>
                        ))}

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;

