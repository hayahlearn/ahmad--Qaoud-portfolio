import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { Play, Quote, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    name: { ar: 'محمد العمري', en: 'Mohammed Al-Omari' },
    role: { ar: 'الرئيس التنفيذي - مجموعة العمري', en: 'CEO - Al-Omari Group' },
    quote: { 
      ar: 'أحمد قاعود غيّر طريقة عملنا بالكامل. وفرنا 40% من التكاليف التشغيلية خلال 6 أشهر فقط.', 
      en: 'Ahmad Qaoud completely transformed our operations. We saved 40% in operational costs within just 6 months.' 
    },
    rating: 5,
    hasVideo: true,
    results: { ar: 'توفير 40% من التكاليف', en: '40% Cost Savings' }
  },
  {
    id: 2,
    name: { ar: 'سارة الخالدي', en: 'Sarah Al-Khalidi' },
    role: { ar: 'مديرة التسويق - شركة النخبة', en: 'Marketing Director - Elite Company' },
    quote: { 
      ar: 'الأتمتة التي قدمها لنا أحمد ضاعفت إنتاجية فريقنا 3 مرات. نتائج مذهلة!', 
      en: 'The automation Ahmad provided tripled our team productivity. Amazing results!' 
    },
    rating: 5,
    hasVideo: true,
    results: { ar: '3x زيادة الإنتاجية', en: '3x Productivity Increase' }
  },
  {
    id: 3,
    name: { ar: 'خالد المنصور', en: 'Khalid Al-Mansour' },
    role: { ar: 'مؤسس - تقنية المستقبل', en: 'Founder - Future Tech' },
    quote: { 
      ar: 'من أفضل الاستثمارات التي قمنا بها. العائد على الاستثمار تجاوز توقعاتنا بمراحل.', 
      en: 'One of the best investments we made. ROI exceeded our expectations by far.' 
    },
    rating: 5,
    hasVideo: false,
    results: { ar: 'ROI 300%', en: '300% ROI' }
  },
];

export function VideoTestimonials() {
  const { language } = useLanguage();

  return (
    <section className="py-24 bg-gradient-hero">
      <div className="container">
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-4">
            {language === 'ar' ? 'شهادات العملاء' : 'Client Testimonials'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'ar' ? 'ماذا يقول عملاؤنا؟' : 'What Our Clients Say?'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'نتائج حقيقية من عملاء حقيقيين - قصص نجاح موثقة بالأرقام'
              : 'Real results from real clients - success stories documented with numbers'}
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection 
              key={testimonial.id} 
              animation="fade-up" 
              delay={index * 150}
            >
              <Card className="h-full border-border/50 hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 group overflow-hidden">
                {testimonial.hasVideo && (
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Button 
                      size="lg" 
                      className="rounded-full w-16 h-16 shadow-elevated group-hover:scale-110 transition-transform"
                    >
                      <Play className="h-6 w-6 fill-current" />
                    </Button>
                    <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                      {testimonial.results[language]}
                    </div>
                  </div>
                )}
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-accent/50 mb-4" />
                  <p className="text-foreground mb-6 leading-relaxed">
                    "{testimonial.quote[language]}"
                  </p>
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                      {testimonial.name[language].charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name[language]}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role[language]}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
