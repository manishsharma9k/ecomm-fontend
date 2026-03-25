import React from "react";
import { useNavigate } from "react-router-dom";


function DashNav() {

     const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

    return (
        <div className="px-4 py-1 flex justify-between items-center">
            <div className="font-bold text-blue-950 text-2xl">DashBoard</div>
            <div className="flex justify-center items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-slate-300"></div>
            <div className="px-2">
                <p className="font-bold ">Manish sharma</p>
                <p className="text-xs font-bold">🛅Admin</p>
            </div>
            <button onClick={handleLogout} className="bg-pink-500 px-2 py-1 rounded text-white hover:bg-amber-500">Logout</button>
            
            
        </div>
        </div>
    );
}

export default DashNav;