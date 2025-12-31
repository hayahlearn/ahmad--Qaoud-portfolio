
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, ArrowRight, ArrowLeft, BarChart, Shield, Zap, Database, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

const QUESTIONS = [
    {
        id: 'infrastructure',
        question: { ar: 'كيف تصف البنية التحتية التقنية الحالية؟', en: 'How would you describe your current tech infrastructure?' },
        options: [
            { score: 25, label: { ar: 'نعتمد بالكامل على الحلول السحابية (Cloud Native)', en: 'Fully Cloud Native' } },
            { score: 15, label: { ar: 'مزيج بين السحابة والخوادم المحلية (Hybrid)', en: 'Hybrid (Cloud + On-premise)' } },
            { score: 5, label: { ar: 'خوادم محلية تقليدية (On-premise)', en: 'Traditional On-premise' } },
            { score: 0, label: { ar: 'لا يوجد بنية تحتية واضحة (الاعتماد على الورق/Excel)', en: 'No clear infrastructure (Paper/Excel)' } }
        ]
    },
    {
        id: 'data',
        question: { ar: 'كيف تستفيد من البيانات في اتخاذ القرار؟', en: 'How do you leverage data for decision making?' },
        options: [
            { score: 25, label: { ar: 'تحليلات تنبؤية فورية (Predictive AI Analytics)', en: 'Real-time Predictive AI Analytics' } },
            { score: 15, label: { ar: 'لوحات تحكم تفاعلية (BI Dashboards)', en: 'Interactive BI Dashboards' } },
            { score: 5, label: { ar: 'تقارير يدوية شهرية', en: 'Manual Monthly Reports' } },
            { score: 0, label: { ar: 'لا نجمع بيانات منظمة', en: 'We don\'t utilize structured data' } }
        ]
    },
    {
        id: 'process',
        question: { ar: 'ما مدى أتمتة العمليات لديك؟', en: 'To what extent are your processes automated?' },
        options: [
            { score: 25, label: { ar: 'أتمتة شاملة سير العمل (End-to-End Automation)', en: 'End-to-End Workflow Automation' } },
            { score: 15, label: { ar: 'أتمتة بعض المهام المتكررة', en: 'Some repetitive tasks are automated' } },
            { score: 5, label: { ar: 'الاعتماد بشكل كبير على التدخل البشري', en: 'Heavy reliance on manual intervention' } },
            { score: 0, label: { ar: 'عمليات يدوية بالكامل', en: 'Processes are entirely manual' } }
        ]
    },
    {
        id: 'security',
        question: { ar: 'ما هو مستوى الأمان الرقمي المطبق؟', en: 'What is your current cybersecurity posture?' },
        options: [
            { score: 25, label: { ar: 'حماية متقدمة استباقية (Zero Trust Architecture)', en: 'Proactive Advanced Protection (Zero Trust)' } },
            { score: 15, label: { ar: 'إجراءات أمان قياسية (Firewalls, VPNs)', en: 'Standard Security Measures' } },
            { score: 5, label: { ar: 'حماية أساسية فقط (Antivirus)', en: 'Basic Protection Only' } },
            { score: 0, label: { ar: 'لا يوجد خطة أمان واضحة', en: 'No clear security plan' } }
        ]
    }
];

