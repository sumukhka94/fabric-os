import { Link } from "react-router-dom";
import CustomerList from "./CustomerList";
import type { CommunicateInfo, SendToInfo, TemplateList } from "@/types/marketingTypes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { getAllCustomers } from "@/apis/CustomerAPI";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllTemplates } from "@/apis/TemplateAPI";
import { communicate } from "@/apis/MarketingAPI";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";


export default function Marketing() {
    const [SelectedEmailTemplate, setEmailTemplate] = useState<string>("");
    const [SelectedSmsTemplate, setSmsTemplate] = useState<string>("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<SendToInfo | null>(null);

    const { data: templates = [] } = useQuery<TemplateList[]>({
        queryKey: ["templates"],
        queryFn: () => getAllTemplates()
    })
    
    const emailTemplates = templates.filter((template) => template.channel === "EMAIL");
    
    const smsTemplates = templates.filter((template) => template.channel === "SMS");
    

    const {data : customers = [] } = useQuery({
        queryKey: ["customers"],
        queryFn: getAllCustomers,
    })

    const handleSubmit = (sendTo : SendToInfo ) => {
        setPendingAction(sendTo);
        setDialogOpen(true);    
    };

    const communicateMutation = useMutation({
        mutationFn: (data: CommunicateInfo) => communicate(data),
        onSuccess: (response) => {
            toast.success(`Communicated to ${response.customersNotified} customers`);
            if (response.customersNotFound.length > 0) {
                toast.warning(`Customers not found: ${response.customersNotFound.join(", ")}`);
            }
        },
        onError: () => {
            toast.error("Failed to communicate to the customers")
        },
        onSettled: () => {
            setDialogOpen(false);
            setPendingAction(null);
        }
    })

    const confirmSubmit = () => {
        if(pendingAction) {
           communicateMutation.mutate({
            channel : pendingAction.channel,
            templateId : pendingAction.channel === "EMAIL" ? SelectedEmailTemplate : SelectedSmsTemplate,
            selectedCustomers : pendingAction.selectedCustomers
           })
        }
    };

    return (
        <div>
            <nav className={`rounded-full p-2 flex items-center gap-5 justify-between m-1 ${communicateMutation.isPending ? "bg-red-700 animate-caret-blink" : "bg-green-200"}`}>
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
                    {   communicateMutation.isPending &&
                        <div className="bg-red-700 text-white rounded-full flex px-3 items-center gap-5">Sending Communication 
                        <Spinner className="text-white size-10"/>
                        </div>
                    }
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
                <CustomerList customers={customers} handleSubmit={handleSubmit} enableEmail = {!!SelectedEmailTemplate && !communicateMutation.isPending} enableSMS = {!!SelectedSmsTemplate && !communicateMutation.isPending}></CustomerList>
            </div>
            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="bg-red-700 text-white rounded-full text-center animate-caret-blink">Confirm Action !!!</AlertDialogTitle>
                        <AlertDialogDescription className="text-red-700 text-center">
                            Are you sure you want to send {pendingAction?.channel} to {pendingAction?.selectedCustomers.length} customers?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmSubmit} className="bg-red-900">Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}