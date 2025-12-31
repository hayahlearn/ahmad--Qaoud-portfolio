import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import { CASE_STUDY_TESTIMONIALS } from '@/data/testimonials';

export function ProjectTestimonialsSection() {
    const { language, direction } = useLanguage();
    const Arrow = direction === 'rtl' ? ArrowLeft : ArrowRight;

    return (
        <section className="py-24 relative bg-background border-t border-border/50">
            <div className="container relative z-10">
                <AnimatedSection animation="fade-up" className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        {language === 'ar' ? 'شركاء النجاح يتحدثون' : 'Success Stories'}
                    </h2>
                    <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                        {language === 'ar'
                            ? 'مقتطفات من دراسات حالة واقعية لشركات حققت قفزات نوعية معنا'
                            : 'Excerpts from real case studies of companies achieving quantum leaps with us'}
                    </p>
                </AnimatedSection>

                <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {CASE_STUDY_TESTIMONIALS.slice(0, 3).map((story, i) => (
                        <Card key={i} className="bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-colors p-6 flex flex-col h-full">
                            <div className="mb-4 flex justify-between items-start">
                                <Badge variant="outline" className={`
                        ${story.industryColor === 'blue' ? 'text-blue-500 bg-blue-500/10 border-blue-500/20' : ''}
                        ${story.industryColor === 'emerald' ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' : ''}
                        ${story.industryColor === 'pink' ? 'text-pink-500 bg-pink-500/10 border-pink-500/20' : ''}
                    `}>
                                    {story.industry[language]}
                                </Badge>
                            </div>
                            <p className="text-muted-foreground italic mb-6 leading-relaxed flex-1">"{story.content[language]}"</p>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                    {story.initials}
                                </div>
                                <div>
                                    <div className="font-bold text-sm">{story.name[language]}</div>
                                    <div className="text-xs text-muted-foreground">{story.role[language]}</div>
                                </div>
                            </div>

                            <Link to="/case-studies" className="w-full mt-auto">
                                <Button variant="outline" className="w-full gap-2 hover:bg-primary hover:text-white transition-colors">
                                    {language === 'ar' ? 'اقرأ الحالة' : 'Read Case'}
                                    <Arrow className="w-4 h-4" />
                                </Button>
                            </Link>
                        </Card>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link to="/case-studies">
                        <Button size="lg" className="rounded-full px-8">
                            {language === 'ar' ? 'عرض كل قصص النجاح' : 'View All Success Stories'}
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
