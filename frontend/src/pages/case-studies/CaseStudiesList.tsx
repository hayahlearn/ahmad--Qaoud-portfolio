import { caseStudies } from './data';
import { CaseStudyCard } from './CaseStudyCard';
import type { CaseStudy } from '@/types';

interface CaseStudiesListProps {
    onSelectStudy: (study: CaseStudy) => void;
}

export function CaseStudiesList({ onSelectStudy }: CaseStudiesListProps) {
    return (
        <section className="py-12 relative">
            <div className="container max-w-6xl">
                <div className="space-y-20">
                    {caseStudies.map((study, index) => (
                        <div
                            key={study.id}
                            className="group relative animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-forwards"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Connecting Line (except last) */}
                            {index !== caseStudies.length - 1 && (
                                <div className="absolute left-1/2 bottom-[-80px] w-px h-[80px] bg-gradient-to-b from-border to-transparent hidden lg:block" />
                            )}

                            <CaseStudyCard
                                study={study}
                                onClick={() => onSelectStudy(study)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
