import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Send, Bot, User, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
}

const quickReplies = {
    ar: [
        'كم تكلفة تطوير منصة SaaS؟',
        'ما هي خدمات الذكاء الاصطناعي؟',
        'أريد حجز استشارة تقنية',
        'ارني سابقة أعمالك',
    ],
    en: [
        'Cost of SaaS development?',
        'What are your AI services?',
        'Book technical consultation',
        'Show me your portfolio',
    ],
};

const responses: Record<string, { ar: string; en: string }> = {
    services: {
        ar: 'أقدم خدمات متكاملة تشمل:\n\n1. **تطوير منتجات SaaS**: من الفكرة إلى الإطلاق.\n2. **حلول الذكاء الاصطناعي**: وكلاء أذكياء، تحليل بيانات، وأتمتة.\n3. **الأتمتة (Automation)**: ربط الأنظمة ببعضها (n8n, Make).\n\nما الذي يهمك منها بالتحديد؟',
        en: 'I provide end-to-end services including:\n\n1. **SaaS Development**: From concept to launch.\n2. **AI Solutions**: Intelligent agents, data analysis, and automation.\n3. **Automation**: Connecting systems (n8n, Make).\n\nWhich one interests you most?',
    },
    consultation: {
        ar: 'ممتاز! الاستشارة هي الخطوة الأولى الصحيحة.\n\nيمكنك حجز جلسة استراتيجية معي لمناقشة مشروعك. الجلسة الأولى مجانية بالكامل لتقييم الفكرة.\n\nهل ترغب في رابط الحجز المباشر؟',
        en: 'Great! Consultation is the right first step.\n\nYou can book a strategic session with me to discuss your project. The first session is completely free to evaluate the idea.\n\nWould you like the direct booking link?',
    },
    pricing: {
        ar: 'الاستثمار يعتمد على حجم المشروع والقيمة التي سيضيفها لعملك.\n\nلكن بشكل عام، العائد على الاستثمار (ROI) لعملائي يتجاوز 300% في السنة الأولى.\n\nدعنا نناقش التفاصيل في اجتماع سريع؟',
        en: 'Investment depends on project scope and the value it adds to your business.\n\nHowever, in general, the ROI for my clients exceeds 300% in the first year.\n\nShall we discuss details in a quick meeting?',
    },
    portfolio: {
        ar: 'فخور جداً بما أنجزناه! يمكنك الاطلاع على "صفحة الأعمال" لرؤية:\n\n- منصة "حياة" التعليمية\n- محرك "أوركسترا" للذكاء الاصطناعي\n- والعديد من دراسات الحالة.\n\nهل أنقلك لصفحة الأعمال الآن؟',
        en: 'Very proud of what we achieved! You can visit the "Portfolio" page to see:\n\n- "Hayah" Educational Platform\n- "Orchestrator" AI Engine\n- And many case studies.\n\nShall I take you to the Portfolio page now?',
    },
    default: {
        ar: 'أهلاً بك! أنا المساعد الذكي لأحمد قاعود.\n\nأنا هنا لاختصار الوقت عليك. بدلاً من البحث، اسألني مباشرة عن أي شيء يخص تطوير مشروعك التقني.',
        en: 'Welcome! I am Ahmad Qaoud\'s AI Assistant.\n\nI\'m here to save your time. Instead of searching, ask me directly about anything regarding your tech project development.',
    },
};

