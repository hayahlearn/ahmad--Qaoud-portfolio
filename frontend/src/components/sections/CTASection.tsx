import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { trackButtonClick } from '@/components/GoogleAnalytics';

export function CTASection() {
  const { t, direction, language } = useLanguage();
  const Arrow = direction === 'rtl' ? ArrowLeft : ArrowRight;
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-28 bg-gradient-hero relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-gold/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-10 left-10 w-3 h-3 bg-gold/40 rounded-full animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-20 w-4 h-4 bg-primary/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-gold/50 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 right-1/3 w-3 h-3 bg-primary/40 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="container relative z-10">
        <div
          ref={ref}
          className="max-w-4xl mx-auto text-center space-y-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(30px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary animate-bounce-subtle">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">
              {language === 'ar' ? 'ابدأ رحلة التميز' : 'Start Your Journey'}
            </span>
          </div>

          {/* Heading with Gradient */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            <span className="relative inline-block">
              {language === 'ar' ? 'هل أنت مستعد' : 'Ready for'}
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-gold to-primary rounded-full" />
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-gold to-primary bg-clip-text text-transparent">
              {language === 'ar' ? 'للتميز؟' : 'Excellence?'}
            </span>
          </h2>

          {/* Description */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {language === 'ar'
              ? 'احجز استشارة استراتيجية مجانية لمناقشة كيف يمكنني مساعدتك في تحقيق أهدافك'
              : 'Book a free strategic consultation to discuss how I can help you achieve your goals'}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            {/* Primary Button with Glow */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-gold to-primary rounded-lg blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <Button
                asChild
                size="lg"
                className="relative gap-2 bg-gradient-to-r from-primary to-navy dark:from-primary dark:to-primary/80 hover:from-primary hover:to-primary text-primary-foreground px-8 py-6 text-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
                onClick={() => trackButtonClick('cta_book_consultation', 'cta_section')}
              >
                <Link to="/book">
                  {language === 'ar' ? 'احصل على تحليل فجوات رقمية مجاني' : 'Get Free Digital Gap Analysis'}
                  <Arrow className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>

            {/* Secondary Button */}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 border-2 border-primary/30 hover:border-primary hover:bg-primary/10 px-8 py-6 text-lg transition-all duration-300 group"
              onClick={() => trackButtonClick('cta_explore_projects', 'cta_section')}
            >
              <Link to="/projects">
                {language === 'ar' ? 'استكشف أعمالنا' : 'Explore Our Work'}
                <Arrow className="h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </Button>

            {/* Email Contact (Low Friction) */}
            <Button
              size="lg"
              variant="ghost"
              className="gap-2 px-6 py-6 text-lg hover:bg-white/5 opacity-80 hover:opacity-100 transition-all"
              onClick={() => window.location.href = 'mailto:contact@ahmadqaoud.com'}
            >
              {language === 'ar' ? 'أو راسلنا عبر البريد' : 'Or Email Us'}
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              {language === 'ar' ? 'استشارة مجانية' : 'Free Consultation'}
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              {language === 'ar' ? 'رد خلال 24 ساعة' : '24h Response'}
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              {language === 'ar' ? 'خبرة 20+ سنة' : '20+ Years Experience'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
