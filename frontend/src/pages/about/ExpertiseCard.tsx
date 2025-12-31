import { Card, CardContent } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ExpertiseCardProps } from './types';

export function ExpertiseCard({ item, index }: ExpertiseCardProps) {
    const { ref, isVisible } = useScrollAnimation();
    const IconComponent = item.icon;

    return (
        <div
            ref={ref}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.9)',
                transition: `opacity 0.7s ease-out, transform 0.7s ease-out`,
                transitionDelay: `${index * 0.1}s`,
            }}
        >
            <Card className="group border-0 bg-card/80 backdrop-blur-sm hover:shadow-glow transition-all duration-500 overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="relative p-8 flex items-center gap-5">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center group-hover:from-primary group-hover:to-gold group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                            <IconComponent className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                        </div>
                    </div>
                    <span className="font-bold text-lg group-hover:text-primary transition-colors duration-300">{item.name}</span>
                </CardContent>
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-gold group-hover:w-full transition-all duration-700 rounded-full" />
            </Card>
        </div>
    );
}
