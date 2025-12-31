import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function CaseStudiesHero() {
    const { language } = useLanguage();

    return (
        <section className="relative py-24 overflow-hidden bg-gradient-to-b from-background to-background/50">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
            </div>

            <div className="container relative z-10">
                <AnimatedSection animation="fade-up" className="text-center max-w-4xl mx-auto">
                    <Badge className="mb-6 bg-gold/10 text-gold border-gold/20 px-4 py-1.5 text-sm backdrop-blur-sm">
                        <Star className="w-3.5 h-3.5 mr-2" />
                        {language === 'ar' ? 'نتائج ملموسة' : 'Tangible Results'}
                    </Badge>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                        {language === 'ar' ? 'تحول رقمي' : 'Digital Transformation'}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-500 mx-3 px-1">
                            {language === 'ar' ? ' يصنع الفرق ' : ' That Matters '}
                        </span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        {language === 'ar'
                            ? 'لا نقدم مجرد برمجيات، بل حلولاً تعالج مشاكل عملك الحقيقية وتزيد من ربحيتك.'
                            : 'We don\'t just utilize software; we build solutions that solve real business problems and increase profitability.'}
                    </p>
                </AnimatedSection>
            </div>
        </section>
    );
}
