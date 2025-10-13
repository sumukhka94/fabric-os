import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import type { TemplateList, TemplateSubjects } from "@/types/marketingTypes";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Trash, ScanEye } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { addTemplate, deleteTemplate, editTemplate, getAllTemplates, getPreviewSubject, getSubjectForTemplate } from "@/apis/TemplateAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export default function ManageTemplates() {
    const [selectedTemplate, setSelectedTemplate] = useState<string>("");
    const [searchTerm,setSearchTerm] = useState<string>("");
    const [subject , setSubject] = useState<string>("");
    const [templateName, setTemplateName] = useState<string>("");
    const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
    const [isChannelDialogOpen , setIsChannelDialogOpen] = useState<boolean>(false);
    const [selectedChannel, setSelectedChannel] = useState<"Email" | "SMS" >("Email");

    const queryClient = useQueryClient();

    const {data : templates} = useQuery<TemplateList[]>({
        queryKey: ["templates"],
        queryFn: getAllTemplates
    })

    const {data : fetchedsubject} = useQuery<TemplateSubjects>({
        queryKey: ["templates", selectedTemplate],
        queryFn: () => getSubjectForTemplate(selectedTemplate),
        enabled : !!selectedTemplate
    })

    useEffect(() => {
        if(fetchedsubject)
            setSubject(fetchedsubject.subject);
    }, [fetchedsubject])

    const deleteMutation = useMutation({
        mutationFn : (id : string) => deleteTemplate(id),
        onSuccess : (data) => {
            toast.success("deleted template " + data.templateName)
            queryClient.invalidateQueries({ queryKey: ["templates"] })
        }
    })

    const editMutation = useMutation({
        mutationFn : (id  : string) => editTemplate(id,subject),
        onSuccess : (data) => {
            toast.success("Edited "+ data.id + " with the new subject " + data.subject);
            queryClient.invalidateQueries({ queryKey: ["templates"] })
        }
    })

    const addMutation = useMutation({
        mutationFn: () => addTemplate(templateName,subject,selectedChannel),
        onSuccess : () => {
            toast.success("Added the new Template " + templateName);
            queryClient.invalidateQueries({ queryKey : ["templates"]})
            clearTemplate();
        }
    })

    const previewMutation = useMutation({
        mutationFn: (subjectText: string) => getPreviewSubject(subjectText),
        onSuccess: () => setIsPreviewOpen(true)
    })

    const filteredTemplates = templates?.sort((a,b) => a.templateName.localeCompare(b.templateName)).filter((template) => template.templateName.toLowerCase().includes(searchTerm.toLowerCase()) || template.channel.toLowerCase().includes(searchTerm.toLowerCase()) || template.id.includes(searchTerm))
    

    const handleTemplateSelection = (id: string) => {
        setSelectedTemplate(id);
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

    const clearTemplate = () => {
        setSubject("");
        setSelectedTemplate("");
        setTemplateName("");
    }

    const handleTemplateSubmit = () => {
        setIsChannelDialogOpen(true);
    }

    const handleDelete = (id : string ) => {
        if (!confirm("Are you sure you want to Delete the Template Permanently ?")) return;
        deleteMutation.mutate(id);
    }

    const submitEdit = () => {
        if (!confirm("Are you sure you want to Edit the Template ?")) return;
        editMutation.mutate(selectedTemplate)
    }

    const handlePreview = () => {
        previewMutation.mutate(subject);
    }

    function handleChannelSelect(channel : "Email" | "SMS"): void {
        setSelectedChannel(channel);
        setIsChannelDialogOpen(false);
        if (!confirm("Are you sure you want to Submit the New Template ?")) return;
        addMutation.mutate();
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
                                    <TableHead className="text-center">Delete</TableHead>
                                </TableRow>
                            </TableHeader>
                        </Table>
                        <ScrollArea className="h-80">
                            <Table>
                                <TableBody>
                                    {filteredTemplates?.map((template) => (
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
                                            <TableCell className="text-center">
                                                <Button onClick={() => handleDelete(template.id)} className="bg-red-600 cursor-pointer" size="icon">
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                    <div className="flex gap-2">
                        <Input className = "flex-1" type="text" placeholder={templates?.find((s) => selectedTemplate == s.id)?.templateName || "Enter the template Name"} disabled = {!!selectedTemplate} value={templateName} onChange={(e) => setTemplateName(e.target.value)}></Input>
                        <Button onClick={addNameTag}> Add Name Tag</Button>
                        <Button onClick={clearTemplate}> Clear Template</Button>
                        <Button onClick={submitEdit} disabled={!selectedTemplate}> Submit Edit</Button>
                        <Button onClick={handlePreview} disabled={!subject || !templateName}> <ScanEye className="w-4 h-4"></ScanEye> </Button>
                        <Button className="bg-green-800 disabled:bg-red-700" onClick={handleTemplateSubmit} disabled = {!!selectedTemplate || !subject || !templateName}> Add New Template</Button>
                    </div>
                    <Textarea ref = {textareaRef} placeholder="Enter the Subject matter" className="flex-1 w-full border rounded-md" value={subject} onChange={(e) => setSubject(e.target.value)}/>
                </div>         
            </div>
            <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{templateName}</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        Check for the Template Preview after Tag Replacement.
                    </DialogDescription>
                    <div>
                        <h3 className="text-center">Subject</h3>
                        <p>{previewMutation.data}</p>
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog open={isChannelDialogOpen} onOpenChange={setIsChannelDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Choose the template channel for the new Template.
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex gap-2 justify-center">
                        <Button onClick={() => handleChannelSelect("Email")}>Email</Button>
                        <Button onClick={() => handleChannelSelect("SMS")}>SMS</Button> 
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
