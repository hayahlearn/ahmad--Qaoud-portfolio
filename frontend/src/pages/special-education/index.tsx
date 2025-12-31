import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import {
    Heart,
    Brain,
    Users,
    BarChart3,
    Sparkles,
    CheckCircle,
    ArrowLeft,
    ArrowRight,
    MessageCircle,
    Calendar,
    ClipboardCheck,
    Target,
    Zap,
    Award,
    Quote,
    Play,
    Send,
} from 'lucide-react';
import { useState } from 'react';

const SpecialEducation = () => {
    const { language, direction } = useLanguage();
    const Arrow = direction === 'rtl' ? ArrowLeft : ArrowRight;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        childAge: '',
        challenge: '',
    });

    const painPoints = [
        {
            icon: Brain,
            title: { ar: 'طفل التوحد', en: 'Autism Child' },
            description: {
                ar: 'يحتاج محتوى بصري مبسط وبيئة خالية من المشتتات',
                en: 'Needs simplified visual content and distraction-free environment',
            },
        },
        {
            icon: Target,
            title: { ar: 'عُسر القراءة (Dyslexia)', en: 'Dyslexia' },
            description: {
                ar: 'يحتاج تعليم سمعي وأدوات مساعدة للقراءة',
                en: 'Needs audio-based learning and reading assistance tools',
            },
        },
        {
            icon: Zap,
            title: { ar: 'فرط الحركة (ADHD)', en: 'ADHD' },
            description: {
                ar: 'يحتاج مقاطع قصيرة مع تفاعل عالٍ ومكافآت مستمرة',
                en: 'Needs short segments with high interaction and continuous rewards',
            },
        },
    ];

    const solutions = [
        {
            icon: Brain,
            title: { ar: 'التخصيص الكامل (AI Personalization)', en: 'Full AI Personalization' },
            description: {
                ar: 'الذكاء الاصطناعي يحلل سلوك الطفل ويعيد بناء المسار التعليمي كل أسبوع',
                en: 'AI analyzes child behavior and rebuilds the learning path weekly',
            },
            example: {
                ar: 'مثال: أحمد يخطئ في الضرب → النظام يعطيه 10 تمارين إضافية بطرق مختلفة',
                en: 'Example: Ahmed struggles with multiplication → System gives 10 extra exercises in different ways',
            },
        },
        {
            icon: Play,
            title: { ar: 'محتوى متعدد الوسائط', en: 'Multi-Media Content' },
            description: {
                ar: 'فيديوهات قصيرة (30 ثانية - 2 دقيقة)، رسوم متحركة، تعليق صوتي واضح',
                en: 'Short videos (30s-2min), animations, clear Arabic voice-over',
            },
            example: {
                ar: 'كل درس مصمم ليناسب طريقة تعلم الطفل الفريدة',
                en: 'Each lesson designed for the child\'s unique learning style',
            },
        },
        {
            icon: BarChart3,
            title: { ar: 'Dashboard للأهل والطبيب', en: 'Parent & Doctor Dashboard' },
            description: {
                ar: 'تقرير أسبوعي مفصّل، مخططات تطور الأداء، وصول الطبيب بموافقة الأهل',
                en: 'Detailed weekly reports, progress charts, doctor access with parent consent',
            },
            example: {
                ar: 'مثال: "أحمد حل 15 تمرين، تحسّن في الرياضيات 23%"',
                en: 'Example: "Ahmed solved 15 exercises, improved in math by 23%"',
            },
        },
        {
            icon: Award,
            title: { ar: 'تصحيح فوري + تشجيع', en: 'Instant Feedback + Encouragement' },
            description: {
                ar: 'عند الخطأ: رسائل تشجيعية إيجابية. عند النجاح: مكافآت رقمية',
                en: 'On error: positive encouragement. On success: digital rewards',
            },
            example: {
                ar: '"حاول مرة أخرى يا بطل! تقدر تعملها 💪" + نجوم وأوسمة',
                en: '"Try again champ! You can do it 💪" + stars and badges',
            },
        },
    ];

    const stats = [
        { value: '10,000+', label: { ar: 'طفل نشط', en: 'Active Children' } },
        { value: '12+', label: { ar: 'مؤسسة تعليمية متخصصة', en: 'Specialized Institutions' } },
        { value: '78%', label: { ar: 'تحسن في التركيز', en: 'Improvement in Focus' } },
        { value: '85%', label: { ar: 'معدل إكمال الدورات', en: 'Course Completion Rate' } },
    ];

    const testimonials = [
        {
            name: { ar: 'أم أحمد', en: "Ahmed's Mother" },
            location: { ar: 'القاهرة', en: 'Cairo' },
            quote: {
                ar: 'ابني عمره 7 سنوات ولديه توحد. كان يكره الدراسة، لكن بعد Hayah أصبح يطلب الدخول للمنصة كل يوم',
                en: 'My 7-year-old has autism. He hated studying, but after Hayah he asks to use the platform every day',
            },
        },
        {
            name: { ar: 'د. منى', en: 'Dr. Mona' },
            location: { ar: 'مركز تأهيل، الرياض', en: 'Rehab Center, Riyadh' },
            quote: {
                ar: 'كمعلمة في مركز تأهيل، Hayah وفّرت علينا 70% من الوقت في المتابعة الفردية',
                en: 'As a rehab center teacher, Hayah saved us 70% of individual follow-up time',
            },
        },
        {
            name: { ar: 'أب سارة', en: "Sarah's Father" },
            location: { ar: 'دبي', en: 'Dubai' },
            quote: {
                ar: 'ابنتي لديها Dyslexia، التقارير الأسبوعية ساعدتنا نفهم تقدمها وكيف نساعدها في البيت',
                en: 'My daughter has Dyslexia, the weekly reports helped us understand her progress and how to help at home',
            },
        },
    ];

    const steps = [
        {
            icon: Calendar,
            title: { ar: 'احجز عرضاً تجريبياً مجانياً', en: 'Book a Free Demo' },
            description: { ar: '15 دقيقة فقط', en: 'Just 15 minutes' },
        },
        {
            icon: ClipboardCheck,
            title: { ar: 'نقيّم احتياجات طفلك', en: 'We Assess Your Child\'s Needs' },
            description: { ar: 'مع مختص متخصص', en: 'With a specialist' },
        },
        {
            icon: Sparkles,
            title: { ar: 'نبدأ الرحلة التعليمية', en: 'Start the Learning Journey' },
            description: { ar: 'مسار مخصص لطفلك', en: 'Customized path for your child' },
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission - would integrate with Supabase
        console.log('Form submitted:', formData);
    };

    return (
        <Layout>
            <SEO
                title={language === 'ar' ? 'تعليم ذوي الهمم | Hayah Learn' : 'Special Education | Hayah Learn'}
                description={
                    language === 'ar'
                        ? 'تكنولوجيا تعليمية ذكية للأطفال من ذوي الهمم - كيف يغير الذكاء الاصطناعي حياة 10,000+ طفل'
                        : 'Smart educational technology for children with special needs - How AI is changing the lives of 10,000+ children'
                }
                url="/special-education"
            />

            {/* Hero Section */}
            <section className="py-24 lg:py-32 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-cyan-300/20 rounded-full blur-3xl" />
                </div>

                {/* Floating Particles */}
                <div className="absolute top-20 left-10 w-4 h-4 bg-white/30 rounded-full animate-float" />
                <div className="absolute top-40 right-20 w-3 h-3 bg-yellow-300/50 rounded-full animate-float" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-32 left-1/3 w-5 h-5 bg-white/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />

                <div className="container relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <AnimatedSection animation="fade-up">
                            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm mb-6">
                                <Heart className="w-4 h-4 me-2 fill-current" />
                                {language === 'ar' ? 'Hayah Learn للتعليم الخاص' : 'Hayah Learn Special Education'}
                            </Badge>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                                {language === 'ar'
                                    ? 'تكنولوجيا تعليمية ذكية للأطفال من ذوي الهمم'
                                    : 'Smart Educational Technology for Children with Special Needs'}
                            </h1>

                            <p className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed">
                                {language === 'ar'
                                    ? 'كيف يغير الذكاء الاصطناعي حياة 10,000+ طفل (3-18 سنة) في مصر والسعودية'
                                    : 'How AI is changing the lives of 10,000+ children (ages 3-18) in Egypt and Saudi Arabia'}
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <Button size="lg" className="bg-white text-emerald-700 hover:bg-white/90 gap-2 text-lg px-8 py-6">
                                    <Calendar className="h-5 w-5" />
                                    {language === 'ar' ? 'احجز عرضاً تجريبياً' : 'Book a Demo'}
                                </Button>
                                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 gap-2 text-lg px-8 py-6">
                                    <MessageCircle className="h-5 w-5" />
                                    {language === 'ar' ? 'تحدث مع مختص' : 'Talk to a Specialist'}
                                </Button>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Problem Section */}
            <section className="py-20 bg-background relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-80 h-80 bg-red-500/5 rounded-full blur-3xl" />
                </div>

                <div className="container relative z-10">
                    <AnimatedSection animation="fade-up" className="text-center mb-16">
                        <Badge variant="destructive" className="mb-4">
                            {language === 'ar' ? 'المشكلة' : 'The Problem'}
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {language === 'ar'
                                ? 'لماذا تفشل الأنظمة التقليدية مع الأطفال من ذوي الهمم؟'
                                : 'Why Do Traditional Systems Fail Children with Special Needs?'}
                        </h2>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {painPoints.map((point, index) => (
                            <AnimatedSection key={index} animation="fade-up" className="text-center">
                                <Card className="h-full border-red-200/50 bg-red-50/30 dark:bg-red-950/10 hover:shadow-lg transition-shadow">
                                    <CardContent className="p-8">
                                        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                            <point.icon className="h-8 w-8 text-red-600 dark:text-red-400" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-3">{point.title[language]}</h3>
                                        <p className="text-muted-foreground">{point.description[language]}</p>
                                    </CardContent>
                                </Card>
                            </AnimatedSection>
                        ))}
                    </div>

                    <AnimatedSection animation="fade-up" className="text-center">
                        <Card className="max-w-2xl mx-auto border-red-300/50 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
                            <CardContent className="p-8">
                                <p className="text-lg font-semibold text-red-700 dark:text-red-400">
                                    {language === 'ar'
                                        ? '⚠️ الأنظمة التقليدية تعامل الجميع بنفس الطريقة → 70% من الأطفال يفقدون الاهتمام خلال أسبوعين'
                                        : '⚠️ Traditional systems treat everyone the same → 70% of children lose interest within 2 weeks'}
                                </p>
                            </CardContent>
                        </Card>
                    </AnimatedSection>
                </div>
            </section>

            {/* Solution Section */}
            <section className="py-20 bg-secondary/30 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
                </div>

                <div className="container relative z-10">
                    <AnimatedSection animation="fade-up" className="text-center mb-16">
                        <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 mb-4">
                            <Sparkles className="w-4 h-4 me-2" />
                            {language === 'ar' ? 'الحل الذكي' : 'Smart Solution'}
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {language === 'ar'
                                ? 'كيف تعمل Hayah Learn مع الأطفال من ذوي الهمم؟'
                                : 'How Does Hayah Learn Work with Special Needs Children?'}
                        </h2>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-2 gap-8">
                        {solutions.map((solution, index) => (
                            <AnimatedSection key={index} animation={index % 2 === 0 ? 'fade-right' : 'fade-left'}>
                                <Card className="h-full hover:shadow-xl transition-all duration-300 border-emerald-200/50 group">
                                    <CardContent className="p-8">
                                        <div className="flex items-start gap-5 mb-4">
                                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                                <solution.icon className="h-7 w-7 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-2">{solution.title[language]}</h3>
                                                <p className="text-muted-foreground">{solution.description[language]}</p>
                                            </div>
                                        </div>
                                        <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-lg p-4 mt-4">
                                            <p className="text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                                                {solution.example[language]}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Results Section */}
            <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
                </div>

                <div className="container relative z-10">
                    <AnimatedSection animation="fade-up" className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {language === 'ar' ? 'النتائج الحقيقية' : 'Real Results'}
                        </h2>
                        <p className="text-xl text-white/80">
                            {language === 'ar' ? 'أرقام حقيقية من أرض الواقع' : 'Real numbers from the field'}
                        </p>
                    </AnimatedSection>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <AnimatedSection key={index} animation="fade-up" className="text-center">
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-colors">
                                    <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                                    <div className="text-white/80">{stat.label[language]}</div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-background relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
                </div>

                <div className="container relative z-10">
                    <AnimatedSection animation="fade-up" className="text-center mb-16">
                        <Badge className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30 mb-4">
                            <Users className="w-4 h-4 me-2" />
                            {language === 'ar' ? 'شهادات الأهل والمعلمين' : 'Parent & Teacher Testimonials'}
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold">
                            {language === 'ar' ? 'ماذا يقول أولياء الأمور؟' : 'What Do Parents Say?'}
                        </h2>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <AnimatedSection key={index} animation="fade-up">
                                <Card className="h-full hover:shadow-lg transition-shadow border-amber-200/30">
                                    <CardContent className="p-8">
                                        <Quote className="h-10 w-10 text-amber-500/30 mb-4" />
                                        <p className="text-lg mb-6 leading-relaxed italic">
                                            "{testimonial.quote[language]}"
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold">
                                                {testimonial.name[language].charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-semibold">{testimonial.name[language]}</div>
                                                <div className="text-sm text-muted-foreground">{testimonial.location[language]}</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* How to Start Section */}
            <section className="py-20 bg-secondary/30 relative overflow-hidden">
                <div className="container relative z-10">
                    <AnimatedSection animation="fade-up" className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {language === 'ar' ? 'كيف تبدأ؟' : 'How to Get Started?'}
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            {language === 'ar' ? '3 خطوات بسيطة' : '3 Simple Steps'}
                        </p>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {steps.map((step, index) => (
                            <AnimatedSection key={index} animation="fade-up">
                                <div className="text-center">
                                    <div className="relative inline-block mb-6">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto">
                                            <step.icon className="h-10 w-10 text-white" />
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{step.title[language]}</h3>
                                    <p className="text-muted-foreground">{step.description[language]}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <AnimatedSection animation="fade-up">
                        <Card className="max-w-2xl mx-auto border-emerald-200/50">
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-bold text-center mb-6">
                                    {language === 'ar' ? 'تواصل معنا الآن' : 'Contact Us Now'}
                                </h3>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <Input
                                            placeholder={language === 'ar' ? 'الاسم' : 'Name'}
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                        <Input
                                            type="email"
                                            placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <Input
                                            placeholder={language === 'ar' ? 'عمر الطفل' : "Child's Age"}
                                            value={formData.childAge}
                                            onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                                        />
                                        <Input
                                            placeholder={language === 'ar' ? 'نوع التحدي (توحد، ADHD، إلخ)' : 'Type of Challenge'}
                                            value={formData.challenge}
                                            onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 gap-2">
                                        <Send className="h-4 w-4" />
                                        {language === 'ar' ? 'أرسل طلبك' : 'Submit Request'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </AnimatedSection>
                </div>
            </section>

            {/* Institutional CTA */}
            <section className="py-16 bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <AnimatedSection animation="fade-up">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                {language === 'ar'
                                    ? 'هل مؤسستك تخدم الأطفال من ذوي الهمم؟'
                                    : 'Does Your Institution Serve Children with Special Needs?'}
                            </h2>
                            <p className="text-xl text-primary-foreground/80 mb-8">
                                {language === 'ar'
                                    ? 'تواصل معنا لحلول مؤسسية مخصصة'
                                    : 'Contact us for customized institutional solutions'}
                            </p>
                            <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 gap-2">
                                <Link to="/contact">
                                    {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                                    <Arrow className="h-5 w-5" />
                                </Link>
                            </Button>
                        </AnimatedSection>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default SpecialEducation;
