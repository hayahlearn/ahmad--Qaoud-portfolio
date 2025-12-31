import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';

// Unified Components
import { PageHero } from '@/components/sections/PageHero';

// Sections
import { ContactFormSection } from './ContactFormSection';
import { ContactMapSection } from './ContactMapSection';
import { EmbeddedChat } from '@/components/EmbeddedChat';

const Contact = () => {
    const { language } = useLanguage();

    const ContactVisual = (
        <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
            <EmbeddedChat />
            {/* Decorative Elements around chat */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-gold/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl animate-pulse" />
        </div>
    );

    const SocialProof = (
        <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-4 rtl:space-x-reverse">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-primary bg-background/50 backdrop-blur flex items-center justify-center text-xs font-bold">
                        {String.fromCharCode(64 + i)}
                    </div>
                ))}
            </div>
            <div className="text-sm text-primary-foreground/70">
                <p className="font-bold text-white">12+ {language === 'ar' ? 'شركة' : 'Companies'}</p>
                <p>{language === 'ar' ? 'تواصلوا اليوم' : 'Contacted today'}</p>
            </div>
        </div>
    );

    return (
        <Layout>
            <SEO
                title={language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                description={language === 'ar'
                    ? 'تواصل مع أحمد قاعود للحصول على استشارة مجانية في التحول الرقمي والذكاء الاصطناعي'
                    : 'Contact Ahmad Qaoud for a free consultation on digital transformation and AI'
                }
                url="/contact"
            />

            <PageHero
                title={
                    <>
                        {language === 'ar' ? 'تحدث مع' : 'Talk to'} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-white">
                            {language === 'ar' ? 'عقلي الرقمي' : 'My Digital Brain'}
                        </span>
                    </>
                }
                badge={
                    <div className="inline-flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span>{language === 'ar' ? 'متاح الآن' : 'Available Now'}</span>
                    </div>
                }
                description={
                    <div className="space-y-6">
                        <p>
                            {language === 'ar'
                                ? 'لماذا تنتظر؟ المساعد الذكي متاح 24/7 للإجابة على استفساراتك حول الخدمات، الأسعار، وحجز الاستشارات فوراً.'
                                : 'Why wait? My AI Assistant is available 24/7 to answer your questions about services, pricing, and booking strictly immediately.'
                            }
                        </p>
                        {SocialProof}
                    </div>
                }
                visual={ContactVisual}
                visualWidth="wide"
            />

            <ContactFormSection />
            <ContactMapSection />
        </Layout>
    );
};

export default Contact;
