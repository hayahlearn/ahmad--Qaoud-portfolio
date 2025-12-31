import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTimeline } from './data';

export function AboutTimelineSection() {
    const { t, language, direction } = useLanguage();
    const timeline = getTimeline(language);

    return (
        <section className="py-24 bg-secondary/30 relative">
            <div className="container relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">{t('services.page.title')}</h2>
                    <p className="text-muted-foreground">{t('services.page.desc')}</p>
                </div>
                <AnimatedSection animation="fade-up" className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('about.timeline.title')}</h2>
                    <div className="w-20 h-1 bg-gold mx-auto rounded-full" />
                </AnimatedSection>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className={`absolute top-0 bottom-0 w-px bg-border ${direction === 'rtl' ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'} hidden md:block`} />

                    <div className="space-y-12">
                        {timeline.map((item, index) => (
                            <AnimatedSection
                                key={index}
                                animation={index % 2 === 0 ? "fade-right" : "fade-left"}
                                className={`relative flex items-center gap-8 ${index % 2 === 0
                                    ? direction === 'rtl' ? 'md:flex-row' : 'md:flex-row-reverse'
                                    : direction === 'rtl' ? 'md:flex-row-reverse' : 'md:flex-row'
                                    } flex-col`}
                            >
                                <div className={`flex-1 ${direction === 'rtl' ? 'text-left md:text-left' : 'text-center md:text-right'}`}>
                                    {index % 2 === 0 && (
                                        <div className="hidden md:block">
                                            <span className="text-5xl font-bold text-muted/10 absolute -top-4 right-0">{item.year}</span>
                                            <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                                            <p className="text-muted-foreground">{item.description}</p>
                                        </div>
                                    )}
                                    {index % 2 !== 0 && (
                                        <div className="md:hidden text-center">
                                            <span className="text-gold font-bold text-xl block mb-2">{item.year}</span>
                                            <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                                            <p className="text-muted-foreground">{item.description}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-card border-4 border-background shadow-xl flex items-center justify-center group hover:scale-110 transition-transform duration-300">
                                    <item.icon className="w-6 h-6 text-gold group-hover:text-primary transition-colors" />
                                    <div className="absolute inset-0 rounded-full bg-gold/20 animate-ping opacity-0 group-hover:opacity-100" />
                                </div>

                                <div className={`flex-1 ${direction === 'rtl' ? 'text-right md:text-right' : 'text-center md:text-left'}`}>
                                    {index % 2 !== 0 && (
                                        <div className="hidden md:block">
                                            <span className="text-5xl font-bold text-muted/10 absolute -top-4 left-0">{item.year}</span>
                                            <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                                            <p className="text-muted-foreground">{item.description}</p>
                                        </div>
                                    )}
                                    {index % 2 === 0 && (
                                        <div className="md:hidden text-center">
                                            <span className="text-gold font-bold text-xl block mb-2">{item.year}</span>
                                            <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                                            <p className="text-muted-foreground">{item.description}</p>
                                        </div>
                                    )}
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
