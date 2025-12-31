import { LucideIcon } from 'lucide-react';
import { Stat, Value, Expertise, Certification, Country, TimelineItem as ITimelineItem } from '@/types';

// Re-export types for convenience
export type { Stat, Value, Expertise, Certification, Country };
export type { ITimelineItem as TimelineItem };

// Props types for sub-components
export interface StatCardProps {
    stat: Stat;
    index: number;
}

export interface ValueCardProps {
    value: Value;
    IconComponent: LucideIcon;
    index: number;
}

export interface TimelineItemProps {
    item: ITimelineItem;
    index: number;
}

export interface ExpertiseCardProps {
    item: Expertise;
    index: number;
}

export interface CertificationCardProps {
    cert: Certification;
    index: number;
}

export interface CountryCardProps {
    country: Country;
    index: number;
}

export interface CertificateGalleryItem {
    src: string;
    caption: string;
    altText: string;
}
