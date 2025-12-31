import { Video, MessageSquare, Zap, Shield, Clock, Users, Star } from 'lucide-react';
import { ConsultationType, Benefit } from './types';

export const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'
];

export const consultationTypes: ConsultationType[] = [
    {
        id: 'gap-analysis',
        icon: Video,
        title: { ar: 'تحليل الفجوات الرقمية', en: 'Digital Gap Analysis' },
        duration: '30 min',
        description: { ar: 'تشخيص دقيق لوضعك الحالي وتحديد فرص توفير التكاليف المهدرة', en: 'Precise diagnosis of your current state and identification of wasted cost opportunities' },
        features: { ar: ['تحليل النضج الرقمي', 'كشف هدر الموارد', 'خارطة طريق أولية'], en: ['Digital maturity analysis', 'Resource waste detection', 'Initial roadmap'] },
        recommended: true,
        color: 'from-primary/20 to-primary/5',
        borderColor: 'border-primary/30'
    },
    {
        id: 'revenue-engineering',
        icon: MessageSquare,
        title: { ar: 'هندسة العائد الرقمي', en: 'Digital Revenue Engineering' },
        duration: '60 min',
        description: { ar: 'خطة عملية لرفع الكفاءة 200% وخفض التكاليف التشغيلية 40%', en: 'Practical plan to boost efficiency by 200% and cut operational costs by 40%' },
        features: { ar: ['استراتيجية الأتمتة الشاملة', 'نموذج العائد على الاستثمار', 'خطة التنفيذ المرحلية'], en: ['Comprehensive automation strategy', 'ROI model', 'Phased implementation plan'] },
        recommended: false,
        color: 'from-blue-500/20 to-blue-500/5',
        borderColor: 'border-blue-500/30'
    },
    {
        id: 'sovereign-arch',
        icon: Zap,
        title: { ar: 'تصميم الحلول السيادية', en: 'Sovereign Solutions Architecture' },
        duration: '45 min',
        description: { ar: 'تصميم أنظمة ذكية مملوكة بالكامل تضمن استقلالية البيانات وعدم التبعية', en: 'Designing fully owned smart systems ensuring data sovereignty and zero vendor lock-in' },
        features: { ar: ['تصميم البنية التحتية الخاصة', 'درع الحماية من التبعية', 'معايير الأمان السيادي'], en: ['Private infrastructure design', 'Vendor lock-in shield', 'Sovereign security standards'] },
        recommended: false,
        color: 'from-amber-500/20 to-amber-500/5',
        borderColor: 'border-amber-500/30'
    },
];

export const benefits: Benefit[] = [
    {
        icon: Shield,
        title: { ar: 'مجاني 100%', en: '100% Free' },
        desc: { ar: 'بدون أي التزامات', en: 'No obligations' }
    },
    {
        icon: Clock,
        title: { ar: 'رد خلال 24 ساعة', en: 'Reply within 24h' },
        desc: { ar: 'تأكيد سريع للموعد', en: 'Quick appointment confirmation' }
    },
    {
        icon: Users,
        title: { ar: 'خبرة +20 عام', en: '20+ Years Experience' },
        desc: { ar: 'استشارة من خبير', en: 'Expert consultation' }
    },
    {
        icon: Star,
        title: { ar: 'عملاء راضون', en: 'Satisfied Clients' },
        desc: { ar: '50+ عميل مؤسسي', en: '50+ Enterprise clients' }
    },
];
