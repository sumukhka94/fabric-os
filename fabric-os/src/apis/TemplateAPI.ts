export const getAllTemplates = async () => {
    const response = await fetch("http://localhost:8080/templates/get-all");
    return response.json();
}

export const getSubjectForTemplate = async (selectedTemplate : string) => {
    const response = await fetch(`http://localhost:8080/templates/subject/${selectedTemplate}`);
    return response.json();
}

export const deleteTemplate = async(id:string) => {
    const response = await fetch(`http://localhost:8080/templates/delete/${id}`,{
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json"
        }
    })

    return response.json();
}

export const editTemplate = async(id:string , subject : string) => {
    const response = await fetch(`http://localhost:8080/templates/edit/${id}`,{
        method : "PUT",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({subject : subject})
    })

    return response.json();
}

export const addTemplate = async (templateName : string, subject : string , selectedChannel : "EMAIL" | "SMS") => {
    const response = await fetch("http://localhost:8080/templates/add" , {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({templateName,subject,selectedChannel})
    })

    return response.json();
}

export const getPreviewSubject = async (subject : string) => {
    const response = await fetch("http://localhost:8080/templates/get-preview" , {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({subject})
    })

    const data = await response.json();
    return data.subject;
}