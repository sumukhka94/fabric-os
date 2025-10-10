import { useState } from "react";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import type { Customer, SendToInfo } from "@/types/marketingTypes";


interface CustomerListProps {
    customers: Customer[];
    handleSubmit : (sendTo : SendToInfo) => void
    enableEmail : boolean
    enableSMS : boolean
}


export default function CustomerList({ customers, handleSubmit, enableEmail, enableSMS }: CustomerListProps) {
    const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);

    const handleCheckboxChange = (customerId: number, event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedCustomers([...selectedCustomers, customerId]);
        } else {
            setSelectedCustomers(selectedCustomers.filter(id => id !== customerId));
        }
    };

    return (
        <div className="flex flex-col">
            <div className="flex self-end">
                <Button type="submit" className="my-2 mx-2 cursor-pointer" onClick={() => {handleSubmit({selectedCustomers, channel: "Email"})}} disabled={!enableEmail || selectedCustomers.length === 0}> Email for Selected Customers </Button>
                <Button type="submit" className="my-2 mx-2 cursor-pointer" onClick={() => {handleSubmit({selectedCustomers, channel: "SMS"})}} disabled={!enableSMS || selectedCustomers.length === 0}> SMS for Selected Customers </Button>
            </div>
            <Table >
            <TableHeader className="bg-cyan-500">
                <TableRow>
                    <TableHead className="text-center">
                        Select
                    </TableHead>
                    <TableHead className="text-center">
                        Name
                    </TableHead>
                    <TableHead className="text-center">
                        Email
                    </TableHead>
                    <TableHead className="text-center">
                        Phone
                    </TableHead>
                    <TableHead className="text-center">
                        Address
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {customers?.map((customer) => (
                    <TableRow key={customer.id}>
                        <TableCell className="text-center">
                            <Input 
                                type="checkbox"
                                checked={selectedCustomers.includes(customer.id)}
                                onChange={(event) => handleCheckboxChange(customer.id, event)}
                                className="w-4 h-4"
                            />
                        </TableCell>
                        <TableCell className="text-center">{customer.name}</TableCell>
                        <TableCell className="text-center">{customer.email}</TableCell>
                        <TableCell className="text-center">{customer.phone}</TableCell>
                        <TableCell className="text-center">{customer.address}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        
        </div>
    )
}
