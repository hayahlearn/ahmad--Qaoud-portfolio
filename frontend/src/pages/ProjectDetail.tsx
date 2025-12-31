import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle, Target, Users, Zap, Calendar, Globe, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { GraduationCap, Bot, Hotel, Armchair } from 'lucide-react';
import { useState } from 'react';

// Import project images
import hayatImage from '@/assets/projects/hayat-dashboard.jpg';
import hayatMobile from '@/assets/projects/hayat-mobile.jpg';
import orchestratorImage from '@/assets/projects/orchestrator-dashboard.jpg';
import orchestratorAnalytics from '@/assets/projects/orchestrator-analytics.jpg';
import tourismImage from '@/assets/projects/tourism-dashboard.jpg';
import tourismBooking from '@/assets/projects/tourism-booking.jpg';
import furnitureImage from '@/assets/projects/furniture-dashboard.jpg';
import furnitureCatalog from '@/assets/projects/furniture-catalog.jpg';

const projectsData = {
  'hayah-lms': {
    slug: 'hayah-lms',
    icon: GraduationCap,
    status: 'live',
    color: 'bg-emerald-500',
    image: hayatImage,
    gallery: [hayatImage, hayatMobile],
    tech: ['Python/Django', 'React + Vite', 'Sovereign AI', 'PostgreSQL', 'Redis'],
    title: {
      ar: 'حياة - منظومة التعليم السيادي',
      en: 'Hayah - Sovereign Learning Ecosystem'
    },
    subtitle: {
      ar: 'أول منصة عربية للتعليم التكيفي السيادي',
      en: 'First Arab Sovereign Adaptive Learning Platform'
    },
    description: {
      ar: 'منظومة تعليمية سيادية متكاملة تعيد تعريف التجربة التعليمية في العالم العربي باستخدام الذكاء الاصطناعي. توفر خصوصية بيانات كاملة (Sovereign Data) مع تخصيص تجربة التعلم لكل طالب.',
      en: 'A sovereign integrated educational ecosystem redefining the learning experience in the Arab world using AI. Provides full data privacy (Sovereign Data) with personalized learning experiences.'
    },
    features: {
      ar: [
        'مسار تعليمي ذكي يتكيف مع مستوى الطالب',
        'مدرس خصوصي AI يشرح الصعوبات فوراً',
        'لوحة تحكم (God-mode) للإدارة المدرسية',
        'تصحيح آلي للاختبارات والواجبات',
        'دعم تعدد المؤسسات (Multi-tenancy)',
        'تطبيق موبايل يعمل بدون إنترنت (Offline)'
      ],
      en: [
        'Smart learning path adapting to student level',
        'AI Tutor explaining difficulties instantly',
        'God-mode dashboard for school admin',
        'Automated grading for exams',
        'Multi-tenancy support',
        'Offline-capable mobile app'
      ]
    },
    stats: {
      users: { ar: '+15,000 طالب', en: '+15,000 Students' },
      courses: { ar: '12+ مؤسسة', en: '12+ Institutions' },
      completion: { ar: '99.9% توافر', en: '99.9% Uptime' }
    },
    year: '2024',
    region: { ar: 'مصر والسعودية', en: 'Egypt & Saudi Arabia' },
    liveUrl: '#',
    // New sections for Hayah
    whyBuilt: {
      ar: {
        title: 'لماذا بُنيت Hayah؟',
        challenge: 'المدارس المصرية/السعودية كانت تستخدم Google Classroom (لا يدعم العربية جيداً) ومنصات محلية ضعيفة مع Vendor Lock-in.',
        caseStudy: 'مدرسة في الرياض: 500 طالب، 30 معلم، يستخدمون Excel + WhatsApp. النتيجة: ضياع 30% من الدرجات، المعلمون يقضون 4 ساعات/يوم في التصحيح اليدوي.',
        solution: 'نظام تعليمي ذكي، سيادي، يملكه العميل بالكامل'
      },
      en: {
        title: 'Why Was Hayah Built?',
        challenge: 'Egyptian/Saudi schools used Google Classroom (poor Arabic support) and weak local platforms with Vendor Lock-in.',
        caseStudy: 'A Riyadh school: 500 students, 30 teachers using Excel + WhatsApp. Result: 30% grade loss, teachers spending 4 hours/day grading manually.',
        solution: 'Smart, sovereign educational system fully owned by the client'
      }
    },
    architecture: {
      ar: {
        title: 'البنية التقنية',
        multiTenancy: 'كل مدرسة لها subdomain منفصل مع قاعدة بيانات معزولة (Row-Level Security)',
        roles: ['Super Admin', 'School Admin', 'Doctor (لذوي الهمم)', 'Teacher', 'Parent'],
        aiFeatures: 'نماذج Gemini Pro مدمجة عبر n8n workflows - تصحيح تلقائي بدقة 95%',
        challenges: [
          { problem: 'Latency عالية عند 1000+ طلب', solution: 'Redis للـ Caching + Django Celery' },
          { problem: 'فاتورة Gemini $800/شهر', solution: 'Orchestrator للتوجيه الذكي - وفرنا 40%' },
          { problem: 'مناطق ضعيفة الإنترنت', solution: 'Progressive Web App + Service Workers' }
        ]
      },
      en: {
        title: 'Technical Architecture',
        multiTenancy: 'Each school has separate subdomain with isolated database (Row-Level Security)',
        roles: ['Super Admin', 'School Admin', 'Doctor (Special Needs)', 'Teacher', 'Parent'],
        aiFeatures: 'Gemini Pro models integrated via n8n workflows - 95% auto-grading accuracy',
        challenges: [
          { problem: 'High latency at 1000+ requests', solution: 'Redis Caching + Django Celery' },
          { problem: 'Gemini bill $800/month', solution: 'Orchestrator smart routing - saved 40%' },
          { problem: 'Low internet areas', solution: 'Progressive Web App + Service Workers' }
        ]
      }
    },
    comparison: {
      ar: [
        { metric: 'وقت التصحيح للمعلم', before: '4 ساعات/يوم', after: '30 دقيقة/يوم', improvement: '87%↓' },
        { metric: 'دقة الدرجات', before: '70%', after: '98%', improvement: '40%↑' },
        { metric: 'تفاعل الطلاب', before: '45%', after: '78%', improvement: '73%↑' },
        { metric: 'رضا الأهل', before: '60%', after: '92%', improvement: '53%↑' }
      ],
      en: [
        { metric: 'Teacher Grading Time', before: '4 hours/day', after: '30 min/day', improvement: '87%↓' },
        { metric: 'Grade Accuracy', before: '70%', after: '98%', improvement: '40%↑' },
        { metric: 'Student Engagement', before: '45%', after: '78%', improvement: '73%↑' },
        { metric: 'Parent Satisfaction', before: '60%', after: '92%', improvement: '53%↑' }
      ]
    },
    specialEducationLink: true
  },
  'ai-orchestrator': {
    slug: 'ai-orchestrator',
    icon: Bot,
    status: 'live',
    color: 'bg-blue-500',
    image: orchestratorImage,
    gallery: [orchestratorImage, orchestratorAnalytics],
    tech: ['n8n Workflow', 'FastAPI', 'Docker Swarm', 'Qdrant Vector DB'],
    title: {
      ar: 'أوركسترا - بوابة الذكاء الاصطناعي المؤسسية',
      en: 'Orchestrator - Enterprise AI Gateway'
    },
    subtitle: {
      ar: 'درع الشركات ضد الاحتكار التقني',
      en: 'Corporate Shield against Vendor Lock-in'
    },
    description: {
      ar: 'بوابة الذكاء الاصطناعي المؤسسية التي تمكن الشركات من بناء "موظفين رقميين" (Digital Employees) لا يخطئون، مع حماية البيانات من التسريب وتوفير 40% من التكاليف عبر التوجيه الذكي.',
      en: 'Enterprise AI Gateway enabling companies to build zero-error "Digital Employees", protecting data from leakage, and saving 40% costs via intelligent model routing.'
    },
    features: {
      ar: [
        'درع الحماية من تداخل البيانات (Privacy Shield)',
        'توجيه ذكي بين النماذج (Smart Routing)',
        'موظفين رقميين يعملون 24/7 بدقة 100%',
        'ذاكرة مؤسسية موحدة (Vector Store)',
        'تجنب الاحتكار (No Vendor Lock-in)',
        'لوحة تحكم مركزية للأداء والتكلفة'
      ],
      en: [
        'Data Privacy Shield',
        'Smart Model Routing (Cost Optimization)',
        'Zero-error Digital Employees 24/7',
        'Unified Corporate Memory (Vector Store)',
        'Vendor Lock-in prevention',
        'Centralized Performance Dashboard'
      ]
    },
    stats: {
      users: { ar: '+50 وكيل ذكي', en: '+50 Active Agents' },
      courses: { ar: '1.2M طلب/شهر', en: '1.2M Req/Month' },
      completion: { ar: '40% توفير', en: '40% Cost Savings' }
    },
    year: '2024',
    region: { ar: 'الخليج العربي', en: 'Arabian Gulf' },
    liveUrl: '#'
  },
  'tourism-platform': {
    slug: 'tourism-platform',
    icon: Hotel,
    status: 'building',
    color: 'bg-amber-500',
    image: tourismImage,
    gallery: [tourismImage, tourismBooking],
    tech: ['Next.js 14', 'Supabase', 'Stripe Connect', 'Mapbox'],
    title: {
      ar: 'سياحة - منصة إدارة الفنادق',
      en: 'Tourism - Hotel Management Platform'
    },
    subtitle: {
      ar: 'حل شامل لقطاع الضيافة',
      en: 'Comprehensive solution for hospitality sector'
    },
    description: {
      ar: 'منصة SaaS متكاملة لإدارة الفنادق والمنتجعات السياحية. تشمل إدارة الحجوزات، العمليات اليومية، تجربة النزلاء، والتقارير المالية في واجهة واحدة.',
      en: 'A comprehensive SaaS platform for managing hotels and tourist resorts. Includes reservation management, daily operations, guest experience, and financial reports.'
    },
    features: {
      ar: [
        'نظام حجز مركزي متعدد القنوات',
        'بوابة شركاء وموردين',
        'تعدد العملات واللغات',
        'تطبيق نزلاء ذكي',
        'تقارير إيرادات فورية',
        'إدارة الغرف والمرافق'
      ],
      en: [
        'Centralized Multi-channel Booking',
        'Partner & Vendor Portal',
        'Multi-currency & Language',
        'Smart Guest App',
        'Real-time Revenue Reports',
        'Facility Management'
      ]
    },
    stats: {
      users: { ar: '850+ حجز يومي', en: '850+ Daily Bookings' },
      courses: { ar: '180% نمو', en: '180% Growth' },
      completion: { ar: 'قيد التطوير', en: 'In Development' }
    },
    year: '2024',
    region: { ar: 'مصر والأردن', en: 'Egypt & Jordan' },
    liveUrl: null
  },
  'ar-furniture': {
    slug: 'ar-furniture',
    icon: Armchair,
    status: 'live',
    color: 'bg-purple-500',
    image: furnitureImage,
    gallery: [furnitureImage, furnitureCatalog],
    tech: ['Shopify Headless', 'Three.js (AR)', 'Sanity CMS'],
    title: {
      ar: 'أثاث - تجارة إلكترونية بالواقع المعزز',
      en: 'Furniture - AR E-commerce'
    },
    subtitle: {
      ar: 'تجربة تسوق "جرب قبل أن تشتري"',
      en: '"Try before you buy" shopping experience'
    },
    description: {
      ar: 'منصة تجارة إلكترونية متخصصة للأثاث تستخدم تقنية الواقع المعزز (AR) لتمكين العملاء من تجربة القطع في منازلهم قبل الشراء، مما يضاعف معدلات التحويل.',
      en: 'Specialized furniture e-commerce platform using Augmented Reality (AR) to let customers visualize items in their homes before buying, doubling conversion rates.'
    },
    features: {
      ar: [
        'عرض منتجات 3D/AR في المتصفح',
        'أداة تخصيص المنتجات (Configurator)',
        'ربط مباشر مع التصنيع',
        'تجربة قناة موحدة (Omnichannel)',
        'تحليلات سلوك العملاء',
        'دعم لوجستي ذكي'
      ],
      en: [
        'Web-based 3D/AR Viewer',
        'Product Configurator',
        'Direct-to-Manufacturing Link',
        'Omnichannel Experience',
        'Customer Behavior Analytics',
        'Smart Logistics Support'
      ]
    },
    stats: {
      users: { ar: '+210% تحويل', en: '+210% Conversion' },
      courses: { ar: '4.5M تفاعل', en: '4.5M Engagements' },
      completion: { ar: 'مباشر', en: 'Live' }
    },
    year: '2024',
    region: { ar: 'مصر', en: 'Egypt' },
    liveUrl: null
  }
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, direction } = useLanguage();
  const BackArrow = direction === 'rtl' ? ArrowRight : ArrowLeft;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const project = slug ? projectsData[slug as keyof typeof projectsData] : null;

  if (!project) {
    return (
      <Layout>
        <section className="py-32 text-center">
          <div className="container">
            <h1 className="text-4xl font-bold mb-4">
              {language === 'ar' ? 'المشروع غير موجود' : 'Project Not Found'}
            </h1>
            <p className="text-muted-foreground mb-8">
              {language === 'ar' ? 'عذراً، لم نتمكن من العثور على هذا المشروع.' : 'Sorry, we could not find this project.'}
            </p>
            <Button asChild>
              <Link to="/projects">
                <BackArrow className="h-4 w-4 me-2" />
                {language === 'ar' ? 'العودة للمشاريع' : 'Back to Projects'}
              </Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  const Icon = project.icon;

  return (
    <Layout>
      {/* Hero */}
      <section className={`py-16 lg:py-24 ${project.color} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Back Link */}
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
            >
              <BackArrow className="h-4 w-4" />
              {language === 'ar' ? 'العودة للمشاريع' : 'Back to Projects'}
            </Link>

            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* Icon */}
              <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                <Icon className="h-12 w-12 text-white" />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge
                    variant={project.status === 'live' ? 'default' : 'secondary'}
                    className="bg-white/20 text-white border-0"
                  >
                    {project.status === 'live'
                      ? (language === 'ar' ? 'مباشر' : 'Live')
                      : (language === 'ar' ? 'قيد الإنشاء' : 'Building')
                    }
                  </Badge>
                  <span className="text-white/80 text-sm flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {project.year}
                  </span>
                  <span className="text-white/80 text-sm flex items-center gap-1.5">
                    <Globe className="h-4 w-4" />
                    {project.region[language]}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                  {project.title[language]}
                </h1>

                <p className="text-xl text-white/90 leading-relaxed mb-6">
                  {project.subtitle[language]}
                </p>

                {project.liveUrl && (
                  <Button asChild variant="secondary" size="lg" className="gap-2">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      {language === 'ar' ? 'زيارة المشروع' : 'Visit Project'}
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="py-12 bg-secondary/30">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {language === 'ar' ? 'معرض الصور' : 'Image Gallery'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.gallery.map((image, index) => (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden shadow-elevated border border-border cursor-pointer group relative"
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setLightboxOpen(true);
                  }}
                >
                  <img
                    src={image}
                    alt={`${project.title[language]} - ${index + 1}`}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                      {language === 'ar' ? 'انقر للتكبير' : 'Click to enlarge'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl p-0 bg-black/95 border-0">
          <div className="relative">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            {project.gallery.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : project.gallery.length - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="h-8 w-8 text-white" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev < project.gallery.length - 1 ? prev + 1 : 0))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="h-8 w-8 text-white" />
                </button>
              </>
            )}

            <img
              src={project.gallery[currentImageIndex]}
              alt={`${project.title[language]} - ${currentImageIndex + 1}`}
              className="w-full h-auto max-h-[85vh] object-contain"
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {project.gallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${index === currentImageIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
                    }`}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Description */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {language === 'ar' ? 'نبذة عن المشروع' : 'About the Project'}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {project.description[language]}
            </p>
          </div>
        </div>
      </section>

      {/* Why Built Section - Only for Hayah */}
      {'whyBuilt' in project && project.whyBuilt && (
        <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                {project.whyBuilt[language].title}
              </h2>

              <div className="space-y-6">
                <Card className="border-amber-200/50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3 text-amber-700 dark:text-amber-400">
                      {language === 'ar' ? '⚠️ التحدي الأساسي' : '⚠️ The Core Challenge'}
                    </h3>
                    <p className="text-muted-foreground">{project.whyBuilt[language].challenge}</p>
                  </CardContent>
                </Card>

                <Card className="border-red-200/50 bg-red-50/30 dark:bg-red-950/10">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3 text-red-700 dark:text-red-400">
                      {language === 'ar' ? '📊 دراسة حالة' : '📊 Case Study'}
                    </h3>
                    <p className="text-muted-foreground">{project.whyBuilt[language].caseStudy}</p>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200/50 bg-emerald-50/30 dark:bg-emerald-950/10">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3 text-emerald-700 dark:text-emerald-400">
                      {language === 'ar' ? '✅ الحل' : '✅ The Solution'}
                    </h3>
                    <p className="text-lg font-medium">{project.whyBuilt[language].solution}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Architecture Section - Only for Hayah */}
      {'architecture' in project && project.architecture && (
        <section className="py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                🏗️ {project.architecture[language].title}
              </h2>

              <div className="space-y-8">
                {/* Multi-tenancy */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">{language === 'ar' ? 'Multi-Tenancy' : 'Multi-Tenancy'}</h3>
                  <p className="text-muted-foreground">{project.architecture[language].multiTenancy}</p>
                </div>

                {/* Roles */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">{language === 'ar' ? 'الأدوار (5 Roles)' : 'User Roles (5)'}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.architecture[language].roles.map((role: string, i: number) => (
                      <Badge key={i} variant="secondary" className="px-4 py-2">{role}</Badge>
                    ))}
                  </div>
                </div>

                {/* AI Features */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">{language === 'ar' ? 'الذكاء الاصطناعي السيادي' : 'Sovereign AI'}</h3>
                  <p className="text-muted-foreground">{project.architecture[language].aiFeatures}</p>
                </div>

                {/* Challenges & Solutions */}
                <div>
                  <h3 className="font-semibold text-lg mb-4">{language === 'ar' ? 'المشاكل والحلول' : 'Challenges & Solutions'}</h3>
                  <div className="space-y-3">
                    {project.architecture[language].challenges.map((item: { problem: string; solution: string }, i: number) => (
                      <div key={i} className="p-4 rounded-lg bg-secondary/30 border border-border/50">
                        <p className="text-red-600 dark:text-red-400 font-medium mb-1">❌ {item.problem}</p>
                        <p className="text-emerald-600 dark:text-emerald-400">✅ {item.solution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Comparison Table - Only for Hayah */}
      {'comparison' in project && project.comparison && (
        <section className="py-16 bg-secondary/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                {language === 'ar' ? '📊 المقارنة: قبل وبعد Hayah' : '📊 Comparison: Before & After Hayah'}
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary/10">
                      <th className="p-4 text-start font-semibold border-b border-border">{language === 'ar' ? 'المقياس' : 'Metric'}</th>
                      <th className="p-4 text-center font-semibold border-b border-border text-red-600 dark:text-red-400">{language === 'ar' ? 'قبل Hayah' : 'Before'}</th>
                      <th className="p-4 text-center font-semibold border-b border-border text-emerald-600 dark:text-emerald-400">{language === 'ar' ? 'بعد Hayah' : 'After'}</th>
                      <th className="p-4 text-center font-semibold border-b border-border text-primary">{language === 'ar' ? 'التحسن' : 'Change'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.comparison[language].map((row: { metric: string; before: string; after: string; improvement: string }, i: number) => (
                      <tr key={i} className="hover:bg-secondary/50 transition-colors">
                        <td className="p-4 border-b border-border font-medium">{row.metric}</td>
                        <td className="p-4 border-b border-border text-center text-muted-foreground">{row.before}</td>
                        <td className="p-4 border-b border-border text-center font-semibold">{row.after}</td>
                        <td className="p-4 border-b border-border text-center font-bold text-primary">{row.improvement}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Special Education Link - Only for Hayah */}
      {'specialEducationLink' in project && project.specialEducationLink && (
        <section className="py-12 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">
                {language === 'ar'
                  ? '💚 Hayah Learn لذوي الهمم'
                  : '💚 Hayah Learn for Special Needs'}
              </h2>
              <p className="text-lg text-white/90 mb-6">
                {language === 'ar'
                  ? 'اكتشف كيف تخدم Hayah أكثر من 10,000 طفل من ذوي الهمم بتكنولوجيا تعليمية ذكية'
                  : 'Discover how Hayah serves 10,000+ children with special needs using smart educational technology'}
              </p>
              <Button asChild size="lg" className="bg-white text-emerald-700 hover:bg-white/90">
                <Link to="/special-education">
                  {language === 'ar' ? 'اكتشف المزيد' : 'Learn More'}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="py-12 bg-secondary/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-card text-center">
                <CardContent className="p-6">
                  <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {project.stats.users[language]}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'المستخدمين' : 'Users'}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-card text-center">
                <CardContent className="p-6">
                  <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {project.stats.courses[language]}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'النطاق' : 'Scale'}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-card text-center">
                <CardContent className="p-6">
                  <Target className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {project.stats.completion[language]}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'الأداء' : 'Performance'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              {language === 'ar' ? 'المميزات الرئيسية' : 'Key Features'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {project.features[language].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-12 bg-secondary/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-foreground mb-6">
              {language === 'ar' ? 'التقنيات المستخدمة' : 'Tech Stack'}
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-background border border-border rounded-full text-sm font-medium text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {language === 'ar' ? 'هل تريد بناء مشروع مشابه؟' : 'Want to Build a Similar Project?'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {language === 'ar'
                ? 'تواصل معي لمناقشة فكرتك والحصول على استشارة مجانية'
                : 'Contact me to discuss your idea and get a free consultation'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/contact">
                  {language === 'ar' ? 'تواصل الآن' : 'Contact Now'}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/projects">
                  {language === 'ar' ? 'عرض المشاريع الأخرى' : 'View Other Projects'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;
