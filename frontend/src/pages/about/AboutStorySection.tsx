import { Sparkles } from 'lucide-react';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import { ValueCard } from './ValueCard';
import { getValues } from './data';

export function AboutStorySection() {
    const { t, language } = useLanguage();
    const values = getValues(language);

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
            </div>

            <div className="container relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <AnimatedSection animation="fade-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm font-medium">{t('about.story.badge')}</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                            <span className="relative inline-block">
                                {t('about.story.title1')}
                                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-gold to-primary rounded-full" />
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">
                                {t('about.story.title2')}
                            </span>
                        </h2>

                        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                            <p>{t('about.description1')}</p>
                            <p>{t('about.description2')}</p>
                            <p className="text-foreground font-medium border-s-4 border-gold ps-4 bg-gold/5 py-3 rounded-e-lg">
                                {language === 'ar'
                                    ? '"نصنع القيمة، لا ننفذ المهام" - هذه فلسفتي في العمل'
                                    : '"We create value, not just execute tasks" - This is my work philosophy'}
                            </p>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection animation="fade-up" delay={0.2}>
                        <div className="space-y-6">
                            {values.map((value, index) => {
                                const IconComponent = value.icon;
                                return (
                                    <ValueCard key={index} value={value} IconComponent={IconComponent} index={index} />
                                );
                            })}
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
