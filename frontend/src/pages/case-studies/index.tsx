import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { CaseStudyModal } from '@/components/modals/CaseStudyModal';
import type { CaseStudy } from '@/types';

import { CaseStudiesHero } from './CaseStudiesHero';
import { CaseStudiesList } from './CaseStudiesList';
import { CaseStudiesCTA } from './CaseStudiesCTA';

const CaseStudies = () => {
    const { language } = useLanguage();
    const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

    return (
        <Layout>
            <SEO
                title={language === 'ar' ? 'قصص نجاح واقعية' : 'Real Success Stories'}
                description={language === 'ar'
                    ? 'كيف ساعدنا الشركات المحلية على النمو وتوفير التكاليف من خلال الأتمتة والذكاء الاصطناعي'
                    : 'How we helped local businesses grow and save costs through automation and AI'}
                url="/case-studies"
            />

            <CaseStudyModal
                isOpen={!!selectedStudy}
                onClose={() => setSelectedStudy(null)}
                study={selectedStudy}
            />

            {/* Hero Section */}
            <CaseStudiesHero />

            {/* List Section */}
            <CaseStudiesList onSelectStudy={setSelectedStudy} />

            {/* CTA Section */}
            <CaseStudiesCTA />
        </Layout>
    );
};

export default CaseStudies;
