import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Globe, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { timeSlots } from './data';

interface StepDateTimeSelectionProps {
    selectedDate: string;
    selectedTime: string;
    onDateChange: (date: string) => void;
    onTimeChange: (time: string) => void;
    onNext: () => void;
    onBack: () => void;
}

export function StepDateTimeSelection({ selectedDate, selectedTime, onDateChange, onTimeChange, onNext, onBack }: StepDateTimeSelectionProps) {
    const { language, direction } = useLanguage();
    const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;
    const BackIcon = direction === 'rtl' ? ChevronRight : ChevronLeft;

    const getNextDays = () => {
        const days = [];
        for (let i = 1; i <= 14; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            if (date.getDay() !== 0 && date.getDay() !== 6) {
                days.push(date);
            }
        }
        return days.slice(0, 10);
    };

    return (
        <AnimatedSection animation="fade-up" className="space-y-8">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">{language === 'ar' ? 'متى يناسبك اللقاء؟' : 'When works best for you?'}</h2>
                <p className="text-muted-foreground flex items-center justify-center gap-2">
                    <Globe className="w-4 h-4" />
                    {language === 'ar' ? 'المواعيد بتوقيت الرياض (GMT+3)' : 'Times in Riyadh Time (GMT+3)'}
                </p>
            </div>

            <div className="space-y-6">
                <div>
                    <Label className="block mb-4 text-base font-semibold">{language === 'ar' ? 'الأيام المتاحة' : 'Available Days'}</Label>
                    <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar snap-x">
                        {getNextDays().map((date) => {
                            const isSelected = selectedDate === date.toISOString();
                            return (
                                <button
                                    key={date.toISOString()}
                                    onClick={() => onDateChange(date.toISOString())}
                                    className={`min-w-[100px] p-4 rounded-xl border-2 transition-all duration-300 snap-center flex flex-col items-center gap-2 ${isSelected
                                        ? 'border-primary bg-primary/5 shadow-md scale-105'
                                        : 'border-border/50 hover:border-primary/50'
                                        }`}
                                >
                                    <span className="text-xs font-medium uppercase text-muted-foreground">
                                        {new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : 'en-US', { weekday: 'short' }).format(date)}
                                    </span>
                                    <span className="text-2xl font-bold">
                                        {date.getDate()}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : 'en-US', { month: 'short' }).format(date)}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <Label className="block mb-4 text-base font-semibold">{language === 'ar' ? 'الأوقات المتاحة' : 'Available Slots'}</Label>
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {timeSlots.map((time) => {
                            const isSelected = selectedTime === time;
                            return (
                                <button
                                    key={time}
                                    onClick={() => onTimeChange(time)}
                                    className={`py-3 px-2 rounded-lg border transition-all duration-200 text-sm font-medium ${isSelected
                                        ? 'bg-primary text-primary-foreground border-primary shadow-md'
                                        : 'bg-background border-border hover:border-primary/50'
                                        }`}
                                >
                                    {time}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="flex justify-between pt-8 border-t border-border/50">
                <Button variant="ghost" onClick={onBack} className="gap-2">
                    <BackIcon className="w-4 h-4" />
                    {language === 'ar' ? 'تغيير النوع' : 'Change Type'}
                </Button>
                <Button size="lg" onClick={onNext} disabled={!selectedDate || !selectedTime} className="gap-2 shadow-lg">
                    {language === 'ar' ? 'التالي: تأكيد البيانات' : 'Next: Your Details'}
                    <ArrowIcon className="w-5 h-5" />
                </Button>
            </div>
        </AnimatedSection>
    );
}
