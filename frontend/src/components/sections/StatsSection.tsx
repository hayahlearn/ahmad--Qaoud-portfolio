import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Stat } from '@/types';
import { useEffect, useState, useRef } from 'react';

// Custom Hook for Count Up Animation
const useCountUp = (end: number, duration: number = 2000, start: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, duration, start]);

  return count;
};

export function StatsSection() {
  const { t } = useLanguage();

  const stats: Stat[] = [
    { value: '20+', key: 'stats.years', numeric: 20, suffix: '+' },
    { value: '10k+', key: 'stats.users', numeric: 10000, suffix: '+' },
    { value: '40%', key: 'stats.savings', numeric: 40, suffix: '%' },
    { value: '200%', key: 'stats.efficiency', numeric: 200, suffix: '%' },
    { value: '70%', key: 'stats.infra', numeric: 70, suffix: '%' },
  ];

  return (
    <section className="py-24 bg-gradient-primary dark:bg-gradient-to-br dark:from-navy dark:via-navy-dark dark:to-black relative overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-gold/5 to-transparent rounded-full" />
      </div>

      {/* Floating Particles */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-gold/50 rounded-full animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-20 right-20 w-3 h-3 bg-primary-foreground/30 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-gold/40 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-10 right-1/3 w-4 h-4 bg-primary-foreground/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(to right, hsl(var(--primary-foreground)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary-foreground)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="container relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6">
          {stats.map((stat, index) => (
            <StatItem key={stat.key} stat={stat} index={index} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat, index, t }: { stat: Stat & { numeric?: number, suffix?: string }; index: number; t: (key: string) => string }) {
  const { ref, isVisible } = useScrollAnimation();
  const count = useCountUp(stat.numeric || 0, 2500, isVisible);

  return (
    <div
      ref={ref}
      className="text-center group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.8)',
        transition: `opacity 0.7s ease-out, transform 0.7s ease-out`,
        transitionDelay: `${index * 0.1}s`,
      }}
    >
      {/* Stat Card with Glassmorphism */}
      <div className="relative p-6 rounded-2xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 group-hover:bg-primary-foreground/10 group-hover:border-gold/30 transition-all duration-500">
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gold/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative">
          {/* Number with Gradient and Animation */}
          <div className="text-4xl sm:text-5xl lg:text-6xl font-black mb-3 bg-gradient-to-br from-gold via-gold-light to-gold bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500 font-mono tracking-tighter">
            {stat.numeric ? (
              <>
                {count > 1000 ? `${(count / 1000).toFixed(0)}k` : count}
                <span className="text-2xl sm:text-3xl ml-1">{stat.suffix}</span>
              </>
            ) : (
              stat.value
            )}
          </div>

          {/* Label */}
          <div className="text-sm sm:text-base text-primary-foreground/80 dark:text-white/80 font-medium group-hover:text-primary-foreground dark:group-hover:text-white transition-colors duration-300">
            {t(stat.key)}
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-gold to-gold-light group-hover:w-1/2 transition-all duration-500 rounded-full" />
      </div>
    </div>
  );
}
