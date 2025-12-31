import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, DollarSign, Clock, ArrowRight, ArrowLeft, Info, Users, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackButtonClick, trackEvent } from '@/components/GoogleAnalytics';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ROICalculatorProps {
  variant?: 'full' | 'compact';
}

// Realistic Constants
const WORKING_DAYS_PER_MONTH = 26; // 6 days a week * 4.33 weeks approx
const AVG_WEEKS_PER_MONTH = 4.33;

export function ROICalculator({ variant = 'full' }: ROICalculatorProps) {
  const { language, direction } = useLanguage();
  const ArrowIcon = direction === 'rtl' ? ArrowLeft : ArrowRight;

  // State for Inputs
  const [employees, setEmployees] = useState([5]);
  const [avgSalary, setAvgSalary] = useState([400]); // Default $400
  const [dailyWorkHours, setDailyWorkHours] = useState([8]); // Default 8 hours
  const [dailyWastedHours, setDailyWastedHours] = useState([2]); // Default 2 hours wasted on manual tasks

  const [infraCost, setInfraCost] = useState([200]); // Lower default infrastructure cost
  const [errorCost, setErrorCost] = useState([100]); // Lower default error cost

  // Memoized calculations with realistic logic
  const calculations = useMemo(() => {
    // Inputs
    const numEmployees = employees[0];
    const monthlySalary = avgSalary[0];
    const workHoursPerDay = dailyWorkHours[0];
    const wastedHoursPerDay = dailyWastedHours[0];
    const monthlyInfraCost = infraCost[0];
    const monthlyErrorCost = errorCost[0];

    // 1. Calculate Real Hourly Rate
    // Monthly Working Hours = Work Hours Day * 26 Days
    const monthlyWorkingHours = workHoursPerDay * WORKING_DAYS_PER_MONTH;
    const hourlyRate = monthlySalary / monthlyWorkingHours;

    // 2. Labor Savings
    // How much money is wasted on manual tasks?
    // Savings = Employees * Daily Wasted Hours * 26 Days * Hourly Rate
    // We assume 100% of these "wasted" hours can be reclaimed or repurposed via automation
    const monthlyLaborSavings = numEmployees * wastedHoursPerDay * WORKING_DAYS_PER_MONTH * hourlyRate;
    const monthlyHoursSaved = numEmployees * wastedHoursPerDay * WORKING_DAYS_PER_MONTH;

    // 3. Infrastructure Savings (conservative 50% savings via optimization)
    const infraSavings = monthlyInfraCost * 0.50;

    // 4. Error Reduction Savings (conservative 80% avoided)
    const errorSavings = monthlyErrorCost * 0.80;

    // Total Monthly & Annual Savings
    const totalMonthlySavings = monthlyLaborSavings + infraSavings + errorSavings;
    const annualSavings = totalMonthlySavings * 12;

    // Implementation Estimate (Realistic: 1.5 months of total payroll for the team involved)
    // This is a rough heuristic: Setup cost usually correlates with team size/complexity.
    const implementationCost = (monthlySalary * numEmployees) * 1.5 + 500; // Base setup fee

    // ROI Calculation
    const netGainFirstYear = annualSavings - implementationCost;
    const estimatedROI = implementationCost > 0
      ? Math.round((netGainFirstYear / implementationCost) * 100)
      : 0;

    // Payback period
    const paybackMonths = totalMonthlySavings > 0
      ? Math.round((implementationCost / totalMonthlySavings) * 10) / 10
      : 0;

    return {
      monthlyHoursSaved: Math.round(monthlyHoursSaved),
      monthlySavings: Math.round(totalMonthlySavings),
      annualSavings: Math.round(annualSavings),
      estimatedROI: Math.max(0, estimatedROI),
      paybackMonths: paybackMonths > 60 ? '> 60' : paybackMonths,
      implementationCost: Math.round(implementationCost)
    };
  }, [employees, avgSalary, dailyWorkHours, dailyWastedHours, infraCost, errorCost]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  if (variant === 'compact') {
    return (
      <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-primary/5">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
              <Calculator className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold">
                {language === 'ar' ? 'حاسبة العائد على الاستثمار' : 'ROI Calculator'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'ar' ? 'احسب توفيراتك المحتملة' : 'Calculate your potential savings'}
              </p>
            </div>
          </div>
          <Button asChild className="w-full" onClick={() => trackButtonClick('roi_calculator_compact', 'roi_compact')}>
            <Link to="/roi-calculator">
              {language === 'ar' ? 'احسب الآن' : 'Calculate Now'}
              <ArrowIcon className="h-4 w-4 ms-2" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 shadow-elevated overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
            <Calculator className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-2xl">
              {language === 'ar' ? 'حاسبة العائد على الاستثمار' : 'ROI Calculator'}
            </CardTitle>
            <p className="text-sm opacity-90">
              {language === 'ar'
                ? ' تقديرات واقعية بناءً على ظروف العمل المعيارية (6 أيام عمل/أسبوع)'
                : 'Realistic estimates based on standard working conditions (6 days/week)'}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Inputs Section */}
          <div className="space-y-8">

            {/* Inaction Warning */}
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-3 animate-pulse">
              <div className="p-2 bg-destructive/20 rounded-full">
                <TrendingUp className="w-5 h-5 text-destructive rotate-180" />
              </div>
              <div>
                <p className="text-xs font-bold text-destructive uppercase tracking-wider">
                  {language === 'ar' ? 'تكلفة عدم اتخاذ قرار (يومياً)' : 'Cost of Inaction (Daily)'}
                </p>
                <p className="text-lg font-bold text-destructive">
                  {formatCurrency(Math.round(calculations.monthlySavings / 26))}
                  <span className="text-xs font-normal text-muted-foreground ms-1">
                    {language === 'ar' ? '/ يوم ضائع' : '/ day lost'}
                  </span>
                </p>
              </div>
            </div>

            {/* Employees */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  {language === 'ar' ? 'عدد الموظفين' : 'Number of Employees'}
                </label>
                <Badge variant="outline" className="text-lg font-bold px-3 min-w-[3rem] justify-center">
                  {employees[0]}
                </Badge>
              </div>
              <Slider
                value={employees}
                onValueChange={setEmployees}
                min={1}
                max={50}
                step={1}
                className="w-full"
              />
            </div>

            {/* Average Salary */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  {language === 'ar' ? 'متوسط الراتب الشهري ($)' : 'Avg Monthly Salary ($)'}
                </label>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-lg font-bold px-3">
                    {formatCurrency(avgSalary[0])}
                  </Badge>
                </div>
              </div>
              <Slider
                value={avgSalary}
                onValueChange={setAvgSalary}
                min={200}
                max={1500}
                step={50}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>$200</span>
                <span>$1,500</span>
              </div>
            </div>

            {/* Daily Work Hours */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" />
                  {language === 'ar' ? 'ساعات العمل اليومية' : 'Daily Work Hours'}
                </label>
                <Badge variant="outline" className="text-lg font-bold px-3">
                  {dailyWorkHours[0]} {language === 'ar' ? 'س' : 'h'}
                </Badge>
              </div>
              <Slider
                value={dailyWorkHours}
                onValueChange={setDailyWorkHours}
                min={6}
                max={12}
                step={0.5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>6h</span>
                <span>12h</span>
              </div>
            </div>

            {/* Daily Wasted Hours */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-destructive" />
                  {language === 'ar'
                    ? 'ساعات المهام اليدوية (يومياً)'
                    : 'Manual Task Hours (Daily)'}
                  <Tooltip>
                    <TooltipTrigger><Info className="h-3 w-3 text-muted-foreground cursor-help" /></TooltipTrigger>
                    <TooltipContent>{language === 'ar' ? 'الوقت المستغرق في مهام روتينية يمكن أتمتتها' : 'Time spent on routine tasks that can be automated'}</TooltipContent>
                  </Tooltip>
                </label>
                <Badge variant="outline" className="text-lg font-bold px-3 border-destructive/30 text-destructive">
                  {dailyWastedHours[0]} {language === 'ar' ? 'س' : 'h'}
                </Badge>
              </div>
              <Slider
                value={dailyWastedHours}
                onValueChange={(val) => setDailyWastedHours([Math.min(val[0], dailyWorkHours[0])])}
                min={0.5}
                max={8}
                step={0.5}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground mt-2">
                {language === 'ar' ? 'كم ساعة تضيع يومياً لكل موظف؟' : 'How many hours are wasted daily per employee?'}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border/50" />

            {/* Other Costs (Optional) */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium mb-2 block">{language === 'ar' ? 'تكاليف تقنية حالية' : 'Current Tech Costs'}</label>
                <Slider value={infraCost} onValueChange={setInfraCost} min={0} max={2000} step={50} />
                <div className="text-right text-xs mt-1 text-muted-foreground">{formatCurrency(infraCost[0])}</div>
              </div>
              <div>
                <label className="text-xs font-medium mb-2 block">{language === 'ar' ? 'خسائر الأخطاء (شهرياً)' : 'Error Losses (Monthly)'}</label>
                <Slider value={errorCost} onValueChange={setErrorCost} min={0} max={1000} step={50} />
                <div className="text-right text-xs mt-1 text-muted-foreground">{formatCurrency(errorCost[0])}</div>
              </div>
            </div>

          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-secondary/10 border border-secondary/30 space-y-8 backdrop-blur-sm">
              <h3 className="font-bold text-xl flex items-center gap-2 text-primary">
                <TrendingUp className="w-6 h-6" />
                {language === 'ar' ? 'تحليل التوفير المتوقع' : 'Projected Savings Analysis'}
              </h3>

              <div className="space-y-4">
                {/* Annual Savings - Hero Result */}
                <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-gradient-to-br from-gold/20 via-gold/10 to-transparent border border-gold/30 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="text-sm font-medium uppercase tracking-widest text-gold mb-2">
                    {language === 'ar' ? 'إجمالي التوفير السنوي' : 'Total Annual Savings'}
                  </div>
                  <div className="text-5xl lg:text-6xl font-black text-foreground drop-shadow-sm">
                    {formatCurrency(calculations.annualSavings)}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-0">
                      ROI {calculations.estimatedROI}%
                    </Badge>
                    <Badge variant="outline" className="border-border">
                      {formatCurrency(calculations.monthlySavings)} / {language === 'ar' ? 'شهر' : 'mo'}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-background/60 border border-border/50">
                    <div className="text-xs text-muted-foreground mb-1">{language === 'ar' ? 'ساعات تم توفيرها' : 'Hours Saved'}</div>
                    <div className="text-2xl font-bold flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      {calculations.monthlyHoursSaved}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-background/60 border border-border/50">
                    <div className="text-xs text-muted-foreground mb-1">{language === 'ar' ? 'فترة الاسترداد' : 'Payback Period'}</div>
                    <div className="text-2xl font-bold text-green-500">
                      {calculations.paybackMonths} <span className="text-sm font-normal text-muted-foreground">{language === 'ar' ? 'شهر' : 'mo'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings Breakdown */}
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">{language === 'ar' ? 'مصادر التوفير' : 'Savings Breakdown'}</p>
                <div className="flex justify-between text-sm p-2 rounded hover:bg-white/5 transition-colors">
                  <span>{language === 'ar' ? 'توفير العمالة' : 'Labor Savings'}</span>
                  <span className="font-bold opacity-80">{formatCurrency(calculations.monthlySavings * 12 * 0.8)}/yr</span>
                </div>
                <div className="flex justify-between text-sm p-2 rounded hover:bg-white/5 transition-colors">
                  <span>{language === 'ar' ? 'منع الأخطاء' : 'Error Prevention'}</span>
                  <span className="font-bold opacity-80 text-green-500">{formatCurrency(calculations.monthlySavings * 12 * 0.15)}/yr</span>
                </div>
                <div className="flex justify-between text-sm p-2 rounded hover:bg-white/5 transition-colors">
                  <span>{language === 'ar' ? 'البنية التحتية' : 'Infrastructure'}</span>
                  <span className="font-bold opacity-80 text-blue-500">{formatCurrency(calculations.monthlySavings * 12 * 0.05)}/yr</span>
                </div>
              </div>

            </div>

            <div className="pt-2 grid gap-3">
              <Button size="lg" className="w-full bg-gold text-navy hover:bg-gold-light text-lg h-14 shadow-lg hover:shadow-gold/20 transition-all font-bold" asChild onClick={() => {
                trackButtonClick('roi_get_analysis', 'roi_calculator');
                trackEvent('roi_calculation_realistic', calculations);
              }}>
                <Link to="/book">
                  {language === 'ar' ? 'ابدأ في توفير هذا المبلغ الآن' : 'Start Saving This Amount Now'}
                  <ArrowIcon className="h-5 w-5 ms-2 animate-pulse" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full border-primary/20 hover:bg-primary/5 text-primary"
                onClick={() => {
                  window.print();
                  trackButtonClick('roi_export_report', 'roi_calculator');
                }}
              >
                {language === 'ar' ? 'تصدير التقرير (PDF)' : 'Export Report (PDF)'}
              </Button>

              <p className="text-[10px] text-center text-muted-foreground mt-3 px-4 leading-relaxed opacity-60">
                {language === 'ar'
                  ? '* هذه الأرقام تقديرية وتعتمد على متوسطات الصناعة. احجز استشارة للحصول على تحليل دقيق لشركتك.'
                  : '* Figures are estimates based on industry averages. Book a consultation for a precise analysis of your company.'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
