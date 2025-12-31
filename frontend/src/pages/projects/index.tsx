
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { ProjectFilter } from './ProjectFilter';
import { ProjectGrid } from './ProjectGrid';
import { ProjectDemoSection } from './ProjectDemoSection';
import { ProjectTestimonialsSection } from './ProjectTestimonialsSection';
import { Box, Workflow, Users, Clock, Sparkles, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Unified Components
import { PageHero } from '@/components/sections/PageHero';
import { UnifiedCTA } from '@/components/sections/UnifiedCTA';

const Projects = () => {
    const { t, language } = useLanguage();
    const [filter, setFilter] = useState<'all' | 'saas' | 'automation' | 'ai' | 'ecommerce'>('all');

    // Fetch projects from Supabase
    const { data: projects = [], isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('display_order', { ascending: true });

            if (error) throw error;
            return data;
        }
    });

    // Map DB projects to UI format if needed or use directly
    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter((p: any) => p.category.toLowerCase() === filter);

    const stats = [
        { label: language === 'ar' ? 'منتجات SaaS' : 'SaaS Products', val: '4', icon: Box },
        { label: language === 'ar' ? 'مسار عمل' : 'Workflows', val: '+100', icon: Workflow },
        { label: language === 'ar' ? 'عميل سعيد' : 'Happy Clients', val: '+50', icon: Users },
        { label: language === 'ar' ? 'ساعة توفير' : 'Hours Saved', val: '+10k', icon: Clock }
    ];

    const StatsVisual = (
        <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
            {stats.map((stat, i) => (
                <div key={i} className="glass-card p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors flex flex-col items-center justify-center text-center gap-2 group">
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                        <stat.icon className="w-6 h-6 text-gold" />
                    </div>
                    <span className="text-3xl font-bold text-white">{stat.val}</span>
                    <span className="text-sm text-white/70 uppercase tracking-wider">{stat.label}</span>
                </div>
            ))}
        </div>
    );

    return (
        <Layout>
            <SEO
                title={language === 'ar' ? 'معرض الأعمال' : 'Portfolio Showcase'}
                description={language === 'ar'
                    ? 'اكتشف مشاريعنا في التحول الرقمي والذكاء الاصطناعي: 4 منتجات SaaS و+100 مسار عمل احترافي'
                    : 'Discover our digital transformation and AI projects: 4 SaaS products and 100+ professional workflows'
                }
                url="/projects"
                keywords={language === 'ar'
                    ? 'مشاريع, SaaS, التحول الرقمي, منصة تعليمية, أتمتة, مسارات عمل, n8n'
                    : 'Projects, SaaS, Digital Transformation, Learning Platform, Automation, Workflows, n8n'
                }
            />

            <PageHero
                title={
                    <>
                        <span className="text-gradient-gold block mb-2">{t('projects.title')}</span>
                        <span className="text-white/90 text-2xl md:text-3xl font-medium block mt-4 opacity-80 leading-snug">
                            {language === 'ar' ? 'حيث يلتقي الإبداع بالتكنولوجيا' : 'Where Creativity Meets Technology'}
                        </span>
                    </>
                }
                description={
                    language === 'ar'
                        ? 'مجموعة مختارة من الحلول الرقمية، منتجات SaaS، وأنظمة الذكاء الاصطناعي التي أحدثت فرقاً حقيقياً في أعمال عملائنا.'
                        : 'A curated selection of digital solutions, SaaS products, and AI systems that made a real difference in our clients\' businesses.'
                }
                badge={
                    <div className="inline-flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-gold animate-pulse" />
                        <span>{language === 'ar' ? 'محفظة أعمال عالمية' : 'World-Class Portfolio'}</span>
                    </div>
                }
                visual={StatsVisual}
            />

            <ProjectFilter currentFilter={filter} onFilterChange={setFilter} />

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 animate-spin text-gold" />
                </div>
            ) : (
                <ProjectGrid projects={filteredProjects} />
            )}

            <ProjectDemoSection />
            <ProjectTestimonialsSection />

            <UnifiedCTA
                title={language === 'ar' ? 'هل تريد نتائج مماثلة؟' : 'Want Similar Results?'}
                description={language === 'ar' ? 'دعنا نساعدك في بناء قصة نجاحك التالية.' : 'Let us help you build your next success story.'}
                buttonText={language === 'ar' ? 'احصل على تحليل فجوات رقمية' : 'Get Digital Gap Analysis'}
                buttonLink="/book"
                badge={language === 'ar' ? 'ابدأ الآن' : 'Start Now'}
            />
        </Layout>
    );
};

export default Projects;
