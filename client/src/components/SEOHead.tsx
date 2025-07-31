import { useEffect } from 'react';
import { useLocation } from 'wouter';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  twitterImage?: string;
  noIndex?: boolean;
}

const SEOHead = ({
  title = "⚡ Bolt Crypto Flasher - Professional Cryptocurrency Flash Platform",
  description = "Professional cryptocurrency flash transaction platform supporting Bitcoin, USDT, Ethereum, and BNB across multiple networks. Advanced gas fee management and real-time tracking.",
  canonical,
  ogImage = "/og-image.png",
  twitterImage = "/twitter-image.png",
  noIndex = false
}: SEOHeadProps) => {
  const [location] = useLocation();
  
  const baseUrl = import.meta.env.PROD ? 'https://boltcryptoflasher.com' : 'http://localhost:5000';
  const fullCanonical = canonical || `${baseUrl}${location}`;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
  const fullTwitterImage = twitterImage.startsWith('http') ? twitterImage : `${baseUrl}${twitterImage}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Update link tags
    const updateLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:url', fullCanonical, true);
    updateMetaTag('og:image', fullOgImage, true);

    // Twitter tags
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', fullTwitterImage);

    // Canonical URL
    updateLinkTag('canonical', fullCanonical);

    // Track page view for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: title,
        page_location: fullCanonical,
        send_page_view: true
      });
    }
  }, [title, description, fullCanonical, fullOgImage, fullTwitterImage, noIndex]);

  return null;
};

export default SEOHead;