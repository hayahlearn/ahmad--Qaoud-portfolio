import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, GraduationCap, Bot, Hotel, Armchair, ShoppingCart, ExternalLink, Zap } from 'lucide-react';
import { AnimatedSection, useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Project } from '@/types';
import { Language } from '@/contexts/LanguageContext';

import hayahImage from '@/assets/projects/hayah-lms.png';
import orchestratorImage from '@/assets/projects/orchestrator.png';
import tourismImage from '@/assets/projects/tourism.png';
import furnitureImage from '@/assets/projects/furniture.png';

const projects: Project[] = [
  { key: 'hayah', slug: 'hayah-lms', icon: GraduationCap, status: 'live', color: 'from-emerald-500 to-emerald-600', image: hayahImage },
  { key: 'orchestrator', slug: 'orchestrator', icon: Bot, status: 'live', color: 'from-blue-500 to-blue-600', image: orchestratorImage },
  { key: 'tourism', slug: 'tourism-platform', icon: Hotel, status: 'building', color: 'from-amber-500 to-amber-600', image: tourismImage },
  { key: 'furniture', slug: 'furniture-ar', icon: Armchair, status: 'building', color: 'from-purple-500 to-purple-600', image: furnitureImage },
];

export function ProjectsSection() {
  const { t, direction, language } = useLanguage();
  const Arrow = direction === 'rtl' ? ArrowLeft : ArrowRight;

  const getStatusLabel = (status: string) => {
    if (status === 'live') return language === 'ar' ? 'يعمل الآن' : 'Live';
    return language === 'ar' ? 'قيد التطوير' : 'In Development';
  };

  return (
    <section className="py-28 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
        <div className="absolute top-40 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-gold/40 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-60 right-20 w-4 h-4 bg-primary/30 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-gold/50 rounded-full animate-float" style={{ animationDelay: '2.5s' }} />

      <div className="container relative z-10">
        {/* Header */}
        <AnimatedSection animation="fade-up" className="flex flex-wrap items-end justify-between gap-6 mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">{language === 'ar' ? 'مشاريع مميزة' : 'Featured Projects'}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 leading-tight">
              <span className="relative inline-block">
                {t('projects.title')}
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-gold to-primary rounded-full" />
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mt-6">
              {t('projects.subtitle')}
            </p>
          </div>
          <Button asChild variant="outline" className="gap-2 border-2 border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 group">
            <Link to="/projects">
              {t('common.viewall')}
              <Arrow className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </AnimatedSection>

        {/* SaaS Products */}
        <div className="grid gap-8 sm:grid-cols-2 mb-10">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.key}
              project={project}
              index={index}
              t={t}
              getStatusLabel={getStatusLabel}
            />
          ))}
        </div>

        {/* E-Commerce Banner */}
        <AnimatedSection animation="zoom-in" delay={0.3}>
          <Card className="group relative overflow-hidden border-0 shadow-glow bg-gradient-to-br from-primary via-navy to-navy-dark dark:from-navy dark:via-navy-dark dark:to-black">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--gold)/0.1),transparent_50%)]" />

            <CardContent className="relative p-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-8">
                {/* Icon with Glow Effect */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gold/30 rounded-2xl blur-xl animate-pulse-glow" />
                  <div className="relative h-24 w-24 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <ShoppingCart className="h-12 w-12 text-gold" />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-primary-foreground dark:text-white mb-3">
                    {t('projects.ecommerce.title')}
                  </h3>
                  <p className="text-primary-foreground/70 dark:text-white/70 max-w-xl text-lg leading-relaxed">
                    {t('projects.ecommerce.desc')}
                  </p>
                </div>
              </div>
              <Button asChild variant="secondary" size="lg" className="gap-2 shrink-0 bg-gold text-navy hover:bg-gold-light hover:scale-105 transition-all duration-300 shadow-lg">
                <Link to="/contact">
                  {t('hero.cta.contact')}
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, t, getStatusLabel }: { project: Project; index: number; t: (key: string) => string; getStatusLabel: (status: string) => string }) {
  const { ref, isVisible } = useScrollAnimation();
  const Icon = project.icon;

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
      <Card className="group relative overflow-hidden border-0 shadow-card hover:shadow-glow transition-all duration-500 h-full flex flex-col">
        {/* Project Image */}
        <div className="relative h-48 sm:h-64 overflow-hidden">
          <img
            src={project.image}
            alt={t(`projects.${project.key}.title`)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />

          <div className="absolute top-4 right-4 z-10">
            <Badge className={`${project.status === 'live' ? 'bg-background/95 text-foreground shadow-sm' : 'bg-background/80 text-muted-foreground'} transition-all duration-300 backdrop-blur-md`}>
              <span className={`${project.status === 'live' ? 'animate-pulse' : ''} inline-block w-2 h-2 rounded-full mr-2 ${project.status === 'live' ? 'bg-green-500' : 'bg-yellow-500'}`} />
              {getStatusLabel(project.status)}
            </Badge>
          </div>
        </div>

        <CardHeader className="relative pb-0">
          <div className="flex items-center justify-between mb-2">
            <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative flex-1 p-6 pt-4">
          <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
            {t(`projects.${project.key}.title`)}
          </h3>
          <p className="text-muted-foreground leading-relaxed line-clamp-3">
            {t(`projects.${project.key}.desc`)}
          </p>

          {/* Bottom Accent */}
          <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-gold group-hover:w-full transition-all duration-700 rounded-full" />
        </CardContent>
      </Card>
    </div>
  );
}
