import React from "react";
import { Link } from "react-router-dom";


function SideBar() {
    return (
        <div className="p-4 mt-10 flex flex-col gap-2">
            <Link to={"/dashboard"}>
            <div className="px-2 text-sm py-1 w-full border rounded-lg text-white bg-black/40">
            Dashboard</div>
            </Link>
               <Link to={"/dashboard/user"}>
               {""}
                   <div className="px-2 text-sm py-1 w-full border rounded-lg text-white bg-black/40">
                   Manage User</div>
                   </Link>
                   <Link to={"/dashboard/category"}>
                      <div className="px-2 text-sm py-1 w-full border rounded-lg text-white bg-black/40">
                      Manage Category</div></Link>
                        <Link to={"/dashboard/product"}>
                       <div className="px-2 text-sm py-1 w-full border rounded-lg text-white bg-black/40">
                       Manage Product</div></Link>
                      </div>

);
}

export default SideBar;