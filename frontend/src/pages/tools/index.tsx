
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import ROICalculator from '@/components/tools/ROICalculator';
import DigitalMaturityAssessment from '@/components/tools/DigitalMaturityAssessment';
import { Cpu, TrendingUp } from 'lucide-react';

const ToolsPage = () => {
    const { language } = useLanguage();

    return (
        <Layout>
            <SEO
                title={language === 'ar' ? 'أدوات ذكية - قياس أداء شركتك' : 'Smart Tools - Measure Your Performance'}
                description={language === 'ar'
                    ? 'أدوات تفاعلية لحساب العائد على الاستثمار وتقييم مستوى النضج الرقمي لمؤسستك.'
                    : 'Interactive tools to calculate ROI and assess your organization\'s digital maturity.'}
                url="/tools"
            />

            {/* Hero Section */}
            <section className="py-20 bg-gradient-hero text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/5 mask-radial-faded" />
                <div className="container relative z-10">
                    <AnimatedSection animation="fade-up">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            {language === 'ar' ? 'الأدوات التفاعلية' : 'Interactive Tools'}
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            {language === 'ar'
                                ? 'استخدم أدواتنا الذكية لاكتشاف فرص التحسين وقياس الأثر المتوقع للتحول الرقمي في مؤسستك.'
                                : 'Use our smart tools to discover improvement opportunities and measure the expected impact of digital transformation.'}
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            <div className="container py-16 space-y-24">

                {/* ROI Section */}
                <section id="roi-calculator" className="scroll-mt-20">
                    <AnimatedSection animation="fade-up">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-secondary/10 rounded-full">
                                <TrendingUp className="w-8 h-8 text-secondary-foreground" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold">
                                    {language === 'ar' ? 'حاسبة العائد على الاستثمار' : 'ROI Calculator'}
                                </h2>
                                <p className="text-muted-foreground">
                                    {language === 'ar' ? 'الأرقام لا تكذب. احسب جدوى الأتمتة.' : 'Numbers don\'t lie. Calculate automation viability.'}
                                </p>
                            </div>
                        </div>
                        <ROICalculator />
                    </AnimatedSection>
                </section>

                {/* Maturity Assessment Section */}
                <section id="maturity-assessment" className="scroll-mt-20">
                    <AnimatedSection animation="fade-up" delay={200}>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-primary/10 rounded-full">
                                <Cpu className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold">
                                    {language === 'ar' ? 'تقييم النضج الرقمي' : 'Digital Maturity Assessment'}
                                </h2>
                                <p className="text-muted-foreground">
                                    {language === 'ar' ? 'أين تقف مؤسستك الآن؟ واكتشف الخطوة القادمة.' : 'Where does your org stand? Discover the next step.'}
                                </p>
                            </div>
                        </div>
                        <div className="max-w-3xl mx-auto">
                            <DigitalMaturityAssessment />
                        </div>
                    </AnimatedSection>
                </section>

            </div>
        </Layout>
    );
};

export default ToolsPage;
