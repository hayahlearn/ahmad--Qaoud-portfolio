
import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection, StaggeredContainer } from '@/hooks/useScrollAnimation';
import { resources, ResourceType, Resource } from '@/data/resources';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Filter, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ResourcesPage = () => {
    const { language, t } = useLanguage();
    const [filter, setFilter] = useState<ResourceType | 'all'>('all');

    const filteredResources = filter === 'all'
        ? resources
        : resources.filter(r => r.type === filter);

    const categories = [
        { id: 'all', label: { ar: 'الكل', en: 'All' } },
        { id: 'whitepaper', label: { ar: 'أوراق عمل', en: 'Whitepapers' } },
        { id: 'case_study', label: { ar: 'دراسات حالة', en: 'Case Studies' } },
        { id: 'ebook', label: { ar: 'كتب إلكترونية', en: 'E-books' } },
    ];

    return (
        <Layout>
            <SEO
                title={language === 'ar' ? 'مكتبة الموارد - أدلة ودراسات حالة' : 'Resources Library - Guides & Case Studies'}
                description={language === 'ar'
                    ? 'حمل أحدث الدراسات والأدلة حول الذكاء الاصطناعي والتحول الرقمي.'
                    : 'Download the latest studies and guides on AI and Digital Transformation.'}
                url="/resources"
            />

            {/* Hero Section */}
            <section className="py-20 bg-gradient-hero text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/5 mask-radial-faded" />
                <div className="container relative z-10">
                    <AnimatedSection animation="fade-up">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-4 border border-primary/20">
                            <BookOpen className="w-4 h-4" />
                            <span className="text-sm font-medium">{language === 'ar' ? 'مركز المعرفة' : 'Knowledge Hub'}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            {language === 'ar' ? 'مكتبة الموارد المجانية' : 'Resources Library'}
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            {language === 'ar'
                                ? 'رؤى متعمقة، أدلة عملية، ودراسات حالة حقيقية لمساعدتك في قيادة التحول الرقمي.'
                                : 'Deep insights, practical guides, and real case studies to help you lead digital transformation.'}
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            {/* Filter & Grid */}
            <section className="py-16">
                <div className="container">

                    {/* Filter Bar */}
                    <div className="flex flex-wrap gap-2 justify-center mb-12">
                        {categories.map(cat => (
                            <Button
                                key={cat.id}
                                variant={filter === cat.id ? 'default' : 'outline'}
                                onClick={() => setFilter(cat.id as ResourceType | 'all')}
                                className="rounded-full"
                            >
                                {cat.label[language]}
                            </Button>
                        ))}
                    </div>

                    {/* Resources Grid */}
                    <StaggeredContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredResources.map((resource) => (
                                <motion.div
                                    key={resource.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ResourceCard resource={resource} language={language} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </StaggeredContainer>

                    {filteredResources.length === 0 && (
                        <div className="text-center py-20 text-muted-foreground">
                            {language === 'ar' ? 'لا توجد موارد في هذا القسم حالياً.' : 'No resources found in this category yet.'}
                        </div>
                    )}

                </div>
            </section>
        </Layout>
    );
};

const ResourceCard = ({ resource, language }: { resource: Resource, language: string }) => {
    const Icon = resource.icon;
    return (
        <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden border-primary/10">
            <div className="h-48 bg-secondary/30 relative overflow-hidden group-hover:bg-primary/5 transition-colors">
                {/* Placeholder Pattern until images are real */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <Icon className="w-24 h-24 text-primary" />
                </div>
                <Badge className="absolute top-4 right-4 bg-background/80 backdrop-blur text-foreground hover:bg-background">
                    {language === 'ar' ? getTypeLabel(resource.type).ar : getTypeLabel(resource.type).en}
                </Badge>
            </div>
            <CardHeader>
                <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                    {resource.title[language]}
                </h3>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-muted-foreground text-sm line-clamp-3">
                    {resource.description[language]}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                    {resource.tags.map((tag: string) => (
                        <span key={tag} className="text-[10px] px-2 py-1 bg-secondary rounded text-secondary-foreground">
                            {tag}
                        </span>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="pt-0">
                <Button className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground" variant="secondary" asChild>
                    <a href={resource.downloadUrl}>
                        <Download className="w-4 h-4" />
                        {language === 'ar' ? 'تحميل الآن' : 'Download Now'}
                    </a>
                </Button>
            </CardFooter>
        </Card>
    );
};

const getTypeLabel = (type: string) => {
    switch (type) {
        case 'whitepaper': return { ar: 'ورقة عمل', en: 'Whitepaper' };
        case 'ebook': return { ar: 'كتاب', en: 'E-book' };
        case 'case_study': return { ar: 'دراسة حالة', en: 'Case Study' };
        default: return { ar: 'مورد', en: 'Resource' };
    }
};

export default ResourcesPage;
