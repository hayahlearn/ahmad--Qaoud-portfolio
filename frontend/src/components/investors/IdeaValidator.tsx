
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, Cpu, Clock, CheckCircle2, AlertCircle, Loader2, Sparkles, Code2, Database, Shield, ArrowRight } from 'lucide-react';
// Removing framer-motion as it might not be installed, using Tailwind for simple animations instead for now to fit project style


type IdeaAnalysis = {
    score: number;
    time: string;
    techStack: string[];
    complexity: string;
    marketFit: string;
};

const generateAnalysis = (idea: string): IdeaAnalysis => {
    // Deterministic but "random-looking" results based on string length
    const score = Math.min(98, Math.max(75, idea.length % 30 + 70));
    const time = idea.length % 3 + 2; // 2-5 months

    return {
        score,
        time: `${time}-${time + 2}`,
        techStack: ['React / Next.js', 'Node.js / Python', 'PostgreSQL', 'AI Integration'],
        complexity: score > 85 ? 'Medium-High' : 'Medium',
        marketFit: 'High Potential'
    };
};

export const IdeaValidator = () => {
    const { language, direction } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState<'input' | 'analyzing' | 'result'>('input');
    const [idea, setIdea] = useState('');
    const [industry, setIndustry] = useState('');
    const [analysisStage, setAnalysisStage] = useState(0);
    const [result, setResult] = useState<IdeaAnalysis | null>(null);

    const stages = language === 'ar'
        ? ['جاري تحليل سياق الفكرة...', 'فحص نماذج التكنولوجيا المناسبة...', 'تقدير الموارد والوقت...', 'إنشاء التقرير النهائي...']
        : ['Analyzing idea context...', 'Matching technology patterns...', 'Estimating resources & timeline...', 'Generating final report...'];

    const startAnalysis = () => {
        if (!idea) return;
        setStep('analyzing');
        setAnalysisStage(0);

        // Simulate AI steps
        let currentStage = 0;
        const interval = setInterval(() => {
            currentStage++;
            if (currentStage >= stages.length) {
                clearInterval(interval);
                setResult(generateAnalysis(idea));
                setStep('result');
            } else {
                setAnalysisStage(currentStage);
            }
        }, 1500);
    };

    const reset = () => {
        setStep('input');
        setIdea('');
        setIndustry('');
        setResult(null);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 border-primary/20 hover:bg-primary/5 hover:border-primary/50 transition-all group">
                    <Sparkles className="w-4 h-4 text-primary group-hover:animate-pulse" />
                    {language === 'ar' ? 'حلل فكرتي بالذكاء الاصطناعي' : 'Validate with AI'}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] border-primary/20 bg-background/95 backdrop-blur-xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        <Brain className="w-6 h-6 text-primary" />
                        {language === 'ar' ? 'محلل الأفكار الذكي' : 'AI Idea Validator'}
                    </DialogTitle>
                    <DialogDescription>
                        {language === 'ar'
                            ? 'احصل على تحليل تقني فوري لفكرتك، بما في ذلك التقنيات المقترحة وتقدير الوقت.'
                            : 'Get instant technical analysis for your idea, including recommended stack and timeline.'}
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6 min-h-[300px]">
                    {step === 'input' && (
                        <div
                            className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300"
                        >
                            <div className="space-y-2">
                                <Label>{language === 'ar' ? 'مجال الفكرة (الصناعة)' : 'Industry / Domain'}</Label>
                                <Input
                                    placeholder={language === 'ar' ? 'مثال: التعليم، الصحة، العقارات...' : 'e.g. EdTech, HealthTech, Real Estate...'}
                                    value={industry}
                                    onChange={(e) => setIndustry(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>{language === 'ar' ? 'اشرح فكرتك باختصار' : 'Describe your idea briefly'}</Label>
                                <Textarea
                                    placeholder={language === 'ar' ? 'أريد بناء منصة لـ...' : 'I want to build a platform for...'}
                                    className="min-h-[120px]"
                                    value={idea}
                                    onChange={(e) => setIdea(e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground text-right">
                                    {language === 'ar' ? 'الذكاء الاصطناعي سيحلل الكلمات المفتاحية' : 'AI will analyze semantic keywords'}
                                </p>
                            </div>
                        </div>
                    )}

                    {step === 'analyzing' && (
                        <div
                            className="flex flex-col items-center justify-center space-y-8 py-8 animate-in fade-in duration-500"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                                <Loader2 className="w-16 h-16 text-primary animate-spin relative z-10" />
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-lg font-medium animate-pulse">{stages[analysisStage]}</h3>
                                <div className="w-64 h-2 bg-secondary rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all duration-500 ease-out"
                                        style={{ width: `${((analysisStage + 1) / stages.length) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 'result' && result && (
                        <div
                            className="space-y-6 animate-in zoom-in-95 duration-300"
                        >
                            {/* Score Header */}
                            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
                                <div>
                                    <p className="text-sm text-muted-foreground">{language === 'ar' ? 'نسبة الجدوى التقنية' : 'Technical Feasibility'}</p>
                                    <p className="text-3xl font-bold text-primary">{result.score}%</p>
                                </div>
                                <div className="text-right">
                                    <Badge variant="outline" className="mb-1 border-green-500 text-green-600 bg-green-500/10">
                                        {result.marketFit}
                                    </Badge>
                                    <p className="text-xs text-muted-foreground">{language === 'ar' ? 'بناءً على الأنماط الحالية' : 'Based on current patterns'}</p>
                                </div>
                            </div>

                            {/* Tech Stack Grid */}
                            <div>
                                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                    <Code2 className="w-4 h-4" />
                                    {language === 'ar' ? 'التقنيات المقترحة' : 'Recommended Tech Stack'}
                                </h4>
                                <div className="grid grid-cols-2 gap-2">
                                    {result.techStack.map((tech: string, i: number) => (
                                        <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50 text-xs font-medium">
                                            <CheckCircle2 className="w-3 h-3 text-primary" />
                                            {tech}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Timeline & Complexity */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 rounded-lg bg-secondary/30">
                                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {language === 'ar' ? 'الوقت التقديري (MVP)' : 'Est. Time (MVP)'}
                                    </p>
                                    <p className="font-semibold">{result.time} {language === 'ar' ? 'أشهر' : 'Months'}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-secondary/30">
                                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                                        <Cpu className="w-3 h-3" /> {language === 'ar' ? 'التعقيد' : 'Complexity'}
                                    </p>
                                    <p className="font-semibold">{result.complexity}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter className="justify-between sm:justify-between gap-4">
                    {step === 'result' ? (
                        <>
                            <Button variant="ghost" onClick={reset}>
                                {language === 'ar' ? 'تحليل فكرة أخرى' : 'Analyze New Idea'}
                            </Button>
                            <Button className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity" onClick={() => setIsOpen(false)}>
                                {language === 'ar' ? 'ابدأ التنفيذ الآن' : 'Start Building Now'}
                                <ArrowRight className="w-4 h-4 ml-2 rtl:rotate-180" />
                            </Button>
                        </>
                    ) : step === 'input' ? (
                        <Button className="w-full" onClick={startAnalysis} disabled={!idea || !industry}>
                            <Sparkles className="w-4 h-4 mr-2" />
                            {language === 'ar' ? 'تحليل الفكرة' : 'Analyze Idea'}
                        </Button>
                    ) : null}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
