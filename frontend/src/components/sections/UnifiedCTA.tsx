import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface UnifiedCTAProps {
    title: ReactNode;
    description: string;
    badge?: string;
    buttonText: string;
    buttonLink: string;
    variant?: 'default' | 'simple';
}

export function UnifiedCTA({
    title,
    description,
    badge,
    buttonText,
    buttonLink,
    variant = 'default'
}: UnifiedCTAProps) {
    const { direction } = useLanguage();
    const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

    if (variant === 'simple') {
        return (
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary dark:from-primary/20 dark:to-primary/10" />
                <div className="container relative z-10 text-center">
                    <AnimatedSection animation="fade-up">
                        <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground dark:text-white mb-8">
                            {title}
                        </h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button asChild size="lg" variant="secondary" className="gap-2 shadow-lg h-14 px-8 text-lg rounded-full bg-background text-foreground hover:bg-background/90">
                                <Link to={buttonLink}>
                                    <Sparkles className="w-5 h-5 text-gold" />
                                    {buttonText}
                                </Link>
                            </Button>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        );
    }

    return (
        <section className="py-28 bg-gradient-to-br from-primary via-navy to-navy-dark dark:from-navy dark:via-navy-dark dark:to-black text-white relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,hsl(var(--gold)/0.15),transparent_50%)]" />
                <div className="absolute top-20 left-1/4 w-80 h-80 bg-gold/10 rounded-full blur-3xl animate-pulse-glow" />
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
            </div>

            {/* Floating Particles */}
            <div className="absolute top-10 left-10 w-3 h-3 bg-gold/40 rounded-full animate-float" />
            <div className="absolute top-40 right-20 w-4 h-4 bg-primary-foreground/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-gold/50 rounded-full animate-float" style={{ animationDelay: '2s' }} />

            <div className="container relative z-10 text-center">
                <AnimatedSection animation="fade-up">
                    {badge && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 text-gold mb-8 backdrop-blur-sm border border-gold/30 animate-bounce-subtle">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm font-medium">
                                {badge}
                            </span>
                        </div>
                    )}

                    <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                        {title}
                    </div>

                    <p className="text-xl text-primary-foreground/80 dark:text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                        {description}
                    </p>

                    <div className="relative group inline-block">
                        <div className="absolute -inset-1 bg-gradient-to-r from-gold via-gold-light to-gold rounded-lg blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                        <Button size="lg" className="relative bg-gold text-navy hover:bg-gold-light gap-2 px-10 py-7 text-lg shadow-2xl group-hover:scale-105 transition-transform duration-300" asChild>
                            <Link to={buttonLink}>
                                {buttonText}
                                <ArrowIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                        </Button>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
