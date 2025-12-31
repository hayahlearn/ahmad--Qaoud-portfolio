import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Send, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { trackFormSubmission } from '@/components/GoogleAnalytics';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import { n8nService } from '@/lib/api/n8nService';
import { ContactFormData, getContactSchema, getWhyChooseMe } from './schema';
import { WhatsAppCard } from './WhatsAppCard';
import { ContactInfoCard } from './ContactInfoCard';
import { WhyChooseMeCard } from './WhyChooseMeCard';

function ErrorMessage({ message }: { message?: string }) {
    if (!message) return null;
    return (
        <p className="flex items-center gap-1.5 text-sm text-destructive mt-1.5">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {message}
        </p>
    );
}

export function ContactFormSection() {
    const { t, language } = useLanguage();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const whyChooseMe = getWhyChooseMe(language);

    const schema = getContactSchema(language);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(schema),
        mode: 'onBlur',
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);

        try {
            // Save to database
            const { error: dbError } = await supabase.from('contact_messages').insert({
                name: data.name,
                email: data.email,
                company: data.company || null,
                phone: data.phone || null,
                subject: data.subject,
                message: data.message,
            });

            if (dbError) throw dbError;

            // Also send email
            await supabase.functions.invoke('send-contact-email', {
                body: data,
            });

            // Trigger n8n Automation
            n8nService.submitContactForm({
                name: data.name,
                email: data.email,
                phone: data.phone,
                subject: data.subject,
                message: data.message
            }).catch(err => console.error('n8n Hook Failed:', err));

            reset();
            trackFormSubmission('contact_form', true);
            toast.success(
                language === 'ar'
                    ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.'
                    : 'Message sent successfully! We will contact you soon.'
            );
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            console.error('Error sending message:', message);
            trackFormSubmission('contact_form', false);
            toast.error(
                language === 'ar'
                    ? 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.'
                    : 'An error occurred while sending the message. Please try again.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-24 relative overflow-hidden bg-background">
            <div className="container relative z-10">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">
                        {language === 'ar' ? 'أو تفضل المسار الرسمي؟' : 'Or Prefer the Formal Track?'}
                    </h2>
                    <p className="text-muted-foreground">
                        {language === 'ar'
                            ? 'إذا كان لديك مشروع معقد أو تفضل المراسلات الرسمية الموثقة، يمكنك استخدام النموذج أدناه أو التواصل عبر واتساب.'
                            : 'If you have a complex project or prefer documented formal correspondence, use the form below or contact via WhatsApp.'}
                    </p>
                </div>

                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Contact Form */}
                    <AnimatedSection animation="fade-up">
                        <Card className="group relative border-0 bg-card/80 backdrop-blur-sm hover:shadow-glow transition-all duration-500 overflow-hidden">
                            {/* Gradient Border Effect */}
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/20 via-transparent to-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <CardContent className="relative p-8 lg:p-10">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary mb-6">
                                    <Send className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                        {language === 'ar' ? 'أرسل رسالتك' : 'Send Your Message'}
                                    </span>
                                </div>

                                <h2 className="text-3xl font-bold text-foreground mb-8">
                                    <span className="relative inline-block">
                                        {language === 'ar' ? 'نموذج التواصل' : 'Contact Form'}
                                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-gold rounded-full" />
                                    </span>
                                </h2>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-base font-medium">
                                                {t('contact.name')} <span className="text-destructive">*</span>
                                            </Label>
                                            <Input
                                                id="name"
                                                {...register('name')}
                                                className={`h-12 text-base bg-background/50 border-border/50 focus:border-primary transition-colors ${errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                                                placeholder={language === 'ar' ? 'أحمد محمد' : 'John Doe'}
                                            />
                                            <ErrorMessage message={errors.name?.message} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="company" className="text-base font-medium">
                                                {t('contact.company')}
                                            </Label>
                                            <Input
                                                id="company"
                                                {...register('company')}
                                                className={`h-12 text-base bg-background/50 border-border/50 focus:border-primary transition-colors ${errors.company ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                                                placeholder={language === 'ar' ? 'اسم الشركة (اختياري)' : 'Company name (optional)'}
                                            />
                                            <ErrorMessage message={errors.company?.message} />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-base font-medium">
                                                {t('contact.email')} <span className="text-destructive">*</span>
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                {...register('email')}
                                                className={`h-12 text-base bg-background/50 border-border/50 focus:border-primary transition-colors ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                                                placeholder="email@example.com"
                                            />
                                            <ErrorMessage message={errors.email?.message} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-base font-medium">
                                                {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                                            </Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                {...register('phone')}
                                                className={`h-12 text-base bg-background/50 border-border/50 focus:border-primary transition-colors ${errors.phone ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                                                placeholder={language === 'ar' ? '+20 xxx xxx xxxx' : '+1 xxx xxx xxxx'}
                                            />
                                            <ErrorMessage message={errors.phone?.message} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="subject" className="text-base font-medium">
                                            {language === 'ar' ? 'الموضوع' : 'Subject'} <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="subject"
                                            {...register('subject')}
                                            className={`h-12 text-base bg-background/50 border-border/50 focus:border-primary transition-colors ${errors.subject ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                                            placeholder={language === 'ar' ? 'موضوع رسالتك' : 'Message subject'}
                                        />
                                        <ErrorMessage message={errors.subject?.message} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message" className="text-base font-medium">
                                            {t('contact.message')} <span className="text-destructive">*</span>
                                        </Label>
                                        <Textarea
                                            id="message"
                                            rows={5}
                                            {...register('message')}
                                            className={`text-base resize-none bg-background/50 border-border/50 focus:border-primary transition-colors ${errors.message ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                                            placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                                        />
                                        <ErrorMessage message={errors.message?.message} />
                                    </div>

                                    {/* Submit Button with Glow */}
                                    <div className="relative group/btn">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-gold to-primary rounded-lg blur-lg opacity-30 group-hover/btn:opacity-60 transition-opacity duration-500" />
                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="relative w-full gap-3 h-14 text-base font-semibold bg-gradient-to-r from-primary to-navy dark:from-primary dark:to-primary/80 text-primary-foreground hover:from-primary hover:to-primary transition-all duration-300"
                                            disabled={isSubmitting}
                                        >
                                            <Send className="h-5 w-5" />
                                            {isSubmitting
                                                ? (language === 'ar' ? 'جاري الإرسال...' : 'Sending...')
                                                : t('contact.send')
                                            }
                                        </Button>
                                    </div>

                                    <p className="text-sm text-muted-foreground text-center">
                                        {language === 'ar'
                                            ? 'الحقول المميزة بـ (*) مطلوبة'
                                            : 'Fields marked with (*) are required'}
                                    </p>
                                </form>
                            </CardContent>
                        </Card>
                    </AnimatedSection>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        {/* WhatsApp CTA */}
                        <WhatsAppCard language={language} />

                        {/* Email Card */}
                        <ContactInfoCard
                            icon={Mail}
                            title={language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                            content="contact@ahmadqaoud.com"
                            href="mailto:contact@ahmadqaoud.com"
                            index={1}
                        />

                        {/* Service Areas */}
                        <ContactInfoCard
                            icon={MapPin}
                            title={language === 'ar' ? 'نطاق العمل' : 'Service Areas'}
                            content={language === 'ar' ? 'مصر • السعودية • الإمارات • الأردن' : 'Egypt • KSA • UAE • Jordan'}
                            index={2}
                        />

                        {/* Why Choose Me */}
                        <WhyChooseMeCard whyChooseMe={whyChooseMe} language={language} />
                    </div>
                </div>
            </div>
        </section>
    );
}
