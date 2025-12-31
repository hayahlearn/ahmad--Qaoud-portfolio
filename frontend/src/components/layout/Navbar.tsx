import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Globe, Moon, Sun, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Logo } from '@/components/brand/Logo';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t, direction } = useLanguage();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { key: 'nav.home', path: '/' },
    { key: 'nav.about', path: '/about' },
    { key: 'nav.services', path: '/services' },
    { key: 'nav.projects', path: '/projects' },
  ];

  const moreItems = [
    { key: language === 'ar' ? 'دراسات الحالة' : 'Case Studies', path: '/case-studies' },
    { key: language === 'ar' ? 'للمستثمرين' : 'Investors', path: '/investors' },
    { key: language === 'ar' ? 'تعليم ذوي الهمم' : 'Special Education', path: '/special-education' },
    { key: language === 'ar' ? 'حاسبة ROI' : 'ROI Calculator', path: '/roi-calculator' },
    { key: language === 'ar' ? 'مكتبة الموارد' : 'Resources', path: '/resources' },
    { key: 'nav.blog', path: '/blog', useTranslation: true },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/30 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80">
      <nav className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="group">
          <Logo size="md" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
                isActive(item.path)
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              )}
            >
              {t(item.key)}
            </Link>
          ))}

          {/* More Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground">
                {language === 'ar' ? 'المزيد' : 'More'}
                <ChevronDown className="h-4 w-4 ms-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {moreItems.map((item) => (
                <DropdownMenuItem key={item.path} asChild>
                  <Link
                    to={item.path}
                    className={cn(
                      'w-full cursor-pointer',
                      isActive(item.path) && 'bg-primary/10 text-primary'
                    )}
                  >
                    {item.useTranslation ? t(item.key) : item.key}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            to="/contact"
            className={cn(
              'px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
              isActive('/contact')
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            )}
          >
            {t('nav.contact')}
          </Link>
        </div>

        {/* CTA & Language & Theme Toggle */}
        <div className="flex items-center gap-2">
          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-muted-foreground hover:text-foreground"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium">{language === 'ar' ? 'EN' : 'عربي'}</span>
          </Button>

          <Button asChild className="hidden sm:inline-flex shadow-lg hover:shadow-xl transition-shadow">
            <Link to="/book">{language === 'ar' ? 'احجز استشارة' : 'Book Consultation'}</Link>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden border-t border-border bg-background/98 backdrop-blur-xl">
          <div className="container py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'block px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                )}
              >
                {t(item.key)}
              </Link>
            ))}
            {moreItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'block px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                )}
              >
                {item.useTranslation ? t(item.key) : item.key}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className={cn(
                'block px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                isActive('/contact')
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              )}
            >
              {t('nav.contact')}
            </Link>
            <div className="pt-2">
              <Button asChild className="w-full">
                <Link to="/book" onClick={() => setIsOpen(false)}>
                  {language === 'ar' ? 'احجز استشارة' : 'Book Consultation'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
