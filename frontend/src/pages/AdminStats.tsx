import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SEO } from '@/components/SEO';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { 
  ArrowLeft,
  Calendar, 
  Mail, 
  TrendingUp,
  Users,
  Loader2,
  BarChart3
} from 'lucide-react';
import { format, subDays, startOfMonth, endOfMonth, eachDayOfInterval, parseISO } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

interface Consultation {
  id: string;
  consultation_type: string;
  status: string;
  created_at: string;
}

interface ContactMessage {
  id: string;
  status: string;
  created_at: string;
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

const AdminStats = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [dateRange, setDateRange] = useState('30');

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/admin/auth');
        return;
      }

      const { data: hasRole } = await supabase.rpc('has_role', {
        _user_id: session.user.id,
        _role: 'admin'
      });

      if (!hasRole) {
        navigate('/admin/auth');
        return;
      }

      setIsAdmin(true);
      fetchData();
    };

    checkAuth();
  }, [navigate]);

  const fetchData = async () => {
    setIsLoading(true);
    
    const [consultationsRes, messagesRes] = await Promise.all([
      supabase.from('consultations').select('id, consultation_type, status, created_at').order('created_at', { ascending: true }),
      supabase.from('contact_messages').select('id, status, created_at').order('created_at', { ascending: true })
    ]);

    if (consultationsRes.data) setConsultations(consultationsRes.data);
    if (messagesRes.data) setMessages(messagesRes.data);
    
    setIsLoading(false);
  };

  const locale = language === 'ar' ? ar : enUS;

  // Filter data by date range
  const filteredData = useMemo(() => {
    const days = parseInt(dateRange);
    const startDate = subDays(new Date(), days);
    
    return {
      consultations: consultations.filter(c => new Date(c.created_at) >= startDate),
      messages: messages.filter(m => new Date(m.created_at) >= startDate)
    };
  }, [consultations, messages, dateRange]);

  // Daily activity data
  const dailyActivityData = useMemo(() => {
    const days = parseInt(dateRange);
    const dates = eachDayOfInterval({
      start: subDays(new Date(), days),
      end: new Date()
    });

    return dates.map(date => {
      const dateStr = format(date, 'yyyy-MM-dd');
      const consultationsCount = filteredData.consultations.filter(c => 
        format(parseISO(c.created_at), 'yyyy-MM-dd') === dateStr
      ).length;
      const messagesCount = filteredData.messages.filter(m => 
        format(parseISO(m.created_at), 'yyyy-MM-dd') === dateStr
      ).length;

      return {
        date: format(date, 'MMM dd', { locale }),
        [language === 'ar' ? 'الحجوزات' : 'Bookings']: consultationsCount,
        [language === 'ar' ? 'الرسائل' : 'Messages']: messagesCount,
      };
    });
  }, [filteredData, dateRange, language, locale]);

  // Consultation status distribution
  const consultationStatusData = useMemo(() => {
    const statusCounts: Record<string, number> = {};
    filteredData.consultations.forEach(c => {
      statusCounts[c.status] = (statusCounts[c.status] || 0) + 1;
    });

    const statusLabels: Record<string, { ar: string; en: string }> = {
      pending: { ar: 'معلق', en: 'Pending' },
      confirmed: { ar: 'مؤكد', en: 'Confirmed' },
      completed: { ar: 'مكتمل', en: 'Completed' },
      cancelled: { ar: 'ملغي', en: 'Cancelled' },
    };

    return Object.entries(statusCounts).map(([status, count]) => ({
      name: statusLabels[status]?.[language] || status,
      value: count,
    }));
  }, [filteredData.consultations, language]);

  // Message status distribution
  const messageStatusData = useMemo(() => {
    const statusCounts: Record<string, number> = {};
    filteredData.messages.forEach(m => {
      statusCounts[m.status] = (statusCounts[m.status] || 0) + 1;
    });

    const statusLabels: Record<string, { ar: string; en: string }> = {
      unread: { ar: 'غير مقروء', en: 'Unread' },
      read: { ar: 'مقروء', en: 'Read' },
      replied: { ar: 'تم الرد', en: 'Replied' },
    };

    return Object.entries(statusCounts).map(([status, count]) => ({
      name: statusLabels[status]?.[language] || status,
      value: count,
    }));
  }, [filteredData.messages, language]);

  // Consultation type distribution
  const consultationTypeData = useMemo(() => {
    const typeCounts: Record<string, number> = {};
    filteredData.consultations.forEach(c => {
      typeCounts[c.consultation_type] = (typeCounts[c.consultation_type] || 0) + 1;
    });

    return Object.entries(typeCounts).map(([type, count]) => ({
      name: type,
      value: count,
    }));
  }, [filteredData.consultations]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={language === 'ar' ? 'الإحصائيات' : 'Statistics'}
        description="Admin statistics"
        url="/admin/stats"
      />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/admin">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              {language === 'ar' ? 'الإحصائيات التفصيلية' : 'Detailed Statistics'}
            </h1>
          </div>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">{language === 'ar' ? 'آخر 7 أيام' : 'Last 7 days'}</SelectItem>
              <SelectItem value="30">{language === 'ar' ? 'آخر 30 يوم' : 'Last 30 days'}</SelectItem>
              <SelectItem value="90">{language === 'ar' ? 'آخر 90 يوم' : 'Last 90 days'}</SelectItem>
              <SelectItem value="365">{language === 'ar' ? 'آخر سنة' : 'Last year'}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      <main className="container py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'الحجوزات' : 'Bookings'}
                  </p>
                  <p className="text-2xl font-bold">{filteredData.consultations.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'الرسائل' : 'Messages'}
                  </p>
                  <p className="text-2xl font-bold">{filteredData.messages.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'معدل التحويل' : 'Conversion Rate'}
                  </p>
                  <p className="text-2xl font-bold">
                    {filteredData.consultations.length > 0 
                      ? Math.round((filteredData.consultations.filter(c => c.status === 'completed').length / filteredData.consultations.length) * 100)
                      : 0}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'معدل الرد' : 'Reply Rate'}
                  </p>
                  <p className="text-2xl font-bold">
                    {filteredData.messages.length > 0 
                      ? Math.round((filteredData.messages.filter(m => m.status === 'replied').length / filteredData.messages.length) * 100)
                      : 0}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Activity Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{language === 'ar' ? 'النشاط اليومي' : 'Daily Activity'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis 
                    dataKey="date" 
                    className="text-xs fill-muted-foreground"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    className="text-xs fill-muted-foreground"
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey={language === 'ar' ? 'الحجوزات' : 'Bookings'} 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey={language === 'ar' ? 'الرسائل' : 'Messages'} 
                    stroke="hsl(var(--chart-2))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--chart-2))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Charts Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Consultation Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {language === 'ar' ? 'حالات الحجوزات' : 'Booking Status'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {consultationStatusData.length > 0 ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={consultationStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {consultationStatusData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  {language === 'ar' ? 'لا توجد بيانات' : 'No data'}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Message Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {language === 'ar' ? 'حالات الرسائل' : 'Message Status'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {messageStatusData.length > 0 ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={messageStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {messageStatusData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  {language === 'ar' ? 'لا توجد بيانات' : 'No data'}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Consultation Types */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {language === 'ar' ? 'أنواع الاستشارات' : 'Consultation Types'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {consultationTypeData.length > 0 ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={consultationTypeData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis type="number" />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        width={100}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip />
                      <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  {language === 'ar' ? 'لا توجد بيانات' : 'No data'}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminStats;
