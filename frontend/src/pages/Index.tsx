import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';
import { ClientsLogoWall } from '@/components/sections/ClientsLogoWall';
import { VideoTestimonials } from '@/components/sections/VideoTestimonials';
import { ROICalculator } from '@/components/ROICalculator';
import { SEO } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { Chatbot } from '@/components/Chatbot';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { IdeaValidator } from '@/components/investors/IdeaValidator';

const Index = () => {
  const { language } = useLanguage();

  return (
    <Layout>
      <SEO
        url="/"
        title={language === 'ar' ? 'أحمد قاعود - خبير التحول الرقمي والذكاء الاصطناعي' : 'Ahmad Qaoud - Digital Transformation & AI Expert'}
        description={language === 'ar'
          ? 'نصنع القيمة، لا ننفذ المهام. خبير استراتيجي في التحول الرقمي والذكاء الاصطناعي بخبرة +20 عام. نخفض التكاليف 40% ونرفع الكفاءة 200%.'
          : 'We Create Value, Not Just Execute Tasks. Strategic expert in Digital Transformation & AI with 20+ years experience. Reduce costs by 40% and increase efficiency by 200%.'
        }
        keywords={language === 'ar'
          ? 'التحول الرقمي, الذكاء الاصطناعي, SaaS, أتمتة, استشارات تقنية, أحمد قاعود, n8n, Python, موظف رقمي'
          : 'Digital Transformation, AI, SaaS, Automation, Tech Consulting, Ahmad Qaoud, n8n, Python, Digital Employee'
        }
      />

      {/* Hero - Who + Value Proposition */}
      <HeroSection />

      {/* Social Proof - Partners */}
      <ClientsLogoWall />

      {/* Stats - Numbers that matter */}
      <StatsSection />

      {/* Services - What we do */}
      <ServicesSection />

      {/* Projects - Proof of work */}
      <ProjectsSection />

      {/* Testimonials - Social proof */}
      <TestimonialsSection />

      {/* ROI Calculator Section */}
      <section className="py-24 bg-secondary/30 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <span className="text-sm font-medium">
                {language === 'ar' ? 'حاسبة العائد' : 'ROI Calculator'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient-gold">
                {language === 'ar' ? 'احسب عائد الأتمتة لمشروعك' : 'Calculate Your Automation ROI'}
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'ar'
                ? 'اكتشف كم يمكنك توفيره سنوياً من خلال أتمتة عملياتك اليدوية'
                : 'Discover how much you can save annually by automating your manual operations'}
            </p>
          </AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <ROICalculator variant="full" />
          </div>
        </div>
      </section>

      {/* Smart Tools */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full">
              {language === 'ar' ? 'أدوات الابتكار الذكية' : 'Smart Innovation Tools'}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              {language === 'ar' ? 'اختبر فكرتك واحسب نضجك الرقمي' : 'Validate Your Idea & Check Digital Maturity'}
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <AnimatedSection animation="fade-right">
              <div className="p-6 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-3">
                  {language === 'ar' ? 'محلل الأفكار الذكي' : 'AI Idea Validator'}
                </h3>
                <p className="text-muted-foreground mb-5">
                  {language === 'ar'
                    ? 'احصل على تحليل تقني فوري للفكرة والتقنيات المقترحة والزمن المتوقع'
                    : 'Get instant technical analysis, suggested stack, and estimated timeline'}
                </p>
                <IdeaValidator />
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-left">
              <div className="p-6 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm h-full">
                <h3 className="text-xl font-bold mb-3">
                  {language === 'ar' ? 'مقياس النضج الرقمي' : 'Digital Maturity Assessment'}
                </h3>
                <p className="text-muted-foreground mb-5">
                  {language === 'ar'
                    ? 'اكتشف درجة جاهزية مؤسستك رقمياً واحصل على توصيات فورية'
                    : 'Discover your organization’s digital readiness and get instant recommendations'}
                </p>
                <Button asChild className="w-full">
                  <Link to="/services#digital-maturity">
                    {language === 'ar' ? 'ابدأ التقييم' : 'Start Assessment'}
                  </Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA - Final conversion */}
      <CTASection />

      {/* Chatbot */}
      <Chatbot />
    </Layout>
  );
};

export default Index;
