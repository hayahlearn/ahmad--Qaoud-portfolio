
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { n8nService } from '@/lib/api/n8nService';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const formatMessage = (content: string) => {
    let formatted = content
        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Code
        .replace(/`(.*?)`/g, '<code class="bg-secondary px-1 py-0.5 rounded text-xs font-mono">$1</code>')
        // Links
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:text-primary/80">$1</a>');

    // Lists (Simple bullet points)
    if (formatted.includes('\n- ')) {
        const lines = formatted.split('\n');
        let inList = false;
        let listBuffer = '';
        const finalLines = [];

        for (const line of lines) {
            if (line.trim().startsWith('- ')) {
                if (!inList) {
                    inList = true;
                    listBuffer = '<ul class="list-disc list-inside space-y-1 my-2">';
                }
                listBuffer += `<li>${line.trim().substring(2)}</li>`;
            } else {
                if (inList) {
                    inList = false;
                    listBuffer += '</ul>';
                    finalLines.push(listBuffer);
                    listBuffer = '';
                }
                finalLines.push(line);
            }
        }
        if (inList) {
            listBuffer += '</ul>';
            finalLines.push(listBuffer);
        }
        formatted = finalLines.join('<br/>');
    } else {
        formatted = formatted.replace(/\n/g, '<br/>');
    }

    return formatted;
};

const AIChatWidget = () => {
    const { language, direction } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'assistant',
            content: language === 'ar'
                ? 'مرحباً بك! أنا مساعدك الذكي من "أحمد قاعود". كيف يمكنني مساعدتك في التحول الرقمي اليوم؟'
                : 'Welcome! I am Ahmad Qaoud\'s AI Assistant. How can I help you with digital transformation today?',
            timestamp: new Date()
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        try {
            // Call n8n Digital Brain
            const response = await n8nService.sendChatMessage(inputValue, messages);

            const aiResponseContent = response.response || (language === 'ar'
                ? "أنا هنا للمساعدة، لكن يبدو أن هناك مشكلة في الاتصال بعقلي الرقمي حالياً."
                : "I'm here to help, but having trouble connecting to my digital brain right now.");

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: aiResponseContent,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error("Chat Error:", error);
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: language === 'ar' ? "عذراً، حدث خطأ تقني." : "Sorry, a technical error occurred.",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    if (!isOpen) {
        return (
            <Button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-110 animate-bounce-subtle"
                aria-label="Open AI Chat"
            >
                <MessageCircle className="h-8 w-8 text-primary-foreground" />
            </Button>
        );
    }

    return (
        <Card className={cn(
            "fixed z-50 transition-all duration-300 shadow-2xl border-primary/20 flex flex-col overflow-hidden",
            isMinimized
                ? "bottom-6 right-6 w-72 h-16"
                : "bottom-6 right-6 w-[90vw] sm:w-[400px] h-[600px] max-h-[80vh]"
        )}>
            {/* Header */}
            <CardHeader className="p-4 bg-primary text-primary-foreground flex flex-row items-center justify-between space-y-0 shrink-0 cursor-pointer" onClick={() => isMinimized && setIsMinimized(false)}>
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-full relative">
                        <Bot className="h-5 w-5 text-white" />
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-primary rounded-full"></span>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">
                            {language === 'ar' ? 'المساعد الذكي' : 'AI Assistant'}
                        </h3>
                        <p className="text-xs opacity-80">
                            {language === 'ar' ? 'متاح للرد فوراً' : 'Online'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}>
                        <Minimize2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>

            {!isMinimized && (
                <>
                    {/* Messages Area */}
                    <ScrollArea className="flex-1 p-4 bg-secondary/5" ref={scrollRef}>
                        <div className="space-y-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex gap-3 max-w-[85%]",
                                        msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1",
                                        msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                                    )}>
                                        {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                    </div>
                                    <div className={cn(
                                        "p-3 rounded-2xl text-sm shadow-sm",
                                        msg.role === 'user'
                                            ? "bg-primary text-primary-foreground rounded-tr-none"
                                            : "bg-background border border-border rounded-tl-none"
                                    )}>
                                        <div className="prose prose-sm dark:prose-invert max-w-none break-words" dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} />
                                        <span className="text-[10px] opacity-50 block mt-1 text-right">
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-3 max-w-[85%]">
                                    <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shrink-0 mt-1">
                                        <Bot className="h-4 w-4" />
                                    </div>
                                    <div className="bg-background border border-border p-4 rounded-2xl rounded-tl-none shadow-sm">
                                        <div className="flex gap-1.5 items-center h-4">
                                            <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                            <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                            <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Dummy div to force scroll to bottom via ref? ScrollArea handles it differently usually, using div ref inside */}
                        <div ref={scrollRef} />
                    </ScrollArea>

                    {/* Input Area */}
                    <CardFooter className="p-3 border-t bg-background shrink-0">
                        <div className="flex w-full gap-2 items-center">
                            <Input
                                placeholder={language === 'ar' ? 'اكتب رسالتك...' : 'Type your message...'}
                                className="flex-1 bg-secondary/10 border-0 focus-visible:ring-1"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <Button size="icon" onClick={handleSend} disabled={!inputValue.trim()} className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground">
                                <Send className={cn("h-4 w-4", direction === 'rtl' ? "rotate-180" : "")} />
                            </Button>
                        </div>
                    </CardFooter>
                </>
            )}
        </Card>
    );
};

export default AIChatWidget;
