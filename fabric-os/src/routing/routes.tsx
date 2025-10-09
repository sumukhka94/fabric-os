import AddCustomer from "@/components/AddCustomer";
import Home from "@/components/Home";
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
    }
])