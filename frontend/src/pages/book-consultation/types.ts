import { LucideIcon } from 'lucide-react';

export interface ConsultationType {
    id: string;
    icon: LucideIcon;
    title: { ar: string; en: string };
    duration: string;
    description: { ar: string; en: string };
    features: { ar: string[]; en: string[] };
    recommended: boolean;
    color: string;
    borderColor: string;
}

export interface Benefit {
    icon: LucideIcon;
    title: { ar: string; en: string };
    desc: { ar: string; en: string };
}
