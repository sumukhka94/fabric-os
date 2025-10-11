import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import type { TemplateList, TemplateSubjects } from "@/types/marketingTypes";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";

export default function ManageTemplates() {
    const [selectedTemplate, setSelectedTemplate] = useState<string>("");
    const [searchTerm,setSearchTerm] = useState<string>("");
    const [subject , setSubject] = useState<string>("");

    const templates : TemplateList[] = [
        { id: "1", templateName: "Welcome Email", channel: "Email" },
        { id: "2", templateName: "Promotional Offer", channel: "Email" },
        { id: "3", templateName: "Newsletter", channel: "Email" },
        { id: "4", templateName: "Flash Sale Alert", channel: "SMS" },
        { id: "5", templateName: "Order Confirmation", channel: "SMS" },
        { id: "6", templateName: "Product Launch", channel: "Email" },
        { id: "7", templateName: "Seasonal Sale", channel: "Email" },
        { id: "8", templateName: "Discount Code", channel: "SMS" },
        { id: "9", templateName: "Event Reminder", channel: "SMS" },
        { id: "10", templateName: "Thank You Message", channel: "Email" },
        { id: "11", templateName: "Password Reset", channel: "Email" },
        { id: "12", templateName: "Account Verification", channel: "SMS" },
        { id: "13", templateName: "Birthday Wishes", channel: "Email" },
        { id: "14", templateName: "Shipping Update", channel: "SMS" },
        { id: "15", templateName: "Survey Request", channel: "Email" },
        { id: "16", templateName: "Payment Reminder", channel: "SMS" },
        { id: "17", templateName: "New Feature Announcement", channel: "Email" },
        { id: "18", templateName: "Appointment Confirmation", channel: "SMS" },
        { id: "19", templateName: "Feedback Request", channel: "Email" },
        { id: "20", templateName: "Security Alert", channel: "SMS" },
        { id: "21", templateName: "Holiday Greetings", channel: "Email" },
        { id: "22", templateName: "Delivery Notification", channel: "SMS" },
        { id: "23", templateName: "Membership Renewal", channel: "Email" },
        { id: "24", templateName: "Two-Factor Auth", channel: "SMS" },
        { id: "25", templateName: "Abandoned Cart", channel: "Email" }
    ];

    const templateSubjects : TemplateSubjects[] = [
        { id: "1", subject: "Welcome to Our Platform - Get Started Today!" },
        { id: "2", subject: "Exclusive 50% Off - Limited Time Offer!" },
        { id: "3", subject: "Monthly Newsletter - Latest Updates & News" },
        { id: "4", subject: "⚡ Flash Sale Alert - 24 Hours Only!" },
        { id: "5", subject: "Your Order #12345 Has Been Confirmed" },
        { id: "6", subject: "Introducing Our Revolutionary New Product" },
        { id: "7", subject: "🎄 Holiday Season Sale - Up to 70% Off" },
        { id: "8", subject: "Your Discount Code: SAVE20 - Use Now!" },
        { id: "9", subject: "Reminder: Your Appointment Tomorrow at 2 PM" },
        { id: "10", subject: "Thank You for Your Purchase - We Appreciate You!" },
        { id: "11", subject: "Reset Your Password - Security Notice" },
        { id: "12", subject: "Verify Your Account - Code: 123456" },
        { id: "13", subject: "🎂 Happy Birthday! Here's a Special Gift" },
        { id: "14", subject: "Your Package is Out for Delivery" },
        { id: "15", subject: "We Value Your Opinion - Quick 2-Minute Survey" },
        { id: "16", subject: "Payment Due Reminder - Invoice #789" },
        { id: "17", subject: "Exciting New Features Now Available!" },
        { id: "18", subject: "Appointment Confirmed for Dec 15, 3:00 PM" },
        { id: "19", subject: "How Was Your Experience? Share Your Feedback" },
        { id: "20", subject: "🔒 Security Alert: New Login Detected" },
        { id: "21", subject: "Season's Greetings from Our Family to Yours" },
        { id: "22", subject: "Package Delivered Successfully" },
        { id: "23", subject: "Membership Renewal Due - Don't Miss Out!" },
        { id: "24", subject: "Your 2FA Code: 987654" },
        { id: "25", subject: "Don't Forget Your Cart - Complete Your Purchase" }
    ]

    const filteredTemplates = templates.sort((a,b) => a.templateName.localeCompare(b.templateName)).filter((template) => template.templateName.toLowerCase().includes(searchTerm.toLowerCase()) || template.channel.toLowerCase().includes(searchTerm.toLowerCase()) || template.id.includes(searchTerm))
    

    const handleTemplateSelection = (id: string) => {
        setSelectedTemplate(id);
        setSubject(templateSubjects.find(ts => ts.id === id)?.subject || "");
    }

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const addNameTag = () => {
        const textarea = textareaRef.current
        if(textarea) {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const tag = " {{name}} ";
            const newValue = subject.substring(0, start) + tag + subject.substring(end);
            setSubject(newValue);

            setTimeout(() => {textarea.selectionStart = textarea.selectionEnd = start + tag.length; textarea.focus()},0)
        }
    }

    return (
        <div className="">
            <nav className="bg-green-200 rounded-full p-2 flex items-center gap-5 justify-between m-1">
                <h1 className="p-3 border-2 border-black rounded-full">Fabric OS</h1>
                <h1 className="text-2xl">Manage Templates</h1>
                <ul className="flex items-center justify-center gap-2">
                    <li className="border-2 border-black p-3 rounded-full"><Link to = "/"> Home </Link></li>
                    <li className="border-2 border-black p-3 rounded-full"> <Link to = "/marketing"> Marketing </Link> </li>
                </ul>
            </nav>
            <div className="m-1 flex gap-2">
                <div className="flex-1 flex flex-col gap-2">
                    <Input type="text" placeholder="Search" className="w-50 self-end" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></Input>
                    <div className="border rounded-md overflow-hidden">
                        <Table>
                            <TableHeader className="bg-red-200 h-10">
                                <TableRow>
                                    <TableHead className="text-center">Select</TableHead>
                                    <TableHead className="text-center">ID</TableHead>
                                    <TableHead className="text-center">Template Name</TableHead>
                                    <TableHead className="text-center">Channel</TableHead>
                                </TableRow>
                            </TableHeader>
                        </Table>
                        <ScrollArea className="h-80">
                            <Table>
                                <TableBody>
                                    {filteredTemplates.map((template) => (
                                        <TableRow key={template.id}>
                                            <TableCell className="text-center">
                                                <Input 
                                                    type="radio" 
                                                    className="w-4 h-4" 
                                                    checked={selectedTemplate === template.id} 
                                                    onChange={() => handleTemplateSelection(template.id)} 
                                                    name="templateSelect"
                                                    id={`template-${template.id}`}
                                                />
                                            </TableCell>
                                            <TableCell className="text-center">{template.id}</TableCell>
                                            <TableCell className="text-center">{template.templateName}</TableCell>
                                            <TableCell className="text-center">{template.channel}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <Button className = "self-end" onClick={addNameTag}> Add Name Tag</Button>
                    <Textarea ref = {textareaRef} placeholder="Enter the Subject matter" className="flex-1 w-full border rounded-md" value={subject} onChange={(e) => setSubject(e.target.value)}/>
                </div>         
            </div>
        </div>
    )
}
