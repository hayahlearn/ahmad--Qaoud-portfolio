import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function CaseStudiesCTA() {
    const { language } = useLanguage();

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary z-0" />
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 z-0" />
            <div className="container relative z-10 text-center">
                <AnimatedSection animation="zoom-in" className="max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                        {language === 'ar' ? 'مشروعك التالي قد يكون هنا' : 'Your Next Project Could Be Here'}
                    </h2>
                    <p className="text-xl text-primary-foreground/80 mb-8">
                        {language === 'ar'
                            ? 'دعنا نحول تحدياتك التشغيلية إلى قصص نجاح وأرقام قياسية.'
                            : 'Let\'s turn your operational challenges into success stories and record-breaking numbers.'}
                    </p>
                    <Button
                        asChild
                        size="lg"
                        variant="secondary"
                        className="gap-2 shadow-xl hover:shadow-2xl transition-all scale-105"
                    >
                        <Link to="/book">
                            <Calendar className="w-5 h-5" />
                            {language === 'ar' ? 'احجز استشارة مجانية' : 'Book Free Consultation'}
                        </Link>
                    </Button>
                </AnimatedSection>
            </div>
        </section>
    );
}
