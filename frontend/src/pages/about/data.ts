import { Language } from '@/contexts/LanguageContext';
import { Expertise, Certification, Stat, Country, Value, TimelineItem } from './types';
import { Code, Brain, Zap, TrendingUp, Building2, Users, Briefcase, MapPin, Target, Lightbulb } from 'lucide-react';

export const getExpertise = (language: Language): Expertise[] => [
    { icon: Code, name: language === 'ar' ? 'Python والأتمتة' : 'Python & Automation' },
    { icon: Brain, name: language === 'ar' ? 'الذكاء الاصطناعي' : 'Artificial Intelligence' },
    { icon: Zap, name: 'n8n Workflows' },
    { icon: TrendingUp, name: language === 'ar' ? 'التحول الرقمي' : 'Digital Transformation' },
    { icon: Building2, name: 'SaaS Development' },
    { icon: Users, name: language === 'ar' ? 'استشارات المؤسسات' : 'Enterprise Consulting' },
];

export const getTimeline = (language: Language): TimelineItem[] => [
    {
        year: '2003',
        title: language === 'ar' ? 'البداية: دقة الأنظمة الأمنية' : 'The Beginning: Security Systems',
        description: language === 'ar' ? 'انطلاقة في عالم الأنظمة الدقيقة حيث لا مجال للخطأ.' : 'Starting in the world of precision security systems where there is no room for error.',
        icon: Briefcase
    },
    {
        year: '2010',
        title: language === 'ar' ? 'التوسع الإقليمي' : 'Regional Expansion',
        description: language === 'ar' ? 'قيادة مشاريع تقنية كبرى في دول الخليج.' : 'Leading major tech projects in the Gulf region.',
        icon: MapPin
    },
    {
        year: '2018',
        title: language === 'ar' ? 'التحول للأتمتة' : 'Shift to Automation',
        description: language === 'ar' ? 'بناء أنظمة تقليل التكاليف التشغيلية.' : 'Building operational cost reduction systems.',
        icon: Zap
    },
    {
        year: '2021',
        title: language === 'ar' ? 'ابتكار الحلول السيادية' : 'Sovereign Solutions Innovation',
        description: language === 'ar' ? 'إطلاق "حياة" كأول منظومة تعليمية بذكاء اصطناعي سيادي.' : 'Launching "Hayah" as the first sovereign AI educational ecosystem.',
        icon: Brain
    },
    {
        year: '2024',
        title: language === 'ar' ? 'عصر الأوركسترا' : 'The Orchestrator Era',
        description: language === 'ar' ? 'تطوير العقل المدبر الذي يدير جيوشاً من الوكلاء الرقميين.' : 'Developing the mastermind managing armies of digital agents.',
        icon: Target
    },
];

export const certifications: Certification[] = [
    { name: 'Google Analytics', issuer: 'Google', year: '2023' },
    { name: 'Google Ads', issuer: 'Google', year: '2023' },
    { name: 'AI for Business', issuer: 'Coursera', year: '2024' },
    { name: 'Python for Data Science', issuer: 'IBM', year: '2023' },
    { name: 'Digital Marketing', issuer: 'HubSpot', year: '2022' },
    { name: 'n8n Expert', issuer: 'n8n.io', year: '2024' },
];

export const getStats = (language: Language): Stat[] => [
    { value: '+20', label: language === 'ar' ? 'عام خبرة' : 'Years Experience' },
    { value: '4', label: language === 'ar' ? 'منتجات SaaS' : 'SaaS Products' },
    { value: '+100', label: language === 'ar' ? 'مسار عمل' : 'Workflows' },
    { value: '+50', label: language === 'ar' ? 'عميل مميز' : 'Premium Clients' },
];

export const getCountries = (language: Language): Country[] => [
    { name: language === 'ar' ? 'مصر' : 'Egypt', flag: '🇪🇬' },
    { name: language === 'ar' ? 'السعودية' : 'Saudi Arabia', flag: '🇸🇦' },
    { name: language === 'ar' ? 'الإمارات' : 'UAE', flag: '🇦🇪' },
    { name: language === 'ar' ? 'الأردن' : 'Jordan', flag: '🇯🇴' },
    { name: language === 'ar' ? 'الكويت' : 'Kuwait', flag: '🇰🇼' },
];

export const getValues = (language: Language): Value[] => [
    {
        icon: Target,
        title: language === 'ar' ? 'نتائج قابلة للقياس' : 'Measurable Results',
        description: language === 'ar' ? 'لا أعد بالنجاح فقط، بل أقدم نتائج موثقة بالأرقام' : "I don't just promise success, I deliver documented results"
    },
    {
        icon: Lightbulb,
        title: language === 'ar' ? 'ابتكار مستمر' : 'Continuous Innovation',
        description: language === 'ar' ? 'أبقى دائماً على اطلاع بأحدث التقنيات والأدوات' : 'Always staying updated with latest technologies'
    },
    {
        icon: Users,
        title: language === 'ar' ? 'شراكة حقيقية' : 'True Partnership',
        description: language === 'ar' ? 'أتعامل مع كل عميل كشريك وليس مجرد مشروع' : 'I treat every client as a partner, not just a project'
    },
];

export const getSuccessStory = (language: Language) => ({
    subtitle: language === 'ar' ? 'قصة نجاح' : 'Success Story',
    title: language === 'ar' ? 'منظومة حياة' : 'Hayah Ecosystem',
    content: language === 'ar'
        ? 'أول منظومة تعليمية سيادية تعمل بالكامل بالذكاء الاصطناعي، تخدم آلاف الطلاب وتقدم تجربة تعليمية فريدة.'
        : 'The first sovereign educational ecosystem fully powered by AI, serving thousands of students and delivering a unique learning experience.'
});

export const certificateImages = [
    '/certificates/WhatsApp Image 2025-12-28 at 7.34.29 AM.jpeg',
    '/certificates/WhatsApp Image 2025-12-28 at 7.34.29 AM (1).jpeg',
    '/certificates/WhatsApp Image 2025-12-28 at 7.34.28 AM.jpeg',
];
