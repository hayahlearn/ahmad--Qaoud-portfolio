import { StatCard } from './StatCard';
import { getStats } from './data';
import { useLanguage } from '@/contexts/LanguageContext';

export function AboutStatsSection() {
    const { language } = useLanguage();
    const stats = getStats(language);

    return (
        <section className="py-16 -mt-12 relative z-20">
            <div className="container">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard key={index} stat={stat} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
