import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, Star, CalendarCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { consultationTypes } from './data';

interface BookingSummaryProps {
    selectedType: string;
    selectedDate: string;
    selectedTime: string;
}

export function BookingSummary({ selectedType, selectedDate, selectedTime }: BookingSummaryProps) {
    const { language } = useLanguage();
    const selectedConsultation = consultationTypes.find(t => t.id === selectedType);

    return (
        <Card className="border-border/50 shadow-lg bg-card/80 backdrop-blur-md sticky top-24">
            <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                    <CalendarCheck className="w-5 h-5 text-primary" />
                    {language === 'ar' ? 'ملخص الجلسة' : 'Session Summary'}
                </h3>

                {selectedType && selectedConsultation ? (
                    <div className="space-y-4">
                        <div className="rounded-lg bg-primary/10 p-4 border border-primary/10">
                            <div className="flex gap-3">
                                <selectedConsultation.icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-sm">{selectedConsultation.title[language]}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge variant="outline" className="text-[10px] h-5 px-1">{selectedConsultation.duration}</Badge>
                                        <Badge variant="outline" className="text-[10px] h-5 px-1 bg-green-500/10 text-green-600 border-green-500/20">{language === 'ar' ? 'مجاني' : 'Free'}</Badge>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {selectedDate && (
                            <div className="flex items-center gap-3 text-sm p-3 rounded-lg bg-muted/50 border border-border/50">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <span>{new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : 'en-US', { dateStyle: 'full' }).format(new Date(selectedDate))}</span>
                            </div>
                        )}

                        {selectedTime && (
                            <div className="flex items-center gap-3 text-sm p-3 rounded-lg bg-muted/50 border border-border/50">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span>{selectedTime}</span>
                            </div>
                        )}

                        <div className="border-t border-border/50 pt-4 mt-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">{language === 'ar' ? 'قيمة الاستشارة' : 'Value'}</span>
                                <span className="line-through text-muted-foreground">$150</span>
                            </div>
                            <div className="flex justify-between items-center mt-1 font-bold">
                                <span>{language === 'ar' ? 'التكلفة عليك' : 'Your Cost'}</span>
                                <span className="text-green-600 text-lg">{language === 'ar' ? '0.00' : 'FREE'}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground text-center py-8 opacity-70">
                        {language === 'ar' ? 'اختر تفاصيل الاستشارة لتظهر هنا' : 'Select consultation details to summary'}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}

export function BookingTrust() {
    const { language } = useLanguage();

    return (
        <Card className="border-border/50 shadow-sm bg-accent/5">
            <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex -space-x-3 rtl:space-x-reverse">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-gray-300 flex items-center justify-center text-[10px] font-bold text-gray-500">
                                {/* Placeholder avatars */}
                                C{i}
                            </div>
                        ))}
                    </div>
                    <div className="text-sm">
                        <div className="font-bold flex items-center gap-1">
                            5.0 <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                        </div>
                        <span className="text-muted-foreground text-xs">{language === 'ar' ? 'من 50+ شركة ناشئة' : 'From 50+ Startups'}</span>
                    </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                    {language === 'ar'
                        ? '"ساعدنا أحمد في توفير 40% من تكاليف السحابة في أول شهر."'
                        : '"Ahmad helped us save 40% on cloud costs in the first month."'}
                </p>
            </CardContent>
        </Card>
    );
}
