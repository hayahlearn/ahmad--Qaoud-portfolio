import { CheckCircle2, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { WhyChooseMeCardProps } from './types';

export function WhyChooseMeCard({ whyChooseMe, language }: WhyChooseMeCardProps) {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <div
            ref={ref}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                transition: `opacity 0.6s ease-out, transform 0.6s ease-out`,
                transitionDelay: '0.3s',
            }}
        >
            <div className="group relative bg-gradient-to-br from-primary via-navy to-navy-dark dark:from-navy dark:via-navy-dark dark:to-black rounded-2xl p-8 text-primary-foreground dark:text-white overflow-hidden hover:shadow-glow transition-all duration-500">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--gold)/0.1),transparent_50%)]" />
                <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-full blur-3xl" />

                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <div className="relative">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/20 text-gold mb-6">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-medium">
                            {language === 'ar' ? 'لماذا تختارني؟' : 'Why Choose Me?'}
                        </span>
                    </div>

                    <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
                        {language === 'ar' ? 'مميزات العمل معي' : 'Benefits of Working With Me'}
                    </h3>

                    <ul className="space-y-4">
                        {whyChooseMe.map((item, index) => (
                            <li key={index} className="flex items-start gap-3 group/item">
                                <div className="relative mt-0.5">
                                    <div className="absolute inset-0 bg-gold/30 rounded-full blur-md opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                                    <CheckCircle2 className="relative h-5 w-5 text-gold shrink-0" />
                                </div>
                                <span className="text-primary-foreground/90 leading-relaxed">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
