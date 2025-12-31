import { Brain } from 'lucide-react';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExpertiseCard } from './ExpertiseCard';
import { getExpertise } from './data';

export function AboutExpertiseSection() {
    const { t, language } = useLanguage();
    const expertise = getExpertise(language);

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
            </div>

            <div className="container relative z-10">
                <AnimatedSection animation="fade-up" className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                        <Brain className="w-4 h-4" />
                        <span className="text-sm font-medium">{t('about.expertise.badge')}</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="relative inline-block">
                            {t('about.expertise.title')}
                            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-gold to-primary rounded-full" />
                        </span>
                    </h2>
                </AnimatedSection>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {expertise.map((item, index) => (
                        <ExpertiseCard key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
