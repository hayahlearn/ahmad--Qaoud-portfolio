import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, Zap, BarChart3, TrendingUp } from 'lucide-react';
import type { CaseStudy } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface CaseStudyCardProps {
    study: CaseStudy;
    onClick: () => void;
}

export function CaseStudyCard({ study, onClick }: CaseStudyCardProps) {
    const { language } = useLanguage();

    return (
        <Card
            className={`relative overflow-hidden border ${study.borderColor} bg-gradient-to-br ${study.bgColor} backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-${study.color}/10 transition-all duration-500 cursor-pointer group-hover:scale-[1.01]`}
            onClick={onClick}
        >

            <div className="grid lg:grid-cols-12 gap-0">

                {/* Content Side */}
                <div className="lg:col-span-7 p-8 md:p-10 relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${study.color} flex items-center justify-center text-white shadow-lg`}>
                            <study.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <Badge variant="outline" className="bg-background/50 backdrop-blur-md mb-1">
                                {study.industry[language]}
                            </Badge>
                            <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                {study.title[language]}
                            </h2>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <h4 className="flex items-center gap-2 text-sm font-semibold text-destructive mb-2">
                                <Target className="w-4 h-4" />
                                {language === 'ar' ? 'المشكلة (Before)' : 'The Challenge'}
                            </h4>
                            <p className="text-muted-foreground leading-relaxed">
                                "{study.challenge[language]}"
                            </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <h4 className="flex items-center gap-2 text-sm font-semibold text-primary mb-2">
                                <Zap className="w-4 h-4" />
                                {language === 'ar' ? 'الحل (After)' : 'The Solution'}
                            </h4>
                            <p className="text-foreground/90 leading-relaxed font-medium">
                                {study.solution[language]}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-2">
                        {study.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="bg-background/40 hover:bg-background/60">
                                {tech}
                            </Badge>
                        ))}
                    </div>

                    <div className="mt-6">
                        <Button
                            variant="ghost"
                            className="group/btn gap-2 p-0 hover:bg-transparent hover:text-primary"
                            onClick={(e) => {
                                e.stopPropagation();
                                onClick();
                            }}
                        >
                            {language === 'ar' ? 'عرض تفاصيل الرحلة' : 'View Deep Dive'}
                            <BarChart3 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Results Side */}
                <div className={`lg:col-span-5 relative overflow-hidden bg-gradient-to-br ${study.color} p-8 md:p-10 flex flex-col justify-center text-white`}>
                    {/* Abstract Patterns */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full border-4 border-white/30 animate-pulse" style={{ animationDuration: '8s' }} />
                        <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full border-4 border-white/30 animate-pulse" style={{ animationDuration: '10s' }} />
                    </div>

                    <div className="relative z-10 space-y-6">
                        <h3 className="text-lg font-semibold flex items-center gap-2 opacity-90">
                            <TrendingUp className="w-5 h-5" />
                            {language === 'ar' ? 'النتائج المحققة' : 'Key Results'}
                        </h3>

                        <div className="space-y-4">
                            {study.results.map((result, i) => (
                                <div key={i} className="flex items-center gap-4 bg-white/10 p-3 rounded-xl backdrop-blur-md border border-white/10 group-hover:bg-white/20 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                        <result.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">{result.value}</p>
                                        <p className="text-xs opacity-80">{result.metric[language]}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-white/20">
                            <div className="flex justify-between items-center text-sm opacity-90">
                                <span>{language === 'ar' ? 'مدة التنفيذ:' : 'Duration:'}</span>
                                <span className="font-bold bg-white/20 px-2 py-0.5 rounded">{study.duration[language]}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Card>
    );
}
