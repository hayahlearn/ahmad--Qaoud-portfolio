import { LucideIcon } from 'lucide-react';
import { Project } from '@/types';

export interface ProjectCardProps {
    project: Project;
}

export interface ProjectFilterProps {
    currentFilter: 'all' | 'saas' | 'automation' | 'ai' | 'ecommerce';
    onFilterChange: (filter: 'all' | 'saas' | 'automation' | 'ai' | 'ecommerce') => void;
}

export type StatsItem = {
    label: string;
    val: string;
    icon: LucideIcon;
};
