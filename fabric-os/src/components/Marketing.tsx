import { Link } from "react-router-dom";
import CustomerList from "./CustomerList";
import type { Customer, SendToInfo } from "@/types/marketingTypes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";

export default function Marketing() {
    const [SelectedEmailTemplate, setEmailTemplate] = useState<string>("");
    const [SelectedSmsTemplate, setSmsTemplate] = useState<string>("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<SendToInfo | null>(null);
    
    const emailTemplates = [
        { id: "1", templateName: "Welcome Email" },
        { id: "2", templateName: "Promotional Offer" },
        { id: "3", templateName: "Newsletter" },
        { id: "4", templateName: "Product Launch" },
        { id: "5", templateName: "Seasonal Sale" }
    ];
    
    const smsTemplates = [
        { id: "1", templateName: "Flash Sale Alert" },
        { id: "2", templateName: "Order Confirmation" },
        { id: "3", templateName: "Discount Code" },
        { id: "4", templateName: "Event Reminder" },
        { id: "5", templateName: "Thank You Message" }
    ];
    
    const dummyCustomers: Customer[] = [
        { id: 1, name: "John Doe", email: "john@email.com", phone: "123-456-7890", address: "123 Main St" },
        { id: 2, name: "Jane Smith", email: "jane@email.com", phone: "098-765-4321", address: "456 Oak Ave" },
        { id: 3, name: "Bob Johnson", email: "bob@email.com", phone: "555-123-4567", address: "789 Pine Rd" },
        { id: 4, name: "Alice Williams", email: "alice@email.com", phone: "555-234-5678", address: "321 Elm St" },
        { id: 5, name: "Charlie Brown", email: "charlie@email.com", phone: "555-345-6789", address: "654 Maple Dr" },
        { id: 6, name: "Diana Prince", email: "diana@email.com", phone: "555-456-7890", address: "987 Cedar Ln" },
        { id: 7, name: "Edward Norton", email: "edward@email.com", phone: "555-567-8901", address: "147 Birch Ct" },
        { id: 8, name: "Fiona Green", email: "fiona@email.com", phone: "555-678-9012", address: "258 Willow Way" },
        { id: 9, name: "George Miller", email: "george@email.com", phone: "555-789-0123", address: "369 Spruce Rd" },
        { id: 10, name: "Hannah Lee", email: "hannah@email.com", phone: "555-890-1234", address: "741 Ash Blvd" },
        { id: 11, name: "Ian Cooper", email: "ian@email.com", phone: "555-901-2345", address: "852 Poplar St" },
        { id: 12, name: "Julia Roberts", email: "julia@email.com", phone: "555-012-3456", address: "963 Hickory Ave" },
        { id: 13, name: "Kevin Hart", email: "kevin@email.com", phone: "555-123-4560", address: "159 Walnut Dr" },
        { id: 14, name: "Laura Palmer", email: "laura@email.com", phone: "555-234-5601", address: "357 Cherry Ln" },
        { id: 15, name: "Michael Scott", email: "michael@email.com", phone: "555-345-6012", address: "486 Beech Ct" },
        { id: 16, name: "Nancy Drew", email: "nancy@email.com", phone: "555-456-0123", address: "792 Sycamore Way" },
        { id: 17, name: "Oscar Martinez", email: "oscar@email.com", phone: "555-567-1234", address: "135 Magnolia Rd" },
        { id: 18, name: "Pam Beesly", email: "pam@email.com", phone: "555-678-2345", address: "246 Dogwood Blvd" },
        { id: 19, name: "Quincy Adams", email: "quincy@email.com", phone: "555-789-3456", address: "579 Redwood St" },
        { id: 20, name: "Rachel Green", email: "rachel@email.com", phone: "555-890-4567", address: "681 Cypress Ave" },
        { id: 21, name: "Steve Rogers", email: "steve@email.com", phone: "555-901-5678", address: "802 Fir Dr" },
        { id: 22, name: "Tina Fey", email: "tina@email.com", phone: "555-012-6789", address: "913 Juniper Ln" },
        { id: 23, name: "Uma Thurman", email: "uma@email.com", phone: "555-123-7890", address: "024 Sequoia Ct" }
    ];

    const handleSubmit = (sendTo : SendToInfo ) => {
        setPendingAction(sendTo);
        setDialogOpen(true);
    };

    const confirmSubmit = () => {
        if(pendingAction) {
            if(pendingAction.channel === "Email"){
                alert(`Email sent to ${pendingAction.selectedCustomers.length} customers`);
            }
            else if(pendingAction.channel === "SMS"){
                alert(`SMS sent to ${pendingAction.selectedCustomers.length} customers`);
            }
        }
        setDialogOpen(false);
        setPendingAction(null);
    };

    return (
        <div>
            <nav className="bg-green-200 rounded-full p-2 flex items-center gap-5 justify-between m-1">
                <h1 className="p-3 border-2 border-black rounded-full">Fabric OS</h1>
                <h1 className="text-2xl">Marketing</h1>
                <ul className="flex items-center justify-center gap-2">
                    <li className="border-2 border-black p-3 rounded-full"><Link to = "/"> Home </Link></li>
                    <li className="border-2 border-black p-3 rounded-full"> Manage Templates </li>
                </ul>
            </nav>
            <div className="flex bg-cyan-200 m-1 rounded-full p-3 gap-1">
                <p className="border-2 border-black p-3 rounded-full"> Total Number of Customers : 100</p>
                <p className="border-2 border-black p-3 rounded-full"> Last Marketing Run : 1 day ago</p>
                <p className="border-2 border-black p-3 rounded-full"> Number of customers contacted in the last run : 5</p>
                <p className="border-2 border-black p-3 rounded-full"> Templates available : 5</p>
            </div>
            <div className="m-1 my-2">
                <div className="flex gap-3 items-center bg-red-100 rounded-full p-3 justify-around">
                    <p> Choose your Email Template :</p>
                    <Select value={SelectedEmailTemplate} onValueChange={setEmailTemplate}>
                        <SelectTrigger className="border-2 border-black">
                            <SelectValue placeholder="Select Email Template" />
                        </SelectTrigger>
                        <SelectContent>
                            {emailTemplates.map((template) => (
                                <SelectItem key={template.id} value={template.id}>{template.templateName}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <p> Choose your SMS Template :</p>
                    <Select value={SelectedSmsTemplate} onValueChange={setSmsTemplate}>
                        <SelectTrigger className="border-2 border-black">
                            <SelectValue placeholder="Select SMS Template" />
                        </SelectTrigger>
                        <SelectContent>
                            {smsTemplates.map((template) => (
                                <SelectItem key={template.id} value={template.id}>{template.templateName}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <CustomerList customers={dummyCustomers} handleSubmit={handleSubmit} enableEmail = {!!SelectedEmailTemplate} enableSMS = {!!SelectedSmsTemplate}></CustomerList>
            </div>
            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Action</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to send {pendingAction?.channel} to {pendingAction?.selectedCustomers.length} customers?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmSubmit}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}