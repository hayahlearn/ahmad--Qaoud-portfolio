import { LucideIcon } from 'lucide-react';

export interface ContactInfoCardProps {
    icon: LucideIcon;
    title: string;
    content: string;
    href?: string;
    index: number;
}

export interface WhatsAppCardProps {
    language: string;
}

export interface WhyChooseMeCardProps {
    whyChooseMe: string[];
    language: string;
}

export interface ErrorMessageProps {
    message?: string;
}
