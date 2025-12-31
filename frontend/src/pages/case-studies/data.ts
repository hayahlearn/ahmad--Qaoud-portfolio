import { CASE_STUDY_TESTIMONIALS } from '@/data/testimonials';
import {
    Target, Clock, TrendingUp, Globe, Shield, Users, DollarSign, Smartphone, Workflow, Database, ShoppingCart, CreditCard, Zap
} from 'lucide-react';
import type { CaseStudy } from '@/types';

export const caseStudies: CaseStudy[] = [
    {
        id: 'logistics-automation',
        title: { ar: 'أتمتة شركة لوجستيات محلية', en: 'Local Logistics Automation' },
        client: { ar: 'شركة نقل وتوصيل متوسطة', en: 'Mid-sized Logistics Company' },
        industry: { ar: 'الخدمات اللوجستية', en: 'Logistics' },
        challenge: {
            ar: 'كانت الشركة تعتمد على الواتساب والإكسل لإدارة 50 مندوب توصيل، مما أدى لضياع 30% من الطلبات وتأخر التسليم.',
            en: 'Relied on WhatsApp & Excel to manage 50 drivers, resulting in 30% lost orders and delivery delays.'
        },
        solution: {
            ar: 'بناء نظام تتبع مركزي (Control Tower) باستخدام Supabase وربطه بتطبيق للمندوبين عبر n8n لتحديث الحالات تلقائياً.',
            en: 'Built a central Control Tower using Supabase linked to a driver app via n8n for auto-status updates.'
        },
        results: [
            { metric: { ar: 'دقة التسليم', en: 'Delivery Accuracy' }, value: '99%', icon: Target },
            { metric: { ar: 'توفير وقت الإدارة', en: 'Admin Time Saved' }, value: '4hrs/day', icon: Clock },
            { metric: { ar: 'زيادة الطاقة الاستيعابية', en: 'Capacity Increase' }, value: '+40%', icon: TrendingUp },
        ],
        technologies: ['n8n', 'Supabase', 'Flutter', 'Google Maps API'],
        duration: { ar: '8 أسابيع', en: '8 weeks' },
        color: 'from-blue-600 to-indigo-600',
        borderColor: 'border-blue-500/30',
        bgColor: 'from-blue-500/5 to-indigo-500/5',
        icon: Globe,
        chartData: [
            { name: 'Manual', value: 65, color: '#94a3b8' },
            { name: 'Automated', value: 99, color: '#2563eb' },
        ],
        timeline: [
            {
                title: { ar: 'دراسة العمليات الحالية', en: 'Process Analysis' },
                desc: { ar: 'تتبع حركة المندوبين يدوياً لمدة أسبوع', en: 'Manual tracking of drivers for a week' },
                date: 'Week 1'
            },
            {
                title: { ar: 'بناء قاعدة البيانات', en: 'Database Architecture' },
                desc: { ar: 'تصميم هيكل Supabase وتطبيق المندوبين', en: 'Designing Supabase schema and driver app' },
                date: 'Week 2-4'
            },
            {
                title: { ar: 'ربط n8n', en: 'n8n Integration' },
                desc: { ar: 'أتمتة إشعارات الواتساب وتحديث الحالات', en: 'Automating WhatsApp alerts and status updates' },
                date: 'Week 5-6'
            },
            {
                title: { ar: 'التدريب والإطلاق', en: 'Training & Launch' },
                desc: { ar: 'تدريب 50 مندوب على التطبيق الجديد', en: 'Training 50 drivers on the new app' },
                date: 'Week 8'
            }
        ],
        testimonial: CASE_STUDY_TESTIMONIALS.find(t => t.caseStudyId === 'smart-logistics'),
    },
    {
        id: 'medical-booking-bot',
        title: { ar: 'نظام حجز طبي ذكي', en: 'Smart Medical Booking System' },
        client: { ar: 'مجمع عيادات خاص', en: 'Private Medical Center' },
        industry: { ar: 'الرعاية الصحية', en: 'Healthcare' },
        challenge: {
            ar: 'فقدان 40% من المكالمات بسبب انشغال خطوط الهاتف، وعدم وضوح المواعيد المتاحة للمرضى.',
            en: '40% missed calls due to busy lines, and lack of visibility on available slots for patients.'
        },
        solution: {
            ar: 'تطوير Chatbot ذكي (WhatsApp + AI) متصل بـ Calendar العيادة، يحجز المواعيد ويجيب على الاستفسارات 24/7.',
            en: 'Developed an AI Chatbot (WhatsApp) integrated with Clinic Calendar to book slots and answer FAQs 24/7.'
        },
        results: [
            { metric: { ar: 'حجوزات آلية', en: 'Automated Bookings' }, value: '65%', icon: Smartphone },
            { metric: { ar: 'تقليل التغيب', en: 'No-Show Reduction' }, value: '-30%', icon: Users },
            { metric: { ar: 'عائد الاستثمار', en: 'ROI (1st Year)' }, value: '450%', icon: DollarSign },
        ],
        technologies: ['OpenAI API', 'WhatsApp Business', 'Node.js', 'PostgreSQL'],
        duration: { ar: '4 أسابيع', en: '4 weeks' },
        color: 'from-emerald-600 to-teal-600',
        borderColor: 'border-emerald-500/30',
        bgColor: 'from-emerald-500/5 to-teal-500/5',
        icon: Shield,
        chartData: [
            { name: 'Phone', value: 40, color: '#94a3b8' },
            { name: 'AI Bot', value: 95, color: '#10b981' },
        ],
        timeline: [
            {
                title: { ar: 'تحليل المحادثات', en: 'Conversation Analysis' },
                desc: { ar: 'تحليل 1000 مكالمة سابقة لفهم الأسئلة المتكررة', en: 'Analyzing 1000 past calls for FAQs' },
                date: 'Week 1'
            },
            {
                title: { ar: 'تصميم الـ Flow', en: 'Flow Design' },
                desc: { ar: 'رسم مسار المحادثة وحالات الخطأ', en: 'Mapping conversation paths and error states' },
                date: 'Week 2'
            },
            {
                title: { ar: 'الربط التقني', en: 'Technical Integration' },
                desc: { ar: 'ربط WhatsApp API مع نظام المواعيد', en: 'Connecting WhatsApp API with Appointment System' },
                date: 'Week 3'
            },
            {
                title: { ar: 'الإطلاق التجريبي', en: 'Soft Launch' },
                desc: { ar: 'إطلاق على 10% من المرضى', en: 'Launch to 10% of patients' },
                date: 'Week 4'
            },
        ],
        testimonial: CASE_STUDY_TESTIMONIALS.find(t => t.caseStudyId === 'medical-booking-bot'),
    },
    {
        id: 'legal-firm-docs',
        title: { ar: 'أرشيف قانوني ذكي', en: 'Intelligent Legal Archive' },
        client: { ar: 'مكتب محاماة واستشارات', en: 'Law Firm' },
        industry: { ar: 'الخدمات القانونية', en: 'Legal Services' },
        challenge: {
            ar: 'استغراق ساعات طويلة في البحث عن سوابق قضائية داخل آلاف ملفات الـ PDF والمستندات الورقية.',
            en: 'Hours wasted searching for case precedents within thousands of PDF files and paper documents.'
        },
        solution: {
            ar: 'بناء محرك بحث دلالي (Semantic Search) خاص بالمكتب، يفهم السياق القانوني ويستخرج المعلومات فوراً.',
            en: 'Built a private Semantic Search engine that understands legal context and extracts info instantly.'
        },
        results: [
            { metric: { ar: 'سرعة البحث', en: 'Search Speed' }, value: '< 3 sec', icon: Zap },
            { metric: { ar: 'دقة الاستخراج', en: 'Extraction Accuracy' }, value: '95%', icon: Database },
            { metric: { ar: 'توفير ساعات المحامين', en: 'Billable Hours Saved' }, value: '15h/week', icon: Clock },
        ],
        technologies: ['Python', 'LangChain', 'Pinecone', 'React'],
        duration: { ar: '6 أسابيع', en: '6 weeks' },
        color: 'from-amber-600 to-orange-600',
        borderColor: 'border-amber-500/30',
        bgColor: 'from-amber-500/5 to-orange-500/5',
        icon: Workflow,
        chartData: [
            { name: 'Manual', value: 120, color: '#94a3b8' }, // minutes
            { name: 'AI Search', value: 1, color: '#f59e0b' }, // minutes
        ],
        timeline: [
            {
                title: { ar: 'أرشفة المستندات', en: 'Document Ingestion' },
                desc: { ar: 'تحويل 50,000 وثيقة ورقية إلى صيغة رقمية', en: 'Digitizing 50,000 paper documents' },
                date: 'Week 1-2'
            },
            {
                title: { ar: 'بناء الفهرس', en: 'Index Building' },
                desc: { ar: 'معادلة البيانات وبناء Vector Store', en: 'Embedding data into Vector Store' },
                date: 'Week 3-4'
            },
            {
                title: { ar: 'تطوير الواجهة', en: 'UI Development' },
                desc: { ar: 'واجهة بحث بسيطة للمحامين', en: 'Simple search interface for lawyers' },
                date: 'Week 5'
            },
            {
                title: { ar: 'الاختبار والتحسين', en: 'Testing & Refining' },
                desc: { ar: 'اختبار دقة النتائج مع كبار المستشارين', en: 'Validating accuracy with senior partners' },
                date: 'Week 6'
            },
        ],
        testimonial: CASE_STUDY_TESTIMONIALS.find(t => t.caseStudyId === 'legal-firm-docs'),
    },
    {
        id: 'fashion-ecommerce', // Updated ID
        title: { ar: 'متجر إلكتروني قابل للتوسع', en: 'Scalable E-commerce Platform' },
        client: { ar: 'براند ملابس صاعد', en: 'Rising Fashion Brand' },
        industry: { ar: 'التجارة الإلكترونية', en: 'E-commerce' },
        challenge: {
            ar: 'توقف الموقع المتكرر أثناء الحملات الإعلانية وفشل في معالجة الطلبات المتزامنة.',
            en: 'Frequent site crashes during ad campaigns and failure to process concurrent orders.'
        },
        solution: {
            ar: 'إعادة بناء المعمارية باستخدام Next.js و Serverless لتتحمل ضغط الزوار العالي مع تحسين تجربة الشراء.',
            en: 'Re-architecting using Next.js and Serverless to handle high traffic spikes with optimized UX.'
        },
        results: [
            { metric: { ar: 'وقت التحميل', en: 'Load Time' }, value: '0.8s', icon: Zap },
            { metric: { ar: 'معدل التحويل', en: 'Conversion Rate' }, value: '+150%', icon: ShoppingCart },
            { metric: { ar: 'التحمل', en: 'Uptime' }, value: '99.9%', icon: Shield },
        ],
        technologies: ['Next.js', 'Vercel', 'Stripe', 'Redis'],
        duration: { ar: '5 أسابيع', en: '5 weeks' },
        color: 'from-pink-600 to-rose-600',
        borderColor: 'border-pink-500/30',
        bgColor: 'from-pink-500/5 to-rose-500/5',
        icon: ShoppingCart,
        chartData: [
            { name: 'Legacy', value: 45, color: '#94a3b8' },
            { name: 'New Stack', value: 98, color: '#db2777' },
        ],
        timeline: [
            {
                title: { ar: 'تحليل الأداء', en: 'Performance Audit' },
                desc: { ar: 'تحديد عنق الزجاجة', en: 'Identifying bottlenecks' },
                date: 'Week 1'
            },
            {
                title: { ar: 'الهجرة للسحابة', en: 'Migration' },
                desc: { ar: 'الانتقال إلى Serverless', en: 'Moving to Serverless' },
                date: 'Week 3'
            },
        ],
        testimonial: {
            content: {
                ar: 'في الجمعة البيضاء، استقبلنا 50 ألف زائر في ساعة ولم يتأثر الموقع. هذا الاستثمار هو الأفضل لنا هذا العام.',
                en: 'On Black Friday, we hit 50k visitors in an hour and the site stood strong. Best investment we made this year.'
            },
            author: 'Omar Khaled',
            role: { ar: 'الرئيس التنفيذي', en: 'CEO' }
        }
    },
    {
        id: 'fintech-security',
        title: { ar: 'بوابة دفع آمنة وذكية', en: 'Secure Smart Payment Gateway' },
        client: { ar: 'شركة تقنية مالية', en: 'Fintech Startup' },
        industry: { ar: 'المالية', en: 'Finance' },
        challenge: {
            ar: 'صعوبة في كشف عمليات الاحتيال وتأخر التسويات المالية مع البنوك.',
            en: 'Difficulty detecting fraud attempts and delayed settlements with banks.'
        },
        solution: {
            ar: 'تطوير طبقة أمان مدعومة بالذكاء الاصطناعي لتحليل المعاملات فورياً وكشف الأنماط المشبوهة.',
            en: 'Developing an AI-powered security layer to analyze transactions instantly and detect suspicious patterns.'
        },
        results: [
            { metric: { ar: 'كشف الاحتيال', en: 'Fraud Detection' }, value: '98%', icon: Shield },
            { metric: { ar: 'سرعة المعالجة', en: 'Processing Speed' }, value: '200ms', icon: Zap },
            { metric: { ar: 'المعاملات الآمنة', en: 'Secured Txns' }, value: '$2M+', icon: CreditCard },
        ],
        technologies: ['Python', 'TensorFlow', 'AWS Lambda', 'PostgreSQL'],
        duration: { ar: '10 أسابيع', en: '10 weeks' },
        color: 'from-violet-600 to-purple-600',
        borderColor: 'border-violet-500/30',
        bgColor: 'from-violet-500/5 to-purple-500/5',
        icon: CreditCard,
        chartData: [
            { name: 'Manual Review', value: 20, color: '#94a3b8' },
            { name: 'AI Detection', value: 98, color: '#7c3aed' },
        ],
        timeline: [
            {
                title: { ar: 'بناء النماذج', en: 'Model Training' },
                desc: { ar: 'تدريب AI على احتيال سابق', en: 'Training AI on past fraud' },
                date: 'Week 1-4'
            },
            {
                title: { ar: 'التكامل البنكي', en: 'Bank Integration' },
                desc: { ar: 'API Security Standards', en: 'API Security Standards' },
                date: 'Week 6-8'
            },
        ],
        testimonial: {
            content: {
                ar: 'كشف أنماط الاحتيال كان كابوساً. الآن النظام يوقف العمليات المشبوهة قبل حدوثها بدقة مذهلة.',
                en: 'Detecting fraud patterns was a nightmare. Now the system stops suspicious txns before they happen with amazing accuracy.'
            },
            author: 'Eng. Ziad Al-Tawil',
            role: { ar: 'CTO', en: 'CTO' }
        }
    },
    {
        id: 'edtech-platform',
        title: { ar: 'منصة تعليمية تكيفية', en: 'Adaptive Learning Platform' },
        client: { ar: 'مؤسسة تعليمية كبرى', en: 'Leading Edu Institution' },
        industry: { ar: 'التعليم', en: 'Education' },
        challenge: {
            ar: 'صعوبة تتبع تقدم آلاف الطلاب وتقديم محتوى مخصص لكل مستوى.',
            en: 'Difficulty tracking thousands of students and providing personalized content for each level.'
        },
        solution: {
            ar: 'إنشاء نظام LMS مدعوم بالذكاء الاصطناعي يحلل أداء الطالب ويقترح مسارات تعليمية مخصصة.',
            en: 'Built an AI-powered LMS that analyzes student performance and suggests personalized learning paths.'
        },
        results: [
            { metric: { ar: 'تحسن الأداء', en: 'Performance Boost' }, value: '+35%', icon: TrendingUp },
            { metric: { ar: 'إكمال الدورات', en: 'Completion Rate' }, value: '85%', icon: Target },
            { metric: { ar: 'الطلاب النشطين', en: 'Active Students' }, value: '50k+', icon: Users },
        ],
        technologies: ['Django', 'React', 'TensorFlow', 'PostgreSQL'],
        duration: { ar: '12 أسبوع', en: '12 weeks' },
        color: 'from-cyan-600 to-blue-600',
        borderColor: 'border-cyan-500/30',
        bgColor: 'from-cyan-500/5 to-blue-500/5',
        icon: Globe,
        chartData: [
            { name: 'Standard', value: 60, color: '#94a3b8' },
            { name: 'Adaptive', value: 85, color: '#06b6d4' },
        ],
        timeline: [
            {
                title: { ar: 'تصميم المناهج', en: 'Curriculum Design' },
                desc: { ar: 'هيكلة المسارات التعليمية', en: 'Structuring learning paths' },
                date: 'Week 1-3'
            },
            {
                title: { ar: 'تطوير الخوارزمية', en: 'Algorithm Dev' },
                desc: { ar: 'محرك التوصيات', en: 'Recommendation engine' },
                date: 'Week 4-8'
            },
        ],
        testimonial: {
            content: {
                ar: 'الطلاب شعروا أن المحتوى مصمم خصيصاً لهم. رأينا قفزة في معدلات الإكمال لم نشهدها من قبل.',
                en: 'Students felt the content was tailored just for them. We saw a completion rate jump we\'ve never seen before.'
            },
            author: 'Dr. Noura Al-Salem',
            role: { ar: 'عميد القبول والتسجيل', en: 'Dean of Admissions' }
        }
    }
];
