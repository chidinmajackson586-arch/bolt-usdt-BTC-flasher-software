import type { Express } from "express";

export function registerSEORoutes(app: Express) {
  // Sitemap route for dynamic sitemap generation
  app.get('/sitemap.xml', (req, res) => {
    const baseUrl = 'https://boltflasher.live';
    const now = new Date().toISOString();
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/"/>
    <image:image>
      <image:loc>${baseUrl}/og-image.png</image:loc>
      <image:title>Bolt Flasher - #1 Crypto Flash Software | BTC USDT ETH Flash Tool</image:title>
      <image:caption>Professional cryptocurrency flash transaction software with 99.9% success rate</image:caption>
    </image:image>
  </url>

  <url>
    <loc>${baseUrl}/dashboard</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>${baseUrl}/send</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${baseUrl}/pricing</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${baseUrl}/history</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>${baseUrl}/charts</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>${baseUrl}/settings</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  });

  // Robots.txt route
  app.get('/robots.txt', (req, res) => {
    const baseUrl = 'https://boltflasher.live';
    
    const robots = `User-agent: *
Allow: /

# Disallow admin areas for security
Disallow: /admin
Disallow: /api/

# Allow important pages
Allow: /dashboard
Allow: /send
Allow: /pricing
Allow: /history
Allow: /charts
Allow: /settings

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay to be respectful
Crawl-delay: 1`;

    res.header('Content-Type', 'text/plain');
    res.send(robots);
  });

  // Structured data for homepage
  app.get('/api/structured-data/homepage', (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Bolt Crypto Flasher",
      "description": "Professional cryptocurrency flash transaction platform supporting Bitcoin, USDT, Ethereum, and BNB across multiple networks",
      "url": baseUrl,
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web Browser, Windows, macOS, Linux",
      "offers": [
        {
          "@type": "Offer",
          "name": "Basic Plan",
          "price": "550",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer", 
          "name": "Pro Plan",
          "price": "950",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "name": "Full Plan", 
          "price": "3000",
          "priceCurrency": "USD"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      },
      "creator": {
        "@type": "Organization",
        "name": "Bolt Crypto Flasher",
        "url": baseUrl
      },
      "featureList": [
        "Multi-network cryptocurrency support",
        "Flash transaction processing", 
        "Real-time transaction tracking",
        "Advanced admin panel",
        "Professional user management",
        "Secure payment processing"
      ]
    };
    
    res.json(structuredData);
  });
}