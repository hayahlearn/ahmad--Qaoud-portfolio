import React from 'react';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

interface ContactFormData {
    name: string;
    email: string;
    company: string;
    phone: string;
    message: string;
}

interface StepContactDetailsProps {
    formData: ContactFormData;
    onChange: (data: ContactFormData) => void;
    onSubmit: (e: React.FormEvent) => void;
    onBack: () => void;
}

export function StepContactDetails({ formData, onChange, onSubmit, onBack }: StepContactDetailsProps) {
    const { language, direction } = useLanguage();
    const BackIcon = direction === 'rtl' ? ChevronRight : ChevronLeft;

    const handleInputChange = (field: string, value: string) => {
        onChange({ ...formData, [field]: value });
    };

    return (
        <AnimatedSection animation="fade-up" className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">{language === 'ar' ? 'أكمل بياناتك لتأكيد الحجز' : 'Complete details to confirm'}</h2>
                <p className="text-muted-foreground">{language === 'ar' ? 'لم يتبقى سوى خطوة واحدة!' : 'Only one step left!'}</p>
            </div>

            <form onSubmit={onSubmit} className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">{language === 'ar' ? 'الاسم الكامل' : 'Full Name'} *</Label>
                        <Input id="name" required value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} className="h-12 bg-background/50" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'} *</Label>
                        <Input id="email" type="email" required value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="h-12 bg-background/50" />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="phone">{language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</Label>
                        <Input id="phone" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="h-12 bg-background/50" placeholder="+966..." />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="company">{language === 'ar' ? 'اسم الشركة' : 'Company Name'}</Label>
                        <Input id="company" value={formData.company} onChange={(e) => handleInputChange('company', e.target.value)} className="h-12 bg-background/50" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="message">{language === 'ar' ? 'ملاحظات إضافية (اختياري)' : 'Additional Notes (Optional)'}</Label>
                    <Textarea id="message" rows={4} value={formData.message} onChange={(e) => handleInputChange('message', e.target.value)} className="bg-background/50 resize-none" />
                </div>

                <div className="flex justify-between pt-8 border-t border-border/50">
                    <Button type="button" variant="ghost" onClick={onBack} className="gap-2">
                        <BackIcon className="w-4 h-4" />
                        {language === 'ar' ? 'تغيير الموعد' : 'Change Time'}
                    </Button>
                    <Button type="submit" size="lg" className="gap-2 text-lg px-8 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                        {language === 'ar' ? 'تأكيد الحجز مجاناً' : 'Confirm Free Booking'}
                        <CheckCircle2 className="w-5 h-5" />
                    </Button>
                </div>
            </form>
        </AnimatedSection>
    );
}