export const MaturityAssessment = () => {
    const { language, direction } = useLanguage();
    const Arrow = direction === 'rtl' ? ArrowLeft : ArrowRight;

    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [isFinished, setIsFinished] = useState(false);

    const calculateTotalScore = () => Object.values(answers).reduce((a, b) => a + b, 0);

    const handleOptionSelect = (score: number) => {
        setAnswers(prev => ({ ...prev, [QUESTIONS[currentStep].id]: score }));
    };

    const nextStep = () => {
        if (currentStep < QUESTIONS.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            setIsFinished(true);
        }
    };

    const reset = () => {
        setAnswers({});
        setCurrentStep(0);
        setIsFinished(false);
    };

    const getRecommendation = (score: number) => {
        if (score >= 80) return {
            title: { ar: 'رائد رقمي (Digital Leader)', en: 'Digital Leader' },
            desc: { ar: 'لديك أساس قوي جداً. الخطوة التالية هي دمج الذكاء الاصطناعي التوليدي لتعزيز الابتكار.', en: 'Strong foundation. Next step: Integrate Generative AI for innovation.' },
            service: { title: { ar: 'خدمات الذكاء الاصطناعي المتقدمة', en: 'Advanced AI Services' }, link: '/services' }
        };
        if (score >= 50) return {
            title: { ar: 'منافس متطور (Evolving Challenger)', en: 'Evolving Challenger' },
            desc: { ar: 'تقوم بعمل جيد، لكن هناك فجوات في تكامل الأنظمة والاستفادة القصوى من البيانات.', en: 'Doing well, but gaps exist in system integration and data leverage.' },
            service: { title: { ar: 'أتمتة وتكامل الأنظمة', en: 'Automation & Integration' }, link: '/services' }
        };
        return {
            title: { ar: 'مستكشف رقمي (Digital Explorer)', en: 'Digital Explorer' },
            desc: { ar: 'بداية جيدة، لكنك بحاجة لبناء بنية تحتية صلبة لتجنب الديون التقنية مستقبلاً.', en: 'Good start, but you need a solid infrastructure to avoid future tech debt.' },
            service: { title: { ar: 'تحليل الفجوة الرقمية', en: 'Digital Gap Analysis' }, link: '/book' } // Link to booking directly
        };
    };

    if (isFinished) {
        const totalScore = calculateTotalScore();
        const recommendation = getRecommendation(totalScore);

        return (
            <Card className="border-0 shadow-xl bg-gradient-to-br from-background to-secondary/20">
                <CardHeader className="text-center pb-2">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                        <BarChart className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-2xl font-bold">{language === 'ar' ? 'نتيجة نضجك الرقمي' : 'Your Digital Maturity Score'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-center">
                    <div className="relative pt-4">
                        <span className="text-5xl font-extrabold text-primary">{totalScore}</span>
                        <span className="text-xl text-muted-foreground">/100</span>
                    </div>

                    <div className="bg-background/50 p-6 rounded-xl border border-border/50">
                        <h3 className="text-xl font-semibold mb-2 text-foreground">{recommendation.title[language]}</h3>
                        <p className="text-muted-foreground">{recommendation.desc[language]}</p>
                    </div>

                    <div className="bg-primary/5 p-4 rounded-lg flex items-center justify-between gap-4 text-left rtl:text-right">
                        <div>
                            <p className="text-xs text-muted-foreground uppercase font-semibold">{language === 'ar' ? 'الخدمة المقترحة لك' : 'Recommended Service'}</p>
                            <p className="font-bold text-primary">{recommendation.service.title[language]}</p>
                        </div>
                        <Button asChild size="sm">
                            <Link to={recommendation.service.link}>
                                {language === 'ar' ? 'استكشف' : 'Explore'}
                                <Arrow className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </div>
                </CardContent>
                <CardFooter className="justify-center pt-2">
                    <Button variant="ghost" size="sm" onClick={reset} className="gap-2">
                        <RotateCcw className="w-4 h-4" />
                        {language === 'ar' ? 'إعادة التقييم' : 'Retake Assessment'}
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    const currentQ = QUESTIONS[currentStep];

    return (
        <Card className="border-border/50 shadow-lg min-h-[450px] flex flex-col">
            <CardHeader>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-semibold text-muted-foreground">
                            {language === 'ar' ? `سؤل ${currentStep + 1} من ${QUESTIONS.length}` : `Question ${currentStep + 1} of ${QUESTIONS.length}`}
                        </span>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{Math.round(((currentStep) / QUESTIONS.length) * 100)}%</span>
                </div>
                <Progress value={((currentStep) / QUESTIONS.length) * 100} className="h-2" />
                <CardTitle className="text-xl leading-relaxed pt-6 min-h-[80px]">
                    {currentQ.question[language]}
                </CardTitle>
            </CardHeader>

            <CardContent className="flex-1">
                <RadioGroup onValueChange={(v) => handleOptionSelect(parseInt(v))} className="space-y-3">
                    {currentQ.options.map((opt, idx) => (
                        <div key={idx} className="relative">
                            <RadioGroupItem value={opt.score.toString()} id={`opt-${idx}`} className="peer sr-only" />
                            <Label
                                htmlFor={`opt-${idx}`}
                                className={`flex items-center p-4 rounded-lg border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all ${answers[currentQ.id] === opt.score ? 'border-primary bg-primary/5' : ''}`}
                            >
                                <div className={`w-4 h-4 rounded-full border border-primary mr-3 rtl:ml-3 shrink-0 flex items-center justify-center ${answers[currentQ.id] === opt.score ? 'bg-primary' : 'bg-transparent'}`}>
                                    {answers[currentQ.id] === opt.score && <div className="w-2 h-2 rounded-full bg-white" />}
                                </div>
                                <span className="font-medium">{opt.label[language]}</span>
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </CardContent>

            <CardFooter className="justify-end border-t border-border/50 pt-6">
                <Button onClick={nextStep} disabled={answers[currentQ.id] === undefined} className="gap-2">
                    {currentStep === QUESTIONS.length - 1
                        ? (language === 'ar' ? 'عرض النتيجة' : 'Show Result')
                        : (language === 'ar' ? 'التالي' : 'Next')
                    }
                    <Arrow className="w-4 h-4" />
                </Button>
            </CardFooter>
        </Card>
    );
};
