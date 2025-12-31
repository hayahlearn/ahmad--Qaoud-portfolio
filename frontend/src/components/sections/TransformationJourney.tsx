import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { Search, Lightbulb, Cog, Rocket, ArrowRight, ArrowLeft } from 'lucide-react';

export function TransformationJourney() {
    const { t, language, direction } = useLanguage();
    const Arrow = direction === 'rtl' ? ArrowLeft : ArrowRight;

    const steps = [
        {
            icon: Search,
            title: { ar: 'الاستكشاف والتحليل', en: 'Discovery & Analysis' },
            desc: { ar: 'نغوص في تفاصيل عملك لتحديد الفجوات وفرص النمو.', en: 'We dive deep into your business to identify gaps and growth opportunities.' },
            color: 'text-blue-500',
            bg: 'bg-blue-500/10'
        },
        {
            icon: Lightbulb,
            title: { ar: 'تصميم الاستراتيجية', en: 'Strategy Design' },
            desc: { ar: 'نرسم خارطة طريق مخصصة لحلول تدوم وتتوسع معك.', en: 'We craft a tailored roadmap for scalable and sustainable solutions.' },
            color: 'text-amber-500',
            bg: 'bg-amber-500/10'
        },
        {
            icon: Cog,
            title: { ar: 'التطوير والتنفيذ', en: 'Development & Build' },
            desc: { ar: 'نبني الأنظمة بأحدث التقنيات مع التركيز على الأتمتة.', en: 'We build systems with cutting-edge tech focusing on automation.' },
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10'
        },
        {
            icon: Rocket,
            title: { ar: 'الإطلاق والتوسع', en: 'Launch & Scale' },
            desc: { ar: 'نطلق الحل وندرب فريقك، ثم نراقب الأداء للتحسين المستمر.', en: 'We launch, train your team, and monitor performance for continuous improvement.' },
            color: 'text-purple-500',
            bg: 'bg-purple-500/10'
        }
    ];

    return (
        <section className="py-24 bg-secondary/20 relative overflow-hidden">
            <div className="container relative z-10">
                <AnimatedSection animation="fade-up" className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        <span className="text-gradient-gold">
                            {language === 'ar' ? 'رحلة التحول الرقمي' : 'Transformation Journey'}
                        </span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        {language === 'ar'
                            ? 'كيف نحول التحديات إلى فرص في 4 خطوات مدروسة'
                            : 'How we turn challenges into opportunities in 4 calculated steps'}
                    </p>
                </AnimatedSection>

                <div className="relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2 z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <AnimatedSection
                                    key={index}
                                    animation="fade-up"
                                    delay={index * 150}
                                    className="relative z-10 group"
                                >
                                    <div className="bg-card border border-border/50 p-8 rounded-2xl hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col items-center text-center relative overflow-hidden">
                                        {/* Step Number Background */}
                                        <div className="absolute -right-4 -top-6 text-[120px] font-bold text-foreground/5 pointer-events-none select-none">
                                            {index + 1}
                                        </div>

                                        <div className={`w-16 h-16 rounded-2xl ${step.bg} ${step.color} flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className="w-8 h-8" />
                                        </div>

                                        <h3 className="text-xl font-bold mb-3">{step.title[language]}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {step.desc[language]}
                                        </p>

                                        {/* Arrow Indicator (Desktop) */}
                                        {index < steps.length - 1 && (
                                            <div className="hidden lg:block absolute -right-10 top-1/2 -translate-y-1/2 z-20 text-muted-foreground/30 rtl:right-auto rtl:-left-10 rtl:rotate-180">
                                                <Arrow className="w-8 h-8" />
                                            </div>
                                        )}
                                    </div>
                                </AnimatedSection>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
