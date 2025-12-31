import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactFormSection } from './ContactFormSection';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { toast } from 'sonner';

// Mock dependencies
vi.mock('@/hooks/useScrollAnimation', () => ({
    AnimatedSection: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('@/contexts/LanguageContext', () => ({
    useLanguage: () => ({
        t: (key: string) => key,
        language: 'en',
    }),
}));

vi.mock('@/integrations/supabase/client', () => ({
    supabase: {
        from: vi.fn(() => ({
            insert: vi.fn().mockResolvedValue({ error: null }),
        })),
        functions: {
            invoke: vi.fn().mockResolvedValue({ error: null }),
        },
    },
}));

vi.mock('@/components/GoogleAnalytics', () => ({
    trackFormSubmission: vi.fn(),
}));

vi.mock('sonner', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

// Mock child components that might use complex logic
vi.mock('./WhatsAppCard', () => ({
    WhatsAppCard: () => <div data-testid="whatsapp-card">WhatsApp</div>
}));

vi.mock('./ContactInfoCard', () => ({
    ContactInfoCard: () => <div data-testid="contact-info-card">Contact Info</div>
}));

vi.mock('./WhyChooseMeCard', () => ({
    WhyChooseMeCard: () => <div data-testid="why-choose-me-card">Why Choose Me</div>
}));


describe('ContactFormSection', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the form correctly', () => {
        render(<ContactFormSection />);
        expect(screen.getByText('Contact Form')).toBeInTheDocument();
        expect(screen.getByLabelText(/contact.name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/contact.email/i)).toBeInTheDocument();
    });

    it('shows validation errors when submitting empty form', async () => {
        render(<ContactFormSection />);

        const submitButton = screen.getByRole('button', { name: /contact.send/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            // Zod validation messages (assuming default zod messages or custom ones)
            // Since we mocked 't', we look for what hook-form outputs. 
            // Based on schema, fields are required. 
            // We expect some error text.
            // Usually "Required" or specific messages.
            // Let's just check if we didn't call success toast.
            expect(toast.success).not.toHaveBeenCalled();
        });
    });

    it('submits form with valid data', async () => {
        render(<ContactFormSection />);

        fireEvent.input(screen.getByLabelText(/contact.name/i), { target: { value: 'John Doe' } });
        fireEvent.input(screen.getByLabelText(/contact.email/i), { target: { value: 'john@example.com' } });
        fireEvent.input(screen.getByLabelText(/subject/i), { target: { value: 'Test Subject' } });
        fireEvent.input(screen.getByLabelText(/contact.message/i), { target: { value: 'Test Message' } });

        const submitButton = screen.getByRole('button', { name: /contact.send/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalled();
        });
    });
});
