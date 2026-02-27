// AI Website Auditor - Core analysis functions

export interface AuditResult {
  url: string;
  timestamp: string;
  score: number;
  issues: AuditIssue[];
  meta: SiteMeta;
  performance: PerformanceMetrics;
  seo: SEOCheck;
  security: SecurityCheck;
  mobile: MobileCheck;
}

export interface AuditIssue {
  severity: 'critical' | 'warning' | 'info';
  category: string;
  title: string;
  description: string;
  recommendation: string;
}

export interface SiteMeta {
  title: string | null;
  description: string | null;
  favicon: boolean;
  ogImage: boolean;
  canonical: string | null;
}

export interface PerformanceMetrics {
  loadTimeMs: number;
  sizeKb: number;
  requests: number;
}

export interface SEOCheck {
  hasTitle: boolean;
  titleLength: number;
  hasDescription: boolean;
  descriptionLength: number;
  hasH1: boolean;
  h1Count: number;
  hasAltTags: boolean;
  missingAltCount: number;
}

export interface SecurityCheck {
  https: boolean;
  hasSecurityHeaders: boolean;
  headers: {
    strictTransportSecurity: boolean;
    contentSecurityPolicy: boolean;
    xFrameOptions: boolean;
    xContentTypeOptions: boolean;
  };
}

export interface MobileCheck {
  hasViewport: boolean;
  viewportContent: string | null;
  usesResponsiveImages: boolean;
}

