export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
}

export interface SendToInfo {
    selectedCustomers: number[];
    channel : string;
}

export interface TemplateList {
    id : string;
    templateName : string;
    channel : "Email" | "SMS";
}

export interface TemplateSubjects {
    id : string;
    subject : string;
}