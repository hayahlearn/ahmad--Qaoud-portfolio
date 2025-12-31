import { Award, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import { CertificationCard } from './CertificationCard';
import { certifications, certificateImages } from './data';
import { LogoIcon } from '@/components/brand/Logo';
import { CertificateGalleryItem } from './types';

export function AboutCertificationsSection() {
    const { t, language } = useLanguage();

    const certificateGallery: CertificateGalleryItem[] = certificateImages.map((img, idx) => {
        const cert = certifications[idx];
        const caption = cert ? `${cert.name} — ${cert.issuer} • ${cert.year}` : (language === 'ar' ? 'شهادة' : 'Certificate');
        const altText = cert ? cert.name : (language === 'ar' ? 'شهادة' : 'Certificate');
        return { src: img, caption, altText };
    });

    return (
        <section className="py-24 bg-secondary/30 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-1/4 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
            </div>

            <div className="container relative z-10">
                <AnimatedSection animation="fade-up" className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold mb-6">
                        <Award className="w-4 h-4" />
                        <span className="text-sm font-medium">{t('about.cert.badge')}</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold">
                        <span className="relative inline-block">
                            {t('about.cert.title')}
                            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold-light to-gold rounded-full" />
                        </span>
                    </h2>
                </AnimatedSection>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {certifications.map((cert, index) => (
                        <CertificationCard key={index} cert={cert} index={index} />
                    ))}
                </div>

                {/* Certificates Gallery */}
                <AnimatedSection animation="fade-up" className="mt-16">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm font-medium">
                                {language === 'ar' ? 'صور شهاداتي' : 'My Certificates'}
                            </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold">
                            {language === 'ar' ? 'معرض الشهادات' : 'Certificates Gallery'}
                        </h3>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {certificateGallery.map((item, idx) => (
                            <Card key={idx} className="overflow-hidden bg-card/80 backdrop-blur-sm border border-border/50 hover:shadow-glow transition-all duration-500">
                                <CardContent className="p-0">
                                    <div className="relative aspect-[4/3] bg-background">
                                        <a href={encodeURI(item.src)} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                                            <img
                                                src={encodeURI(item.src)}
                                                alt={item.altText}
                                                className="absolute inset-0 w-full h-full object-contain"
                                                loading="lazy"
                                            />
                                        </a>
                                        <div className="absolute bottom-2 right-2 opacity-30 pointer-events-none select-none">
                                            <LogoIcon className="w-10 h-10" />
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 text-sm text-muted-foreground">
                                        {item.caption}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
