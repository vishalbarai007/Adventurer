import { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  noindex?: boolean;
}

export function useSEO({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  noindex
}: SEOProps) {
  useEffect(() => {
    // Update title
    document.title = title ? `${title} | ADVENTURER` : 'ADVENTURER | Explore Trekking & Adventure Travels';

    // Helper to update meta tag content
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attribute}="${name}"]`);
      if (content) {
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute(attribute, name);
          document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
      } else if (tag) {
        tag.remove();
      }
    };

    // Update basic tags
    updateMetaTag('description', description || 'Discover stunning trekking trails, connect with certified local guides, and explore seasonal travel destinations.');
    updateMetaTag('keywords', keywords || 'trekking, adventure, hiking trails, travel guides, escrows booking, seasonal travel');
    updateMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // Update OG tags
    updateMetaTag('og:title', ogTitle || title, true);
    updateMetaTag('og:description', ogDescription || description || 'Discover stunning trekking trails with Adventurer', true);
    updateMetaTag('og:image', ogImage || '/assets/BrandLogos/Adventurer/Logo.png', true);
    updateMetaTag('og:url', ogUrl || window.location.href, true);

    // Update Twitter tags
    updateMetaTag('twitter:title', ogTitle || title);
    updateMetaTag('twitter:description', ogDescription || description || 'Discover stunning trekking trails with Adventurer');
    updateMetaTag('twitter:image', ogImage || '/assets/BrandLogos/Adventurer/Logo.png');

    // Update Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    const canonicalUrl = canonical || window.location.href;
    if (canonicalUrl) {
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonicalUrl);
    } else if (canonicalLink) {
      canonicalLink.remove();
    }
  }, [title, description, keywords, canonical, ogTitle, ogDescription, ogImage, ogUrl, noindex]);
}

export default useSEO;
