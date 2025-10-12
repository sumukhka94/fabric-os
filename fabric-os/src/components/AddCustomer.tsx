import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { type AddCustomer } from "@/types/marketingTypes";
import { useState } from "react";
import { postCustomer } from "@/apis/CustomerAPI";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

export default function AddCustomer() {
    const [customer , setCustomer] = useState<AddCustomer>({name : "" , email : "" , phone : "" , address : ""});

    const mutation = useMutation({
        mutationFn : postCustomer,
        onSuccess : (data) => {
            toast.success("Customer Added Successfully", data);
            setCustomer({name : "", email : "", phone : "", address : ""});
        },
        onError : () => {
            toast.error("Something went wrong while adding the customer");
        }
    })

    const customerSchema = z.object({
        name : z.string().min(1,"Name is required"),
        email : z.email({message : "Invalid email"}),
        phone : z.string().min(10, "Phone number is required and should be minimum 10 digit long"),
        address : z.string().min(1, "Address is required")
    })

    function handleAddCustomer(e : React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();

        const res = customerSchema.safeParse(customer);
        if(!res.success){
            toast.warning(res.error.issues[0].message);
            return;
        }

        mutation.mutate(customer);
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setCustomer({...customer , [event.target.name] : event.target.value})
    }

    return (
        <div className="flex flex-col">
            <nav className="bg-green-200 rounded-full p-2 flex items-center gap-5 justify-between m-1">
                <h1 className="p-3 border-2 border-black rounded-full">Fabric OS</h1>
                <h1 className="text-2xl">Add Customer</h1>
                <ul className="flex items-center justify-center gap-2">
                    <li className="border-2 border-black p-3 rounded-full"><Link to = "/"> Home </Link></li>
                    <li className="border-2 border-black p-3 rounded-full"> <Link to = "/manage-templates"> Manage Templates </Link> </li>
                    <li className="border-2 border-black p-3 rounded-full"> <Link to = "/marketing"> Marketing </Link> </li>
                </ul>
            </nav>
            <Card className="self-center min-w-3xl">
                <CardContent>
                    <form className="flex flex-col gap-5" onSubmit={handleAddCustomer}>
                        <div className="flex gap-5 items-center">
                            <label htmlFor="name" className="w-25 bg-indigo-200 p-2 rounded-full text-center">Name</label>
                            <Input className="rounded-full" type="text" placeholder="Enter the name" name="name" value={customer.name} onChange={handleInputChange}></Input>
                        </div>
                        <div className="flex gap-5 items-center">
                            <label htmlFor="name" className="w-25 bg-indigo-200 p-2 rounded-full text-center">Email</label>
                            <Input className="rounded-full" type="email" placeholder="Enter the email" name="email" value={customer.email} onChange={handleInputChange}></Input>
                        </div>
                        <div className="flex gap-5 items-center">
                            <label htmlFor="name" className="w-25 bg-indigo-200 p-2 rounded-full text-center">Phone</label>
                            <Input className="rounded-full" type="number" placeholder="Enter the Phone Number" name="phone" value={customer.phone} onChange={handleInputChange}></Input>
                        </div>
                        <div className="flex gap-5 items-center">
                            <label htmlFor="address" className="w-25 bg-indigo-200 p-2 rounded-full text-center">Address</label>
                            <Input className="rounded-full" type="address" placeholder="Enter the Address" name="address" value={customer.address} onChange={handleInputChange}></Input>
                        </div>
                        <div className="self-center">
                            <Button type="submit" className="rounded-full" disabled = {mutation.isPending} >{mutation.isPending ? "Adding Customer..." : "Add Customer"}</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}