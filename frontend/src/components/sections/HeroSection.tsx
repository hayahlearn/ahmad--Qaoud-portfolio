import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Award, Shield, Clock, Globe } from 'lucide-react';
import { LogoIcon } from '@/components/brand/Logo';
import { trackButtonClick } from '@/components/GoogleAnalytics';
import heroImage from '@/assets/hero-digital-transformation.jpg';
import profileImage from '@/assets/profile-ahmad.png';

export function HeroSection() {
  const { t, direction, language } = useLanguage();
  const Arrow = direction === 'rtl' ? ArrowLeft : ArrowRight;

  const trustBadges = [
    { icon: Award, text: t('trust.certified') },
    { icon: Shield, text: t('trust.experience') },
    { icon: CheckCircle, text: t('trust.clients') },
  ];

  const trustIndicators = [
    { icon: Clock, text: language === 'ar' ? 'رد خلال 24 ساعة' : '24h Response' },
    { icon: Globe, text: language === 'ar' ? '4 دول عربية' : '4 Arab Countries' },
  ];

  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden">
      {/* Hero Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Digital Transformation Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Animated Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-accent/5 shape-blob-animated blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 shape-blob-animated blur-3xl" style={{ animationDelay: '-4s' }} />

        {/* Floating Particles */}
        <div className="absolute top-20 left-20 w-3 h-3 bg-accent/40 rounded-full animate-float" />
        <div className="absolute top-40 right-32 w-2 h-2 bg-primary/40 rounded-full animate-float" style={{ animationDelay: '-1s' }} />
        <div className="absolute bottom-32 left-1/3 w-4 h-4 bg-accent/30 rounded-full animate-float" style={{ animationDelay: '-2s' }} />
      </div>

      <div className="container relative z-10 py-20">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            {/* Trust Badges with stagger animation */}
            <div className="flex flex-wrap gap-3">
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card opacity-0 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <badge.icon className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-foreground">{badge.text}</span>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {/* Premium Greeting with shimmer */}
              <p className="text-lg font-semibold uppercase tracking-wider opacity-0 animate-fade-in text-shimmer" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
                {t('hero.greeting')}
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] opacity-0 animate-slide-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
                {t('hero.name')}
              </h1>

              {/* Slogan - Brand Identity */}
              <div className="flex items-center gap-4 opacity-0 animate-slide-up" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
                <div className="divider-gold animate-pulse-glow" />
                <span className="text-xl sm:text-2xl font-semibold text-gradient-primary">
                  {t('brand.slogan')}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl text-muted-foreground font-medium max-w-xl opacity-0 animate-slide-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
                {t('hero.title')}
              </h2>

              {/* Subtitle - Value Proposition */}
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed opacity-0 animate-fade-in" style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}>
                {t('hero.subtitle')}
              </p>
            </div>

            {/* CTAs with hover effects */}
            <div className="flex flex-wrap gap-4 pt-4 opacity-0 animate-slide-up" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
              <Button
                asChild
                size="lg"
                className="gap-2 shadow-elevated hover:shadow-xl hover:scale-105 transition-all duration-300 text-base px-8 glow-gold"
                onClick={() => trackButtonClick('hero_book_consultation', 'hero_section')}
              >
                <Link to="/book">
                  {language === 'ar' ? 'احصل على تحليل فجوات رقمية مجاني' : 'Get Free Digital Gap Analysis'}
                  <Arrow className="h-5 w-5 animate-bounce-subtle" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base px-8 border-2 hover:scale-105 hover:border-accent transition-all duration-300"
                onClick={() => trackButtonClick('hero_view_projects', 'hero_section')}
              >
                <Link to="/projects">{language === 'ar' ? 'اكتشف كيف نوفر 40% من التكاليف' : 'Discover 40% Cost Savings'}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base px-8 border-2 border-emerald-500/50 text-emerald-600 dark:text-emerald-400 hover:scale-105 hover:bg-emerald-500/10 hover:border-emerald-500 transition-all duration-300"
                onClick={() => trackButtonClick('hero_special_education', 'hero_section')}
              >
                <Link to="/special-education">{language === 'ar' ? 'حلولنا لذوي الهمم' : 'Special Education Solutions'}</Link>
              </Button>
            </div>

            {/* Additional Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-4 opacity-0 animate-fade-in" style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}>
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <indicator.icon className="h-4 w-4 text-accent" />
                  <span>{indicator.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Visual - Logo with enhanced effects */}
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              {/* Main Brand Mark */}
              <div className="relative w-[420px] h-[420px]">
                {/* Animated Outer Glow */}
                <div className="absolute inset-0 bg-gradient-gold rounded-[60px] blur-3xl opacity-20 animate-pulse-glow" />

                {/* Rotating Ring */}
                <div className="absolute inset-[-20px] rounded-full border-2 border-dashed border-accent/20 animate-rotate-slow" />

                {/* Main Logo Container with gradient border */}
                <div className="relative w-full h-full rounded-[60px] bg-gradient-primary flex items-center justify-center shadow-elevated p-3 border-animated">
                  <div className="w-full h-full rounded-[50px] bg-background flex items-center justify-center border-4 border-accent/20 overflow-hidden relative group">
                    {/* Inner glow effect */}
                    <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent z-20 pointer-events-none" />
                    {/* Profile Image */}
                    <img
                      src={profileImage}
                      alt="Ahmad Qaoud"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>

              {/* Floating Stats with enhanced animations */}
              <div className="absolute -top-6 -right-10 glass-card rounded-2xl p-6 opacity-0 animate-slide-up hover-lift" style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}>
                <span className="text-5xl font-bold text-gradient-gold">+20</span>
                <span className="block text-sm text-muted-foreground font-medium mt-1">{t('stats.years')}</span>
              </div>

              <div className="absolute -bottom-6 -left-10 glass-card rounded-2xl p-6 opacity-0 animate-slide-up hover-lift" style={{ animationDelay: '1100ms', animationFillMode: 'forwards' }}>
                <span className="text-5xl font-bold text-gradient-primary">4</span>
                <span className="block text-sm text-muted-foreground font-medium mt-1">{t('stats.saas')}</span>
              </div>

              <div className="absolute top-1/2 -right-16 transform translate-x-full -translate-y-1/2 bg-accent rounded-2xl p-6 shadow-elevated opacity-0 animate-slide-up hover-lift animate-float" style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}>
                <span className="text-5xl font-bold text-accent-foreground">100+</span>
                <span className="block text-sm text-accent-foreground/80 font-medium mt-1">{language === 'ar' ? 'مسار عمل' : 'Workflows'}</span>
              </div>
            </div>

            {/* Desktop Mini ROI Calculator - Removed as per user request */}
          </div>
        </div>
      </div>
    </section>
  );
}
