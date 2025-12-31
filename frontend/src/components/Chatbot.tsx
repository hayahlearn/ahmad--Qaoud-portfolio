import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const quickReplies = {
  ar: [
    'ما هي خدماتك؟',
    'كيف أحجز استشارة؟',
    'ما تكلفة الخدمات؟',
    'أريد رؤية أعمالك',
  ],
  en: [
    'What are your services?',
    'How to book consultation?',
    'What are your rates?',
    'Show me your work',
  ],
};

const responses: Record<string, { ar: string; en: string }> = {
  services: {
    ar: 'أقدم خدمات متخصصة في:\n\n🔹 التحول الرقمي الشامل\n🔹 حلول الذكاء الاصطناعي\n🔹 الأتمتة باستخدام Python و n8n\n🔹 تطوير منتجات SaaS\n\nهل تريد معرفة المزيد عن خدمة معينة؟',
    en: 'I offer specialized services in:\n\n🔹 Comprehensive Digital Transformation\n🔹 AI Solutions\n🔹 Automation using Python & n8n\n🔹 SaaS Product Development\n\nWould you like to learn more about a specific service?',
  },
  consultation: {
    ar: 'يمكنك حجز استشارة مجانية بسهولة:\n\n1️⃣ اذهب لصفحة "احجز استشارة"\n2️⃣ اختر نوع الاستشارة\n3️⃣ حدد الموعد المناسب\n4️⃣ أدخل بياناتك\n\nالاستشارة الأولى مجانية 100%! 🎁',
    en: 'You can easily book a free consultation:\n\n1️⃣ Go to "Book Consultation" page\n2️⃣ Choose consultation type\n3️⃣ Select convenient time\n4️⃣ Enter your details\n\nFirst consultation is 100% free! 🎁',
  },
  pricing: {
    ar: 'الأسعار تعتمد على نطاق المشروع واحتياجاتك.\n\n💡 احجز استشارة مجانية لنناقش متطلباتك ونقدم لك عرض سعر مفصل.\n\nالعائد على الاستثمار عادة يتجاوز 300%! 📈',
    en: 'Pricing depends on project scope and your needs.\n\n💡 Book a free consultation to discuss your requirements and get a detailed quote.\n\nROI typically exceeds 300%! 📈',
  },
  portfolio: {
    ar: 'لدي 4 منتجات SaaS رئيسية:\n\n🎓 حياة للتعلم - منصة تعليمية ذكية\n🤖 أوركاستريتور - محرك AI للمؤسسات\n🏨 منصة السياحة الفندقية\n🪑 منصة صناعة الأثاث\n\nبالإضافة لأكثر من 100 مسار عمل جاهز! يمكنك زيارة صفحة الأعمال للمزيد.',
    en: 'I have 4 main SaaS products:\n\n🎓 Hayat Learning - Smart learning platform\n🤖 Orchestrator - Enterprise AI engine\n🏨 Hotel Tourism Platform\n🪑 Furniture Industry Platform\n\nPlus 100+ ready workflows! Visit Portfolio page for more.',
  },
  default: {
    ar: 'شكراً لتواصلك! 👋\n\nأنا هنا لمساعدتك. يمكنك سؤالي عن:\n• الخدمات المتاحة\n• كيفية حجز استشارة\n• الأسعار والباقات\n• أعمالنا السابقة\n\nأو اكتب سؤالك مباشرة!',
    en: 'Thanks for reaching out! 👋\n\nI\'m here to help. You can ask me about:\n• Available services\n• How to book consultation\n• Pricing & packages\n• Our previous work\n\nOr type your question directly!',
  },
};

export function Chatbot() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Send welcome message
      setTimeout(() => {
        setMessages([{
          id: '1',
          content: responses.default[language],
          role: 'assistant',
          timestamp: new Date(),
        }]);
      }, 500);
    }
  }, [isOpen, language, messages.length]);

  const getResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('خدم') || lowerMessage.includes('service')) {
      return responses.services[language];
    }
    if (lowerMessage.includes('حجز') || lowerMessage.includes('استشار') || lowerMessage.includes('book') || lowerMessage.includes('consult')) {
      return responses.consultation[language];
    }
    if (lowerMessage.includes('سعر') || lowerMessage.includes('تكلف') || lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('rate')) {
      return responses.pricing[language];
    }
    if (lowerMessage.includes('أعمال') || lowerMessage.includes('مشاريع') || lowerMessage.includes('work') || lowerMessage.includes('portfolio') || lowerMessage.includes('project')) {
      return responses.portfolio[language];
    }

    return language === 'ar'
      ? 'شكراً لسؤالك! للحصول على إجابة مفصلة، أنصحك بحجز استشارة مجانية معنا. هل تريد معرفة كيفية الحجز؟'
      : 'Thanks for your question! For a detailed answer, I recommend booking a free consultation with us. Would you like to know how to book?';
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

    // Simulate response delay
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
    }, 1000 + Math.random() * 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed bottom-6 z-50 h-16 w-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border-4 border-background',
          language === 'ar' ? 'left-8' : 'right-8',
          isOpen ? 'bg-destructive hover:bg-destructive/90' : 'bg-primary hover:bg-primary/90 animate-bounce shadow-primary/25'
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className={cn(
          'fixed bottom-24 z-50 w-[360px] max-w-[calc(100vw-2rem)] shadow-elevated border-border/50 overflow-hidden animate-in slide-in-from-bottom-4 duration-300',
          language === 'ar' ? 'left-6' : 'right-6'
        )}>
          <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-4">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold">{language === 'ar' ? 'مساعد أحمد قاعود' : 'Ahmad Qaoud Assistant'}</p>
                <p className="text-xs font-normal opacity-80">
                  {language === 'ar' ? 'متصل الآن' : 'Online now'}
                </p>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-secondary/20">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex gap-2',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={cn(
                      'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-sm'
                        : 'bg-card border border-border/50 rounded-bl-sm'
                    )}
                  >
                    {message.content}
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <User className="h-4 w-4 text-accent" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="bg-card border border-border/50 rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="px-4 py-2 border-t border-border/50 bg-background">
                <div className="flex flex-wrap gap-2">
                  {quickReplies[language].map((reply) => (
                    <Button
                      key={reply}
                      variant="outline"
                      size="sm"
                      className="text-xs h-8"
                      onClick={() => handleSend(reply)}
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border/50 bg-background">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={language === 'ar' ? 'اكتب رسالتك...' : 'Type your message...'}
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={!input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
