import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { CountryCardProps } from './types';

export function CountryCard({ country, index }: CountryCardProps) {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <div
            ref={ref}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
                transition: `opacity 0.6s ease-out, transform 0.6s ease-out`,
                transitionDelay: `${index * 0.1}s`,
            }}
        >
            <div className="group flex items-center gap-4 px-8 py-5 bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl shadow-soft hover:shadow-glow hover:border-primary/30 transition-all duration-500 hover:-translate-y-2">
                <span className="text-4xl group-hover:scale-125 transition-transform duration-500">{country.flag}</span>
                <span className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">{country.name}</span>
            </div>
        </div>
    );
}
