import { LucideIcon } from 'lucide-react';
import { Language } from '../contexts/LanguageContext';

export interface Service {
    key: string;
    icon: LucideIcon;
    color: string;
    features: string[];
    useCases?: string[];
}

export interface Project {
    key: string;
    slug: string;
    status: 'live' | 'completed' | 'ongoing' | 'building';
    image?: string;
    tags?: string[];
    features?: string[];
    metrics?: Record<Language, string>;
    stats?: { label: Record<Language, string>; value: string }[];
    icon: LucideIcon;
    color: string;
    borderColor?: string;
    iconBg?: string;
    iconColor?: string;
    techStack?: string[];
    category?: 'saas' | 'automation' | 'ai' | 'ecommerce';
    longDescription?: Record<Language, string>;
    benefits?: { title: Record<Language, string>; description: Record<Language, string> }[];
}
