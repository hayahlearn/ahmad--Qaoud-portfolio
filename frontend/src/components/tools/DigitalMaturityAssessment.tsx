import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, Trophy, ArrowRight, ArrowLeft, Mail, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { n8nService } from '@/lib/api/n8nService';

const QUESTIONS = [
    {
        id: 1,
        question: { ar: 'هل تستخدم شركتك أدوات الذكاء الاصطناعي حالياً؟', en: 'Does your company currently use AI tools?' },
        options: [
            { score: 0, text: { ar: 'لا، نعتمد على العمل اليدوي كلياً', en: 'No, purely manual work' } },
            { score: 1, text: { ar: 'بشكل محدود (مثل ChatGPT الفردي)', en: 'Limited (e.g. individual ChatGPT)' } },
            { score: 2, text: { ar: 'نعم، لدينا أدوات مدمجة في العمليات', en: 'Yes, tools integrated into workflows' } }
        ]
    },
    {
        id: 2,
        question: { ar: 'كيف يتم تخزين بيانات العملاء؟', en: 'How is customer data stored?' },
        options: [
            { score: 0, text: { ar: 'ملفات Excel متفرقة / ورقي', en: 'Scattered Excel / Paper' } },
            { score: 1, text: { ar: 'نظام CRM لكن غير متصل', en: 'CRM but disconnected' } },
            { score: 2, text: { ar: 'قاعدة بيانات مركزية موحدة', en: 'Centralized unified database' } }
        ]
    },
    {
        id: 3,
        question: { ar: 'ما مدى أتمتة العمليات المتكررة؟', en: 'How automated are repetitive tasks?' },
        options: [
            { score: 0, text: { ar: 'كل شيء يدوي', en: 'Everything is manual' } },
            { score: 1, text: { ar: 'بعض السكربتات البسيطة', en: 'Some simple scripts' } },
            { score: 2, text: { ar: 'لدينا Workflows تعمل تلقائياً', en: 'We have automated workflows' } }
        ]
    },
    {
        id: 4,
        question: { ar: 'هل هناك استراتيجية للأمن السيبراني؟', en: 'Is there a cybersecurity strategy?' },
        options: [
            { score: 0, text: { ar: 'لا يوجد', en: 'None' } },
            { score: 1, text: { ar: 'برامج حماية أساسية (Antivirus)', en: 'Basic Antivirus' } },
            { score: 2, text: { ar: 'نطبق Zero Trust و RLS', en: 'We apply Zero Trust & RLS' } }
        ]
    },
    {
        id: 5,
        question: { ar: 'كيف تتخذ القرارات الاستراتيجية؟', en: 'How are strategic decisions made?' },
        options: [
            { score: 0, text: { ar: 'بالحدس والخبرة الشخصية', en: 'Intuition & Experience' } },
            { score: 1, text: { ar: 'تقارير شهرية متأخرة', en: 'Monthly delayed reports' } },
            { score: 2, text: { ar: 'لوحات بيانات Live Dashboard', en: 'Live Data Dashboards' } }
        ]
    }
];

