
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ArrowLeft, MailOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export const NewsletterArchive = () => {
    const { language, direction } = useLanguage();
    const Arrow = direction === 'rtl' ? ArrowLeft : ArrowRight;

    const archiveItems = [
        {
            id: 1,
            title: { ar: 'كيف تبني وكيل ذكاء اصطناعي في ساعة واحدة؟', en: 'How to Build an AI Agent in 1 Hour?' },
            date: 'Nov 2024',
            tag: { ar: 'تقني', en: 'Tech' }
        },
        {
            id: 2,
            title: { ar: 'مستقبل العمل: هل سيأخذ الـ AI وظيفتي؟', en: 'Future of Work: Will AI Take My Job?' },
            date: 'Oct 2024',
            tag: { ar: 'رأي', en: 'Opinion' }
        },
        {
            id: 3,
            title: { ar: 'أدوات "No-Code" التي يجب أن تعرفها', en: 'No-Code Tools You Must Know' },
            date: 'Sep 2024',
            tag: { ar: 'أدوات', en: 'Tools' }
        }
    ];

    return (
        <div className="max-w-4xl mx-auto mb-16">
            <div className="text-center mb-8">
                <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                    {language === 'ar' ? 'أرشيف النشرة' : 'Newsletter Archive'}
                </span>
                <h3 className="text-2xl font-bold mt-2 text-white">
                    {language === 'ar' ? 'أفضل ما كتبنا في النشرة السابقة' : 'Best of Previous Issues'}
                </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {archiveItems.map((item, index) => (
                    <motion.a
                        href="#"
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <Badge variant="outline" className="border-white/20 text-white/80">
                                {item.tag[language]}
                            </Badge>
                            <span className="text-xs text-white/50">{item.date}</span>
                        </div>
                        <div className="mb-4">
                            <MailOpen className="w-8 h-8 text-accent mb-3 opacity-80" />
                            <h4 className="font-bold text-lg text-white group-hover:text-accent transition-colors leading-snug">
                                {item.title[language]}
                            </h4>
                        </div>
                        <div className="flex items-center text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                            {language === 'ar' ? 'قراءة العدد' : 'Read Issue'}
                            <Arrow className="w-4 h-4 mx-1" />
                        </div>
                    </motion.a>
                ))}
            </div>
        </div>
    );
};
