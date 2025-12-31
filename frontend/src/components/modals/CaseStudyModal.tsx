import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import {
    CheckCircle2,
    Clock,
    Target,
    TrendingUp,
    Quote,
    ArrowRight,
    ArrowLeft,
    Calendar,
    Zap
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { CaseStudy, CaseStudyChartEntry, CaseStudyTimelineStep } from "@/types";

interface CaseStudyModalProps {
    isOpen: boolean;
    onClose: () => void;
    study: CaseStudy | null;
}

export function CaseStudyModal({ isOpen, onClose, study }: CaseStudyModalProps) {
    const { language, direction } = useLanguage();
    const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

    if (!study) return null;

    const chartData: CaseStudyChartEntry[] = study.chartData || [
        { name: language === 'ar' ? 'قبل' : 'Before', value: 30, color: '#94a3b8' },
        { name: language === 'ar' ? 'بعد' : 'After', value: 95, color: '#f59e0b' },
    ];

    const timeline: CaseStudyTimelineStep[] = study.timeline || [
        {
            title: { ar: 'تحليل الوضع الحالي', en: 'Discovery Phase' },
            desc: { ar: 'فهم التحديات وتحديد نقاط الألم', en: 'Understanding challenges and pain points' },
            date: 'Week 1'
        },
        {
            title: { ar: 'بناء الاستراتيجية', en: 'Strategy Design' },
            desc: { ar: 'تصميم الحل التقني واختيار الأدوات', en: 'Designing tech solution and tool selection' },
            date: 'Week 2'
        },
        {
            title: { ar: 'التطوير والتنفيذ', en: 'Development' },
            desc: { ar: 'بناء النظام وربط الـ APIs', en: 'System build and API integration' },
            date: 'Week 3-6'
        },
        {
            title: { ar: 'الإطلاق والتدريب', en: 'Launch & Training' },
            desc: { ar: 'تفعيل النظام وتدريب الفريق', en: 'System go-live and team training' },
            date: 'Week 8'
        },
    ];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl h-[90vh] p-0 overflow-hidden bg-background/95 backdrop-blur-xl border-white/10">
                <ScrollArea className="h-full">
                    <div className="relative">
                        {/* Header Background */}
                        <div className={`h-48 w-full bg-gradient-to-r ${study.color} opacity-10 absolute top-0 left-0 z-0`} />

                        <div className="relative z-10 p-6 md:p-8">
                            <DialogHeader className="mb-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <Badge variant="outline" className="bg-background/80 backdrop-blur">
                                        {study.industry[language]}
                                    </Badge>
                                    <Badge variant="secondary" className="bg-gold/10 text-gold-dark border-gold/20">
                                        Top Rated
                                    </Badge>
                                </div>
                                <DialogTitle className="text-3xl md:text-4xl font-bold leading-tight">
                                    {study.title[language]}
                                </DialogTitle>
                                <DialogDescription className="text-lg text-muted-foreground mt-2">
                                    {study.client[language]}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid lg:grid-cols-3 gap-8">
                                {/* Main Content */}
                                <div className="lg:col-span-2 space-y-8">
                                    {/* Challenge & Solution */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="p-4 rounded-2xl bg-destructive/5 border border-destructive/10">
                                            <h4 className="flex items-center gap-2 font-semibold text-destructive mb-2">
                                                <Target className="w-4 h-4" />
                                                {language === 'ar' ? 'التحدي' : 'The Challenge'}
                                            </h4>
                                            <p className="text-sm text-foreground/80 leading-relaxed">
                                                {study.challenge[language]}
                                            </p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-green-500/5 border border-green-500/10">
                                            <h4 className="flex items-center gap-2 font-semibold text-green-600 mb-2">
                                                <Zap className="w-4 h-4" />
                                                {language === 'ar' ? 'الحل' : 'The Solution'}
                                            </h4>
                                            <p className="text-sm text-foreground/80 leading-relaxed">
                                                {study.solution[language]}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Impact Chart */}
                                    <div className="p-6 rounded-2xl border bg-card/50">
                                        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                                            <TrendingUp className="w-5 h-5 text-primary" />
                                            {language === 'ar' ? 'تحليل التأثير' : 'Impact Analysis'}
                                        </h3>
                                        <div className="h-[250px] w-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                                                    <XAxis
                                                        dataKey="name"
                                                        stroke="#888888"
                                                        fontSize={12}
                                                        tickLine={false}
                                                        axisLine={false}
                                                    />
                                                    <YAxis
                                                        stroke="#888888"
                                                        fontSize={12}
                                                        tickLine={false}
                                                        axisLine={false}
                                                        tickFormatter={(value) => `${value}`}
                                                    />
                                        <Tooltip
                                            cursor={{ fill: 'transparent' }}
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--background))',
                                                border: '1px solid hsl(var(--border))',
                                                borderRadius: '8px'
                                            }}
                                        />
                                        <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={60}>
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-center text-xs text-muted-foreground mt-4">
                                {language === 'ar'
                                    ? 'مقارنة مقياس الأداء الرئيسي (KPI) قبل وبعد التنفيذ'
                                    : 'Key Performance Indicator (KPI) comparison before and after implementation'}
                            </p>
                        </div>

                        {/* Timeline */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-primary" />
                                {language === 'ar' ? 'رحلة التنفيذ' : 'Implementation Journey'}
                            </h3>
                            <div className="relative border-s border-border/50 ms-3 space-y-8">
                                {timeline.map((step, i) => (
                                    <div key={i} className="ms-6 relative">
                                        <span className="absolute -start-[31px] flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 ring-4 ring-background">
                                            <CheckCircle2 className="h-3 w-3 text-primary" />
                                        </span>
                                        <h4 className="flex items-center mb-0.5 font-semibold leading-none">
                                            {step.title[language]}
                                        </h4>
                                        <span className="text-xs text-muted-foreground block mb-2">{step.date}</span>
                                        <p className="text-sm text-muted-foreground">
                                            {step.desc[language]}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Key Stats */}
                        <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10">
                            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
                                {language === 'ar' ? 'أبرز الأرقام' : 'Key Figures'}
                            </h3>
                            <div className="space-y-4">
                                {study.results.map((res, i) => (
                                    <div key={i} className="flex justify-between items-center pb-3 border-b border-border/50 last:border-0 last:pb-0">
                                        <span className="text-sm opacity-80">{res.metric[language]}</span>
                                        <span className="font-bold text-lg text-primary">{res.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Testimonial */}
                        {study.testimonial && (
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-gold/10 to-transparent border border-gold/20 relative">
                                <Quote className="absolute top-4 start-4 w-8 h-8 text-gold-light/20" />
                                <p className="relative z-10 italic text-sm text-foreground/90 leading-relaxed mb-4 pt-4">
                                    "{study.testimonial.content[language]}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center font-bold text-gold text-xs">
                                        {('author' in study.testimonial ? study.testimonial.author.charAt(0) : study.testimonial.name[language].charAt(0))}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold opacity-90">
                                            {('author' in study.testimonial ? study.testimonial.author : study.testimonial.name[language])}
                                        </p>
                                        <p className="text-xs opacity-60">{study.testimonial.role[language]}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <Button className="w-full gap-2" size="lg" asChild>
                            <a href="/book">
                                {language === 'ar' ? 'ابدأ مشروعك الآن' : 'Start Your Project Now'}
                                <ArrowIcon className="w-4 h-4" />
                            </a>
                        </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
