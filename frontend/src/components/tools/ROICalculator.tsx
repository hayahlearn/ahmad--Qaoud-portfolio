
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calculator, ArrowRight, DollarSign, Users, Clock } from 'lucide-react';

const ROICalculator = () => {
    const { language } = useLanguage();
    const isRTL = language === 'ar';

    const [inputs, setInputs] = useState({
        employees: 10,
        avgSalary: 5000, // Monthly
        manualHours: 30, // Percentage of time
    });

    const [results, setResults] = useState<{
        currentCost: number;
        projectedCost: number;
        savings: number;
        hoursSaved: number;
    } | null>(null);

    const calculateROI = () => {
        // Annual calculations
        const totalAnnualSalary = inputs.employees * inputs.avgSalary * 12;
        const currentManualCost = totalAnnualSalary * (inputs.manualHours / 100);

        // Assumption: AI reduces manual task time by 70%
        const reductionFactor = 0.7;
        const savings = currentManualCost * reductionFactor;
        const projectedCost = totalAnnualSalary - savings;
        const hoursSavedPerYear = (inputs.employees * 160 * 12) * (inputs.manualHours / 100) * reductionFactor;

        setResults({
            currentCost: totalAnnualSalary,
            projectedCost: projectedCost,
            savings: savings,
            hoursSaved: Math.round(hoursSavedPerYear)
        });
    };

    const chartData = results ? [
        {
            name: language === 'ar' ? 'التكلفة الحالية' : 'Current Cost',
            value: results.currentCost,
            fill: '#ef4444' // red-500
        },
        {
            name: language === 'ar' ? 'مع الأتمتة' : 'With Automation',
            value: results.projectedCost,
            fill: '#22c55e' // green-500
        }
    ] : [];

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat(language === 'ar' ? 'ar-EG' : 'en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <Card className="w-full shadow-lg border-primary/20 overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Calculator className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-bold text-foreground">
                            {language === 'ar' ? 'حاسبة العائد على الاستثمار' : 'ROI Calculator'}
                        </CardTitle>
                        <CardDescription>
                            {language === 'ar'
                                ? 'احسب كم يمكنك توفيره سنوياً باستخدام حلول الأتمتة والذكاء الاصطناعي'
                                : 'Calculate your potential annual savings with AI & Automation solutions'
                            }
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-6 grid lg:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="space-y-6">
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-muted-foreground" />
                                {language === 'ar' ? 'عدد الموظفين' : 'Number of Employees'}
                            </Label>
                            <Input
                                type="number"
                                value={inputs.employees}
                                onChange={(e) => setInputs({ ...inputs, employees: Number(e.target.value) })}
                                className="bg-background/50"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-muted-foreground" />
                                {language === 'ar' ? 'متوسط الراتب الشهري (لكل موظف)' : 'Avg Monthly Salary (per employee)'}
                            </Label>
                            <Input
                                type="number"
                                value={inputs.avgSalary}
                                onChange={(e) => setInputs({ ...inputs, avgSalary: Number(e.target.value) })}
                                className="bg-background/50"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                {language === 'ar' ? 'نسبة الوقت في مهام روتينية (%)' : '% Time on Routine Tasks'}
                            </Label>
                            <div className="flex items-center gap-4">
                                <Input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={inputs.manualHours}
                                    onChange={(e) => setInputs({ ...inputs, manualHours: Number(e.target.value) })}
                                    className="flex-1"
                                />
                                <span className="w-12 font-bold text-primary">{inputs.manualHours}%</span>
                            </div>
                        </div>
                    </div>

                    <Button onClick={calculateROI} className="w-full gap-2 text-lg h-12">
                        {language === 'ar' ? 'احسب التوفير' : 'Calculate Savings'}
                        <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                    </Button>

                    {/* Results Summary Text */}
                    {results && (
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/20 text-center">
                                <p className="text-sm text-green-600 font-semibold mb-1">
                                    {language === 'ar' ? 'توفير سنوي متوقع' : 'Est. Annual Savings'}
                                </p>
                                <p className="text-2xl font-bold text-green-700">
                                    {formatCurrency(results.savings)}
                                </p>
                            </div>
                            <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-center">
                                <p className="text-sm text-blue-600 font-semibold mb-1">
                                    {language === 'ar' ? 'ساعات عمل موفرة' : 'Hours Saved'}
                                </p>
                                <p className="text-2xl font-bold text-blue-700">
                                    {results.hoursSaved.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Chart Visuals */}
                <div className="bg-secondary/10 rounded-xl p-4 flex items-center justify-center min-h-[300px] relative">
                    {!results ? (
                        <div className="text-center text-muted-foreground opacity-60">
                            <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <p>{language === 'ar' ? 'أدخل البيانات واضغط احسب' : 'Enter data to see projection'}</p>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
                                <YAxis tickFormatter={(val) => `$${val / 1000}k`} tick={{ fill: '#6b7280' }} />
                                <Tooltip
                                    formatter={(value: number) => formatCurrency(value)}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={60} />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default ROICalculator;
