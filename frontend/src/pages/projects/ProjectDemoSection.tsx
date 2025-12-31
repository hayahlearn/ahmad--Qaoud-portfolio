import { Card, CardContent } from '@/components/ui/card';
import { Play } from 'lucide-react';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import { demos } from './data';

export function ProjectDemoSection() {
    const { language } = useLanguage();

    return (
        <section className="py-24 relative bg-muted/30 border-y border-border/50">
            <div className="container relative z-10">
                <AnimatedSection animation="fade-up" className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        {language === 'ar' ? 'شاهد الأنظمة وهي تعمل' : 'Watch Systems in Action'}
                    </h2>
                    <div className="divider-gold mx-auto" />
                    <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
                        {language === 'ar' ? 'أمثلة حية من واقع الإنتاج' : 'Live production examples'}
                    </p>
                </AnimatedSection>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {demos.map((demo, index) => (
                        <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                            <Card className="group relative overflow-hidden border-2 border-border/50 hover:border-primary/50 transition-all duration-300 shadow-elevated hover:shadow-2xl">
                                <div className={`aspect-video ${demo.thumbnail} relative flex items-center justify-center bg-gradient-to-br from-background to-muted group-hover:from-background/80 group-hover:to-muted/80 transition-all`}>
                                    <div className="w-20 h-20 rounded-full bg-background/30 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer border border-white/10">
                                        <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:bg-red-500 transition-colors">
                                            <Play className="w-7 h-7 text-white fill-current ml-1" />
                                        </div>
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                                        {language === 'ar' ? demo.title.ar : demo.title.en}
                                    </h3>
                                </CardContent>
                            </Card>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
