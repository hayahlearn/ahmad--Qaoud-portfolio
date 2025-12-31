import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { trackConsultationBooking, trackEvent } from '@/components/GoogleAnalytics';
import { supabase } from '@/integrations/supabase/client';

import { BookingHeroSection } from './BookingHeroSection';
import { BookingSummary, BookingTrust } from './BookingSummary';
import { StepTypeSelection } from './StepTypeSelection';
import { StepDateTimeSelection } from './StepDateTimeSelection';
import { StepContactDetails } from './StepContactDetails';

const BookConsultation = () => {
    const { language } = useLanguage();
    const { toast } = useToast();

    const [step, setStep] = useState(1);
    const [selectedType, setSelectedType] = useState('gap-analysis');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { error } = await supabase.from('consultations').insert({
                consultation_type: selectedType,
                selected_date: new Date(selectedDate).toISOString().split('T')[0],
                selected_time: selectedTime,
                name: formData.name,
                email: formData.email,
                company: formData.company || null,
                phone: formData.phone || null,
                message: formData.message || null,
            });

            if (error) throw error;

            try {
                const formattedDate = new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }).format(new Date(selectedDate));

                await supabase.functions.invoke('send-booking-notification', {
                    body: {
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        company: formData.company,
                        consultationType: selectedType,
                        selectedDate: formattedDate,
                        selectedTime: selectedTime,
                        message: formData.message
                    }
                });
            } catch (emailError) {
                console.error('Error sending email notification:', emailError);
            }

            trackConsultationBooking(selectedType);
            trackEvent('booking_completed', {
                consultation_type: selectedType,
                selected_date: selectedDate,
                selected_time: selectedTime
            });

            toast({
                title: language === 'ar' ? 'تم الحجز بنجاح! 🎉' : 'Booking Confirmed! 🎉',
                description: language === 'ar'
                    ? 'سنتواصل معك خلال 24 ساعة لتأكيد الموعد'
                    : 'We will contact you within 24 hours to confirm the appointment',
            });
            setStep(1);
            setSelectedType('gap-analysis');
            setSelectedDate('');
            setSelectedTime('');
            setFormData({ name: '', email: '', company: '', phone: '', message: '' });
        } catch (error) {
            console.error('Error saving consultation:', error);
            toast({
                title: language === 'ar' ? 'حدث خطأ' : 'Error',
                description: language === 'ar'
                    ? 'حدث خطأ أثناء الحجز. يرجى المحاولة مرة أخرى'
                    : 'Error occurred while booking. Please try again',
                variant: 'destructive'
            });
        }
    };

    return (
        <Layout>
            <SEO
                title={language === 'ar' ? 'احجز استشارة مجانية' : 'Book Free Consultation'}
                description={language === 'ar'
                    ? 'احجز استشارة مجانية لتحليل الفجوات الرقمية وزيادة كفاءة أعمالك'
                    : 'Book a free consultation for digital gap analysis and business efficiency'}
                url="/book"
            />

            {/* Hero Section */}
            <BookingHeroSection />

            {/* Booking Form Section */}
            <section className="py-20 relative">
                <div className="container max-w-6xl">
                    <div className="grid lg:grid-cols-12 gap-8">

                        {/* Steps & Form Area */}
                        <div className="lg:col-span-8">
                            <Card className="border-border/50 shadow-2xl bg-card/50 backdrop-blur-xl overflow-hidden relative">
                                {/* Decorative gradients */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                                <CardContent className="p-6 md:p-8">
                                    {/* Progress Indicator */}
                                    <div className="flex items-center justify-between mb-8 relative">
                                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-border -z-10" />
                                        {[1, 2, 3].map((s) => (
                                            <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 z-10 ${step >= s ? 'bg-primary text-primary-foreground shadow-lg scale-110' : 'bg-secondary text-muted-foreground border-4 border-background'
                                                }`}>
                                                {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Step 1: Choose Type */}
                                    {step === 1 && (
                                        <StepTypeSelection
                                            selectedType={selectedType}
                                            onSelectType={setSelectedType}
                                            onNext={() => setStep(2)}
                                        />
                                    )}

                                    {/* Step 2: Date & Time */}
                                    {step === 2 && (
                                        <StepDateTimeSelection
                                            selectedDate={selectedDate}
                                            selectedTime={selectedTime}
                                            onDateChange={setSelectedDate}
                                            onTimeChange={setSelectedTime}
                                            onNext={() => setStep(3)}
                                            onBack={() => setStep(1)}
                                        />
                                    )}

                                    {/* Step 3: Details */}
                                    {step === 3 && (
                                        <StepContactDetails
                                            formData={formData}
                                            onChange={setFormData}
                                            onSubmit={handleSubmit}
                                            onBack={() => setStep(2)}
                                        />
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar - Summary & Trust */}
                        <div className="lg:col-span-4 space-y-6">
                            <BookingSummary
                                selectedType={selectedType}
                                selectedDate={selectedDate}
                                selectedTime={selectedTime}
                            />
                            <BookingTrust />
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default BookConsultation;
