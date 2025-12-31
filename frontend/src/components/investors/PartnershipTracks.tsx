
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, TrendingUp, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { IdeaValidator } from './IdeaValidator';

interface PartnershipTracksProps {
    onSelectTrack: (track: 'visionary' | 'catalyst') => void;
}

export const PartnershipTracks = ({ onSelectTrack }: PartnershipTracksProps) => {
    const { language, direction } = useLanguage();
    const Arrow = direction === 'rtl' ? ArrowLeft : ArrowRight;

    const tracks = [
        {
            id: 'visionary',
            title: { ar: 'شريك الفكرة (The Visionary)', en: 'The Visionary Partner' },
            subtitle: { ar: 'للمبتكرين والخبراء', en: 'For Innovators & Experts' },
            description: {
                ar: 'لديك فكرة مبتكرة وخبرة عميقة في مجالك، لكن ينقصك الفريق التقني لتنفيذها؟ نحن الشريك التقني المؤسس لك.',
                en: 'You have a disruptive idea and deep domain expertise, but lack the tech team? We become your Technical Co-founder.'
            },
            icon: Lightbulb,
            features: [
                { ar: 'نطور المنتج بالكامل (MVP to Scale)', en: 'Full Product Development (MVP to Scale)' },
                { ar: 'نتحمل المخاطر التقنية', en: 'We carry the technical risk' },
                { ar: 'حصة في الشركة مقابل التطوير', en: 'Equity for Tech Model' },
                { ar: 'دعم استراتيجي في إدارة المنتج', en: 'Strategic Product Management Support' }
            ],
            cta: { ar: 'قدّم فكرتك', en: 'Submit Your Idea' },
            color: 'bg-accent/10 text-accent border-accent/20'
        },
        {
            id: 'catalyst',
            title: { ar: 'شريك المال (The Catalyst)', en: 'The Capital Partner' },
            subtitle: { ar: 'للمستثمرين ورؤوس الأموال', en: 'For Investors & VCs' },
            description: {
                ar: 'تبحث عن فرص استثمارية مدروسة في شركات SaaS ذات نمو عالٍ وعائد مثبت؟ استثمر في محفظة مشاريعنا.',
                en: 'Looking for vetted investment opportunities in high-growth SaaS ventures? Invest in our portfolio.'
            },
            icon: TrendingUp,
            features: [
                { ar: 'فرص استثمار في مراحل مختلفة (Pre-seed to Series A)', en: 'Opportunities from Pre-seed to Series A' },
                { ar: 'تقارير أداء وشفافية مالية', en: 'Performance Reports & Financial Transparency' },
                { ar: 'عائد مرتفع (5x - 10x)', en: 'High Potential ROI (5x - 10x)' },
                { ar: 'وصول مباشر لفريق التأسيس', en: 'Direct Access to Founding Teams' }
            ],
            cta: { ar: 'تواصل للاستثمار', en: 'Contact for Investment' },
            color: 'bg-primary/10 text-primary border-primary/20'
        }
    ];

    return (
        <section className="py-20">
            <div className="container">
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {tracks.map((track, index) => (
                        <AnimatedSection key={track.id} animation="fade-up" delay={index * 100}>
                            <Card className={`h-full border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${track.color.replace('bg-', 'hover:border-')}`}>
                                <CardHeader>
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${track.color}`}>
                                        <track.icon className="h-7 w-7" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-semibold opacity-80 uppercase tracking-wider">{track.subtitle[language]}</p>
                                        <CardTitle className="text-2xl lg:text-3xl">{track.title[language]}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <CardDescription className="text-base leading-relaxed">
                                        {track.description[language]}
                                    </CardDescription>

                                    <ul className="space-y-3">
                                        {track.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-foreground/80">
                                                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                                <span>{feature[language]}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        className="w-full gap-2 text-lg h-12"
                                        variant={track.id === 'visionary' ? 'default' : 'outline'}
                                        onClick={() => onSelectTrack(track.id as 'visionary' | 'catalyst')}
                                    >
                                        {track.cta[language]}
                                        <Arrow className="h-5 w-5" />
                                    </Button>

                                    {track.id === 'visionary' && (
                                        <div className="w-full flex justify-center pt-2">
                                            <IdeaValidator />
                                        </div>
                                    )}
                                </CardFooter>
                            </Card>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
};
