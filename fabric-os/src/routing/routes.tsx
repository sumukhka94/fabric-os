import AddCustomer from "@/components/AddCustomer";
import Home from "@/components/Home";
import ManageTemplates from "@/components/ManageTemplates";
import Marketing from "@/components/Marketing";
import NavBar from "@/components/NavBar";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path : '/',
        element : <Home/>
    },
    {
        path : '/add-customer',
        element : <AddCustomer/>
    },
    {
        path : '/navbar',
        element : <NavBar/>
    },
    {
        path : '/marketing',
        element : <Marketing/>
    },
    {
        path : '/manage-templates',
        element : <ManageTemplates/>
    }
])