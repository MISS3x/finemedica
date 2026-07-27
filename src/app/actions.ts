"use client";

// Client-side API functions that call PHP scripts on the hosting

// In production, this will point to /api relative to the domain
const API_BASE = '/api';

export async function getSiteData() {
    try {
        const response = await fetch(`${API_BASE}/data.php`);
        if (!response.ok) throw new Error('Failed to fetch data');
        return await response.json();
    } catch (error) {
        console.error("Error fetching site data:", error);
        return null;
    }
}

export async function updateNoticeBoard(noticeBoardData: any) {
    try {
        // First get current data to merge
        const currentData = await getSiteData();
        const newData = { ...currentData, noticeBoard: noticeBoardData };

        const response = await fetch(`${API_BASE}/data.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
        });

        if (!response.ok) throw new Error('Failed to update data');
        return { success: true };
    } catch (error) {
        console.error("Error updating notice board:", error);
        return { success: false, error };
    }
}

export async function updatePriceList(priceListData: any[]) {
    try {
        // First get current data to merge
        const currentData = await getSiteData();
        const newData = { ...currentData, priceList: priceListData };

        const response = await fetch(`${API_BASE}/data.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
        });

        if (!response.ok) throw new Error('Failed to update data');
        return { success: true };
    } catch (error) {
        console.error("Error updating price list:", error);
        return { success: false, error };
    }
}

export async function sendEmail(formData: { name: string; email: string; phone: string; message: string }) {
    try {
        const response = await fetch(`${API_BASE}/send-email.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error('Failed to send email');
        return { success: true };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
}
