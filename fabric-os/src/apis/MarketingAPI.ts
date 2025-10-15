import type { CommunicateInfo, CommunicationResponse } from "@/types/marketingTypes";

export const communicate = async (data: CommunicateInfo): Promise<CommunicationResponse> => {
    const response = await fetch("http://localhost:8080/marketing/communicate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({channel: data.channel, selectedCustomers: data.selectedCustomers, templateId: data.templateId})
    });

    return response.json();
}