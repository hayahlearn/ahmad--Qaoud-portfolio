import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Cpu, Workflow, Rocket, Layers, ArrowLeft, ArrowRight, CheckCircle, Sparkles, HelpCircle, Zap, Shield, Target, Smartphone, CheckCircle2, Heart } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SEO } from '@/components/SEO';
import { AnimatedSection, useScrollAnimation } from '@/hooks/useScrollAnimation';
import { MaturityAssessment } from '@/components/services/MaturityAssessment';
import { Service, FAQ } from '@/types';
import { Language } from '@/contexts/LanguageContext';
import { TechStackMarquee } from '@/components/sections/TechStackMarquee';
import { TransformationJourney } from '@/components/sections/TransformationJourney';
import { ServiceEcosystem } from '@/components/sections/ServiceEcosystem';
import { Badge } from '@/components/ui/badge';

const Services = () => {
  const { t, direction, language } = useLanguage();
  const Arrow = direction === 'rtl' ? ArrowLeft : ArrowRight;

  const services: Service[] = [
    {
      key: 'revenue_engineering',
      icon: Rocket,
      color: 'from-blue-500 to-blue-600',
      features: language === 'ar'
        ? ['تحويل مراكز التكلفة لأرباح', 'خفض التكاليف التشغيلية 40%', 'تصميم دورة العائد الرقمي', 'هندسة النمو المستدام']
        : ['Turn Cost Centers to Profit', '40% Operational Cost Reduction', 'Digital Revenue Cycle Design', 'Sustainable Growth Engineering'],
      useCases: language === 'ar'
        ? ['تقليل الوقت المستغرق في العمليات اليدوية بنسبة 90%', 'تحسين دورة الكاش (Cash Flow) عبر الأتمتة']
        : ['Reducing manual process time by 90%', 'Improving cash flow cycle via automation']
    },
    {
      key: 'sovereign_ai',
      icon: Cpu,
      color: 'from-purple-500 to-purple-600',
      features: language === 'ar'
        ? ['بنية تحتية سيادية للبيانات', 'نماذج ذكاء اصطناعي خاصة', 'تشفير عسكري للمعلومات', 'ملكية كاملة للأصول الرقمية']
        : ['Sovereign Data Infrastructure', 'Private AI Models', 'Military-Grade Encryption', 'Full Digital Asset Ownership'],
      useCases: language === 'ar'
        ? ['بناء Chatbot داخلي لا يسرب البيانات للشركات', 'تحليل المستندات القانونية آلياً']
        : ['Building internal Chatbot with zero data leakage', 'Automated legal document analysis']
    },
    {
      key: 'orchestration',
      icon: Workflow,
      color: 'from-emerald-500 to-emerald-600',
      features: language === 'ar'
        ? ['قوى عاملة رقمية 24/7', 'أنظمة تعافي ذاتي (Failover)', 'رفع الكفاءة 200%', 'دمج الوكلاء الأذكياء']
        : ['24/7 Digital Workforce', 'Self-Healing Failover Systems', '200% Efficiency Boost', 'Intelligent Agent Integration'],
      useCases: language === 'ar'
        ? ['ربط المبيعات مع المخزون والمحاسبة تلقائياً', 'نظام خدمة عملاء ذكي يعمل بلا توقف']
        : ['Auto-syncing sales, inventory, and accounting', 'Non-stop intelligent customer service system']
    },
    {
      key: 'authority_platform',
      icon: Layers,
      color: 'from-amber-500 to-amber-600',
      features: language === 'ar'
        ? ['درع الحماية من الاحتكار', 'بنية Multi-tenancy معقدة', 'أنظمة SaaS عالية التوسع', 'تطوير الأصول الاستراتيجية']
        : ['Vendor Lock-in Shield', 'Complex Multi-tenancy Arch', 'High-Scale SaaS Systems', 'Strategic Asset Development'],
      useCases: language === 'ar'
        ? ['إطلاق منصة SaaS قابلة للتوسع لمليون مستخدم', 'بناء نظام إدارة موارد (ERP) مخصص']
        : ['Launching scalable SaaS platform for 1M users', 'Building custom ERP system']
    },
    {
      key: 'special_education',
      icon: Heart,
      color: 'from-rose-500 to-pink-600',
      features: language === 'ar'
        ? ['تعليم مخصص لذوي الهمم', 'Dashboard للأهل والطبيب', 'AI تكيفي حسب الاحتياج', 'تقارير سلوكية أسبوعية']
        : ['Personalized Special Education', 'Parent & Doctor Dashboard', 'Adaptive AI Learning', 'Weekly Behavioral Reports'],
      useCases: language === 'ar'
        ? ['أطفال التوحد والـ ADHD', 'مراكز التأهيل والتعليم الخاص']
        : ['Children with Autism & ADHD', 'Rehabilitation & Special Education Centers']
    },
  ];

  const faqs: FAQ[] = [
    {
      question: {
        ar: 'كم تستغرق عملية التحول الرقمي؟',
        en: 'How long does digital transformation take?'
      },
      answer: {
        ar: 'تعتمد المدة على حجم المشروع وتعقيده. المشاريع الصغيرة قد تستغرق 2-4 أسابيع، بينما المشاريع الكبيرة قد تحتاج 3-6 أشهر. نقوم بتقديم جدول زمني مفصل بعد تحليل متطلباتك.',
        en: 'Duration depends on project size and complexity. Small projects may take 2-4 weeks, while larger ones may need 3-6 months. We provide a detailed timeline after analyzing your requirements.'
      }
    },
    {
      question: {
        ar: 'هل تقدمون دعم فني بعد إتمام المشروع؟',
        en: 'Do you provide technical support after project completion?'
      },
      answer: {
        ar: 'نعم، نقدم دعم فني شامل بعد إتمام المشروع. نوفر فترة ضمان مجانية، بالإضافة إلى باقات دعم شهرية وسنوية تناسب احتياجاتك.',
        en: 'Yes, we provide comprehensive technical support after project completion. We offer a free warranty period, plus monthly and annual support packages to suit your needs.'
      }
    },
    {
      question: {
        ar: 'ما هي التقنيات التي تستخدمونها؟',
        en: 'What technologies do you use?'
      },
      answer: {
        ar: 'نستخدم أحدث التقنيات مثل React، Node.js، Python، n8n للأتمتة، وأدوات الذكاء الاصطناعي المتقدمة مثل OpenAI و LangChain. نختار التقنية المناسبة بناءً على متطلبات كل مشروع.',
        en: 'We use cutting-edge technologies like React, Node.js, Python, n8n for automation, and advanced AI tools like OpenAI and LangChain. We choose the right technology based on each project\'s requirements.'
      }
    },
    {
      question: {
        ar: 'كيف تضمنون أمان البيانات؟',
        en: 'How do you ensure data security?'
      },
      answer: {
        ar: 'نتبع أفضل ممارسات الأمان العالمية، بما في ذلك التشفير، المصادقة الثنائية، والنسخ الاحتياطي المنتظم. نحرص على الامتثال للمعايير الدولية لحماية البيانات.',
        en: 'We follow global security best practices, including encryption, two-factor authentication, and regular backups. We ensure compliance with international data protection standards.'
      }
    },
    {
      question: {
        ar: 'هل يمكنكم العمل مع أنظمتنا الحالية؟',
        en: 'Can you work with our existing systems?'
      },
      answer: {
        ar: 'بالتأكيد! نتخصص في تكامل الأنظمة وربط المنصات المختلفة. نقوم بتحليل أنظمتك الحالية وتصميم حلول تتكامل معها بسلاسة دون تعطيل العمليات الجارية.',
        en: 'Absolutely! We specialize in system integration and connecting different platforms. We analyze your existing systems and design solutions that integrate seamlessly without disrupting ongoing operations.'
      }
    },
    {
      question: {
        ar: 'ما هي تكلفة الخدمات؟',
        en: 'What are the service costs?'
      },
      answer: {
        ar: 'تختلف التكلفة حسب نطاق المشروع ومتطلباته. نقدم استشارة مجانية أولية لفهم احتياجاتك، ثم نقدم عرض سعر مفصل وشفاف. نوفر أيضاً خيارات دفع مرنة.',
        en: 'Costs vary based on project scope and requirements. We offer a free initial consultation to understand your needs, then provide a detailed and transparent quote. We also offer flexible payment options.'
      }
    }
  ];

  return (
    <Layout>
      <SEO
        title={language === 'ar' ? 'الخدمات' : 'Services'}
        description={language === 'ar'
          ? 'خدمات التحول الرقمي والذكاء الاصطناعي والأتمتة وتطوير منتجات SaaS للمؤسسات'
          : 'Digital transformation, AI solutions, automation and SaaS development services for enterprises'
        }
        url="/services"
      />

      {/* Hero Section */}
      <section className="py-28 bg-gradient-to-br from-primary via-navy to-navy-dark dark:from-navy dark:via-navy-dark dark:to-black text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,hsl(var(--gold)/0.15),transparent_50%)]" />
          <div className="absolute top-20 right-20 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary-foreground/5 rounded-full blur-3xl" />
        </div>

        {/* Floating Particles */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-gold/40 rounded-full animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-40 w-4 h-4 bg-primary-foreground/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-gold/50 rounded-full animate-float" style={{ animationDelay: '2s' }} />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(to right, hsl(var(--primary-foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary-foreground)) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 text-gold backdrop-blur-sm border border-gold/30">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language === 'ar' ? 'حلول متكاملة' : 'Integrated Solutions'}
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="relative inline-block">
                {t('services.title')}
                <span className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-gold via-gold-light to-gold rounded-full" />
              </span>
            </h1>

            <p className="text-xl text-white/80 leading-relaxed max-w-lg mx-auto lg:mx-0">
              {language === 'ar'
                ? 'نساعدك على بناء مستقبل رقمي قوي من خلال حلول تقنية متكاملة، استراتيجيات ذكية، ومنتجات قابلة للتوسع.'
                : 'We help you build a strong digital future through integrated technical solutions, smart strategies, and scalable products.'}
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <TechStackMarquee />

      {/* Service Ecosystem Visualization */}
      <ServiceEcosystem />

      {/* Services Detail Grid */}
      <section className="py-24 relative bg-secondary/10">
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t('services.page.title')}</h2>
            <p className="text-muted-foreground">{t('services.page.desc')}</p>
          </div>
          <div className="grid gap-10 lg:grid-cols-2">
            {services.map((service, index) => (
              <ServiceCard key={service.key} service={service} index={index} t={t} language={language} />
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Journey */}
      <TransformationJourney />

      {/* FAQ Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fade-up" className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <HelpCircle className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {t('services.faq.badge')}
                </span>
              </div>

              <h2 className="text-4xl font-bold mb-6">
                {t('services.faq.title')}
              </h2>
            </AnimatedSection>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem key={index} faq={faq} index={index} language={language} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Digital Maturity Section */}
      <section id="digital-maturity" className="py-24 bg-gradient-to-b from-background to-secondary/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fade-right">
              <Badge variant="outline" className="mb-4 text-primary border-primary/20">
                <Zap className="w-3 h-3 mr-2" />
                {language === 'ar' ? 'تشخيص مجاني' : 'Free Diagnosis'}
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                {language === 'ar'
                  ? 'هل أنت مستعد للمستقبل الرقمي؟'
                  : 'Are You Ready for the Digital Future?'}
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                {language === 'ar'
                  ? 'اكتشف درجة النضج الرقمي لمؤسستك في دقيقتين فقط واحصل على توصيات مخصصة لسد الفجوة.'
                  : 'Discover your organization\'s digital maturity score in just 2 minutes and get tailored recommendations.'}
              </p>

              <div className="space-y-4">
                {[
                  { ar: 'تحليل البنية التحتية', en: 'Infrastructure Analysis' },
                  { ar: 'تقييم استخدام البيانات', en: 'Data Usage Assessment' },
                  { ar: 'كفاءة الأتمتة', en: 'Automation Efficiency' },
                  { ar: 'توصيات فورية', en: 'Instant Recommendations' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{item[language]}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-left">
              <MaturityAssessment />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 bg-gradient-to-br from-primary via-navy to-navy-dark dark:from-navy dark:via-navy-dark dark:to-black text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,hsl(var(--gold)/0.15),transparent_50%)]" />
          <div className="absolute top-20 left-1/4 w-80 h-80 bg-gold/10 rounded-full blur-3xl animate-pulse-glow" />
        </div>

        {/* Floating Particles */}
        <div className="absolute top-10 left-10 w-3 h-3 bg-gold/40 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-4 h-4 bg-primary-foreground/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />

        <div className="container relative z-10 text-center">
          <AnimatedSection animation="fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 text-gold mb-8 backdrop-blur-sm border border-gold/30 animate-bounce-subtle">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">
                {t('services.cta.badge')}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              {t('services.cta.title')}
            </h2>

            <div className="flex flex-wrap justify-center gap-6">
              {/* Primary CTA with Glow */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-gold via-gold-light to-gold rounded-lg blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <Button asChild size="lg" className="relative bg-gold text-navy hover:bg-gold-light gap-2 px-10 py-7 text-lg shadow-2xl group-hover:scale-105 transition-transform duration-300">
                  <Link to="/book">
                    {t('services.cta.button')}
                    <Arrow className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

// Service Card Component
function ServiceCard({ service, index, t, language }: { service: Service; index: number; t: (key: string) => string; language: Language }) {
  const { ref, isVisible } = useScrollAnimation();
  const Icon = service.icon;

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
        transition: `opacity 0.7s ease-out, transform 0.7s ease-out`,
        transitionDelay: `${index * 0.15}s`,
      }}
    >
      <Card className="group relative overflow-hidden border-0 bg-card/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 h-full">
        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <CardHeader className={`relative bg-gradient-to-br ${service.color} p-8 overflow-hidden`}>
          <div className="relative flex items-center gap-5">
            <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner">
              <Icon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              {t(`services.${service.key}.title`)}
            </h3>
          </div>
        </CardHeader>

        <CardContent className="relative p-8">
          <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
            {t(`services.${service.key}.desc`)}
          </p>

          <div className="space-y-6">
            {/* Features List */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm uppercase tracking-wide opacity-70">
                <Target className="w-4 h-4" />
                {t('services.features')}
              </h4>
              <ul className="grid gap-3">
                {service.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Use Cases (New Section) */}
            {service.useCases && (
              <div className="pt-6 border-t border-border/50">
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm uppercase tracking-wide opacity-70">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="use-cases-trigger" className="border-b-0">
                      <AccordionTrigger className="p-0 hover:no-underline py-0">
                        <span className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4" />
                          {t('services.usecases')}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4">
                        <div className="bg-secondary/30 p-4 rounded-lg">
                          <ul className="space-y-2">
                            {service.useCases.map((useCase, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                                <span className="text-primary mt-1">•</span>
                                {useCase}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </h4>
              </div>
            )}
          </div>
        </CardContent>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-gold group-hover:w-full transition-all duration-700 rounded-full" />
      </Card>
    </div>
  );
}

// FAQ Item Component
function FAQItem({ faq, index, language }: { faq: FAQ; index: number; language: Language }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease-out, transform 0.6s ease-out`,
        transitionDelay: `${index * 0.1}s`,
      }}
    >
      <Accordion type="single" collapsible>
        <AccordionItem
          value={`item-${index}`}
          className="group bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl px-6 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <AccordionTrigger className="text-foreground hover:no-underline py-6 text-start font-semibold text-lg">
            {faq.question[language]}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed">
            {faq.answer[language]}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default Services;
