import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function AddCustomer() {
    return (
        <div className="flex flex-col">
            <nav className="bg-green-200 rounded-full p-2 flex items-center gap-5 justify-between m-1">
                <h1 className="p-3 border-2 border-black rounded-full">Fabric OS</h1>
                <h1 className="text-2xl">Add Customer</h1>
                <ul className="flex items-center justify-center gap-2">
                    <li className="border-2 border-black p-3 rounded-full"><Link to = "/"> Home </Link></li>
                    <li className="border-2 border-black p-3 rounded-full"> Manage Templates </li>
                    <li className="border-2 border-black p-3 rounded-full"> <Link to = "/marketing"> Marketing </Link> </li>
                </ul>
            </nav>
            <Card className="self-center min-w-3xl">
                <CardContent>
                    <form className="flex flex-col gap-5">
                        <div className="flex gap-5 items-center">
                            <label htmlFor="name" className="w-25 bg-indigo-200 p-2 rounded-full text-center">Name</label>
                            <Input className="rounded-full" type="text" placeholder="Enter the name"></Input>
                        </div>
                        <div className="flex gap-5 items-center">
                            <label htmlFor="name" className="w-25 bg-indigo-200 p-2 rounded-full text-center">Email</label>
                            <Input className="rounded-full" type="email" placeholder="Enter the email"></Input>
                        </div>
                        <div className="flex gap-5 items-center">
                            <label htmlFor="name" className="w-25 bg-indigo-200 p-2 rounded-full text-center">Phone</label>
                            <Input className="rounded-full" type="number" placeholder="Enter the Phone Number"></Input>
                        </div>
                        <div className="flex gap-5 items-center">
                            <label htmlFor="address" className="w-25 bg-indigo-200 p-2 rounded-full text-center">Address</label>
                            <Input className="rounded-full" type="address" placeholder="Enter the Address"></Input>
                        </div>
                        <div className="self-center">
                            <Button type="submit" className="rounded-full">Submit</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}