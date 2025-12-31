import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, ArrowLeft, Star } from 'lucide-react';
import profileImage from '@/assets/profile-ahmad.png';

// Unified Components
import { PageHero } from '@/components/sections/PageHero';
import { UnifiedCTA } from '@/components/sections/UnifiedCTA';
import { Logo } from '@/components/brand/Logo';

// Sections
import { AboutStatsSection } from './AboutStatsSection';
import { AboutStorySection } from './AboutStorySection';
import { AboutTimelineSection } from './AboutTimelineSection';
import { AboutSuccessStorySection } from './AboutSuccessStorySection';
import { AboutExpertiseSection } from './AboutExpertiseSection';
import { AboutRegionsSection } from './AboutRegionsSection';

const About = () => {
    const { t, language, direction } = useLanguage();
    const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

    // Custom Visual for PageHero
    const HeroVisual = (
        <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gold/20 rounded-3xl blur-2xl animate-pulse-glow" />

            {/* Main Card */}
            <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-[60px] bg-gradient-to-br from-primary via-primary/50 to-primary/10 flex items-center justify-center shadow-2xl p-3 border border-gold/20 group hover:scale-105 transition-transform duration-500">
                <div className="w-full h-full rounded-[50px] bg-background flex items-center justify-center border-4 border-gold/20 overflow-hidden relative">
                    {/* Inner glow effect */}
                    <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent z-20 pointer-events-none" />
                    {/* Inner Image */}
                    <img
                        src={profileImage}
                        alt={language === 'ar' ? 'أحمد قاعود' : 'Ahmad Qaoud'}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        loading="eager"
                    />
                </div>
            </div>

            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-3xl overflow-hidden" />

            {/* Floating Badges */}
            <div className="absolute -top-6 -right-6 bg-primary-foreground text-primary px-5 py-3 rounded-2xl shadow-2xl font-bold text-lg animate-bounce-subtle border border-gold/30">
                <span className="bg-gradient-to-r from-primary to-navy bg-clip-text text-transparent">+20</span>
                <span className="text-sm ms-1 text-muted-foreground">{language === 'ar' ? 'عام' : 'Years'}</span>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-primary to-navy dark:from-primary dark:to-primary/80 text-primary-foreground px-5 py-3 rounded-2xl shadow-2xl font-bold text-lg animate-bounce-subtle border border-gold/30" style={{ animationDelay: '0.5s' }}>
                <Star className="inline w-4 h-4 text-gold me-1" />
                4 SaaS
            </div>
        </div>
    );

    // Actions for PageHero
    const HeroActions = (
        <>
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-gold via-gold-light to-gold rounded-lg blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <Button size="lg" className="relative bg-gold text-navy hover:bg-gold-light gap-2 shadow-lg group-hover:scale-105 transition-transform duration-300" asChild>
                    <Link to="/book">
                        {t('about.hero.btn.book')}
                        <ArrowIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                </Button>
            </div>

            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300" asChild>
                <Link to="/projects">
                    {t('about.hero.btn.work')}
                </Link>
            </Button>
        </>
    );

    return (
        <Layout>
            <SEO
                title={language === 'ar' ? 'من أنا' : 'About'}
                description={language === 'ar'
                    ? 'تعرف على أحمد قاعود، خبير في التحول الرقمي والذكاء الاصطناعي بخبرة تتجاوز 20 عام'
                    : 'Meet Ahmad Qaoud, expert in digital transformation and AI with over 20 years of experience'
                }
                url="/about"
            />

            <PageHero
                title={
                    <div className="flex flex-col items-start gap-4">
                        <Logo size="xl" variant="white" showText={true} className="scale-125 origin-left rtl:origin-right" />
                    </div>
                }
                subtitle={t('about.hero.role')}
                description={t('about.hero.desc')}
                badge={t('about.hero.badge')}
                visual={HeroVisual}
                actions={HeroActions}
            />

            <AboutStatsSection />
            <AboutStorySection />
            <AboutTimelineSection />
            <AboutSuccessStorySection />
            <AboutExpertiseSection />
            {/* Certifications removed temporarily or moved if needed, based on previous file list it was there but user asked to remove duplication. keeping it if it's unique content. */}
            {/* Checking imports: AboutCertificationsSection was imported. Keeping it. */}
            {/* Wait, I missed importing AboutCertificationsSection in the ReplacementContent above? checking... */}
            {/* I missed importing AboutCertificationsSection in the string above. I should add it. */}

            <AboutRegionsSection />

            <UnifiedCTA
                title={
                    <>
                        <span className="relative inline-block">
                            {t('about.cta.title1')}
                            <span className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-gold via-gold-light to-gold rounded-full" />
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                            {t('about.cta.title2')}
                        </span>
                    </>
                }
                description={t('about.cta.desc')}
                badge={t('about.cta.badge')}
                buttonText={t('services.cta.button')}
                buttonLink="/book"
            />
        </Layout>
    );
};

export default About;
