import type { AddCustomer, Customer } from "@/types/marketingTypes";

export const postCustomer = async (customer : AddCustomer) => {
    const response = await fetch("http://localhost:8080/customers/add" , {
        method : "POST",
        headers : { "Content-Type" : "application/json"},
        body : JSON.stringify(customer),
    });
    return response.json();
}

export const getAllCustomers = async () => {
    const response = await fetch("http://localhost:8080/customers/get-all", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    return response.json();
}

export const deleteCustomer = async (id :String) : Promise<Customer> =>  {
    const response = await fetch(`http://localhost:8080/customers/delete/${id}`, {
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json",
        },
    })
    return response.json();
}