
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Send } from 'lucide-react';

interface IdeaSubmissionFormProps {
    initialTrack?: 'visionary' | 'catalyst';
}

export const IdeaSubmissionForm = ({ initialTrack = 'visionary' }: IdeaSubmissionFormProps) => {
    const { language, t } = useLanguage();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [track, setTrack] = useState<'visionary' | 'catalyst'>(initialTrack);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success(language === 'ar' ? 'تم استلام طلبك بنجاح! سنتواصل معك قريباً.' : 'Application received successfully! We will contact you soon.');
        setIsSubmitting(false);
        // Reset form logic here if needed
    };

    return (
        <Card className="max-w-3xl mx-auto border-0 shadow-2xl bg-gradient-to-br from-background to-secondary/20">
            <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold">
                    {language === 'ar' ? 'ابدأ رحلة الشراكة' : 'Start Your Partnership Journey'}
                </CardTitle>
                <CardDescription className="text-lg">
                    {language === 'ar'
                        ? 'املأ النموذج أدناه وسيقوم فريقنا الاستراتيجي بدراسة طلبك'
                        : 'Fill the form below and our strategic team will review your application'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Track Selection */}
                    <div className="space-y-4">
                        <Label className="text-base font-semibold">
                            {language === 'ar' ? 'نوع الشراكة' : 'Partnership Type'}
                        </Label>
                        <RadioGroup
                            defaultValue={track}
                            onValueChange={(v) => setTrack(v as 'visionary' | 'catalyst')}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            <div>
                                <RadioGroupItem value="visionary" id="t-visionary" className="peer sr-only" />
                                <Label
                                    htmlFor="t-visionary"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                                >
                                    <span className="text-lg font-bold mb-1">{language === 'ar' ? 'شريك الفكرة' : 'The Visionary'}</span>
                                    <span className="text-xs text-muted-foreground text-center">
                                        {language === 'ar' ? 'أملك فكرة وخبرة وأبحث عن شريك تقني' : 'I have an idea & expertise, seeking a tech partner'}
                                    </span>
                                </Label>
                            </div>
                            <div>
                                <RadioGroupItem value="catalyst" id="t-catalyst" className="peer sr-only" />
                                <Label
                                    htmlFor="t-catalyst"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                                >
                                    <span className="text-lg font-bold mb-1">{language === 'ar' ? 'شريك المال' : 'The Catalyst'}</span>
                                    <span className="text-xs text-muted-foreground text-center">
                                        {language === 'ar' ? 'أبحث عن فرص استثمارية في مشاريع قائمة' : 'Seeking investment opportunities in live projects'}
                                    </span>
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">{language === 'ar' ? 'الاسم الكامل' : 'Full Name'}</Label>
                            <Input id="name" required placeholder={language === 'ar' ? 'الاسم...' : 'Name...'} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</Label>
                            <Input id="email" type="email" required placeholder="name@company.com" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="linkedin">{language === 'ar' ? 'رابط LinkedIn' : 'LinkedIn Profile'}</Label>
                        <Input id="linkedin" placeholder="https://linkedin.com/in/..." />
                    </div>

                    {track === 'visionary' ? (
                        <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
                            <div className="space-y-2">
                                <Label htmlFor="idea-title">{language === 'ar' ? 'عنوان الفكرة / المشروع' : 'Idea / Project Title'}</Label>
                                <Input id="idea-title" required placeholder={language === 'ar' ? 'مثال: منصة SaaS لإدارة العقارات...' : 'e.g. Real Estate SaaS Platform...'} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="idea-desc">{language === 'ar' ? 'شرح مختصر للفكرة والمشكلة التي تحلها' : 'Brief description of the idea and the problem it solves'}</Label>
                                <Textarea id="idea-desc" required className="min-h-[120px]" placeholder="..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="expertise">{language === 'ar' ? 'خبرتك في هذا المجال (لماذا أنت الشخص المناسب؟)' : 'Your domain expertise (Why you?)'}</Label>
                                <Textarea id="expertise" required className="min-h-[80px]" placeholder="..." />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
                            <div className="space-y-2">
                                <Label htmlFor="investment-range">{language === 'ar' ? 'نطاق الاستثمار المتوقع' : 'Expected Investment Range'}</Label>
                                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                    <option value="10k-50k">$10k - $50k</option>
                                    <option value="50k-100k">$50k - $100k</option>
                                    <option value="100k-500k">$100k - $500k</option>
                                    <option value="500k+">$500k+</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="interests">{language === 'ar' ? 'مجالات الاهتمام' : 'Areas of Interest'}</Label>
                                <Input id="interests" placeholder={language === 'ar' ? 'مثال: AI, EdTech, FinTech...' : 'e.g. AI, EdTech, FinTech...'} />
                            </div>
                        </div>
                    )}

                    <Button type="submit" size="lg" className="w-full text-lg" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {language === 'ar' ? 'جاري الإرسال...' : 'Sending...'}
                            </>
                        ) : (
                            <>
                                <Send className="mr-2 h-4 w-4" />
                                {language === 'ar' ? 'إرسال الطلب' : 'Submit Application'}
                            </>
                        )}
                    </Button>

                </form>
            </CardContent>
        </Card>
    );
};
