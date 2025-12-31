import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { CertificationCardProps } from './types';

export function CertificationCard({ cert, index }: CertificationCardProps) {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <div
            ref={ref}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                transition: `opacity 0.6s ease-out, transform 0.6s ease-out`,
                transitionDelay: `${index * 0.08}s`,
            }}
        >
            <Card className="group border-0 bg-card/80 backdrop-blur-sm hover:shadow-glow transition-all duration-500 overflow-hidden">
                <CardContent className="p-5 flex items-center gap-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gold/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-gold/10 to-gold/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <CheckCircle className="h-5 w-5 text-gold" />
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate group-hover:text-primary transition-colors duration-300">{cert.name}</p>
                        <p className="text-xs text-muted-foreground">{cert.issuer} • {cert.year}</p>
                    </div>
                </CardContent>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold to-gold-light group-hover:w-full transition-all duration-500 rounded-full" />
            </Card>
        </div>
    );
}
