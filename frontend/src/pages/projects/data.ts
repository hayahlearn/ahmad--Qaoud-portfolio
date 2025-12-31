import { GraduationCap, Cpu, Globe, Armchair, Shield, Workflow, ShoppingCart, CreditCard, LucideIcon } from 'lucide-react';
import { Project } from '@/types';

type Demo = {
    thumbnail: string;
    duration: string;
    title: { ar: string; en: string };
    views: string;
};

export const projects: Project[] = [
    {
        key: 'hayah',
        slug: 'hayah-lms',
        icon: GraduationCap,
        status: 'live',
        color: 'from-emerald-600/20 to-teal-600/20',
        borderColor: 'border-emerald-500/30',
        iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
        iconColor: 'text-white',
        category: 'saas',
        techStack: ['Python/Django', 'React + Vite', 'Sovereign AI', 'PostgreSQL', 'Redis'],
        stats: [
            { label: { ar: 'طالب نشط', en: 'Active Students' }, value: '+15k' },
            { label: { ar: 'مؤسسة تعليمية', en: 'Institutions' }, value: '12+' },
            { label: { ar: 'نسبة التوافر', en: 'Uptime' }, value: '99.9%' }
        ],
        features: ['Multi-tenant Architecture', 'AI-Driven Personalization', 'Sovereign Data Privacy'],
        longDescription: {
            ar: 'منظومة تعليمية سيادية متكاملة تعيد تعريف التجربة التعليمية في العالم العربي باستخدام الذكاء الاصطناعي.',
            en: 'A sovereign integrated educational ecosystem redefining the learning experience in the Arab world using AI.'
        },
        benefits: [
            {
                title: { ar: 'للطالب', en: 'For Students' },
                description: {
                    ar: 'مسار تعليمي ذكي يتكيف مع مستواك، محتوى تفاعلي 24/7، ومساعد شخصي يشرح لك الصعوبات فوراً.',
                    en: 'Adaptive learning path, 24/7 interactive content, and a personal AI tutor explaining difficulties instantly.'
                }
            },
            {
                title: { ar: 'للمعلم', en: 'For Teachers' },
                description: {
                    ar: 'مساعد ذكي يصحح الاختبارات، يقترح خطط الدروس، ويحلل أداء الطلاب لكشف نقاط الضعف مبكراً.',
                    en: 'AI assistant for grading, lesson planning, and student performance analysis to spot gaps early.'
                }
            },
            {
                title: { ar: 'للمدرسة', en: 'For Schools' },
                description: {
                    ar: 'لوحة تحكم شاملة (God-mode)، تقارير لحظية، وأتمتة كاملة للأعمال الإدارية (صفر ورق).',
                    en: 'Comprehensive dashboard (God-mode), real-time reports, and full administrative automation (Zero Paper).'
                }
            }
        ]
    },
    {
        key: 'orchestrator',
        slug: 'ai-orchestrator',
        icon: Cpu,
        status: 'live',
        color: 'from-blue-600/20 to-indigo-600/20',
        borderColor: 'border-blue-500/30',
        iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
        iconColor: 'text-white',
        category: 'ai',
        techStack: ['n8n Workflow', 'FastAPI', 'Docker Swarm', 'Qdrant Vector DB'],
        stats: [
            { label: { ar: 'طلب معالج', en: 'Requests/mo' }, value: '1.2M+' },
            { label: { ar: 'توفير تكلفة', en: 'Cost Savings' }, value: '40%' },
            { label: { ar: 'وكيل ذكي', en: 'Active Agents' }, value: '50+' }
        ],
        features: ['Vendor Lock-in Shield', 'Intelligent Routing', 'Self-Healing Workflows'],
        longDescription: {
            ar: 'بوابة الذكاء الاصطناعي المؤسسية الأولى التي تحررك من قيود الشركات الكبرى وتخلق "موظفين رقميين" لا يخطئون.',
            en: 'The premium Enterprise AI Gateway that frees you from big tech lock-in and creates zero-error "Digital Employees".'
        },
        benefits: [
            {
                title: { ar: 'الموظف الرقمي (Zero-Error)', en: 'Digital Employee' },
                description: {
                    ar: 'بناء وكلاء (Agents) يعملون 24/7 بلا كلل، ينفذون مهام معقدة بدقة 100% ولا ينامون.',
                    en: 'Build 24/7 tireless agents that execute complex tasks with 100% accuracy and never sleep.'
                }
            },
            {
                title: { ar: 'درع الشركات (Shield)', en: 'Corporate Shield' },
                description: {
                    ar: 'حماية بياناتك من الانكشاف، ومنع "الاحتكار التقني" (Vendor Lock-in) بالتبديل الذكي بين النماذج.',
                    en: 'Protect data privacy and prevent Vendor Lock-in by intelligently switching between AI models.'
                }
            },
            {
                title: { ar: 'إدارة التكلفة الذكية', en: 'Smart Cost Control' },
                description: {
                    ar: 'توجيه الطلبات البسيطة لنماذج رخيصة والمعقدة للنماذج القوية، لتوفير 40% من الفاتورة.',
                    en: 'Router simple requests to cheaper models and complex ones to high-end models, saving 40% costs.'
                }
            }
        ]
    },
    {
        key: 'tourism',
        slug: 'tourism-platform',
        icon: Globe,
        status: 'building',
        color: 'from-amber-500/20 to-orange-600/20',
        borderColor: 'border-amber-500/30',
        iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
        iconColor: 'text-white',
        category: 'saas',
        techStack: ['Next.js 14', 'Supabase', 'Stripe Connect', 'Mapbox'],
        stats: [
            { label: { ar: 'حجوزات/يوم', en: 'Daily Bookings' }, value: '850+' },
            { label: { ar: 'نمو الإيرادات', en: 'Rev. Growth' }, value: '180%' }
        ],
        features: ['Multi-currency', 'Real-time Availability', 'Partner Portal']
    },
    {
        key: 'furniture',
        slug: 'ar-furniture',
        icon: Armchair,
        status: 'live',
        color: 'from-purple-600/20 to-pink-600/20',
        borderColor: 'border-purple-500/30',
        iconBg: 'bg-gradient-to-br from-purple-500 to-pink-600',
        iconColor: 'text-white',
        category: 'ecommerce',
        techStack: ['Shopify Headless', 'Three.js (AR)', 'Sanity CMS'],
        stats: [
            { label: { ar: 'تحول للمبيعات', en: 'Conversion' }, value: '+210%' },
            { label: { ar: 'تفاعل العملاء', en: 'Engagement' }, value: '4.5m' }
        ],
        features: ['WebAR Experience', '3D Configurator', 'Omnichannel']
    },
    {
        key: 'logistics-automation',
        slug: 'logistics-automation',
        icon: Globe,
        status: 'live',
        color: 'from-blue-600/20 to-indigo-600/20',
        borderColor: 'border-blue-500/30',
        iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
        iconColor: 'text-white',
        category: 'automation',
        techStack: ['n8n', 'Supabase', 'Flutter', 'Google Maps'],
        stats: [
            { label: { ar: 'دقة التسليم', en: 'Accuracy' }, value: '99%' },
            { label: { ar: 'توفير الوقت', en: 'Time Saved' }, value: '4hrs/day' }
        ],
        features: ['Real-time Tracking', 'Automated Alerts', 'Driver App'],
        longDescription: {
            ar: 'أتمتة كاملة لعمليات التوصيل وربط المناديب ببرج مراقبة مركزي، مما قضى على فوضى الاتصالات اليدوية.',
            en: 'Full automation of delivery operations, connecting drivers to a central control tower, eliminating manual chaos.'
        }
    },
    {
        key: 'medical-booking-bot',
        slug: 'medical-booking-bot',
        icon: Shield,
        status: 'live',
        color: 'from-emerald-600/20 to-teal-600/20',
        borderColor: 'border-emerald-500/30',
        iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
        iconColor: 'text-white',
        category: 'ai',
        techStack: ['OpenAI API', 'WhatsApp', 'Node.js', 'PostgreSQL'],
        stats: [
            { label: { ar: 'حجوزات', en: 'Bookings' }, value: '+65%' },
            { label: { ar: 'عائد استثمار', en: 'ROI' }, value: '450%' }
        ],
        features: ['24/7 Booking', 'Calendar Sync', 'Multi-language'],
        longDescription: {
            ar: 'روبوت ذكي يدير مواعيد العيادة تلقائياً عبر الواتساب، مما ألغى الحاجة لموظفي الحجز اليدوي.',
            en: 'Smart bot managing clinic appointments automatically via WhatsApp, eliminating manual booking needs.'
        }
    },
    {
        key: 'legal-firm-docs',
        slug: 'legal-firm-docs',
        icon: Workflow,
        status: 'live',
        color: 'from-amber-600/20 to-orange-600/20',
        borderColor: 'border-amber-500/30',
        iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
        iconColor: 'text-white',
        category: 'ai',
        techStack: ['LangChain', 'Pinecone', 'Python', 'React'],
        stats: [
            { label: { ar: 'سرعة البحث', en: 'Speed' }, value: '< 3s' },
            { label: { ar: 'توفير ساعات', en: 'Saved Hours' }, value: '15h/wk' }
        ],
        features: ['Semantic Search', 'Document Analysis', 'Private GPT'],
        longDescription: {
            ar: 'محرك بحث قانوني يفهم السياق ويستخرج المعلومات من آلاف الوثائق في ثوانٍ بدلاً من أيام.',
            en: 'Legal search engine understanding context and extracting info from thousands of docs in seconds.'
        }
    },
    {
        key: 'fashion-ecommerce',
        slug: 'fashion-ecommerce',
        icon: ShoppingCart,
        status: 'live',
        color: 'from-pink-600/20 to-rose-600/20',
        borderColor: 'border-pink-500/30',
        iconBg: 'bg-gradient-to-br from-pink-500 to-rose-500',
        iconColor: 'text-white',
        category: 'ecommerce',
        techStack: ['Next.js', 'Vercel', 'Stripe', 'Redis'],
        stats: [
            { label: { ar: 'معدل التحويل', en: 'Conversion' }, value: '+150%' },
            { label: { ar: 'المعالجة', en: 'Uptime' }, value: '99.9%' }
        ],
        features: ['High Performance', 'Scalable Arch', 'Global Payments'],
        longDescription: {
            ar: 'منصة بيع بالتجزئة مصممة لتحمل ضغط الحملات الإعلانية الكبرى دون توقف أو بطء.',
            en: 'Retail platform designed to handle massive ad campaign spikes with zero downtime or lag.'
        }
    },
    {
        key: 'fintech-security',
        slug: 'fintech-security',
        icon: CreditCard,
        status: 'live',
        color: 'from-violet-600/20 to-purple-600/20',
        borderColor: 'border-violet-500/30',
        iconBg: 'bg-gradient-to-br from-violet-500 to-purple-500',
        iconColor: 'text-white',
        category: 'ai',
        techStack: ['TensorFlow', 'Python', 'AWS Lambda', 'PostgreSQL'],
        stats: [
            { label: { ar: 'كشف الاحتيال', en: 'Fraud Stop' }, value: '98%' },
            { label: { ar: 'حجم المعاملات', en: 'Secured' }, value: '$2M+' }
        ],
        features: ['Real-time AI', 'Pattern Recognition', 'Bank Grade Security'],
        longDescription: {
            ar: 'طبقة أمان بنكية تعمل بالذكاء الاصطناعي لكشف العمليات المشبوهة فورياً.',
            en: 'Bank-grade security layer powered by AI to detect suspicious transactions instantly.'
        }
    },
    {
        key: 'edtech-platform',
        slug: 'edtech-platform',
        icon: GraduationCap,
        status: 'live',
        color: 'from-cyan-600/20 to-blue-600/20',
        borderColor: 'border-cyan-500/30',
        iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-500',
        iconColor: 'text-white',
        category: 'saas',
        techStack: ['Django', 'React', 'TensorFlow', 'PostgreSQL'],
        stats: [
            { label: { ar: 'تحسن الأداء', en: 'Performance' }, value: '+35%' },
            { label: { ar: 'مستخدم نشط', en: 'Users' }, value: '50k+' }
        ],
        features: ['Adaptive Learning', 'AI Recommendations', 'Student Analytics'],
        longDescription: {
            ar: 'منصة تعليمية ذكية تتكيف مع مستوى كل طالب لتقديم تجربة تعليمية فريدة ومخصصة.',
            en: 'Smart learning platform adapting to each student level to provide unique personalized experience.'
        }
    }
];

export const demos: Demo[] = [
    {
        thumbnail: 'bg-emerald-500/10',
        duration: '4:20',
        title: { ar: 'نظام إدارة التعليم السيادي', en: 'Sovereign LMS Management' },
        views: '1.2k'
    },
    {
        thumbnail: 'bg-blue-500/10',
        duration: '3:45',
        title: { ar: 'أتمتة الوكلاء الرقميين', en: 'Digital Agent Automation' },
        views: '850'
    }
];
