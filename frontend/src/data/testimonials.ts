import { Testimonial } from '@/types';

// Extended Testimonial type to include case study link
export interface CaseStudyTestimonial extends Testimonial {
    caseStudyId: string;
    industry: { ar: string; en: string };
    industryColor: string; // e.g. 'blue-500'
}

export const CASE_STUDY_TESTIMONIALS: CaseStudyTestimonial[] = [
    {
        id: 1,
        caseStudyId: 'smart-logistics',
        industry: { ar: 'لوجستيات', en: 'Logistics' },
        industryColor: 'blue',
        name: { ar: 'أحمد الفهد', en: 'Ahmad Al-Fahid' },
        role: { ar: 'مدير العمليات', en: 'Operations Manager' },
        content: {
            ar: 'كنا نعاني من فوضى حقيقية مع كل موسم ضغط. النظام الجديد منحنا "عيوناً" على كل شحنة. انخفضت مكالمات الشكاوى بنسبة 90%.',
            en: 'We faced chaos every peak season. The new system gave us "eyes" on every shipment. Complaint calls dropped by 90%.'
        },
        rating: 5,
        initials: 'أ ف'
    },
    {
        id: 2,
        caseStudyId: 'medical-booking-bot',
        industry: { ar: 'رعاية صحية', en: 'Healthcare' },
        industryColor: 'emerald',
        name: { ar: 'د. سارة العمري', en: 'Dr. Sarah Al-Omari' },
        role: { ar: 'المدير الطبي', en: 'Medical Director' },
        content: {
            ar: 'موظفو الاستقبال أكثر راحة، والمرضى سعداء بسهولة الحجز. النظام يعمل كأنه موظف إضافي لا ينام.',
            en: 'Reception staff are relieved, and patients love the ease of booking. It works like an extra employee who never sleeps.'
        },
        rating: 5,
        initials: 'د.س'
    },
    {
        id: 3,
        caseStudyId: 'fashion-ecommerce',
        industry: { ar: 'تجارة إلكترونية', en: 'E-commerce' },
        industryColor: 'pink',
        name: { ar: 'عمر خالد', en: 'Omar Khaled' },
        role: { ar: 'الرئيس التنفيذي', en: 'CEO' },
        content: {
            ar: 'في الجمعة البيضاء، استقبلنا 50 ألف زائر في ساعة ولم يتأثر الموقع. هذا الاستثمار هو الأفضل لنا هذا العام.',
            en: 'On Black Friday, we hit 50k visitors in an hour and the site stood strong. Best investment we made this year.'
        },
        rating: 5,
        initials: 'ع خ'
    },
    {
        id: 4,
        caseStudyId: 'fintech-security',
        industry: { ar: 'المالية', en: 'Fintech' },
        industryColor: 'violet',
        name: { ar: 'م. زياد الطويل', en: 'Eng. Ziad Al-Tawil' },
        role: { ar: 'CTO', en: 'CTO' },
        content: {
            ar: 'كشف أنماط الاحتيال كان كابوساً. الآن النظام يوقف العمليات المشبوهة قبل حدوثها بدقة مذهلة.',
            en: 'Detecting fraud patterns was a nightmare. Now the system stops suspicious txns before they happen with amazing accuracy.'
        },
        rating: 5,
        initials: 'م.ز'
    },
    {
        id: 5,
        caseStudyId: 'edtech-platform',
        industry: { ar: 'التعليم', en: 'Education' },
        industryColor: 'cyan',
        name: { ar: 'د. نورة السالم', en: 'Dr. Noura Al-Salem' },
        role: { ar: 'عميد القبول والتسجيل', en: 'Dean of Admissions' },
        content: {
            ar: 'الطلاب شعروا أن المحتوى مصمم خصيصاً لهم. رأينا قفزة في معدلات الإكمال لم نشهدها من قبل.',
            en: 'Students felt the content was tailored just for them. We saw a completion rate jump we\'ve never seen before.'
        },
        rating: 5,
        initials: 'د.ن'
    },
    {
        id: 6,
        caseStudyId: 'legal-firm-docs',
        industry: { ar: 'قانون', en: 'Legal' },
        industryColor: 'amber',
        name: { ar: 'فيصل القحطاني', en: 'Faisal Al-Qahtani' },
        role: { ar: 'شريك إداري', en: 'Managing Partner' },
        content: {
            ar: 'ما كان يستغرق يومين من البحث في الأوراق، أصبح يتم في ثوانٍ. هذا ليس مجرد توفير للوقت، بل دقة لا تقبل الخطأ.',
            en: 'What took days of paper searching is now done in seconds. It\'s not just time-saving, it\'s zero-error accuracy.'
        },
        rating: 5,
        initials: 'ف ق'
    }
];
