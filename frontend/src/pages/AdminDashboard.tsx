import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { SEO } from '@/components/SEO';
import { SearchFilter } from '@/components/admin/SearchFilter';
import { exportToCSV } from '@/utils/exportToExcel';
import {
  Calendar,
  Mail,
  MessageSquare,
  LogOut,
  Clock,
  User,
  Building,
  Phone,
  Loader2,
  Download,
  BarChart3
} from 'lucide-react';

interface Consultation {
  id: string;
  consultation_type: string;
  selected_date: string;
  selected_time: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  created_at: string;
}

const CONSULTATION_STATUS_OPTIONS = [
  { value: 'pending', label: { ar: 'معلق', en: 'Pending' } },
  { value: 'confirmed', label: { ar: 'مؤكد', en: 'Confirmed' } },
  { value: 'completed', label: { ar: 'مكتمل', en: 'Completed' } },
  { value: 'cancelled', label: { ar: 'ملغي', en: 'Cancelled' } },
];

const MESSAGE_STATUS_OPTIONS = [
  { value: 'unread', label: { ar: 'غير مقروء', en: 'Unread' } },
  { value: 'read', label: { ar: 'مقروء', en: 'Read' } },
  { value: 'replied', label: { ar: 'تم الرد', en: 'Replied' } },
];

