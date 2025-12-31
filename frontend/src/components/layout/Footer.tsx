import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Logo } from '@/components/brand/Logo';
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Youtube,
  Instagram,
  ArrowRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

export const Footer = () => {
  const { t, language, direction } = useLanguage();
  const Arrow = direction === 'rtl' ? ArrowLeft : ArrowRight;
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com/in/ahmadqaoud", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/ahmadqaoud", label: "Twitter" },
    { icon: Github, href: "https://github.com/ahmadqaoud", label: "GitHub" },
    { icon: Youtube, href: "https://youtube.com/@ahmadqaoud", label: "YouTube" },
    { icon: Instagram, href: "https://instagram.com/ahmadqaoud", label: "Instagram" },
  ];

  return (
    <footer className="bg-secondary/30 border-t border-border/50 pt-20 pb-28 md:pb-10 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <Logo size="lg" showText={true} />
            </Link>

            <p className="text-muted-foreground leading-relaxed max-w-sm">
              {language === 'ar'
                ? 'نصنع القيمة، لا ننفذ المهام. شريكك الاستراتيجي في التحول الرقمي والابتكار وبناء المنتجات الرقمية.'
                : 'We create value, we don\'t just execute tasks. Your strategic partner in digital transformation, innovation, and product building.'}
            </p>

            <div className="flex gap-2 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Spacer (1 col) */}
          <div className="lg:col-span-1 hidden lg:block" />

          {/* Links Column 1 (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-primary rounded-full inline-block" />
              {language === 'ar' ? 'الشركة' : 'Company'}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group text-sm">
                  <Arrow className="w-3 h-3 text-primary/0 -ml-4 group-hover:ml-0 group-hover:text-primary transition-all duration-300" />
                  {language === 'ar' ? 'من أنا' : 'About Me'}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group text-sm">
                  <Arrow className="w-3 h-3 text-primary/0 -ml-4 group-hover:ml-0 group-hover:text-primary transition-all duration-300" />
                  {language === 'ar' ? 'الخدمات' : 'Services'}
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group text-sm">
                  <Arrow className="w-3 h-3 text-primary/0 -ml-4 group-hover:ml-0 group-hover:text-primary transition-all duration-300" />
                  {language === 'ar' ? 'الأعمال' : 'Projects'}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group text-sm">
                  <Arrow className="w-3 h-3 text-primary/0 -ml-4 group-hover:ml-0 group-hover:text-primary transition-all duration-300" />
                  {language === 'ar' ? 'المدونة' : 'Blog'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2 (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-accent rounded-full inline-block" />
              {language === 'ar' ? 'الموارد' : 'Resources'}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/investors" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group text-sm">
                  <Arrow className="w-3 h-3 text-primary/0 -ml-4 group-hover:ml-0 group-hover:text-primary transition-all duration-300" />
                  {language === 'ar' ? 'للمستثمرين' : 'For Investors'}
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group text-sm">
                  <Arrow className="w-3 h-3 text-primary/0 -ml-4 group-hover:ml-0 group-hover:text-primary transition-all duration-300" />
                  {language === 'ar' ? 'دراسات الحالة' : 'Case Studies'}
                </Link>
              </li>
              <li>
                <Link to="/book" className="text-foreground font-medium hover:text-primary transition-colors flex items-center gap-2 group text-sm mt-2">
                  <Sparkles className="w-3 h-3 text-accent animate-pulse" />
                  {language === 'ar' ? 'احجز استشارة' : 'Book Consultation'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-foreground rounded-full inline-block" />
              {language === 'ar' ? 'تواصل معنا' : 'Contact'}
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover:text-accent transition-colors" />
                <span className="text-sm text-muted-foreground leading-relaxed">
                  {language === 'ar'
                    ? 'مصر • السعودية • الإمارات • الأردن'
                    : 'Egypt • KSA • UAE • Jordan'}
                </span>
              </div>

              <a href="mailto:contact@ahmadqaoud.com" className="flex items-center gap-3 group hover:bg-secondary/50 p-2 -mx-2 rounded-lg transition-colors">
                <Mail className="w-5 h-5 text-primary shrink-0 group-hover:text-accent transition-colors" />
                <span className="text-sm text-foreground font-medium">contact@ahmadqaoud.com</span>
              </a>

              <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white border-subtle shadow-lg hover:shadow-[#25D366]/50 hover:-translate-y-1 transition-all gap-2 h-12 text-base font-bold animate-shimmer bg-[linear-gradient(110deg,#25D366,45%,#4ade80,55%,#25D366)] bg-[length:200%_100%]" asChild>
                <a href="https://wa.me/201020660608" target="_blank" rel="noreferrer">
                  <MessageCircle className="w-5 h-5" />
                  {language === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
                </a>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-border/50 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm relative">
          {/* Copyright & Links */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-muted-foreground order-2 md:order-1 w-full md:w-auto justify-center md:justify-start">
            <p>
              © {currentYear} {language === 'ar' ? 'أحمد قاعود' : 'Ahmad Qaoud'}
            </p>
            <div className="flex items-center gap-6 text-xs md:text-sm">
              <Link to="/privacy" className="hover:text-primary transition-colors">{language === 'ar' ? 'الخصوصية' : 'Privacy'}</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">{language === 'ar' ? 'الشروط' : 'Terms'}</Link>
            </div>
          </div>

          {/* Slogan - Centered */}
          <div className="order-1 md:absolute md:left-1/2 md:-translate-x-1/2 w-full md:w-auto text-center">
            <p className="font-bold text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary animate-pulse flex items-center justify-center gap-3 whitespace-nowrap">
              <Sparkles className="w-6 h-6 text-accent hidden md:block" />
              {language === 'ar' ? 'نصنع القيمة، لا ننفذ المهام' : 'We Create Value, Not Just Tasks'}
              <Sparkles className="w-6 h-6 text-accent hidden md:block" />
            </p>
          </div>

          {/* Empty spacer for alignment if needed, or keeping it clean */}
          <div className="hidden md:block w-32 order-3"></div>
        </div>
      </div>
    </footer>
  );
};
