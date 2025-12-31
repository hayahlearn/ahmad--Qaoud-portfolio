/**
 * n8n Service - Handles integration with n8n Webhooks for automation
 */

const N8N_CONFIG = {
    CONTACT_WEBHOOK: import.meta.env.VITE_N8N_CONTACT_WEBHOOK || 'https://primary.n8n.your-domain.com/webhook/contact-form',
    NEWSLETTER_WEBHOOK: import.meta.env.VITE_N8N_NEWSLETTER_WEBHOOK || 'https://primary.n8n.your-domain.com/webhook/newsletter',
    ASSESSMENT_WEBHOOK: import.meta.env.VITE_N8N_ASSESSMENT_WEBHOOK || 'https://primary.n8n.your-domain.com/webhook/assessment',
    CHAT_WEBHOOK: import.meta.env.VITE_N8N_CHAT_WEBHOOK || 'https://primary.n8n.your-domain.com/webhook/chat',
};

export interface ContactPayload {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export const triggerN8NWebhook = async (url: string, data: any) => {
    try {
        console.log(`[n8n Service] Triggering Webhook: ${url}`, data);

        // Check if we are in development mode and using mock URLs
        if (url.includes('your-domain.com')) {
            console.warn('[n8n Service] Using Mock URL. Webhook not actually sent.');
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
            return { success: true, message: 'Automation triggered (Mock)' };
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Failed to trigger automation: ${response.statusText}`);
        }

        return await response.json();

    } catch (error) {
        console.error('[n8n Service] Error:', error);
        // We re-throw the error so the UI can handle it (show error toast)
        throw error;
    }
};

export const n8nService = {
    submitContactForm: (payload: ContactPayload) => {
        return triggerN8NWebhook(N8N_CONFIG.CONTACT_WEBHOOK, payload);
    },

    subscribeNewsletter: (email: string) => {
        return triggerN8NWebhook(N8N_CONFIG.NEWSLETTER_WEBHOOK, { email, source: 'website_footer' });
    },

    submitAssessment: (score: number, level: string, details: any) => {
        return triggerN8NWebhook(N8N_CONFIG.ASSESSMENT_WEBHOOK, { score, level, details });
    },

    sendChatMessage: (message: string, history: ChatMessage[]) => {
        return triggerN8NWebhook(N8N_CONFIG.CHAT_WEBHOOK, { message, history });
    }
};
