export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
}

export interface AddCustomer {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export interface SendToInfo {
    selectedCustomers: string[];
    channel : string;
}

export interface TemplateList {
    id : string;
    templateName : string;
    channel : "EMAIL" | "SMS";
}

export interface TemplateSubjects {
    id : string;
    subject : string;
}