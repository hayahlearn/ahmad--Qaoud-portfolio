import React from 'react';
import { Button } from '@/components/ui/button';
import { Layers, Box, Bot, Zap, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ProjectFilterProps } from './types';

export function ProjectFilter({ currentFilter, onFilterChange }: ProjectFilterProps) {
    const { t } = useLanguage();

    const filters: { value: 'all' | 'saas' | 'automation' | 'ai' | 'ecommerce', icon: React.ElementType, label: string }[] = [
        { value: 'all', icon: Layers, label: t('filter.all') },
        { value: 'saas', icon: Box, label: t('filter.saas') },
        { value: 'ai', icon: Bot, label: t('filter.ai') },
        { value: 'automation', icon: Zap, label: t('filter.automation') },
        { value: 'ecommerce', icon: Globe, label: t('filter.ecommerce') }
    ];

    return (
        <section className="sticky top-20 z-40 py-4 bg-background/80 backdrop-blur-lg border-b border-border/50">
            <div className="container overflow-x-auto no-scrollbar">
                <div className="flex items-center justify-center gap-2 min-w-max">
                    {filters.map((filter) => {
                        const Icon = filter.icon;
                        return (
                            <Button
                                key={filter.value}
                                variant={currentFilter === filter.value ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => onFilterChange(filter.value)}
                                className="rounded-full"
                            >
                                <Icon className="w-4 h-4 me-2" />
                                {filter.label}
                            </Button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
