import { createBrowserRouter } from "react-router-dom";
import WebLayout from "../layout/WebLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dasboard";
import DashboardLayout from "../layout/DashboardLayout";
import Users from '../pages/Users'
import Category from '../pages/Category'
import Product from '../pages/Product'



const AppRoute = createBrowserRouter([
    {
        path: "/",element: 
        <WebLayout>
            <Home/>
        </WebLayout>
    },
    {
        path: "/login", element: <Login />
    },
    {
        path: "/dashboard", element: <DashboardLayout><Dashboard/></DashboardLayout>
    },
    {
        path: "/dashboard/user", element:<DashboardLayout><Users/></DashboardLayout>
    },
     {
        path: "/dashboard/category", element: <DashboardLayout><Category/></DashboardLayout>
    },
     {
        path: "/dashboard/product", element: <DashboardLayout><Product/></DashboardLayout>
    },

    
]);
export default AppRoute