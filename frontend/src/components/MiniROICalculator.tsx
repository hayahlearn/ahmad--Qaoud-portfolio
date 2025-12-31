import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Calculator, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackButtonClick } from '@/components/GoogleAnalytics';

export function MiniROICalculator() {
  const { language, direction } = useLanguage();
  const Arrow = direction === 'rtl' ? ArrowLeft : ArrowRight;
  const [monthlySpend, setMonthlySpend] = useState([10000]); // Default 10k

  const savingsPercentage = 0.40;
  const annualSavings = monthlySpend[0] * 12 * savingsPercentage;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card className="glass-card border-accent/20 overflow-hidden relative group w-full max-w-sm mx-auto lg:mx-0 shadow-elevated">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardContent className="p-6 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              {language === 'ar' ? 'حاسبة التوفير السريع' : 'Quick Savings Estimator'}
            </h3>
            <p className="text-xs text-muted-foreground">
              {language === 'ar' ? 'بناءً على تخفيض تكاليف 40%' : 'Based on 40% cost reduction'}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                {language === 'ar' ? 'مصاريفك التشغيلية الشهرية' : 'Monthly OpEx'}
              </span>
              <span className="font-bold text-foreground">{formatCurrency(monthlySpend[0])}</span>
            </div>
            <Slider
              value={monthlySpend}
              onValueChange={setMonthlySpend}
              min={1000}
              max={50000}
              step={1000}
              className="py-2"
            />
          </div>

          <div className="bg-background/50 rounded-xl p-4 border border-border/50 text-center animate-pulse-glow">
            <p className="text-xs text-muted-foreground mb-1">
              {language === 'ar' ? 'وفورات سنوية متوقعة' : 'Potential Annual Savings'}
            </p>
            <p className="text-2xl font-bold text-gradient-gold">
              {formatCurrency(annualSavings)}
            </p>
          </div>

          <Button asChild className="w-full shadow-lg hover:shadow-xl transition-all" size="sm">
            <Link to="/roi-calculator" onClick={() => trackButtonClick('mini_roi_details', 'hero_widget')}>
              {language === 'ar' ? 'تحليل العائد التفصيلي' : 'Get Detailed ROI Analysis'}
              <Arrow className="w-4 h-4 ms-2" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
