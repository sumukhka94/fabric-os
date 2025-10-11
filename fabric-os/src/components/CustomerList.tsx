import { useState } from "react";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import type { Customer, SendToInfo } from "@/types/marketingTypes";
import { ScrollArea } from "./ui/scroll-area";


interface CustomerListProps {
    customers: Customer[];
    handleSubmit : (sendTo : SendToInfo) => void
    enableEmail : boolean
    enableSMS : boolean
}


export default function CustomerList({ customers, handleSubmit, enableEmail, enableSMS }: CustomerListProps) {
    const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const filteredCustomers = customers.sort((a,b) => a.name.localeCompare(b.name)).filter((customer) => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
        customer.phone.toLowerCase().includes(searchTerm.toLowerCase()) || 
        customer.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCheckboxChange = (customerId: number, event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedCustomers([...selectedCustomers, customerId]);
        } else {
            setSelectedCustomers(selectedCustomers.filter(id => id !== customerId));
        }
    };

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedCustomers(event.target.checked ? filteredCustomers.map((customer) => customer.id) : []);
    }

    return (
        <div className="flex flex-col">
            <div className="flex self-end gap-2 my-2">
                <Input type="text" placeholder="Search" className = "min-w-25" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <Button type="submit" className="cursor-pointer" onClick={() => {handleSubmit({selectedCustomers, channel: "Email"})}} disabled={!enableEmail || selectedCustomers.length === 0}> Email for Selected Customers </Button>
                <Button type="submit" className="cursor-pointer" onClick={() => {handleSubmit({selectedCustomers, channel: "SMS"})}} disabled={!enableSMS || selectedCustomers.length === 0}> SMS for Selected Customers </Button>
            </div>
            <div className="border rounded-md overflow-hidden">
                <Table>
                    <TableHeader className="bg-cyan-500">
                        <TableRow>
                            <TableHead className="text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <span>Select All</span>
                                    <Input type="checkbox" checked={selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0} onChange={handleSelectAll} className="w-4 h-4" />
                                </div>
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
                </Table>
                <ScrollArea className="h-100">
                    <Table>
                        <TableBody>
                            {filteredCustomers?.map((customer) => (
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
                </ScrollArea>
            </div>
        </div>
    )
}
