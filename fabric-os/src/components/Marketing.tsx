import { Link } from "react-router-dom";
import CustomerList from "./CustomerList";
import type { SendToInfo, TemplateList } from "@/types/marketingTypes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { getAllCustomers } from "@/apis/CustomerAPI";
import { useQuery } from "@tanstack/react-query";


export default function Marketing() {
    const [SelectedEmailTemplate, setEmailTemplate] = useState<string>("");
    const [SelectedSmsTemplate, setSmsTemplate] = useState<string>("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<SendToInfo | null>(null);

    const templates : TemplateList[] = [
        { id: "1", templateName: "Welcome Email", channel: "Email" },
        { id: "2", templateName: "Promotional Offer", channel: "Email" },
        { id: "3", templateName: "Newsletter", channel: "Email" },
        { id: "4", templateName: "Flash Sale Alert", channel: "SMS" },
        { id: "5", templateName: "Order Confirmation", channel: "SMS" }
    ];
    
    const emailTemplates = templates.filter((template) => template.channel === "Email");
    
    const smsTemplates = templates.filter((template) => template.channel === "SMS");
    

    const {data : customers = [] } = useQuery({
        queryKey: ["customers"],
        queryFn: getAllCustomers,
    })

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
                    <li className="border-2 border-black p-3 rounded-full"> <Link to = "/manage-templates"> Manage Templates </Link> </li>
                    <li className="border-2 border-black p-3 rounded-full"> <Link to = "/add-customer"> Add Customer </Link> </li>
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
                <CustomerList customers={customers} handleSubmit={handleSubmit} enableEmail = {!!SelectedEmailTemplate} enableSMS = {!!SelectedSmsTemplate}></CustomerList>
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