const DigitalMaturityAssessment = () => {
    const { language, direction } = useLanguage();
    const isRTL = direction === 'rtl';

    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [finished, setFinished] = useState(false);

    const handleOptionSelect = (score: number) => {
        const newAnswers = [...answers];
        newAnswers[currentStep] = score;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentStep < QUESTIONS.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            setFinished(true);
        }
    };

    const calculateResults = () => {
        const totalScore = answers.reduce((a, b) => a + b, 0);
        const maxScore = QUESTIONS.length * 2;
        const percentage = Math.round((totalScore / maxScore) * 100);

        let level = { ar: '', en: '', color: '', feedback: { ar: '', en: '' } };

        if (percentage < 40) {
            level = {
                ar: 'المستكشف الرقمي', en: 'Digital Explorer', color: 'text-orange-500',
                feedback: { ar: 'أنت في بداية الطريق. لديك فرصة هائلة لتحسين الكفاءة بأبسط أدوات الأتمتة.', en: 'You are at the start. Huge opportunity to improve efficiency with basic automation.' }
            };
        } else if (percentage < 80) {
            level = {
                ar: 'المتبني الطموح', en: 'Ambitious Adopter', color: 'text-blue-500',
                feedback: { ar: 'قطعت شوطاً جيداً! التركيز الآن يجب أن يكون على ربط الأنظمة ببعضها (Integration).', en: 'Great progress! Focus now should be on system integration.' }
            };
        } else {
            level = {
                ar: 'القائد الرقمي', en: 'Digital Leader', color: 'text-green-500',
                feedback: { ar: 'مستوى مبهر! أنت جاهز لتبني تقنيات الذكاء الاصطناعي السيادي والوكلاء المستقلين.', en: 'Impressive! You are ready for Sovereign AI and Autonomous Agents.' }
            };
        }

        return { percentage, level };
    };

    const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

    if (finished) {
        const result = calculateResults();

        const [email, setEmail] = useState('');
        const [isSending, setIsSending] = useState(false);
        const [emailSent, setEmailSent] = useState(false);

        const handleSendReport = async () => {
            if (!email) return;
            setIsSending(true);
            try {
                await n8nService.submitAssessment(result.percentage, result.level[language], {
                    answers: answers,
                    date: new Date().toISOString()
                });
                setEmailSent(true);
            } catch (error) {
                console.error("Failed to send report", error);
                alert(language === 'ar' ? 'حدث خطأ أثناء إرسال التقرير' : 'Error sending report');
            } finally {
                setIsSending(false);
            }
        };

        return (
            <Card className="w-full shadow-lg border-primary/20 bg-gradient-to-br from-background to-secondary/5">
                <CardContent className="p-8 text-center space-y-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Trophy className="w-10 h-10 text-primary" />
                    </div>

                    <h2 className="text-3xl font-bold">
                        {language === 'ar' ? 'نتيجتك: ' : 'Your Score: '}
                        <span className={result.level.color}>{result.percentage}%</span>
                    </h2>

                    <div>
                        <h3 className="text-xl font-bold mb-2">{result.level[language]}</h3>
                        <p className="text-muted-foreground text-lg">{result.level.feedback[language]}</p>
                    </div>

                    {/* Email Report Section */}
                    <div className="max-w-sm mx-auto pt-4 border-t border-border/50 mt-6">
                        {!emailSent ? (
                            <div className="space-y-3">
                                <p className="text-sm font-medium">
                                    {language === 'ar' ? 'احصل على التقرير التفصيلي عبر البريد الإلكتروني' : 'Get detailed report via email'}
                                </p>
                                <div className="flex gap-2">
                                    <Input
                                        type="email"
                                        placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'Your Email'}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-background"
                                    />
                                    <Button onClick={handleSendReport} disabled={!email || isSending} size="icon">
                                        {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-green-500/10 text-green-600 p-3 rounded-lg flex items-center justify-center gap-2">
                                <CheckCircle2 className="w-5 h-5" />
                                <span className="text-sm font-medium">{language === 'ar' ? 'تم إرسال التقرير بنجاح!' : 'Report sent successfully!'}</span>
                            </div>
                        )}
                    </div>

                    <div className="pt-2">
                        <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => window.location.href = '/book'}>
                            {language === 'ar' ? 'احجز استشارة مجانية' : 'Book Free Consultation'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full shadow-lg border-primary/20">
            <CardHeader>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                        {language === 'ar' ? `سؤال ${currentStep + 1} من ${QUESTIONS.length}` : `Question ${currentStep + 1} of ${QUESTIONS.length}`}
                    </span>
                    <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <CardTitle className="mt-6 text-xl">
                    {QUESTIONS[currentStep].question[language]}
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
                {QUESTIONS[currentStep].options.map((opt, idx) => (
                    <div
                        key={idx}
                        onClick={() => handleOptionSelect(opt.score)}
                        className={cn(
                            "p-4 rounded-lg border-2 cursor-pointer transition-all flex items-center gap-3 hover:bg-secondary/10",
                            answers[currentStep] === opt.score
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                        )}
                    >
                        {answers[currentStep] === opt.score
                            ? <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                            : <Circle className="w-5 h-5 text-muted-foreground shrink-0" />
                        }
                        <span className="font-medium">{opt.text[language]}</span>
                    </div>
                ))}
            </CardContent>

            <CardFooter className="flex justify-between pt-4">
                <Button
                    variant="ghost"
                    onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                    disabled={currentStep === 0}
                >
                    {language === 'ar' ? 'السابق' : 'Back'}
                </Button>
                <Button
                    onClick={handleNext}
                    disabled={answers[currentStep] === undefined}
                    className="gap-2"
                >
                    {language === 'ar' ? (currentStep === QUESTIONS.length - 1 ? 'إنهاء' : 'التالي') : (currentStep === QUESTIONS.length - 1 ? 'Finish' : 'Next')}
                    {!isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default DigitalMaturityAssessment;
