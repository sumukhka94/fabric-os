import type { AddCustomer } from "@/types/marketingTypes";

export const postCustomer = async (customer : AddCustomer) => {
    const response = await fetch("http://localhost:8080/customers/add" , {
        method : "POST",
        headers : { "Content-Type" : "application/json"},
        body : JSON.stringify(customer),
    });
    return response.json();
}