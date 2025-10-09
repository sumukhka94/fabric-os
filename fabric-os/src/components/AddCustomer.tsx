import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";

export default function AddCustomer() {
    return (
        <Card className="">
            <CardHeader className="text-center">
                <h1 className="text-2xl bg-green-200 p-3 rounded-full">Add Customer</h1>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-5">
                    <div className="flex gap-5 items-center">
                        <label htmlFor="name" className="w-20 bg-indigo-200 p-2 rounded-full text-center">Name</label>
                        <Input type="text" placeholder="Enter the name"></Input>
                    </div>
                    <div className="flex gap-5 items-center">
                        <label htmlFor="name" className="w-20 bg-indigo-200 p-2 rounded-full text-center">Email</label>
                        <Input type="email" placeholder="Enter the email"></Input>
                    </div>
                    <div className="flex gap-5 items-center">
                        <label htmlFor="name" className="w-20 bg-indigo-200 p-2 rounded-full text-center">Phone</label>
                        <Input type="number" placeholder="Enter the Phone Number"></Input>
                    </div>
                    <div className="flex gap-5 items-center">
                        <label htmlFor="address" className="w-20 bg-indigo-200 p-2 rounded-full text-center">Address</label>
                        <Input type="address" placeholder="Enter the Address"></Input>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}