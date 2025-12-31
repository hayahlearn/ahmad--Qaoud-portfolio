import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Tag, Share2, Bookmark, MessageCircle, Twitter, Linkedin, Facebook, Copy, Check, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { SEO } from '@/components/SEO';
import { AnimatedSection } from '@/hooks/useScrollAnimation';

// Import article images
import aiBusinessHeader from '@/assets/blog/ai-business-header.jpg';
import automationArticle from '@/assets/blog/automation-article.jpg';
import saasArticle from '@/assets/blog/saas-article.jpg';
import digitalTransformationArticle from '@/assets/blog/digital-transformation-article.jpg';
import digitalEmployeesArticle from '@/assets/blog/digital-employees-article.jpg';

import { BLOG_POSTS } from '@/data/blog-posts';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, direction } = useLanguage();
  const BackArrow = direction === 'rtl' ? ArrowRight : ArrowLeft;
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const post = BLOG_POSTS.find(p => p.slug === slug);
  const currentIndex = post ? BLOG_POSTS.findIndex(p => p.slug === post.slug) : -1;
  const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
  const nextPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;

  // Improve related posts to show same category first
  const relatedPosts = BLOG_POSTS
    .filter(p => p.slug !== slug)
    .sort((a, b) => {
      // Prioritize same category
      if (post && a.categoryKey === post.categoryKey && b.categoryKey !== post.categoryKey) return -1;
      if (post && a.categoryKey !== post.categoryKey && b.categoryKey === post.categoryKey) return 1;
      return 0;
    })
    .slice(0, 3);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title[language] || '';

    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast({
      title: language === 'ar' ? 'تم نسخ الرابط!' : 'Link copied!',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked
        ? (language === 'ar' ? 'تم إزالة المقال من المحفوظات' : 'Removed from bookmarks')
        : (language === 'ar' ? 'تم حفظ المقال' : 'Article bookmarked'),
    });
  };

  if (!post) {
    return (
      <Layout>
        <section className="py-32 text-center">
          <div className="container">
            <h1 className="text-4xl font-bold mb-4">
              {language === 'ar' ? 'المقال غير موجود' : 'Article Not Found'}
            </h1>
            <p className="text-muted-foreground mb-8">
              {language === 'ar' ? 'عذراً، لم نتمكن من العثور على المقال المطلوب' : 'Sorry, we could not find the requested article'}
            </p>
            <Button asChild>
              <Link to="/blog">
                <BackArrow className="h-4 w-4 me-2" />
                {language === 'ar' ? 'العودة للمدونة' : 'Back to Blog'}
              </Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  // Simple markdown renderer
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: JSX.Element[] = [];
    let currentList: string[] = [];

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="my-4 space-y-2 list-disc list-inside">
            {currentList.map((item, i) => (
              <li key={i} className="text-muted-foreground leading-relaxed">
                <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
              </li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    lines.forEach((line, index) => {
      // Find the "real" index of this header among all headers to match TOC
      if (line.startsWith('## ') || line.startsWith('### ')) {
        // This is a bit hacky because we are iterating lines, not headers. 
        // But since we generate TOC from the same content split by newline, we need a way to link them.
        // Better approach: calculate header index dynamically.
      }
    });

    // Lets re-map the content generation to be more robust for IDs
    let headerIndex = 0;

    lines.forEach((line, index) => {
      if (line.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 id={`section-${headerIndex++}`} key={index} className="text-2xl font-bold mt-10 mb-4 text-foreground scroll-mt-24">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 id={`section-${headerIndex++}`} key={index} className="text-xl font-semibold mt-8 mb-3 text-foreground scroll-mt-24">
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('- ')) {
        currentList.push(line.replace('- ', ''));
      } else if (line.match(/^\d+\.\s/)) {
        flushList();
        elements.push(
          <p key={index} className="my-2 text-muted-foreground leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
          </p>
        );
      } else if (line.trim()) {
        flushList();
        elements.push(
          <p key={index} className="my-4 text-muted-foreground leading-relaxed text-lg">
            <span dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
          </p>
        );
      }
    });

    flushList();
    return elements;
  };

  return (
    <Layout>
      <SEO
        title={post.title[language]}
        description={post.excerpt[language]}
        url={`/blog/${post.slug}`}
        type="article"
        image={post.image}
        article={{
          publishedTime: post.date,
          modifiedTime: post.date,
          author: post.author[language],
          section: post.category[language],
          tags: [post.category[language]] // We could add more tags if available in data
        }}
      />

      {/* Hero with image */}
      <section className="relative">
        <div className="h-[400px] relative overflow-hidden">
          <img
            src={post.image}
            alt={post.title[language]}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        <div className="container relative -mt-32 z-10">
          <AnimatedSection animation="fade-up" className="max-w-4xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
              <BackArrow className="h-4 w-4" />
              {language === 'ar' ? 'العودة للمدونة' : 'Back to Blog'}
            </Link>

            <Badge className="mb-4 bg-primary/90">{post.category[language]}</Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground leading-tight">
              {post.title[language]}
            </h1>

            <p className="text-xl text-muted-foreground mb-6">
              {post.excerpt[language]}
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author[language]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime[language]}</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container">
          <div className="grid lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
            {/* Sidebar - TOC & Share */}
            <aside className="lg:col-span-1 order-2 lg:order-1">
              <div className="lg:sticky lg:top-24 space-y-6">

                {/* Table of Contents */}
                <Card className="border-border/50 hidden lg:block">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      {language === 'ar' ? 'فهرس المحتوى' : 'Table of Contents'}
                    </h4>
                    <nav className="flex flex-col space-y-2">
                      {post.content[language].split('\n').filter(line => line.startsWith('## ') || line.startsWith('### ')).map((header, index) => {
                        const isH3 = header.startsWith('### ');
                        const text = header.replace(/^#+ /, '');
                        return (
                          <a
                            key={index}
                            href={`#section-${index}`}
                            onClick={(e) => {
                              e.preventDefault();
                              document.getElementById(`section-${index}`)?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`text-sm hover:text-primary transition-colors line-clamp-1 ${isH3 ? (language === 'ar' ? 'mr-4' : 'ml-4 text-muted-foreground') : 'font-medium'}`}
                          >
                            {text}
                          </a>
                        );
                      })}
                    </nav>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Share2 className="h-4 w-4" />
                      {language === 'ar' ? 'مشاركة' : 'Share'}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleShare('twitter')}
                      >
                        <Twitter className="h-4 w-4" />
                        Twitter
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleShare('linkedin')}
                      >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleShare('facebook')}
                      >
                        <Facebook className="h-4 w-4" />
                        Facebook
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleShare('whatsapp')}
                      >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </Button>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-2"
                        onClick={handleCopyLink}
                      >
                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        {language === 'ar' ? 'نسخ الرابط' : 'Copy Link'}
                      </Button>
                      <Button
                        variant={isBookmarked ? 'default' : 'outline'}
                        size="sm"
                        onClick={handleBookmark}
                      >
                        <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Related Posts */}
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      {language === 'ar' ? 'مقالات ذات صلة' : 'Related Articles'}
                    </h4>
                    <div className="space-y-3">
                      {relatedPosts.map((related) => (
                        <Link
                          key={related.slug}
                          to={`/blog/${related.slug}`}
                          className="block group"
                        >
                          <div className="flex gap-3">
                            <img
                              src={related.image}
                              alt={related.title[language]}
                              loading="lazy"
                              className="w-16 h-12 object-cover rounded-md"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                                {related.title[language]}
                              </p>
                              <span className="text-xs text-muted-foreground">
                                {related.readTime[language]}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </aside>

            {/* Main Content */}
            <article className="lg:col-span-3 order-1 lg:order-2">
              <AnimatedSection animation="fade-up">
                <Card className="border-border/50 shadow-elevated">
                  <CardContent className="p-6 md:p-10">
                    <div className="prose prose-lg max-w-none">
                      {renderContent(post.content[language])}
                    </div>
                  </CardContent>
                </Card>

                {/* Navigation */}
                <div className="grid md:grid-cols-2 gap-4 mt-8">
                  {prevPost && (
                    <Link to={`/blog/${prevPost.slug}`}>
                      <Card className="border-border/50 hover:border-primary/50 transition-colors h-full">
                        <CardContent className="p-4 flex items-center gap-4">
                          <ChevronLeft className="h-6 w-6 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              {language === 'ar' ? 'المقال السابق' : 'Previous'}
                            </p>
                            <p className="font-medium line-clamp-1">{prevPost.title[language]}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  )}
                  {nextPost && (
                    <Link to={`/blog/${nextPost.slug}`} className={prevPost ? '' : 'md:col-start-2'}>
                      <Card className="border-border/50 hover:border-primary/50 transition-colors h-full">
                        <CardContent className="p-4 flex items-center justify-end gap-4 text-end">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              {language === 'ar' ? 'المقال التالي' : 'Next'}
                            </p>
                            <p className="font-medium line-clamp-1">{nextPost.title[language]}</p>
                          </div>
                          <ChevronRight className="h-6 w-6 text-muted-foreground" />
                        </CardContent>
                      </Card>
                    </Link>
                  )}
                </div>

                {/* CTA */}
                <Card className="mt-8 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-2xl font-bold mb-3">
                      {language === 'ar' ? 'هل تريد تطبيق هذه الأفكار في مشروعك؟' : 'Want to apply these ideas to your project?'}
                    </h3>
                    <p className="mb-6 opacity-90">
                      {language === 'ar'
                        ? 'احجز استشارة مجانية وتعرف كيف يمكننا مساعدتك'
                        : 'Book a free consultation and learn how we can help you'}
                    </p>
                    <Button size="lg" variant="secondary" asChild>
                      <Link to="/book">
                        {language === 'ar' ? 'احجز استشارة مجانية' : 'Book Free Consultation'}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </article>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
