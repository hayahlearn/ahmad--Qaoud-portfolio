import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ProjectCardProps } from './types';
import { motion } from 'framer-motion';

export function ProjectCard({ project }: ProjectCardProps) {
    const { t, language, direction } = useLanguage();
    const Arrow = direction === 'rtl' ? ArrowLeft : ArrowRight;
    const Icon = project.icon;

    const getStatusLabel = (status: string) => {
        if (status === 'live') return t('status.live');
        return t('status.building');
    };

    return (
        <motion.div
            whileHover={{ y: -10, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative rounded-3xl overflow-hidden border border-border/50 bg-card hover:shadow-2xl hover:shadow-primary/20 transition-colors duration-500"
        >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity`} />

            {/* Content Container */}
            <div className="relative p-8 md:p-10 flex flex-col gap-8 z-10">

                {/* Header: Status & Icon */}
                <div className="flex justify-between items-start">
                    <div className={`${project.iconBg} p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-8 h-8 ${project.iconColor}`} />
                    </div>
                    <Badge variant={project.status === 'live' ? 'default' : 'outline'} className="uppercase tracking-widest text-xs py-1.5 px-3">
                        {getStatusLabel(project.status)}
                    </Badge>
                </div>

                {/* Body: Title, Desc, Tech */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-3 group-hover:text-primary transition-colors">
                            {t(`projects.${project.key}.title`)}
                        </h3>

                        {/* Long Description or Fallback */}
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                            {project.longDescription
                                ? project.longDescription[language]
                                : t(`projects.${project.key}.desc`)
                            }
                        </p>
                    </div>

                    {/* Deep Value Props */}
                    {project.benefits && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {project.benefits.map((benefit, i) => (
                                <div key={i} className="bg-background/40 backdrop-blur-sm rounded-xl p-4 border border-border/30 hover:border-primary/30 transition-colors">
                                    <h4 className={`text-base font-bold ${project.iconColor} mb-2 opacity-90`}>{benefit.title[language]}</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description[language]}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2">
                        {project.techStack?.map((tech, i) => (
                            <span key={i} className="px-3 py-1.5 rounded-full bg-background/50 border border-border text-sm font-medium backdrop-blur-md">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Footer: Stats & CTA */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-6 border-t border-white/10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
                        {project.stats?.map((stat, i) => (
                            <div key={i}>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <div className="text-sm text-muted-foreground">{language === 'ar' ? stat.label.ar : stat.label.en}</div>
                            </div>
                        ))}
                    </div>

                    <Link to={`/projects/${project.slug}`} className="w-full md:w-auto">
                        <Button className="w-full md:w-auto rounded-full px-6 h-12 gap-2 text-base">
                            {language === 'ar' ? 'عرض التفاصيل' : 'View Project'}
                            <Arrow className="w-5 h-5" />
                        </Button>
                    </Link>
                </div>

            </div>

            {/* Decorative Blob */}
            <div className={`absolute -right-20 -bottom-20 w-96 h-96 bg-gradient-to-br ${project.color} rounded-full blur-[100px] opacity-10 group-hover:opacity-30 transition-opacity`} />
        </motion.div>
    );
}
