import { Button } from '@/components/ui/button';
import { Star, ArrowRight, ArrowLeft } from 'lucide-react';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getSuccessStory } from './data';

export function AboutSuccessStorySection() {
    const { language, direction } = useLanguage();
    const successStory = getSuccessStory(language);
    const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

    return (
        <section className="py-24 bg-gradient-to-br from-primary via-navy to-navy-dark dark:from-navy dark:via-navy-dark dark:to-black text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,hsl(var(--gold)/0.1),transparent_60%)]" />

            <div className="container relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <AnimatedSection animation="fade-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 text-gold mb-6 backdrop-blur-sm border border-gold/30">
                            <Star className="w-4 h-4" />
                            <span className="text-sm font-medium">{successStory.subtitle}</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                            {successStory.title}
                        </h2>

                        <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10">
                            {successStory.content}
                        </p>

                        <Button size="lg" className="bg-gold text-navy hover:bg-gold-light gap-2" asChild>
                            <Link to="/projects">
                                {language === 'ar' ? 'اكتشف منظومة حياة' : 'Discover Hayah Platform'}
                                <ArrowIcon className="w-4 h-4" />
                            </Link>
                        </Button>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
