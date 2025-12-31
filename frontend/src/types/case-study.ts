import { LucideIcon } from 'lucide-react';
import { Language } from '../contexts/LanguageContext';

export interface CaseStudyResult {
    metric: Record<Language, string>;
    value: string;
    icon: LucideIcon;
}

export interface CaseStudyTimelineStep {
    title: Record<Language, string>;
    desc: Record<Language, string>;
    date: string;
}

export interface CaseStudyChartEntry {
    name: string;
    value: number;
    color: string;
}

export type CaseStudyTestimonialUnion =
    ({ author: string } | { name: Record<Language, string> }) & {
        content: Record<Language, string>;
        role: Record<Language, string>;
    };

export interface CaseStudy {
    id: string;
    title: Record<Language, string>;
    client: Record<Language, string>;
    industry: Record<Language, string>;
    challenge: Record<Language, string>;
    solution: Record<Language, string>;
    results: CaseStudyResult[];
    technologies: string[];
    duration: Record<Language, string>;
    color: string;
    borderColor: string;
    bgColor: string;
    icon: LucideIcon;
    chartData?: CaseStudyChartEntry[];
    timeline?: CaseStudyTimelineStep[];
    testimonial?: CaseStudyTestimonialUnion;
}
