import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { benefits } from './data';

export function BookingHeroSection() {
    const { language } = useLanguage();

    return (
        <section className="relative py-24 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(currentColor 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="container relative z-10">
                <AnimatedSection animation="fade-up" className="text-center max-w-4xl mx-auto space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
                        <Sparkles className="w-4 h-4 text-gold animate-pulse" />
                        <span className="font-medium text-sm">
                            {language === 'ar' ? 'استشارة استراتيجية مجانية لفترة محدودة' : 'Limited Time Free Strategic Consultation'}
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                        <span className="text-gradient-gold block mb-2">
                            {language === 'ar' ? 'احجز استشارتك المجانية' : 'Book Your Free Consultation'}
                        </span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        {language === 'ar'
                            ? 'جلسة استراتيجية لمدة 30 دقيقة لتحليل وضعك الرقمي الحالي واكتشاف فرص النمو الضائعة.'
                            : 'A 30-minute strategic session to analyze your current digital state and discover missed growth opportunities.'}
                    </p>

                    {/* Benefits Icons */}
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center gap-2 bg-background/50 border border-border/50 px-4 py-2 rounded-full backdrop-blur-sm hover:border-primary/30 transition-colors">
                                <benefit.icon className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium">{benefit.title[language]}</span>
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
