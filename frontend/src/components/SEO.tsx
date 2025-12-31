import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

export function SEO({
  title,
  description,
  keywords,
  image = 'https://ahmadqaoud.com/og-image.jpg',
  url,
  type = 'website',
  article,
}: SEOProps) {
  const { language, t } = useLanguage();

  const siteName = t('brand.name');
  const defaultTitle = `${t('hero.name')} - ${t('hero.title')}`;
  const defaultDescription = t('hero.subtitle');

  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const fullDescription = description || defaultDescription;
  const siteUrl = 'https://ahmadqaoud.com';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;

  // Structured Data - Person/Organization
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: language === 'ar' ? 'أحمد قاعود' : 'Ahmad Qaoud',
        jobTitle: language === 'ar'
          ? 'خبير استراتيجي في التحول الرقمي والذكاء الاصطناعي'
          : 'Strategic Expert in Digital Transformation & AI',
        description: fullDescription,
        url: siteUrl,
        image: image,
        sameAs: [
          'https://linkedin.com/in/ahmadqaoud',
          'https://twitter.com/ahmadqaoud',
        ],
        knowsAbout: [
          'Digital Transformation',
          'Artificial Intelligence',
          'SaaS Development',
          'Process Automation',
          'Enterprise Solutions',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description: fullDescription,
        inLanguage: language === 'ar' ? 'ar-SA' : 'en-US',
        publisher: {
          '@id': `${siteUrl}/#person`,
        },
      },
      {
        '@type': 'WebPage',
        '@id': fullUrl,
        url: fullUrl,
        name: fullTitle,
        description: fullDescription,
        isPartOf: {
          '@id': `${siteUrl}/#website`,
        },
        about: {
          '@id': `${siteUrl}/#person`,
        },
        inLanguage: language === 'ar' ? 'ar-SA' : 'en-US',
      },
    ],
  };

  // Add Article structured data if applicable
  if (type === 'article' && article) {
    structuredData['@graph'].push({
      '@type': 'Article',
      '@id': `${fullUrl}#article`,
      headline: title || '',
      description: fullDescription,
      image: image,
      datePublished: article.publishedTime,
      dateModified: article.modifiedTime || article.publishedTime,
      author: {
        '@id': `${siteUrl}/#person`,
      },
      publisher: {
        '@id': `${siteUrl}/#person`,
      },
      mainEntityOfPage: {
        '@id': fullUrl,
      },
      articleSection: article.section,
      keywords: article.tags?.join(', '),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  }

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'} />
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={language === 'ar' ? 'أحمد قاعود' : 'Ahmad Qaoud'} />
      <link rel="canonical" href={fullUrl} />

      {/* Favicon - Ahmad Qaoud Logo */}
      <link rel="icon" type="image/svg+xml" href="/aq-favicon.svg" />
      <link rel="apple-touch-icon" href="/aq-favicon.svg" />

      {/* Language alternates */}
      <link rel="alternate" hrefLang="ar" href={`${siteUrl}${url || ''}`} />
      <link rel="alternate" hrefLang="en" href={`${siteUrl}${url || ''}`} />
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${url || ''}`} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={language === 'ar' ? 'ar_SA' : 'en_US'} />
      <meta property="og:locale:alternate" content={language === 'ar' ? 'en_US' : 'ar_SA'} />

      {/* Article specific OG tags */}
      {type === 'article' && article && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.section && <meta property="article:section" content={article.section} />}
          {article.tags?.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ahmadqaoud" />
      <meta name="twitter:creator" content="@ahmadqaoud" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#1a1a2e" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
