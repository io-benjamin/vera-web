# Vera AI Audit Guide

This guide defines how I should audit websites submitted through tryvera.dev.

## Audit Process

When a new audit request comes in:
1. Fetch the URL and analyze the HTML/headers
2. Run all checks below
3. Generate a scored report
4. Save results to Supabase
5. Notify about completed audit

## What To Check

### 🚀 Performance (25 points)
- **Load time** - Should be under 3 seconds
  - Critical if > 5s
  - Warning if > 3s
  - Good if < 2s
- **Page size** - HTML should be reasonable
  - Warning if > 500KB
  - Check for uncompressed assets
- **Render blocking** - Look for blocking scripts in `<head>`

### 🔍 SEO (25 points)
- **Title tag** - Must exist, 30-60 characters ideal
- **Meta description** - Must exist, 120-160 characters ideal
- **H1 tag** - Should have exactly one
- **Image alt tags** - All images should have descriptive alt text
- **Canonical URL** - Should be set to avoid duplicate content
- **Open Graph tags** - og:title, og:description, og:image for social sharing

### 🔒 Security (25 points)
- **HTTPS** - Must use HTTPS (critical if missing)
- **Security headers**:
  - Strict-Transport-Security (HSTS)
  - Content-Security-Policy
  - X-Frame-Options
  - X-Content-Type-Options
- **Mixed content** - No HTTP resources on HTTPS pages

### 📱 Mobile (25 points)
- **Viewport meta tag** - Must have `width=device-width`
- **Responsive images** - Look for srcset/sizes
- **Touch targets** - Buttons should be tappable (note if text is tiny)
- **No horizontal scroll** - Content should fit viewport

## Severity Levels

- **Critical** (🔴): Immediate fix needed, major impact on users/SEO
- **Warning** (🟡): Should fix soon, moderate impact
- **Info** (🔵): Nice to have, minor improvement

## Scoring

Start at 100, deduct:
- Critical issue: -15 points each
- Warning: -7 points each
- Info: -2 points each

Minimum score: 0

## Report Format

```
# Website Audit Report

**URL:** [url]
**Date:** [date]
**Score:** [X]/100

## Summary
- 🔴 Critical: [count]
- 🟡 Warnings: [count]
- 🔵 Suggestions: [count]

## Quick Stats
- Load Time: [X]s
- Page Size: [X]KB
- HTTPS: ✅/❌
- Mobile Ready: ✅/❌

## Issues Found

### 🔴 Critical
[List each with title, description, and fix recommendation]

### 🟡 Warnings
[List each]

### 🔵 Suggestions
[List each]

## Next Steps
[Personalized recommendations based on findings]
```

## Tone & Style

- Be direct and actionable
- Don't use jargon - explain in plain English
- Every issue needs a specific fix recommendation
- Prioritize by business impact
- Be encouraging if site is good

## Special Cases

### JavaScript-Heavy Sites (SPAs)
- Note that full rendering requires browser
- Check if there's SSR/hydration
- Look for `<noscript>` fallback

### E-commerce Sites
- Extra focus on trust signals
- Check for SSL seal
- Look for cart/checkout links

### Local Businesses
- Check for NAP (Name, Address, Phone) consistency
- Look for Google Maps embed
- Check for schema.org LocalBusiness markup

## After Audit

1. Save full results to `audit_results` table in Supabase
2. Update `audit_requests` status to 'completed'
3. If email delivery is set up, send the report

---

*This guide is used by Vera's AI auditor. Update as we learn what matters most to clients.*
