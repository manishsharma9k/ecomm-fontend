import React from "react";

function Dashboard() {
    return (
        <div className="p-4">
            <div className="flex justify-between  w-full">
            <div className="bg-white rounded border-l-8 w-full px-3 py-1 border-blue-500">
                <h1 className="font-bold">All User</h1>
                <h1>1999</h1>
            </div>
            <div className="bg-white rounded border-l-8 w-full px-3 py-1 border-green-500">
                <h1>All Category</h1>
                <h1>1999</h1>
            </div>
            <div className="bg-white rounded border-l-8 w-full px-3 py-1 border-red-500">
                <h1>All Product</h1>
                <h1>1999</h1>
            </div>
        </div>
        </div>
    );
}

export default Dashboard;