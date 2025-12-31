
import { FileText, Book, Presentation, Video } from 'lucide-react';

export type ResourceType = 'whitepaper' | 'ebook' | 'case_study' | 'webinar';

export interface Resource {
    id: string;
    type: ResourceType;
    title: {
        ar: string;
        en: string;
    };
    description: {
        ar: string;
        en: string;
    };
    image: string; // Placeholder or path
    downloadUrl: string; // Could be a link to a form or direct download
    icon: any;
    tags: string[];
}

export const resources: Resource[] = [
    {
        id: 'ai-adoption-guide',
        type: 'ebook',
        title: {
            ar: 'الدليل الشامل لتبني الذكاء الاصطناعي في المؤسسات',
            en: 'The Comprehensive Guide to Enterprise AI Adoption'
        },
        description: {
            ar: 'خارطة طريق عملية للقادة التنفيذيين لدمج الذكاء الاصطناعي في استراتيجية العمل دون مخاطرة.',
            en: 'A practical roadmap for executives to integrate AI into business strategy without risk.'
        },
        image: '/images/resources/ai-guide-cover.jpg', // Placeholder
        downloadUrl: '#',
        icon: Book,
        tags: ['Strategy', 'AI Adoption', 'Management']
    },
    {
        id: 'fintech-automation-case',
        type: 'case_study',
        title: {
            ar: 'دراسة حالة: كيف وفرت شركة تقنية مالية 40% من التكاليف؟',
            en: 'Case Study: How a FinTech Saved 40% in Costs?'
        },
        description: {
            ar: 'قصة نجاح حقيقية لشركة استخدمت وكلاء الذكاء الاصطناعي لأتمتة خدمة العملاء والامتثال.',
            en: 'A real success story of a company using AI agents to automate customer service and compliance.'
        },
        image: '/images/resources/fintech-case.jpg', // Placeholder
        downloadUrl: '#',
        icon: FileText,
        tags: ['FinTech', 'Automation', 'Cost Reduction']
    },
    {
        id: 'sovereign-ai-whitepaper',
        type: 'whitepaper',
        title: {
            ar: 'الذكاء الاصطناعي السيادي: مستقبل أمن البيانات',
            en: 'Sovereign AI: The Future of Data Security'
        },
        description: {
            ar: 'ورقة بيضاء تشرح لماذا يجب أن تمتلك الشركات نماذجها الخاصة بدلاً من الاعتماد على APIs خارجية.',
            en: 'Whitepaper explaining why companies must own their models instead of relying on external APIs.'
        },
        image: '/images/resources/sovereign-ai.jpg', // Placeholder
        downloadUrl: '#',
        icon: Presentation,
        tags: ['Security', 'Sovereign AI', 'Infrastructure']
    }
];
