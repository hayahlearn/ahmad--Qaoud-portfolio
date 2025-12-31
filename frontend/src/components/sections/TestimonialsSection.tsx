import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Quote, Star, ArrowRight, ArrowLeft, LucideIcon } from 'lucide-react';
import { AnimatedSection, useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Language } from '@/contexts/LanguageContext';
import { CASE_STUDY_TESTIMONIALS, CaseStudyTestimonial } from '@/data/testimonials';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function TestimonialsSection() {
  const { language, direction } = useLanguage();
  const Arrow = direction === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="container">
        {/* Section Header */}
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {language === 'ar' ? 'شركاء النجاح يتحدثون' : 'Success Partners Speak'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {language === 'ar' ? 'مقتطفات من قصص واقعية' : 'Real Success Stories'}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {language === 'ar'
              ? 'شركات حققت قفزات نوعية في الأداء والعائد من خلال حلولنا الرقمية'
              : 'Companies that achieved quantum leaps in performance and ROI through our digital solutions'}
          </p>
        </AnimatedSection>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {CASE_STUDY_TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} language={language} Arrow={Arrow} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, index, language, Arrow }: { testimonial: CaseStudyTestimonial; index: number; language: Language; Arrow: LucideIcon }) {
  const { ref, isVisible } = useScrollAnimation();

  // Map color names to tailwind classes safely (simplified for this example)
  const colorMap: Record<string, string> = {
    blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    emerald: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    pink: 'text-pink-500 bg-pink-500/10 border-pink-500/20',
    violet: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
    cyan: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
    amber: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  };

  const badgeClass = colorMap[testimonial.industryColor] || colorMap['blue'];

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.6s ease-out, transform 0.6s ease-out`,
        transitionDelay: `${index * 0.1}s`,
      }}
    >
      <Card className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
        <CardContent className="p-6 lg:p-8 flex flex-col flex-1">
          {/* Header with Industry Badge */}
          <div className="flex justify-between items-start mb-6">
            <Badge variant="outline" className={badgeClass}>
              {testimonial.industry[language]}
            </Badge>
            <Quote className="h-8 w-8 text-primary/20" />
          </div>

          {/* Content */}
          <p className="text-foreground/90 leading-relaxed mb-6 text-base lg:text-lg italic flex-1">
            "{testimonial.content[language]}"
          </p>

          {/* Rating */}
          <div className="flex gap-1 mb-6">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-gold text-gold" />
            ))}
          </div>

          <div className="border-t border-border/50 pt-6 mt-auto">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="h-12 w-12 border-2 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  {testimonial.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold text-foreground text-sm">
                  {testimonial.name[language]}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {testimonial.role[language]}
                </p>
              </div>
            </div>

            <Button variant="ghost" size="sm" asChild className="w-full justify-between hover:bg-primary/5 text-primary">
              <Link to="/case-studies">
                {language === 'ar' ? 'اقرأ دراسة الحالة' : 'Read Case Study'}
                <Arrow className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
        </CardContent>
      </Card>
    </div>
  );
}
