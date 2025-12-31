import { Card, CardContent } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ContactInfoCardProps } from './types';

export function ContactInfoCard({ icon: Icon, title, content, href, index }: ContactInfoCardProps) {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <div
            ref={ref}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.6s ease-out, transform 0.6s ease-out`,
                transitionDelay: `${index * 0.1}s`,
            }}
        >
            <Card className="group border-0 bg-card/80 backdrop-blur-sm hover:shadow-glow hover:border-primary/30 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardContent className="relative p-6">
                    <div className="flex items-center gap-5">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative h-14 w-14 rounded-xl bg-gradient-to-br from-primary/10 to-gold/10 flex items-center justify-center group-hover:from-primary group-hover:to-primary group-hover:scale-110 transition-all duration-500">
                                <Icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors duration-300">
                                {title}
                            </h3>
                            {href ? (
                                <a href={href} className="text-muted-foreground hover:text-primary transition-colors text-base">
                                    {content}
                                </a>
                            ) : (
                                <p className="text-muted-foreground text-base">{content}</p>
                            )}
                        </div>
                    </div>
                </CardContent>

                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-gold group-hover:w-full transition-all duration-500 rounded-full" />
            </Card>
        </div>
    );
}