export function EmbeddedChat() {
    const { language, direction } = useLanguage();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const Arrow = direction === 'rtl' ? ArrowLeft : ArrowRight;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        // Initial welcome message
        setTimeout(() => {
            setMessages([{
                id: '1',
                content: responses.default[language],
                role: 'assistant',
                timestamp: new Date(),
            }]);
        }, 500);
    }, [language]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const getResponse = (userMessage: string): string => {
        const lowerMessage = userMessage.toLowerCase();

        if (lowerMessage.includes('خدم') || lowerMessage.includes('service') || lowerMessage.includes('ai') || lowerMessage.includes('saas')) {
            return responses.services[language];
        }
        if (lowerMessage.includes('حجز') || lowerMessage.includes('استشار') || lowerMessage.includes('book') || lowerMessage.includes('consult')) {
            return responses.consultation[language];
        }
        if (lowerMessage.includes('سعر') || lowerMessage.includes('تكلف') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            return responses.pricing[language];
        }
        if (lowerMessage.includes('أعمال') || lowerMessage.includes('مشاريع') || lowerMessage.includes('portfolio') || lowerMessage.includes('work')) {
            return responses.portfolio[language];
        }

        return language === 'ar'
            ? 'سؤال وجيه! بصفتي مساعداً ذكياً، لدي إجابات عامة، لكن أحمد لديه الإجابة الدقيقة.\n\nما رأيك أن أرسل رسالتك هذه له مباشرة عبر الواتساب للرد عليك؟'
            : 'Good question! As an AI assistant, I have general answers, but Ahmad has the precise one.\n\nHow about I send this message directly to him via WhatsApp to reply to you?';
    };

    const handleSend = (messageText?: string) => {
        const text = messageText || input.trim();
        if (!text) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            content: text,
            role: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate thinking and response
        setTimeout(() => {
            const response = getResponse(text);
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: response,
                role: 'assistant',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <Card className="w-full h-[600px] border-none shadow-2xl bg-background/60 backdrop-blur-md flex flex-col overflow-hidden ring-1 ring-white/10 relative group">
            {/* Decorative gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-gold/5 pointer-events-none" />

            {/* Header */}
            <div className="p-6 border-b border-border/50 flex items-center justify-between bg-background/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <span className="absolute right-0 bottom-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-navy flex items-center justify-center shadow-lg">
                            <Sparkles className="h-6 w-6 text-white animate-pulse" />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            {language === 'ar' ? 'المساعد الذكي' : 'AI Assistant'}
                            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium uppercase tracking-wider border border-primary/20">
                                Online
                            </span>
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {language === 'ar' ? 'يرد عادة في ثوانٍ' : 'Typically replies in seconds'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={cn(
                                'flex gap-4 max-w-[90%] animate-in fade-in-0 slide-in-from-bottom-2 duration-300',
                                message.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                            )}
                        >
                            <div className={cn(
                                "h-10 w-10 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                                message.role === 'user' ? "bg-primary text-primary-foreground" : "bg-card border border-border"
                            )}>
                                {message.role === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5 text-primary" />}
                            </div>

                            <div className="space-y-1">
                                <div
                                    className={cn(
                                        'p-4 text-sm leading-relaxed shadow-sm',
                                        message.role === 'user'
                                            ? 'bg-primary text-primary-foreground rounded-2xl rounded-tr-sm'
                                            : 'bg-card border border-border/50 rounded-2xl rounded-tl-sm text-foreground'
                                    )}
                                >
                                    <p className="whitespace-pre-wrap font-medium">{message.content}</p>
                                </div>
                                <span className="text-[10px] text-muted-foreground px-2 opacity-70">
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex gap-4 mr-auto max-w-[90%] animate-in fade-in-0">
                            <div className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center shrink-0">
                                <Bot className="h-5 w-5 text-primary" />
                            </div>
                            <div className="bg-card border border-border/50 rounded-2xl rounded-tl-sm p-4 flex items-center gap-1.5 h-[52px]">
                                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </ScrollArea>

            {/* Footer Area */}
            <div className="p-4 bg-background/50 backdrop-blur-sm border-t border-border/50 space-y-4">
                {/* Quick Actions */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none mask-gradient-x">
                    {quickReplies[language].map((reply) => (
                        <Button
                            key={reply}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSend(reply)}
                            className="rounded-full bg-background border-primary/20 hover:border-primary hover:bg-primary/5 hover:text-primary whitespace-nowrap transition-all"
                        >
                            {reply}
                        </Button>
                    ))}
                </div>

                {/* Input Area */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSend();
                    }}
                    className="relative flex items-center gap-2"
                >
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : 'Type your message here...'}
                        className="flex-1 h-12 rounded-full border-border/50 bg-background/50 focus:bg-background transition-colors pl-6 pr-14"
                    />
                    <Button
                        type="submit"
                        size="icon"
                        disabled={!input.trim()}
                        className="absolute right-1.5 h-9 w-9 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                    >
                        {direction === 'rtl' ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                    </Button>
                </form>
            </div>
        </Card>
    );
}
