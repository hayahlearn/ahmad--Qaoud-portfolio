import { LucideIcon } from 'lucide-react';
import { Language } from '../contexts/LanguageContext';

export interface FAQ {
    question: Record<Language, string>;
    answer: Record<Language, string>;
}

export interface Stat {
    value: string;
    label?: string;
    key?: string;
    numeric?: number;
    suffix?: string;
}

export interface Testimonial {
    id: number;
    name: Record<Language, string>;
    role: Record<Language, string>;
    content: Record<Language, string>;
    avatar?: string;
    initials?: string;
    rating: number;
}

export interface Country {
    name: string;
    flag: string;
}

export interface Certification {
    name: string;
    issuer: string;
    year: string;
}

export interface TimelineItem {
    year: string;
    title: string;
    description: string;
    icon: LucideIcon;
}

export interface Value {
    icon: LucideIcon;
    title: string;
    description: string;
}

export interface Expertise {
    icon: LucideIcon;
    name: string;
}
