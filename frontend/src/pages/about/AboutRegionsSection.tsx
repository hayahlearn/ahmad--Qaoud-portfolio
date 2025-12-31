import { MapPin } from 'lucide-react';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import { CountryCard } from './CountryCard';
import { getCountries } from './data';

export function AboutRegionsSection() {
    const { t, language } = useLanguage();
    const countries = getCountries(language);

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="container relative z-10">
                <AnimatedSection animation="fade-up" className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-medium">{t('about.presence.badge')}</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="relative inline-block">
                            {t('about.presence.title')}
                            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-gold to-primary rounded-full" />
                        </span>
                    </h2>

                    <p className="text-xl text-muted-foreground">
                        {t('about.presence.desc')}
                    </p>
                </AnimatedSection>

                <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
                    {countries.map((country, index) => (
                        <CountryCard key={index} country={country} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