export async function runAudit(url: string): Promise<AuditResult> {
  const startTime = Date.now();
  const issues: AuditIssue[] = [];
  
  // Normalize URL
  if (!url.startsWith('http')) {
    url = 'https://' + url;
  }
  
  // Fetch the page
  let html = '';
  let headers: Headers;
  let loadTimeMs = 0;
  let sizeKb = 0;
  
  try {
    const fetchStart = Date.now();
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Vera-Auditor/1.0 (https://tryvera.dev)',
      },
    });
    loadTimeMs = Date.now() - fetchStart;
    headers = response.headers;
    html = await response.text();
    sizeKb = Math.round(new Blob([html]).size / 1024);
  } catch (error) {
    issues.push({
      severity: 'critical',
      category: 'Accessibility',
      title: 'Site Unreachable',
      description: `Could not load ${url}. The site may be down or blocking requests.`,
      recommendation: 'Ensure your site is accessible and not blocking automated requests.',
    });
    
    return {
      url,
      timestamp: new Date().toISOString(),
      score: 0,
      issues,
      meta: { title: null, description: null, favicon: false, ogImage: false, canonical: null },
      performance: { loadTimeMs: 0, sizeKb: 0, requests: 0 },
      seo: { hasTitle: false, titleLength: 0, hasDescription: false, descriptionLength: 0, hasH1: false, h1Count: 0, hasAltTags: false, missingAltCount: 0 },
      security: { https: false, hasSecurityHeaders: false, headers: { strictTransportSecurity: false, contentSecurityPolicy: false, xFrameOptions: false, xContentTypeOptions: false } },
      mobile: { hasViewport: false, viewportContent: null, usesResponsiveImages: false },
    };
  }
  
  // Parse HTML
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                    html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const viewportMatch = html.match(/<meta[^>]*name=["']viewport["'][^>]*content=["']([^"']*)["']/i);
  const h1Matches = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
  const imgMatches = html.match(/<img[^>]*>/gi) || [];
  const imgsWithoutAlt = imgMatches.filter(img => !img.includes('alt=') || img.match(/alt=["']\s*["']/));
  const faviconMatch = html.match(/<link[^>]*rel=["'][^"']*icon[^"']*["']/i);
  const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["']/i);
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  
  const meta: SiteMeta = {
    title: titleMatch ? titleMatch[1].trim() : null,
    description: descMatch ? descMatch[1].trim() : null,
    favicon: !!faviconMatch,
    ogImage: !!ogImageMatch,
    canonical: canonicalMatch ? canonicalMatch[1] : null,
  };
  
  const seo: SEOCheck = {
    hasTitle: !!meta.title,
    titleLength: meta.title?.length || 0,
    hasDescription: !!meta.description,
    descriptionLength: meta.description?.length || 0,
    hasH1: h1Matches.length > 0,
    h1Count: h1Matches.length,
    hasAltTags: imgsWithoutAlt.length === 0,
    missingAltCount: imgsWithoutAlt.length,
  };
  
  const security: SecurityCheck = {
    https: url.startsWith('https'),
    hasSecurityHeaders: false,
    headers: {
      strictTransportSecurity: !!headers?.get('strict-transport-security'),
      contentSecurityPolicy: !!headers?.get('content-security-policy'),
      xFrameOptions: !!headers?.get('x-frame-options'),
      xContentTypeOptions: !!headers?.get('x-content-type-options'),
    },
  };
  security.hasSecurityHeaders = Object.values(security.headers).filter(Boolean).length >= 2;
  
  const mobile: MobileCheck = {
    hasViewport: !!viewportMatch,
    viewportContent: viewportMatch ? viewportMatch[1] : null,
    usesResponsiveImages: html.includes('srcset=') || html.includes('sizes='),
  };
  
  // Generate issues
  
  // Performance
  if (loadTimeMs > 3000) {
    issues.push({
      severity: 'critical',
      category: 'Performance',
      title: 'Slow Page Load',
      description: `Page took ${(loadTimeMs / 1000).toFixed(1)}s to load. Users expect pages to load in under 3 seconds.`,
      recommendation: 'Optimize images, enable caching, minimize JavaScript, and consider a CDN.',
    });
  } else if (loadTimeMs > 1500) {
    issues.push({
      severity: 'warning',
      category: 'Performance',
      title: 'Page Load Could Be Faster',
      description: `Page took ${(loadTimeMs / 1000).toFixed(1)}s to load. Aim for under 1.5 seconds.`,
      recommendation: 'Consider lazy loading images and deferring non-critical scripts.',
    });
  }
  
  if (sizeKb > 500) {
    issues.push({
      severity: 'warning',
      category: 'Performance',
      title: 'Large Page Size',
      description: `Page is ${sizeKb}KB. Large pages load slower, especially on mobile.`,
      recommendation: 'Compress images, minify CSS/JS, and remove unused code.',
    });
  }
  
  // SEO
  if (!seo.hasTitle) {
    issues.push({
      severity: 'critical',
      category: 'SEO',
      title: 'Missing Page Title',
      description: 'No <title> tag found. This is critical for search rankings.',
      recommendation: 'Add a unique, descriptive title under 60 characters.',
    });
  } else if (seo.titleLength < 30) {
    issues.push({
      severity: 'warning',
      category: 'SEO',
      title: 'Title Too Short',
      description: `Title is only ${seo.titleLength} characters. Short titles miss SEO opportunities.`,
      recommendation: 'Expand your title to 50-60 characters with relevant keywords.',
    });
  } else if (seo.titleLength > 60) {
    issues.push({
      severity: 'info',
      category: 'SEO',
      title: 'Title May Be Truncated',
      description: `Title is ${seo.titleLength} characters. Google typically shows ~60 characters.`,
      recommendation: 'Consider shortening your title so it displays fully in search results.',
    });
  }
  
  if (!seo.hasDescription) {
    issues.push({
      severity: 'critical',
      category: 'SEO',
      title: 'Missing Meta Description',
      description: 'No meta description found. This affects click-through rates from search results.',
      recommendation: 'Add a compelling description between 150-160 characters.',
    });
  } else if (seo.descriptionLength < 100) {
    issues.push({
      severity: 'warning',
      category: 'SEO',
      title: 'Meta Description Too Short',
      description: `Description is only ${seo.descriptionLength} characters.`,
      recommendation: 'Expand to 150-160 characters to maximize search result real estate.',
    });
  }
  
  if (!seo.hasH1) {
    issues.push({
      severity: 'warning',
      category: 'SEO',
      title: 'Missing H1 Heading',
      description: 'No H1 tag found. H1 helps search engines understand your page topic.',
      recommendation: 'Add a single, descriptive H1 heading to your page.',
    });
  } else if (seo.h1Count > 1) {
    issues.push({
      severity: 'info',
      category: 'SEO',
      title: 'Multiple H1 Tags',
      description: `Found ${seo.h1Count} H1 tags. Best practice is to have just one.`,
      recommendation: 'Use a single H1 for the main heading, H2-H6 for subheadings.',
    });
  }
  
  if (seo.missingAltCount > 0) {
    issues.push({
      severity: seo.missingAltCount > 3 ? 'warning' : 'info',
      category: 'Accessibility',
      title: 'Images Missing Alt Text',
      description: `${seo.missingAltCount} image(s) don't have alt attributes.`,
      recommendation: 'Add descriptive alt text to all images for accessibility and SEO.',
    });
  }
  
  if (!meta.favicon) {
    issues.push({
      severity: 'info',
      category: 'Branding',
      title: 'Missing Favicon',
      description: 'No favicon detected. Favicons help brand recognition in browser tabs.',
      recommendation: 'Add a favicon in multiple sizes for different devices.',
    });
  }
  
  if (!meta.ogImage) {
    issues.push({
      severity: 'warning',
      category: 'Social',
      title: 'Missing Social Image',
      description: 'No Open Graph image found. Links shared on social media won\'t have a preview image.',
      recommendation: 'Add og:image meta tag with an image at least 1200x630px.',
    });
  }
  
  // Security
  if (!security.https) {
    issues.push({
      severity: 'critical',
      category: 'Security',
      title: 'Not Using HTTPS',
      description: 'Site is not using HTTPS. This is a major security and SEO issue.',
      recommendation: 'Install an SSL certificate immediately. Most hosts offer free SSL.',
    });
  }
  
  if (!security.headers.strictTransportSecurity && security.https) {
    issues.push({
      severity: 'warning',
      category: 'Security',
      title: 'Missing HSTS Header',
      description: 'Strict-Transport-Security header not set.',
      recommendation: 'Enable HSTS to ensure browsers always use HTTPS.',
    });
  }
  
  if (!security.headers.xContentTypeOptions) {
    issues.push({
      severity: 'info',
      category: 'Security',
      title: 'Missing X-Content-Type-Options',
      description: 'This header prevents MIME-type sniffing attacks.',
      recommendation: 'Add X-Content-Type-Options: nosniff header.',
    });
  }
  
  // Mobile
  if (!mobile.hasViewport) {
    issues.push({
      severity: 'critical',
      category: 'Mobile',
      title: 'Missing Viewport Meta Tag',
      description: 'No viewport meta tag found. Site will not display properly on mobile devices.',
      recommendation: 'Add <meta name="viewport" content="width=device-width, initial-scale=1">',
    });
  }
  
  // Calculate score
  let score = 100;
  for (const issue of issues) {
    if (issue.severity === 'critical') score -= 15;
    else if (issue.severity === 'warning') score -= 7;
    else if (issue.severity === 'info') score -= 2;
  }
  score = Math.max(0, score);
  
  return {
    url,
    timestamp: new Date().toISOString(),
    score,
    issues,
    meta,
    performance: { loadTimeMs, sizeKb, requests: 1 },
    seo,
    security,
    mobile,
  };
}

export function generateReportMarkdown(result: AuditResult): string {
  const criticalCount = result.issues.filter(i => i.severity === 'critical').length;
  const warningCount = result.issues.filter(i => i.severity === 'warning').length;
  const infoCount = result.issues.filter(i => i.severity === 'info').length;
  
  let md = `# Website Audit Report

**URL:** ${result.url}
**Date:** ${new Date(result.timestamp).toLocaleDateString()}
**Score:** ${result.score}/100

---

## Summary

- 🔴 **Critical Issues:** ${criticalCount}
- 🟡 **Warnings:** ${warningCount}
- 🔵 **Suggestions:** ${infoCount}

### Quick Stats
- Load Time: ${(result.performance.loadTimeMs / 1000).toFixed(2)}s
- Page Size: ${result.performance.sizeKb}KB
- HTTPS: ${result.security.https ? '✅' : '❌'}
- Mobile Ready: ${result.mobile.hasViewport ? '✅' : '❌'}

---

## Issues Found

`;

  if (result.issues.length === 0) {
    md += `🎉 **No issues found!** Your site is in great shape.\n\n`;
  } else {
    const critical = result.issues.filter(i => i.severity === 'critical');
    const warnings = result.issues.filter(i => i.severity === 'warning');
    const info = result.issues.filter(i => i.severity === 'info');
    
    if (critical.length > 0) {
      md += `### 🔴 Critical\n\n`;
      for (const issue of critical) {
        md += `**${issue.title}**\n${issue.description}\n\n*Fix:* ${issue.recommendation}\n\n---\n\n`;
      }
    }
    
    if (warnings.length > 0) {
      md += `### 🟡 Warnings\n\n`;
      for (const issue of warnings) {
        md += `**${issue.title}**\n${issue.description}\n\n*Fix:* ${issue.recommendation}\n\n---\n\n`;
      }
    }
    
    if (info.length > 0) {
      md += `### 🔵 Suggestions\n\n`;
      for (const issue of info) {
        md += `**${issue.title}**\n${issue.description}\n\n*Fix:* ${issue.recommendation}\n\n---\n\n`;
      }
    }
  }
  
  md += `
---

## Need Help Fixing These?

Reply to this email or visit [tryvera.dev](https://tryvera.dev) to get started.

- **Quick Fix:** $199+ per issue
- **Full Rebuild:** $2,500+
- **Monthly Care:** $149/mo

*This report was generated by Vera's AI auditor.*
`;

  return md;
}
