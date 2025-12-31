import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { WhatsAppCardProps } from './types';
import { WHATSAPP_NUMBER } from './schema';

export function WhatsAppCard({ language }: WhatsAppCardProps) {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <div
            ref={ref}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                transition: `opacity 0.6s ease-out, transform 0.6s ease-out`,
            }}
        >
            <Card className="group relative border-0 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white overflow-hidden hover:shadow-glow transition-all duration-500">
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                {/* Glow */}
                <div className="absolute inset-0 bg-emerald-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardContent className="relative p-8">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-white/20 rounded-2xl blur-lg animate-pulse-glow" />
                            <div className="relative h-18 w-18 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                <MessageCircle className="h-9 w-9" />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-2">
                                {language === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
                            </h3>
                            <p className="text-white/80 mb-4">
                                {language === 'ar' ? 'للرد السريع والمباشر' : 'For quick & direct response'}
                            </p>
                            <a
                                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 rounded-xl font-bold hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg"
                            >
                                <MessageCircle className="h-5 w-5" />
                                {language === 'ar' ? 'ابدأ المحادثة' : 'Start Chat'}
                            </a>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
