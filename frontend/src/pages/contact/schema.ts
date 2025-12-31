import { Language } from '@/contexts/LanguageContext';
import { z } from 'zod';

// Validation schema for Arabic
export const contactSchemaAr = z.object({
    name: z.string()
        .trim()
        .min(2, { message: 'الاسم يجب أن يكون حرفين على الأقل' })
        .max(100, { message: 'الاسم يجب أن يكون أقل من 100 حرف' }),
    company: z.string().trim().max(100, { message: 'اسم الشركة يجب أن يكون أقل من 100 حرف' }).optional(),
    email: z.string()
        .trim()
        .email({ message: 'البريد الإلكتروني غير صالح' })
        .max(255, { message: 'البريد الإلكتروني يجب أن يكون أقل من 255 حرف' }),
    phone: z.string()
        .trim()
        .regex(/^[\d\s\-+()]*$/, { message: 'رقم الهاتف غير صالح' })
        .optional()
        .or(z.literal('')),
    subject: z.string()
        .trim()
        .min(3, { message: 'الموضوع يجب أن يكون 3 أحرف على الأقل' })
        .max(200, { message: 'الموضوع يجب أن يكون أقل من 200 حرف' }),
    message: z.string()
        .trim()
        .min(10, { message: 'الرسالة يجب أن تكون 10 أحرف على الأقل' })
        .max(2000, { message: 'الرسالة يجب أن تكون أقل من 2000 حرف' }),
});

// Validation schema for English
export const contactSchemaEn = z.object({
    name: z.string()
        .trim()
        .min(2, { message: 'Name must be at least 2 characters' })
        .max(100, { message: 'Name must be less than 100 characters' }),
    company: z.string().trim().max(100, { message: 'Company must be less than 100 characters' }).optional(),
    email: z.string()
        .trim()
        .email({ message: 'Invalid email address' })
        .max(255, { message: 'Email must be less than 255 characters' }),
    phone: z.string()
        .trim()
        .regex(/^[\d\s\-+()]*$/, { message: 'Invalid phone number' })
        .optional()
        .or(z.literal('')),
    subject: z.string()
        .trim()
        .min(3, { message: 'Subject must be at least 3 characters' })
        .max(200, { message: 'Subject must be less than 200 characters' }),
    message: z.string()
        .trim()
        .min(10, { message: 'Message must be at least 10 characters' })
        .max(2000, { message: 'Message must be less than 2000 characters' }),
});

export type ContactFormData = z.infer<typeof contactSchemaAr>;

export const getContactSchema = (language: Language) =>
    language === 'ar' ? contactSchemaAr : contactSchemaEn;

// Why Choose Me data
export const getWhyChooseMe = (language: Language): string[] =>
    language === 'ar'
        ? [
            'مهندس العائد الرقمي: لا أنفذ مهام، بل أصنع قيمة مضافة',
            'مؤسس منصة "حياة": أول منظومة تعليمية ذكية تخدم 10,000+ مستخدم',
            'مهندس "أوركسترا": عقل مدبر يدير جيوشاً من الوكلاء الرقميين',
            'خبرة 20+ عاماً: من الأنظمة الأمنية المعقدة إلى الذكاء السيادي',
            'درع الحماية من الاحتكار (Vendor Lock-in Shield)',
            'تحقيق وفر 40% في التكاليف و 200% في الكفاءة التشغيلية',
            'شريك استراتيجي يفهم لغة "البزنس" بنفس عمق لغة "الكود"',
        ]
        : [
            'Digital Revenue Engineer: Creating Value, Not Just Executing Tasks',
            'Founder of "Hayah": Smart Platform Serving 10,000+ Users',
            'Architect of "Orchestrator": Managing Armies of Digital Agents',
            '20+ Years Legacy: From Security Systems to Sovereign AI',
            'Vendor Lock-in Shield Strategy Implementation',
            'Delivering 40% Cost Reduction & 200% Efficiency Boost',
            'Strategic Partner Understanding "Business" as Deeply as "Code"',
        ];

export const WHATSAPP_NUMBER = '201020660608';
