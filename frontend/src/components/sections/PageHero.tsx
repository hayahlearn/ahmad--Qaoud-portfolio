import { ReactNode } from 'react';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PageHeroProps {
    title: ReactNode;
    subtitle?: string;
    description?: ReactNode;
    badge?: string | ReactNode;
    visual?: ReactNode;
    actions?: ReactNode;
    className?: string;
    visualWidth?: 'standard' | 'wide'; // 'wide' for chat/large visuals
}

export function PageHero({
    title,
    subtitle,
    description,
    badge,
    visual,
    actions,
    className = "",
    visualWidth = 'standard'
}: PageHeroProps) {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    return (
        <section className={`py-28 bg-gradient-to-br from-primary via-navy to-navy-dark dark:from-navy dark:via-navy-dark dark:to-black text-white relative overflow-hidden min-h-[85vh] flex items-center ${className}`}>
            {/* Animated Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,hsl(var(--gold)/0.15),transparent_50%)]" />
                <div className="absolute top-20 right-20 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse-glow" />
                <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary-foreground/5 rounded-full blur-3xl" />
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'linear-gradient(to right, hsl(var(--primary-foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary-foreground)) 1px, transparent 1px)',
                backgroundSize: '60px 60px'
            }} />

            {/* Floating Particles */}
            <div className="absolute top-20 left-10 w-3 h-3 bg-gold/40 rounded-full animate-float" style={{ animationDelay: '0s' }} />
            <div className="absolute top-40 right-40 w-4 h-4 bg-primary-foreground/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-gold/50 rounded-full animate-float" style={{ animationDelay: '2s' }} />

            <div className="container relative z-10">
                <div className={`grid lg:grid-cols-12 gap-12 items-center`}>
                    {/* Content Side */}
                    <div className={`${visualWidth === 'wide' ? 'lg:col-span-5' : 'lg:col-span-6'} space-y-8`}>
                        <AnimatedSection animation={isRTL ? "fade-left" : "fade-right"}>
                            {/* Badge */}
                            {badge && (
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 text-gold mb-8 backdrop-blur-sm border border-gold/30">
                                    {typeof badge === 'string' ? (
                                        <>
                                            <Sparkles className="w-4 h-4" />
                                            <span className="text-sm font-medium">{badge}</span>
                                        </>
                                    ) : (
                                        badge
                                    )}
                                </div>
                            )}

                            {/* Title */}
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                                {title}
                            </h1>

                            {/* Subtitle / Description */}
                            {subtitle && (
                                <p className="text-2xl text-white/90 mb-4 font-medium">
                                    {subtitle}
                                </p>
                            )}
                            {description && (
                                <div className="text-lg text-white/80 mb-10 leading-relaxed max-w-xl">
                                    {description}
                                </div>
                            )}

                            {/* Actions */}
                            {actions && (
                                <div className="flex flex-wrap gap-4 pt-2">
                                    {actions}
                                </div>
                            )}
                        </AnimatedSection>
                    </div>

                    {/* Visual Side */}
                    {visual && (
                        <div className={`${visualWidth === 'wide' ? 'lg:col-span-7' : 'lg:col-span-6'}`}>
                            <AnimatedSection animation="zoom-in" delay={0.2} className="flex justify-center relative z-20">
                                {visual}
                            </AnimatedSection>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
