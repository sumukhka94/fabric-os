import { Link } from "react-router-dom";

export default function NavBar() {
    return (
    <nav className="bg-green-200 rounded-full p-2 flex items-center gap-5 justify-between m-1">
        <h1 className="p-3 border-2 border-black rounded-full">Fabric OS</h1>
        <ul className="flex items-center justify-center gap-2">
            <li className="border-2 border-black p-3 rounded-full"><Link to="/add-customer">Add Customer</Link></li>
            <li className="border-2 border-black p-3 rounded-full"><Link to="/marketing"> Marketing </Link></li>
            <li className="border-2 border-black p-3 rounded-full"> Inventory </li>
            <li className="border-2 border-black p-3 rounded-full"> Billing </li>
        </ul>
    </nav>
)
}