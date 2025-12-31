import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';

export function ContactMapSection() {
    const { language } = useLanguage();

    return (
        <section className="py-24 bg-secondary/30 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="container relative z-10">
                <AnimatedSection animation="fade-up" className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-medium">
                            {language === 'ar' ? 'موقعنا' : 'Our Location'}
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="relative inline-block">
                            {language === 'ar' ? 'موقعنا' : 'Our Location'}
                            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-gold to-primary rounded-full" />
                        </span>
                    </h2>

                    <p className="text-xl text-muted-foreground">
                        {language === 'ar'
                            ? 'نعمل من مصر ونخدم العملاء في جميع أنحاء الوطن العربي'
                            : 'Based in Egypt, serving clients across the Arab world'}
                    </p>
                </AnimatedSection>

                <AnimatedSection animation="zoom-in" delay={0.2} className="max-w-5xl mx-auto">
                    <Card className="group border-0 bg-card/80 backdrop-blur-sm hover:shadow-glow transition-all duration-500 overflow-hidden">
                        <div className="relative w-full h-[400px] lg:h-[500px]">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.5401619463696!2d31.235711615114!3d30.044419981879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840c0c4b4a4d3%3A0x4b4a4d3a4b4a4d3a!2sCairo%2C%20Egypt!5e0!3m2!1sen!2s!4v1699999999999!5m2!1sen!2s"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={language === 'ar' ? 'موقعنا على الخريطة' : 'Our location on the map'}
                                className="absolute inset-0"
                            />
                        </div>
                        <CardContent className="p-6 bg-card">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <MapPin className="h-5 w-5 text-primary" />
                                    </div>
                                    <span className="text-foreground font-medium text-lg">
                                        {language === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt'}
                                    </span>
                                </div>
                                <a
                                    href="https://www.google.com/maps/place/Cairo,+Egypt"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-navy dark:from-primary dark:to-primary/80 text-primary-foreground rounded-lg font-semibold hover:from-primary hover:to-primary transition-all duration-300 hover:scale-105"
                                >
                                    <MapPin className="h-4 w-4" />
                                    {language === 'ar' ? 'افتح في خرائط جوجل' : 'Open in Google Maps'}
                                </a>
                            </div>
                        </CardContent>
                    </Card>
                </AnimatedSection>
            </div>
        </section>
    );
}
