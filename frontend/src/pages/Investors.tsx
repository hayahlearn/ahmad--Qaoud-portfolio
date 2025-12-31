
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PartnershipTracks } from '@/components/investors/PartnershipTracks';
import { IdeaSubmissionForm } from '@/components/investors/IdeaSubmissionForm';
import { IdeaValidator } from '@/components/investors/IdeaValidator';
import { Link } from 'react-router-dom';
import { Rocket, Brain, Handshake, Target, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState, useRef } from 'react';

const Investors = () => {
  const { language, direction } = useLanguage();
  const Arrow = direction === 'rtl' ? ArrowLeft : ArrowRight;
  const formRef = useRef<HTMLDivElement>(null);
  const [selectedTrack, setSelectedTrack] = useState<'visionary' | 'catalyst'>('visionary');

  const scrollToForm = (track: 'visionary' | 'catalyst') => {
    setSelectedTrack(track);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Layout>
      <SEO
        title={language === 'ar' ? 'شركاء النجاح - استثمار في العقول والأفكار' : 'Innovation Partners - Investing in Minds & Ideas'}
        description={language === 'ar'
          ? 'نبحث عن شركاء مفكرين ومبتكرين لنبني معاً الجيل القادم من المنتجات الرقمية. نموذج الشريك المؤسس التقني.'
          : 'Seeking visionary partners and innovators to co-build the next generation of digital products. Technical Co-founder Model.'}
        url="/investors"
      />

      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.1),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-overlay" />

        <div className="container relative z-10">
          <AnimatedSection animation="fade-up" className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-accent/10 text-accent border-accent/20 px-4 py-1.5 text-sm font-semibold rounded-full hover:bg-accent/20 transition-colors">
              <Brain className="w-4 h-4 mr-2" />
              {language === 'ar' ? 'نهج استثماري جديد' : 'A New Investment Paradigm'}
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight">
              {language === 'ar' ? (
                <>
                  لا نستثمر فقط في الشركات، <br />
                  <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">نستثمر في العقول.</span>
                </>
              ) : (
                <>
                  We Don't Just Invest in Companies, <br />
                  <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">We Invest in Minds.</span>
                </>
              )}
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {language === 'ar'
                ? 'سواء كنت تملك رأس المال وتيبحث عن فرص، أو تملك الفكرة والخبرة وتبحث عن شريك تقني.. نحن هنا لنصنع المستقبل معاً.'
                : 'Whether you have capital seeking opportunity, or an idea seeking a tech partner.. We are here to co-create the future.'}
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-8">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all" onClick={() => scrollToForm('visionary')}>
                {language === 'ar' ? 'أنا شريك فكرة' : 'I am a Visionary'}
                <Brain className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-2" onClick={() => scrollToForm('catalyst')}>
                {language === 'ar' ? 'أنا مستثمر' : 'I am an Investor'}
                <Rocket className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-background relative overflow-hidden">
        <div className="container relative z-10">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold">
              {language === 'ar' ? 'أدوات الابتكار الذكية' : 'Smart Innovation Tools'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              {language === 'ar' ? 'اختبر فكرتك واحسب جاهزيتك الرقمية' : 'Validate Your Idea & Check Digital Readiness'}
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
                    ? 'تحليل تقني فوري للفكرة مع التقنيات المقترحة والزمن المتوقع'
                    : 'Instant technical analysis with suggested stack and estimated timeline'}
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

      {/* Philosophy Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection animation="fade-up" delay={0}>
              <div className="bg-background p-8 rounded-2xl shadow-sm hover:shadow-md transition-all h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                  <Handshake className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{language === 'ar' ? 'شراكة حقيقية' : 'True Partnership'}</h3>
                <p className="text-muted-foreground">
                  {language === 'ar'
                    ? 'نحن لا نبيع برمجيات، بل نبني أصولاً رقمية مشتركة. نجاحك هو نجاحنا.'
                    : 'We don\'t sell software; we build shared digital assets. Your success is our success.'}
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={150}>
              <div className="bg-background p-8 rounded-2xl shadow-sm hover:shadow-md transition-all h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{language === 'ar' ? 'الخبرة القطاعية' : 'Domain Expertise'}</h3>
                <p className="text-muted-foreground">
                  {language === 'ar'
                    ? 'نؤمن أن أفضل المنتجات تأتي من دمج خبرتك في مجالك مع خبرتنا التقنية.'
                    : 'We believe the best products emerge from merging your domain expertise with our tech mastery.'}
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-up" delay={300}>
              <div className="bg-background p-8 rounded-2xl shadow-sm hover:shadow-md transition-all h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{language === 'ar' ? 'التركيز على العائد' : 'ROI Focused'}</h3>
                <p className="text-muted-foreground">
                  {language === 'ar'
                    ? 'نصمم كل شيء بهدف واضح: تحقيق النمو والعائد المادي المستدام.'
                    : 'We design everything with a clear goal: achieving growth and sustainable ROI.'}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Tracks Selection */}
      <PartnershipTracks onSelectTrack={scrollToForm} />

      {/* Submission Form */}
      <section className="py-24 bg-gradient-to-t from-secondary/50 to-background" ref={formRef}>
        <div className="container">
          <AnimatedSection animation="fade-up">
            <IdeaSubmissionForm initialTrack={selectedTrack} />
          </AnimatedSection>
        </div>
      </section>

    </Layout>
  );
};

export default Investors;
