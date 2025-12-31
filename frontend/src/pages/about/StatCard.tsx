import { Card, CardContent } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { StatCardProps } from './types';

export function StatCard({ stat, index }: StatCardProps) {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <div
            ref={ref}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                transition: `opacity 0.6s ease-out, transform 0.6s ease-out`,
                transitionDelay: `${index * 0.1}s`,
            }}
        >
            <Card className="group text-center border-0 bg-card/80 backdrop-blur-sm hover:shadow-glow transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="relative p-8">
                    <p className="text-5xl font-bold bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-500">
                        {stat.value}
                    </p>
                    <p className="text-muted-foreground font-medium">{stat.label}</p>
                </CardContent>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-primary to-gold group-hover:w-3/4 transition-all duration-500 rounded-full" />
            </Card>
        </div>
    );
}
