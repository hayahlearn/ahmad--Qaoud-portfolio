import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ValueCardProps } from './types';

export function ValueCard({ value, IconComponent, index }: ValueCardProps) {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <div
            ref={ref}
            className="group"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
                transition: `opacity 0.6s ease-out, transform 0.6s ease-out`,
                transitionDelay: `${index * 0.15}s`,
            }}
        >
            <div className="flex gap-5 p-6 bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-glow transition-all duration-500">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center group-hover:from-primary group-hover:to-primary group-hover:scale-110 transition-all duration-500">
                        <IconComponent className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
            </div>
        </div>
    );
}
