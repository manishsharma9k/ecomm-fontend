import { useNavigate } from "react-router-dom";
import DashNav from "../components/DashNav";
import SideBar from "../components/SideBar";
import axios from "axios";
import { useEffect } from "react";



function DashboardLayout({ children }) {
    const navigator = useNavigate();
    const getIsLogin = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log(token)
            const isLogin = await axios.get(`${import.meta.env.VITE_BASE_API}/api/user/me`, {
                headers: {
                    Authorization: token
                }
            }
            );


            if (!isLogin.data.success) {
                navigator("/login")
            }
            localStorage.setItem("user", isLogin.data.user);
        } catch (error) {
            navigator("/login");
            console.error(error);
        }
    };

    useEffect(() => {
        getIsLogin();
    }, []);

    return (
        <div className="flex w-full h-screen">
            <div className="w-[30%]  bg-slate-800"><SideBar /></div>
            <div className="w-full ">
                <div className="border-b bg-slate-300"><DashNav /></div>
                <div className="bg-slate-100 h-[90%]"> {children}</div>

            </div>
        </div>
    );
}

export default DashboardLayout;