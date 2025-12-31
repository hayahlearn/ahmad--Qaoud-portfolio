import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Tag, Sparkles, BookOpen, TrendingUp, Brain, Cpu, Lightbulb, Play, Shield, Search } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { AnimatedSection } from '@/hooks/useScrollAnimation';

import { BLOG_POSTS } from '@/data/blog-posts';
import { NewsletterArchive } from '@/components/content/NewsletterArchive';

const Blog = () => {
  const { t, direction, language } = useLanguage();
  const Arrow = direction === 'rtl' ? ArrowLeft : ArrowRight;
  const [email, setEmail] = useState('');


  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success(language === 'ar' ? 'تم الاشتراك بنجاح!' : 'Subscribed successfully!');
      setEmail('');
    }
  };

  const [searchQuery, setSearchQuery] = useState('');


  // Sort articles by date descending
  const sortedArticles = [...BLOG_POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Define Category Config
  const CATEGORY_CONFIG: Record<string, { ar: string, en: string }> = {
    'all': { ar: 'الكل', en: 'All' },
    'ai': { ar: 'ذكاء اصطناعي', en: 'AI' },
    'digital': { ar: 'تحول رقمي', en: 'Digital' },
    'automation': { ar: 'أتمتة', en: 'Automation' },
    'saas': { ar: 'SaaS', en: 'SaaS' },
    'strategy': { ar: 'استراتيجية', en: 'Strategy' },
    'security': { ar: 'أمن سيبراني', en: 'Security' },
    'infrastructure': { ar: 'بنية تحتية', en: 'Infrastructure' },
    'software-dev': { ar: 'تطوير برمجيات', en: 'Software Dev' },
    'entrepreneurship': { ar: 'ريادة أعمال', en: 'Entrepreneurship' },
    'product-dev': { ar: 'تطوير منتجات', en: 'Product Dev' }
  };

  // Get used categories
  const usedKeys = Array.from(new Set(BLOG_POSTS.map(p => p.categoryKey))) as string[];

  // Let's stick to the order defined in categoryKeys if we want specific ordering.
  const orderedKeys = ['all', 'ai', 'digital', 'automation', 'saas', 'strategy', 'security', 'infrastructure', 'software-dev', 'entrepreneurship', 'product-dev'];

  const activeKeys = orderedKeys.filter(key => key === 'all' || usedKeys.includes(key));

  // State now stores the KEY string, not index, to be safer
  const [selectedCategoryKey, setSelectedCategoryKey] = useState('all');

  // Filter Logic
  const categoryArticles = selectedCategoryKey === 'all'
    ? sortedArticles
    : sortedArticles.filter(article => article.categoryKey === selectedCategoryKey);

  console.log('Blog Debug Round 2:', {
    filterMode: selectedCategoryKey,
    totalSorted: sortedArticles.length,
    filteredCount: categoryArticles.length,
    firstArticleCategory: sortedArticles[0]?.categoryKey,
    allCategories: sortedArticles.map(a => a.categoryKey)
  });
  // Search Logic
  const displayArticles = searchQuery.trim() === ''
    ? categoryArticles
    : categoryArticles.filter(article =>
      article.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt[language].toLowerCase().includes(searchQuery.toLowerCase())
    );

  // 3. Determine Featured vs Grid
  // If searching, we typically show a list result, but keeping a featured one if relevant is okay.
  // To be professional: If searching, disable "Featured" layout and show all as grid cards to compare.
  // If NOT searching, show top one as Featured.

  const isSearching = searchQuery.trim() !== '';
  const isFiltering = selectedCategoryKey !== 'all';

  // Show featured article ONLY when viewing "All" and NOT searching
  const showFeatured = !isSearching && !isFiltering;

  const featuredArticle = (showFeatured && displayArticles.length > 0) ? displayArticles[0] : null;
  // User requested to see ALL articles in the grid as well, even the featured one.
  const articles = displayArticles;

  const stats = [
    { value: '50+', label: language === 'ar' ? 'مقال متخصص' : 'Expert Articles' },
    { value: '10K+', label: language === 'ar' ? 'قارئ شهري' : 'Monthly Readers' },
    { value: '20+', label: language === 'ar' ? 'دليل عملي' : 'Practical Guides' },
  ];


  return (
    <Layout>
      <SEO
        title={language === 'ar' ? 'المدونة - مقالات في التحول الرقمي والذكاء الاصطناعي' : 'Blog - Digital Transformation & AI Articles'}
        description={language === 'ar'
          ? 'مقالات متخصصة في التحول الرقمي والذكاء الاصطناعي والأتمتة من خبرة أكثر من 20 عام'
          : 'Specialized articles on digital transformation, AI and automation from over 20 years of experience'
        }
        url="/blog"
        keywords={language === 'ar'
          ? 'مقالات, التحول الرقمي, الذكاء الاصطناعي, الأتمتة, n8n, SaaS'
          : 'Articles, Digital Transformation, AI, Automation, n8n, SaaS'
        }
      />

      {/* Hero */}
      <section className="py-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10">
          <AnimatedSection animation="fade-up" className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-4">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm font-semibold">
                {language === 'ar' ? 'رؤى وأفكار من الخبرة' : 'Insights from Experience'}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
              {language === 'ar' ? 'مركز المعرفة والابتكار' : 'Innovation & Knowledge Hub'}
            </h1>
            <div className="divider-gold mx-auto" />
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {language === 'ar'
                ? 'رحلة في عمق التكنولوجيا: مقالات تقنية، استراتيجيات رقمية، وهندسة نظم المستقبل'
                : 'Deep dive into tech: Technical articles, digital strategies, and future systems engineering'}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 pt-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Categories & Search */}
      <section className="py-6 border-b border-border sticky top-20 bg-background/95 backdrop-blur-xl z-40 transition-all duration-300">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Categories */}
            <div className="flex flex-wrap items-center justify-center gap-2 flex-1 overflow-x-auto pb-2 md:pb-0 no-scrollbar masked-overflow">
              {activeKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategoryKey(key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedCategoryKey === key
                    ? 'bg-primary text-primary-foreground shadow-md scale-105'
                    : 'bg-secondary text-secondary-foreground hover:bg-primary/10 hover:scale-105'
                    }`}
                >
                  {CATEGORY_CONFIG[key] ? CATEGORY_CONFIG[key][language] : key}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64 shrink-0">
              <div className="relative max-w-md w-full md:w-auto">
                <Search className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground`} />
                <Input
                  type="text"
                  placeholder={language === 'ar' ? 'بحث في المقالات...' : 'Search articles...'}
                  className={`${language === 'ar' ? 'pr-9 pl-4' : 'pl-9 pr-4'} bg-background/50 border-border/50 focus:border-primary/50 transition-all w-full md:w-64 focus:w-full md:focus:w-80`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-16">
          <div className="container">
            <AnimatedSection animation="fade-up">
              <Link to={`/blog/${featuredArticle.slug}`}>
                <Card className="border-0 shadow-elevated overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
                  <div className="grid lg:grid-cols-2">
                    {/* Image */}
                    <div className="relative h-64 lg:h-auto overflow-hidden">
                      <img
                        src={featuredArticle.image}
                        alt={featuredArticle.title[language]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-4 py-1.5 bg-accent text-accent-foreground rounded-full text-sm font-semibold">
                          {language === 'ar' ? 'مقال مميز' : 'Featured'}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <CardContent className="p-8 lg:p-12 bg-gradient-to-br from-primary to-navy-light dark:from-navy dark:to-navy-dark text-primary-foreground dark:text-white">
                      <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className="px-4 py-1.5 bg-primary-foreground/20 text-primary-foreground rounded-full text-sm">
                          {featuredArticle.category[language]}
                        </span>
                      </div>

                      <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight group-hover:text-accent transition-colors">
                        {featuredArticle.title[language]}
                      </h2>

                      <p className="text-lg text-primary-foreground/80 mb-6 leading-relaxed">
                        {featuredArticle.excerpt[language]}
                      </p>

                      <div className="flex flex-wrap items-center gap-6 text-sm text-primary-foreground/70">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {featuredArticle.author[language]}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(featuredArticle.date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {featuredArticle.readTime[language]}
                        </div>
                      </div>

                      <Button variant="secondary" className="mt-8 gap-2">
                        {language === 'ar' ? 'اقرأ المقال' : 'Read Article'}
                        <Arrow className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-16 bg-secondary/20">
        <div className="container">
          <AnimatedSection animation="fade-up" className="mb-12">
            <h2 className="text-3xl font-bold text-foreground">
              {language === 'ar' ? 'أحدث المقالات والأدلة' : 'Latest Articles & Guides'}
            </h2>
            <p className="text-muted-foreground mt-2">
              {language === 'ar' ? 'محتوى تعليمي شامل لتسريع تحولك الرقمي' : 'Comprehensive educational content to accelerate your digital transformation'}
            </p>
          </AnimatedSection>

          <div className="grid gap-8 md:grid-cols-2">
            {articles.map((article, index) => (
              <div key={index} className="h-full">
                <Link to={`/blog/${article.slug}`}>
                  <Card
                    className="group border-0 shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer overflow-hidden h-full"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title[language]}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 text-primary rounded-full text-sm font-medium">
                          <Tag className="h-3 w-3" />
                          {article.category[language]}
                        </span>
                        <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center">
                          <article.icon className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {article.readTime[language]}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(article.date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                        {article.title[language]}
                      </h3>

                      <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                        {article.excerpt[language]}
                      </p>

                      <Button variant="link" className="p-0 h-auto gap-2 text-primary font-semibold">
                        {language === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                        <Arrow className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter & CTA */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-navy-dark dark:from-navy dark:via-navy-dark dark:to-black text-primary-foreground dark:text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="container relative z-10">
          <AnimatedSection animation="fade-up">
            <NewsletterArchive />
          </AnimatedSection>

          <AnimatedSection animation="fade-up" className="max-w-2xl mx-auto text-center border-t border-white/10 pt-16">
            <Sparkles className="h-12 w-12 mx-auto mb-6 text-accent" />
            <h2 className="text-3xl font-bold mb-4">
              {language === 'ar' ? 'اشترك في النشرة البريدية' : 'Subscribe to Newsletter'}
            </h2>
            <p className="opacity-90 mb-8 text-lg leading-relaxed">
              {language === 'ar'
                ? 'احصل على أحدث المقالات والنصائح والرؤى مباشرة في بريدك الإلكتروني - مرة أسبوعياً'
                : 'Get the latest articles, tips, and insights delivered directly to your inbox - weekly'}
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-8">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'Your email'}
                className="h-14 text-base bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:bg-white/20"
                required
              />
              <Button type="submit" variant="secondary" size="lg" className="h-14 px-8 font-semibold shrink-0">
                {language === 'ar' ? 'اشترك الآن' : 'Subscribe'}
              </Button>
            </form>

            {/* Additional CTAs */}
            <div className="pt-8 border-t border-white/20 flex flex-wrap justify-center gap-4">
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                <Link to="/book">
                  {language === 'ar' ? 'احجز استشارة مجانية' : 'Book Free Consultation'}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                <Link to="/projects">
                  {language === 'ar' ? 'استكشف أعمالنا' : 'Explore Our Work'}
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
