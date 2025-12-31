import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Copy, Check, Palette, Type, Image, Linkedin, MessageCircle, Mail, Youtube, Twitter, Instagram, Github, FileText, Layers, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const WHATSAPP_NUMBER = '201020660608';

const MediaKit = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const brandColors = [
    { name: 'Navy Primary', hex: '#1e3a5f', hsl: 'hsl(217, 71%, 25%)', usage: language === 'ar' ? 'الألوان الرئيسية' : 'Primary elements' },
    { name: 'Navy Light', hex: '#3d5a80', hsl: 'hsl(217, 50%, 40%)', usage: language === 'ar' ? 'خلفيات ثانوية' : 'Secondary backgrounds' },
    { name: 'Gold Accent', hex: '#d4a528', hsl: 'hsl(38, 75%, 50%)', usage: language === 'ar' ? 'التمييز والـ CTA' : 'Accents & CTAs' },
    { name: 'Gold Light', hex: '#e0b94d', hsl: 'hsl(38, 70%, 65%)', usage: language === 'ar' ? 'تفاصيل ذهبية' : 'Gold details' },
    { name: 'Background', hex: '#f8fafc', hsl: 'hsl(210, 20%, 98%)', usage: language === 'ar' ? 'خلفيات فاتحة' : 'Light backgrounds' },
    { name: 'Foreground', hex: '#1a2332', hsl: 'hsl(220, 25%, 12%)', usage: language === 'ar' ? 'النصوص' : 'Text' },
  ];

  const fonts = [
    {
      name: 'Tajawal',
      usage: language === 'ar' ? 'النصوص العربية' : 'Arabic Text',
      weights: ['300', '400', '500', '700', '800'],
      sample: language === 'ar' ? 'أحمد قاعود - نصنع القيمة، لا ننفذ المهام' : 'Ahmad Qaoud - Creating Value, Not Just Tasks',
      url: 'https://fonts.google.com/specimen/Tajawal'
    },
    {
      name: 'Poppins',
      usage: language === 'ar' ? 'النصوص الإنجليزية' : 'English Text',
      weights: ['300', '400', '500', '600', '700'],
      sample: 'Ahmad Qaoud - Digital Transformation & AI Expert',
      url: 'https://fonts.google.com/specimen/Poppins'
    },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/ahmadqaoud',
      color: 'bg-[#0A66C2]',
      handle: '@ahmadqaoud'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://wa.me/${WHATSAPP_NUMBER}`,
      color: 'bg-[#25D366]',
      handle: '+20 102 066 0608'
    },
    {
      name: 'Twitter/X',
      icon: Twitter,
      url: 'https://twitter.com/ahmadqaoud',
      color: 'bg-black',
      handle: '@ahmadqaoud'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://youtube.com/@ahmadqaoud',
      color: 'bg-[#FF0000]',
      handle: '@ahmadqaoud'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/ahmadqaoud',
      color: 'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]',
      handle: '@ahmadqaoud'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/ahmadqaoud',
      color: 'bg-[#181717]',
      handle: '@ahmadqaoud'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:contact@ahmadqaoud.com',
      color: 'bg-primary',
      handle: 'contact@ahmadqaoud.com'
    },
  ];

  const brandAssets = [
    {
      name: language === 'ar' ? 'الشعار الكامل (PNG)' : 'Full Logo (PNG)',
      format: 'PNG',
      size: '2000x600px',
      icon: Image
    },
    {
      name: language === 'ar' ? 'الشعار الكامل (SVG)' : 'Full Logo (SVG)',
      format: 'SVG',
      size: 'Vector',
      icon: Layers
    },
    {
      name: language === 'ar' ? 'الأيقونة (PNG)' : 'Icon (PNG)',
      format: 'PNG',
      size: '512x512px',
      icon: Image
    },
    {
      name: language === 'ar' ? 'دليل الهوية البصرية' : 'Brand Guidelines',
      format: 'PDF',
      size: '12 pages',
      icon: FileText
    },
  ];

  const copyToClipboard = (text: string, colorName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(colorName);
    toast({
      title: language === 'ar' ? 'تم النسخ!' : 'Copied!',
      description: text,
    });
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <Layout>
      <SEO
        title={language === 'ar' ? 'الهوية البصرية - Media Kit' : 'Media Kit - Brand Assets'}
        description={language === 'ar'
          ? 'الهوية البصرية الرسمية لأحمد قاعود - الشعارات والألوان والخطوط وروابط التواصل'
          : 'Official brand assets for Ahmad Qaoud - Logos, colors, fonts and social links'}
        url="/media-kit"
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <AnimatedSection animation="fade-up" className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">
                {language === 'ar' ? 'الهوية البصرية الرسمية' : 'Official Brand Assets'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {language === 'ar' ? 'Media Kit' : 'Media Kit'}
            </h1>
            <p className="text-xl text-muted-foreground">
              {language === 'ar'
                ? 'جميع الأصول الرسمية للهوية البصرية - للاستخدام في المنشورات والشراكات والإعلام'
                : 'Official brand assets - For use in publications, partnerships and media'}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Social Media Links */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {language === 'ar' ? 'تابعني على منصات التواصل' : 'Follow Me on Social Media'}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === 'ar'
                  ? 'تواصل معي عبر منصات التواصل الاجتماعي للحصول على آخر المستجدات والنصائح في التحول الرقمي'
                  : 'Connect with me on social media for the latest updates and tips on digital transformation'}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {socialLinks.map((social, index) => (
              <AnimatedSection key={social.name} animation="fade-up" delay={index * 50}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="border-border/50 hover:shadow-elevated hover:border-primary/30 transition-all duration-300 group cursor-pointer h-full">
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${social.color} flex items-center justify-center text-white shrink-0`}>
                        <social.icon className="h-6 w-6" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold group-hover:text-primary transition-colors">{social.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{social.handle}</p>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Section */}
      <section className="py-16">
        <div className="container">
          <AnimatedSection animation="fade-up">
            <div className="flex items-center gap-3 mb-8">
              <Image className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">
                {language === 'ar' ? 'الشعار' : 'Logo'}
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Primary Logo */}
            <AnimatedSection animation="fade-up" delay={100}>
              <Card className="border-border/50 overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <div className="text-center text-white">
                    <span className="text-5xl font-bold block mb-2">أحمد قاعود</span>
                    <span className="text-sm opacity-80">Ahmad Qaoud</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="font-medium mb-2">{language === 'ar' ? 'الشعار الأساسي' : 'Primary Logo'}</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {language === 'ar' ? 'للاستخدام على خلفيات داكنة' : 'For use on dark backgrounds'}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 me-2" />
                    {language === 'ar' ? 'تحميل PNG' : 'Download PNG'}
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Light Logo */}
            <AnimatedSection animation="fade-up" delay={200}>
              <Card className="border-border/50 overflow-hidden">
                <div className="h-48 bg-background border-b flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-5xl font-bold block mb-2 text-primary">أحمد قاعود</span>
                    <span className="text-sm text-muted-foreground">Ahmad Qaoud</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="font-medium mb-2">{language === 'ar' ? 'الشعار الفاتح' : 'Light Logo'}</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {language === 'ar' ? 'للاستخدام على خلفيات فاتحة' : 'For use on light backgrounds'}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 me-2" />
                    {language === 'ar' ? 'تحميل PNG' : 'Download PNG'}
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Icon Logo */}
            <AnimatedSection animation="fade-up" delay={300}>
              <Card className="border-border/50 overflow-hidden">
                <div className="h-48 bg-secondary/50 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">أق</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="font-medium mb-2">{language === 'ar' ? 'الأيقونة' : 'Icon'}</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {language === 'ar' ? 'للاستخدام كأيقونة أو Favicon' : 'For icon or favicon use'}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 me-2" />
                    {language === 'ar' ? 'تحميل PNG' : 'Download PNG'}
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          {/* Logo Usage Guidelines */}
          <AnimatedSection animation="fade-up" delay={400} className="mt-8">
            <Card className="border-border/50 bg-secondary/30">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  {language === 'ar' ? 'إرشادات استخدام الشعار' : 'Logo Usage Guidelines'}
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-green-600 mb-2">
                      ✓ {language === 'ar' ? 'مسموح' : 'Do'}
                    </p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• {language === 'ar' ? 'استخدام الشعار بنسب صحيحة' : 'Use logo in correct proportions'}</li>
                      <li>• {language === 'ar' ? 'ترك مساحة كافية حول الشعار' : 'Leave adequate space around logo'}</li>
                      <li>• {language === 'ar' ? 'استخدام الألوان الرسمية فقط' : 'Use official colors only'}</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-red-600 mb-2">
                      ✗ {language === 'ar' ? 'غير مسموح' : "Don't"}
                    </p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• {language === 'ar' ? 'تغيير ألوان الشعار' : 'Change logo colors'}</li>
                      <li>• {language === 'ar' ? 'تشويه أو تمديد الشعار' : 'Distort or stretch logo'}</li>
                      <li>• {language === 'ar' ? 'إضافة تأثيرات على الشعار' : 'Add effects to logo'}</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Colors Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <AnimatedSection animation="fade-up">
            <div className="flex items-center gap-3 mb-8">
              <Palette className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">
                {language === 'ar' ? 'الألوان الرسمية' : 'Official Colors'}
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandColors.map((color, index) => (
              <AnimatedSection key={color.name} animation="fade-up" delay={index * 50}>
                <Card
                  className="border-border/50 cursor-pointer hover:shadow-elevated transition-all duration-300 overflow-hidden group"
                  onClick={() => copyToClipboard(color.hex, color.name)}
                >
                  <div
                    className="h-24 w-full group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundColor: color.hex }}
                  />
                  <CardContent className="p-4">
                    <p className="font-medium text-sm mb-1">{color.name}</p>
                    <p className="text-xs text-muted-foreground mb-2">{color.usage}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-mono">{color.hex}</span>
                      {copiedColor === color.name ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section className="py-16">
        <div className="container">
          <AnimatedSection animation="fade-up">
            <div className="flex items-center gap-3 mb-8">
              <Type className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">
                {language === 'ar' ? 'الخطوط' : 'Typography'}
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8">
            {fonts.map((font, index) => (
              <AnimatedSection key={font.name} animation="fade-up" delay={index * 100}>
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span style={{ fontFamily: font.name }}>{font.name}</span>
                      <Badge variant="secondary">{font.usage}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p
                      className="text-3xl mb-4 leading-relaxed"
                      style={{ fontFamily: font.name }}
                    >
                      {font.sample}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
                    </p>
                    <p className="text-sm text-muted-foreground mb-4" style={{ fontFamily: font.name }}>
                      0 1 2 3 4 5 6 7 8 9
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {font.weights.map((weight) => (
                        <Badge key={weight} variant="outline" className="text-xs">
                          {weight}
                        </Badge>
                      ))}
                    </div>
                    <a
                      href={font.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {language === 'ar' ? 'تحميل من Google Fonts →' : 'Download from Google Fonts →'}
                    </a>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Assets Download */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {language === 'ar' ? 'تحميل ملفات الهوية' : 'Download Brand Assets'}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === 'ar'
                  ? 'جميع ملفات الهوية البصرية بتنسيقات متعددة للاستخدام في المشاريع المختلفة'
                  : 'All brand files in multiple formats for use in various projects'}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {brandAssets.map((asset, index) => (
              <AnimatedSection key={asset.name} animation="fade-up" delay={index * 50}>
                <Card className="border-border/50 hover:shadow-elevated transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <asset.icon className="h-6 w-6 text-primary" />
                    </div>
                    <p className="font-medium mb-1">{asset.name}</p>
                    <p className="text-xs text-muted-foreground mb-4">{asset.format} • {asset.size}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="h-4 w-4 me-2" />
                      {language === 'ar' ? 'تحميل' : 'Download'}
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Download All CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 dark:from-navy dark:to-navy-dark text-white">
        <div className="container text-center">
          <AnimatedSection animation="fade-up">
            <h2 className="text-3xl font-bold mb-4">
              {language === 'ar' ? 'تحميل الحزمة الكاملة' : 'Download Complete Package'}
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'احصل على جميع ملفات الهوية البصرية في ملف مضغوط واحد يحتوي على جميع التنسيقات (PNG, SVG, PDF)'
                : 'Get all brand files in a single ZIP containing all formats (PNG, SVG, PDF)'}
            </p>
            <Button size="lg" variant="secondary">
              <Download className="h-5 w-5 me-2" />
              {language === 'ar' ? 'تحميل Media Kit الكامل' : 'Download Complete Media Kit'}
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default MediaKit;
