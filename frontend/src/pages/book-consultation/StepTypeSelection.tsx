import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { consultationTypes } from './data';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';

interface StepTypeSelectionProps {
    selectedType: string;
    onSelectType: (id: string) => void;
    onNext: () => void;
}

export function StepTypeSelection({ selectedType, onSelectType, onNext }: StepTypeSelectionProps) {
    const { language, direction } = useLanguage();
    const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

    return (
        <AnimatedSection animation="fade-up" className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">{language === 'ar' ? 'ما هو هدفك من الاستشارة؟' : 'What is your consultation goal?'}</h2>
                <p className="text-muted-foreground">{language === 'ar' ? 'اختر النوع الأنسب لاحتياجاتك الحالية' : 'Choose the type that best fits your needs'}</p>
            </div>

            <div className="grid gap-4">
                {consultationTypes.map((type) => (
                    <div
                        key={type.id}
                        onClick={() => onSelectType(type.id)}
                        className={`relative cursor-pointer group rounded-xl p-6 border-2 transition-all duration-300 ${selectedType === type.id
                            ? `${type.borderColor} bg-gradient-to-r ${type.color} shadow-lg scale-[1.02]`
                            : 'border-border/50 hover:border-primary/30 hover:bg-muted/30'
                            }`}
                    >
                        {type.recommended && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full shadow-md">
                                {language === 'ar' ? 'موصى به' : 'Recommended'}
                            </div>
                        )}

                        <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${selectedType === type.id ? 'bg-background/50 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                <type.icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-lg mb-1">{type.title[language]}</h3>
                                <p className="text-sm text-muted-foreground mb-3">{type.description[language]}</p>
                                <div className="flex flex-wrap gap-2">
                                    {type.features[language].map((feature, i) => (
                                        <Badge key={i} variant="secondary" className="text-xs font-normal bg-background/50">
                                            {feature}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${selectedType === type.id ? 'border-primary bg-primary' : 'border-muted-foreground/30'}`}>
                                {selectedType === type.id && <CheckCircle2 className="w-4 h-4 text-white" />}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end pt-4">
                <Button size="lg" onClick={onNext} className="w-full md:w-auto gap-2 text-lg h-12 shadow-lg hover:translate-y-[-2px] transition-transform">
                    {language === 'ar' ? 'التالي: اختيار الموعد' : 'Next: Select Time'}
                    <ArrowIcon className="w-5 h-5" />
                </Button>
            </div>
        </AnimatedSection>
    );
}