const AdminDashboard = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [activeTab, setActiveTab] = useState('consultations');

  // Search and filter states
  const [consultationSearch, setConsultationSearch] = useState('');
  const [consultationStatusFilter, setConsultationStatusFilter] = useState('all');
  const [messageSearch, setMessageSearch] = useState('');
  const [messageStatusFilter, setMessageStatusFilter] = useState('all');

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        navigate('/admin/auth');
        return;
      }

      // Check if user is admin
      const { data: hasRole } = await supabase.rpc('has_role', {
        _user_id: session.user.id,
        _role: 'admin'
      });

      if (!hasRole) {
        toast.error(language === 'ar' ? 'غير مصرح لك بالوصول' : 'Access denied');
        navigate('/admin/auth');
        return;
      }

      setIsAdmin(true);
      fetchData();
    };

    checkAuth();
  }, [navigate, language]);

  const fetchData = async () => {
    setIsLoading(true);

    // Fetch consultations
    const { data: consultationsData, error: consultationsError } = await supabase
      .from('consultations')
      .select('*')
      .order('created_at', { ascending: false });

    if (consultationsError) {
      console.error('Error fetching consultations:', consultationsError);
    } else {
      setConsultations(consultationsData || []);
    }

    // Fetch messages
    const { data: messagesData, error: messagesError } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (messagesError) {
      console.error('Error fetching messages:', messagesError);
    } else {
      setMessages(messagesData || []);
    }

    setIsLoading(false);
  };

  const updateConsultationStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('consultations')
      .update({ status })
      .eq('id', id);

    if (error) {
      toast.error(language === 'ar' ? 'حدث خطأ' : 'Error occurred');
    } else {
      toast.success(language === 'ar' ? 'تم التحديث' : 'Updated successfully');
      fetchData();
    }
  };

  const updateMessageStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('contact_messages')
      .update({ status })
      .eq('id', id);

    if (error) {
      toast.error(language === 'ar' ? 'حدث خطأ' : 'Error occurred');
    } else {
      toast.success(language === 'ar' ? 'تم التحديث' : 'Updated successfully');
      fetchData();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/auth');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: { ar: string; en: string } }> = {
      pending: { variant: 'secondary', label: { ar: 'معلق', en: 'Pending' } },
      confirmed: { variant: 'default', label: { ar: 'مؤكد', en: 'Confirmed' } },
      completed: { variant: 'outline', label: { ar: 'مكتمل', en: 'Completed' } },
      cancelled: { variant: 'destructive', label: { ar: 'ملغي', en: 'Cancelled' } },
      unread: { variant: 'secondary', label: { ar: 'غير مقروء', en: 'Unread' } },
      read: { variant: 'default', label: { ar: 'مقروء', en: 'Read' } },
      replied: { variant: 'outline', label: { ar: 'تم الرد', en: 'Replied' } },
    };

    const statusConfig = variants[status] || { variant: 'secondary', label: { ar: status, en: status } };

    return (
      <Badge variant={statusConfig.variant}>
        {statusConfig.label[language]}
      </Badge>
    );
  };

  // Filtered data - must be before any early returns to avoid hooks order issues
  const filteredConsultations = useMemo(() => {
    return consultations.filter((c) => {
      const matchesSearch = consultationSearch === '' ||
        c.name.toLowerCase().includes(consultationSearch.toLowerCase()) ||
        c.email.toLowerCase().includes(consultationSearch.toLowerCase()) ||
        (c.phone && c.phone.includes(consultationSearch)) ||
        (c.company && c.company.toLowerCase().includes(consultationSearch.toLowerCase()));

      const matchesStatus = consultationStatusFilter === 'all' || c.status === consultationStatusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [consultations, consultationSearch, consultationStatusFilter]);

  const filteredMessages = useMemo(() => {
    return messages.filter((m) => {
      const matchesSearch = messageSearch === '' ||
        m.name.toLowerCase().includes(messageSearch.toLowerCase()) ||
        m.email.toLowerCase().includes(messageSearch.toLowerCase()) ||
        (m.subject && m.subject.toLowerCase().includes(messageSearch.toLowerCase())) ||
        m.message.toLowerCase().includes(messageSearch.toLowerCase());

      const matchesStatus = messageStatusFilter === 'all' || m.status === messageStatusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [messages, messageSearch, messageStatusFilter]);

  const unreadCount = messages.filter(m => m.status === 'unread').length;
  const pendingCount = consultations.filter(c => c.status === 'pending').length;

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
        title={language === 'ar' ? 'لوحة التحكم' : 'Admin Dashboard'}
        description="Admin dashboard"
        url="/admin"
      />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <h1 className="text-xl font-bold">
            {language === 'ar' ? 'لوحة التحكم الإدارية' : 'Admin Dashboard'}
          </h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild className="gap-2">
              <Link to="/admin/stats">
                <BarChart3 className="h-4 w-4" />
                {language === 'ar' ? 'الإحصائيات' : 'Statistics'}
              </Link>
            </Button>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'إجمالي الحجوزات' : 'Total Bookings'}
                  </p>
                  <p className="text-2xl font-bold">{consultations.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'حجوزات معلقة' : 'Pending Bookings'}
                  </p>
                  <p className="text-2xl font-bold">{pendingCount}</p>
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
                    {language === 'ar' ? 'إجمالي الرسائل' : 'Total Messages'}
                  </p>
                  <p className="text-2xl font-bold">{messages.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'رسائل غير مقروءة' : 'Unread Messages'}
                  </p>
                  <p className="text-2xl font-bold">{unreadCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="consultations" className="gap-2">
              <Calendar className="h-4 w-4" />
              {language === 'ar' ? 'الحجوزات' : 'Bookings'}
              {pendingCount > 0 && (
                <Badge variant="destructive" className="ms-1 h-5 w-5 p-0 justify-center">
                  {pendingCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="messages" className="gap-2">
              <Mail className="h-4 w-4" />
              {language === 'ar' ? 'الرسائل' : 'Messages'}
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ms-1 h-5 w-5 p-0 justify-center">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="consultations">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{language === 'ar' ? 'الحجوزات' : 'Consultation Bookings'}</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const columns = [
                      { key: 'selected_date' as const, header: language === 'ar' ? 'التاريخ' : 'Date' },
                      { key: 'selected_time' as const, header: language === 'ar' ? 'الوقت' : 'Time' },
                      { key: 'consultation_type' as const, header: language === 'ar' ? 'النوع' : 'Type' },
                      { key: 'name' as const, header: language === 'ar' ? 'الاسم' : 'Name' },
                      { key: 'email' as const, header: language === 'ar' ? 'البريد' : 'Email' },
                      { key: 'phone' as const, header: language === 'ar' ? 'الهاتف' : 'Phone' },
                      { key: 'company' as const, header: language === 'ar' ? 'الشركة' : 'Company' },
                      { key: 'status' as const, header: language === 'ar' ? 'الحالة' : 'Status' },
                      { key: 'created_at' as const, header: language === 'ar' ? 'تاريخ الإنشاء' : 'Created At' },
                    ];
                    exportToCSV(filteredConsultations, 'consultations', columns);
                    toast.success(language === 'ar' ? 'تم التصدير بنجاح' : 'Exported successfully');
                  }}
                  disabled={filteredConsultations.length === 0}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  {language === 'ar' ? 'تصدير Excel' : 'Export Excel'}
                </Button>
              </CardHeader>
              <CardContent>
                <SearchFilter
                  language={language}
                  searchQuery={consultationSearch}
                  onSearchChange={setConsultationSearch}
                  statusFilter={consultationStatusFilter}
                  onStatusChange={setConsultationStatusFilter}
                  statusOptions={CONSULTATION_STATUS_OPTIONS}
                  placeholder={{ ar: 'ابحث بالاسم، البريد، الهاتف...', en: 'Search by name, email, phone...' }}
                />
                {filteredConsultations.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    {consultations.length === 0
                      ? (language === 'ar' ? 'لا توجد حجوزات حتى الآن' : 'No bookings yet')
                      : (language === 'ar' ? 'لا توجد نتائج' : 'No results found')
                    }
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{language === 'ar' ? 'التاريخ' : 'Date'}</TableHead>
                          <TableHead>{language === 'ar' ? 'الوقت' : 'Time'}</TableHead>
                          <TableHead>{language === 'ar' ? 'النوع' : 'Type'}</TableHead>
                          <TableHead>{language === 'ar' ? 'الاسم' : 'Name'}</TableHead>
                          <TableHead>{language === 'ar' ? 'البريد' : 'Email'}</TableHead>
                          <TableHead>{language === 'ar' ? 'الهاتف' : 'Phone'}</TableHead>
                          <TableHead>{language === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                          <TableHead>{language === 'ar' ? 'الإجراء' : 'Action'}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredConsultations.map((consultation) => (
                          <TableRow key={consultation.id}>
                            <TableCell>{formatDate(consultation.selected_date)}</TableCell>
                            <TableCell>{consultation.selected_time}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{consultation.consultation_type}</Badge>
                            </TableCell>
                            <TableCell className="font-medium">{consultation.name}</TableCell>
                            <TableCell>
                              <a href={`mailto:${consultation.email}`} className="text-primary hover:underline">
                                {consultation.email}
                              </a>
                            </TableCell>
                            <TableCell>{consultation.phone || '-'}</TableCell>
                            <TableCell>{getStatusBadge(consultation.status)}</TableCell>
                            <TableCell>
                              <Select
                                value={consultation.status}
                                onValueChange={(value) => updateConsultationStatus(consultation.id, value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">{language === 'ar' ? 'معلق' : 'Pending'}</SelectItem>
                                  <SelectItem value="confirmed">{language === 'ar' ? 'مؤكد' : 'Confirmed'}</SelectItem>
                                  <SelectItem value="completed">{language === 'ar' ? 'مكتمل' : 'Completed'}</SelectItem>
                                  <SelectItem value="cancelled">{language === 'ar' ? 'ملغي' : 'Cancelled'}</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{language === 'ar' ? 'رسائل التواصل' : 'Contact Messages'}</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const columns = [
                      { key: 'name' as const, header: language === 'ar' ? 'الاسم' : 'Name' },
                      { key: 'email' as const, header: language === 'ar' ? 'البريد' : 'Email' },
                      { key: 'phone' as const, header: language === 'ar' ? 'الهاتف' : 'Phone' },
                      { key: 'company' as const, header: language === 'ar' ? 'الشركة' : 'Company' },
                      { key: 'subject' as const, header: language === 'ar' ? 'الموضوع' : 'Subject' },
                      { key: 'message' as const, header: language === 'ar' ? 'الرسالة' : 'Message' },
                      { key: 'status' as const, header: language === 'ar' ? 'الحالة' : 'Status' },
                      { key: 'created_at' as const, header: language === 'ar' ? 'تاريخ الإنشاء' : 'Created At' },
                    ];
                    exportToCSV(filteredMessages, 'contact-messages', columns);
                    toast.success(language === 'ar' ? 'تم التصدير بنجاح' : 'Exported successfully');
                  }}
                  disabled={filteredMessages.length === 0}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  {language === 'ar' ? 'تصدير Excel' : 'Export Excel'}
                </Button>
              </CardHeader>
              <CardContent>
                <SearchFilter
                  language={language}
                  searchQuery={messageSearch}
                  onSearchChange={setMessageSearch}
                  statusFilter={messageStatusFilter}
                  onStatusChange={setMessageStatusFilter}
                  statusOptions={MESSAGE_STATUS_OPTIONS}
                  placeholder={{ ar: 'ابحث بالاسم، البريد، الموضوع...', en: 'Search by name, email, subject...' }}
                />
                {filteredMessages.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    {messages.length === 0
                      ? (language === 'ar' ? 'لا توجد رسائل حتى الآن' : 'No messages yet')
                      : (language === 'ar' ? 'لا توجد نتائج' : 'No results found')
                    }
                  </p>
                ) : (
                  <div className="space-y-4">
                    {filteredMessages.map((message) => (
                      <Card key={message.id} className="border-border/50">
                        <CardContent className="p-6">
                          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-semibold">{message.name}</span>
                                {getStatusBadge(message.status)}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Mail className="h-3 w-3" />
                                <a href={`mailto:${message.email}`} className="hover:text-primary">
                                  {message.email}
                                </a>
                              </div>
                              {message.company && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Building className="h-3 w-3" />
                                  {message.company}
                                </div>
                              )}
                              {message.phone && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Phone className="h-3 w-3" />
                                  {message.phone}
                                </div>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {formatDate(message.created_at)}
                            </div>
                          </div>

                          {message.subject && (
                            <p className="font-medium mb-2">{message.subject}</p>
                          )}
                          <p className="text-muted-foreground whitespace-pre-wrap">{message.message}</p>

                          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                            <Select
                              value={message.status}
                              onValueChange={(value) => updateMessageStatus(message.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="unread">{language === 'ar' ? 'غير مقروء' : 'Unread'}</SelectItem>
                                <SelectItem value="read">{language === 'ar' ? 'مقروء' : 'Read'}</SelectItem>
                                <SelectItem value="replied">{language === 'ar' ? 'تم الرد' : 'Replied'}</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.location.href = `mailto:${message.email}?subject=Re: ${message.subject || 'Your inquiry'}`}
                            >
                              <Mail className="h-4 w-4 me-2" />
                              {language === 'ar' ? 'الرد' : 'Reply'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
