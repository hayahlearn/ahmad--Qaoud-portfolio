import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Cpu, Workflow, Rocket, Layers, Sparkles, LucideIcon } from 'lucide-react';
import { AnimatedSection, StaggeredContainer } from '@/hooks/useScrollAnimation';
import { Service } from '@/types';
import { motion } from 'framer-motion';

const services: Partial<Service>[] = [
  { key: 'revenue_engineering', icon: Rocket },
  { key: 'sovereign_ai', icon: Cpu },
  { key: 'orchestration', icon: Workflow },
  { key: 'authority_platform', icon: Layers },
];

export function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/3 to-transparent rounded-full" />
      </div>

      {/* Floating Decorative Shapes */}
      <div className="absolute top-10 right-20 w-4 h-4 bg-gold/30 rounded-full animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 left-20 w-3 h-3 bg-primary/40 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 right-40 w-5 h-5 bg-gold/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />

      <div className="container relative z-10">
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">{t('services.title')}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
            <span className="relative">
              {t('services.title')}
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-gold to-primary rounded-full" />
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold to-primary mx-auto rounded-full" />
        </AnimatedSection>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <StaggeredContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 col-span-full">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <ServiceCard key={service.key} service={service} Icon={Icon} index={index} t={t} />
              );
            })}
          </StaggeredContainer>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, Icon, index, t }: { service: Partial<Service>; Icon: LucideIcon; index: number; t: (key: string) => string }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <Card className="group relative overflow-hidden border-0 bg-card/80 backdrop-blur-sm h-full hover:shadow-glow transition-all duration-500">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/20 via-transparent to-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

        <CardContent className="relative p-8 text-center">
          {/* Icon Container with Glow */}
          <div className="relative inline-flex mb-6">
            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative h-16 w-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-gold/10 text-primary group-hover:from-primary group-hover:to-primary-foreground group-hover:text-primary-foreground transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
              <Icon className="h-8 w-8" />
            </div>
          </div>

          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
            {t(`services.${service.key}.title`)}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {t(`services.${service.key}.desc`)}
          </p>

          {/* Bottom Accent Line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-primary to-gold group-hover:w-3/4 transition-all duration-500 rounded-full" />
        </CardContent>
      </Card>
    </motion.div>
  );
}
