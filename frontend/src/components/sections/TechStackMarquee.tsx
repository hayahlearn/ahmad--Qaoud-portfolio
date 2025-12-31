import { useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const technologies = [
    { name: 'n8n', color: '#ff6e7f' },
    { name: 'Python', color: '#3776ab' },
    { name: 'React', color: '#61dafb' },
    { name: 'TypeScript', color: '#3178c6' },
    { name: 'Supabase', color: '#3ecf8e' },
    { name: 'OpenAI', color: '#10a37f' },
    { name: 'LangChain', color: '#ffffff' },
    { name: 'Docker', color: '#2496ed' },
    { name: 'PostgreSQL', color: '#336791' },
    { name: 'Tailwind', color: '#38b2ac' },
];

export function TechStackMarquee() {
    const { t, language } = useLanguage();
    const scrollerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!scrollerRef.current) return;

        // Clone contents for seamless loop
        const scrollerContent = Array.from(scrollerRef.current.children);
        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            (duplicatedItem as HTMLElement).setAttribute('aria-hidden', 'true');
            scrollerRef.current?.appendChild(duplicatedItem);
        });
    }, []);

    return (
        <div className="w-full py-12 bg-background/50 backdrop-blur-sm border-t border-b border-border/30 overflow-hidden">
            <div className="container mb-8 text-center">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    {language === 'ar' ? 'بنية تقنية نعتمد عليها' : 'Powered by Heavy-Duty Tech Stack'}
                </p>
            </div>

            <div className="relative flex w-full max-w-[100vw] overflow-hidden mask-gradient-x">
                <div
                    ref={scrollerRef}
                    className="flex min-w-full shrink-0 gap-8 py-4 animate-scroll whitespace-nowrap"
                    style={{ width: 'max-content' }}
                >
                    {technologies.map((tech, idx) => (
                        <div
                            key={`${tech.name}-${idx}`}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border/50 shadow-sm hover:border-primary/30 transition-colors"
                        >
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tech.color }} />
                            <span className="font-bold text-lg text-foreground/80">{tech.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
