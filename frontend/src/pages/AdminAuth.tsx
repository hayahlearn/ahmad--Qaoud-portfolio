import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Lock, Mail, Eye, EyeOff, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SEO } from '@/components/SEO';

const authSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type AuthFormData = z.infer<typeof authSchema>;

const AdminAuth = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const checkAdminRole = useCallback(async (userId: string) => {
    const { data } = await supabase.rpc('has_role', {
      _user_id: userId,
      _role: 'admin'
    });

    if (data === true) {
      navigate('/admin');
    }
  }, [navigate]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        // Check if user is admin
        setTimeout(() => {
          checkAdminRole(session.user.id);
        }, 0);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        checkAdminRole(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [checkAdminRole]);

  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true);

    try {
      if (activeTab === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

        if (error) throw error;

        toast.success(language === 'ar' ? 'تم تسجيل الدخول بنجاح' : 'Logged in successfully');
      } else {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`,
          },
        });

        if (error) {
          if (error.message.includes('already registered')) {
            toast.error(language === 'ar' ? 'هذا البريد مسجل مسبقاً' : 'Email already registered');
          } else {
            throw error;
          }
        } else {
          toast.success(
            language === 'ar'
              ? 'تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول الآن'
              : 'Account created! You can now log in'
          );
          setActiveTab('login');
          reset();
        }
      }
    } catch (error) {
      const err = error as Error;
      console.error('Auth error:', err);
      toast.error(
        language === 'ar'
          ? 'حدث خطأ في المصادقة'
          : err.message || 'Authentication error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <SEO
        title={language === 'ar' ? 'تسجيل الدخول للإدارة' : 'Admin Login'}
        description="Admin login page"
        url="/admin/auth"
      />

      <Card className="w-full max-w-md border-0 shadow-elevated">
        <CardHeader className="text-center pb-2">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">
            {language === 'ar' ? 'لوحة التحكم' : 'Admin Panel'}
          </CardTitle>
          <CardDescription>
            {language === 'ar' ? 'سجل دخولك للوصول إلى لوحة التحكم' : 'Sign in to access the admin panel'}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">
                {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
              </TabsTrigger>
              <TabsTrigger value="signup">
                {language === 'ar' ? 'حساب جديد' : 'Sign Up'}
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={errors.email ? 'border-destructive' : ''}
                  placeholder="admin@example.com"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  {language === 'ar' ? 'كلمة المرور' : 'Password'}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    className={`pe-10 ${errors.password ? 'border-destructive' : ''}`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : activeTab === 'login' ? (
                  language === 'ar' ? 'تسجيل الدخول' : 'Login'
                ) : (
                  language === 'ar' ? 'إنشاء حساب' : 'Sign Up'
                )}
              </Button>
            </form>
          </Tabs>

          <div className="mt-6 text-center">
            <Button variant="link" onClick={() => navigate('/')}>
              {language === 'ar' ? 'العودة للموقع' : 'Back to website'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAuth;
