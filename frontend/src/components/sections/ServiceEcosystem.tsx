import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { Rocket, Cpu, Workflow, Layers, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function ServiceEcosystem() {
    const { t, language } = useLanguage();

    const services = [
        { key: 'revenue_engineering', icon: Rocket, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
        { key: 'sovereign_ai', icon: Cpu, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
        { key: 'orchestration', icon: Workflow, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
        { key: 'authority_platform', icon: Layers, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsla(var(--primary)/0.05),transparent_70%)]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/5 rounded-full animate-spin-slow" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-primary/10 rounded-full animate-spin-reverse-slower" />
            </div>

            <div className="container relative z-10">
                <AnimatedSection animation="fade-up" className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        <span className="text-gradient-gold">
                            {language === 'ar' ? 'منظومة النجاح الرقمي' : 'Digital Success Ecosystem'}
                        </span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {language === 'ar'
                            ? 'كيف تتكامل خدماتنا لتخلق قيمة مركبة لشركتك'
                            : 'How our services integrate to create compound value for your business'}
                    </p>
                </AnimatedSection>

                <div className="relative max-w-5xl mx-auto h-[600px] md:h-[700px] flex items-center justify-center">
                    {/* Core Node */}
                    <div className="relative z-20 w-40 h-40 md:w-56 md:h-56 rounded-full bg-card border-4 border-gold/20 shadow-[0_0_60px_-15px_hsla(var(--gold)/0.3)] flex flex-col items-center justify-center text-center p-4 animate-pulse-glow">
                        <div className="absolute inset-0 rounded-full border border-gold/50 animate-ping-slow opacity-20" />
                        <RefreshCw className="w-10 h-10 text-gold mb-2 animate-spin-slow" />
                        <h3 className="font-bold text-lg md:text-xl text-foreground">
                            {language === 'ar' ? 'التحول الرقمي' : 'Digital Transformation'}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                            {language === 'ar' ? 'محرك النمو' : 'Growth Engine'}
                        </p>
                    </div>

                    {/* Service Nodes */}
                    {services.map((service, index) => {
                        // Position calculations for circular layout
                        // We want them at corners: Top-Left, Top-Right, Bottom-Right, Bottom-Left
                        // Angles: 225, 315, 45, 135 (visually)
                        const positions = [
                            'top-0 left-0 md:top-10 md:left-20',     // Top Left
                            'top-0 right-0 md:top-10 md:right-20',   // Top Right
                            'bottom-0 left-0 md:bottom-10 md:left-20',  // Bottom Left
                            'bottom-0 right-0 md:bottom-10 md:right-20', // Bottom Right
                        ];

                        const Icon = service.icon;

                        return (
                            <AnimatedSection
                                key={service.key}
                                animation="zoom-in"
                                delay={index * 200}
                                className={`absolute ${positions[index]} z-10 w-[160px] md:w-[280px]`}
                            >
                                {/* Connecting Line (Visual only, CSS borders) */}
                                <div className={`hidden md:block absolute top-1/2 left-1/2 -z-10 w-[200px] h-[2px] bg-gradient-to-r from-border to-transparent ${index === 0 ? 'rotate-[30deg] origin-right translate-x-[50px] translate-y-[80px]' :
                                    index === 1 ? 'rotate-[150deg] origin-left -translate-x-[250px] translate-y-[80px]' :
                                        index === 2 ? 'rotate-[-30deg] origin-right translate-x-[50px] -translate-y-[80px]' :
                                            'rotate-[-150deg] origin-left -translate-x-[250px] -translate-y-[80px]'
                                    }`} />

                                <Card className={`text-center p-6 border-2 hover:scale-105 transition-transform duration-300 ${service.border} bg-card/80 backdrop-blur-sm`}>
                                    <div className={`w-12 h-12 mx-auto rounded-xl ${service.bg} ${service.color} flex items-center justify-center mb-4`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-bold text-sm md:text-lg mb-2">{t(`services.${service.key}.title`)}</h4>
                                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                                        {t(`services.${service.key}.desc`)}
                                    </p>
                                </Card>
                            </AnimatedSection>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
