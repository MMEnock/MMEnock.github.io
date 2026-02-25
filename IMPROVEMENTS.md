# Website Improvements for More Competitive Job Applications (NRW / Germany)

This document summarizes changes to make your portfolio more competitive for Data Analyst, Web Analyst, and Business Analyst roles in your area.

---

## ✅ Already Fixed

- **Resume page**: LinkedIn link corrected (was pointing to Xing URL).
- **Footer**: Copyright year updated to 2025 on all pages.

---

## High Impact (Do First)

### 1. **Signal “Open to Work” Clearly**
Recruiters look for availability. Add one of these:
- A short line in the hero or under your name: *“Based in Essen, NRW · Open to full-time & contract roles”*.
- A small banner or badge: *“Available for Data Analyst / Web Analyst roles in NRW & remote.”*
- In the contact section: *“I’m currently open to new opportunities in analytics and data science.”*

**Where**: `index.html` hero text or a new line above/below the CTA buttons; optionally in the contact section.

### 2. **Add a “Why Hire Me” or Key Results Section**
Your resume has strong numbers (e.g. +24.5% efficiency, +56.3% ROI, +14% conversions). Surface 3–4 on the homepage so visitors see impact without opening the PDF.

Example bullets:
- *Drove 24.5% performance efficiency with GA4, GTM & BigQuery.*
- *Increased ROI by 56.3% and conversions by 14% via A/B tests and SQL segmentation.*
- *Built dashboards that improved reporting accuracy and website performance by 13%.*

**Where**: New section between “Skills” and “Download Resume” (or between Hero and Skills).

### 3. **Fix or Remove Dead “Report” Links**
Many portfolio items have **Report** links pointing to `#`. Either:
- Remove the Report link for that project, or
- Link to a real report (PDF, Notion, Medium, GitHub README).

**Files**: `index.html` and `portfolio.html` – every `<a href="#">… Report</a>`.

### 4. **Add a GA4 / GTM / Web Analytics Project**
Your current role is heavy on GA4, GTM, and Looker Studio, but the portfolio is mostly ML and Power BI. Add one clear “Web Analytics” or “Tracking & Reporting” project (e.g. tracking setup, GA4 property, GTM container, or Looker Studio report) so your profile matches “Web Analyst” and “Data Analyst” job descriptions.

---

## Medium Impact

### 5. **Professional Photo in Hero**
You already use a photo for Open Graph. Adding a visible profile photo next to the hero text (especially on desktop) increases trust and makes the site feel more personal. Use `assets/images/Resume-picture.jpg` (or the same image you use for og:image).

### 6. **Download CV in Hero**
Many recruiters want a one-click CV. Add a third button or replace “View My Work” with “Download CV” so the PDF is reachable without scrolling.

### 7. **Certifications (if you have any)**
If you have Google Analytics, Power BI, or similar certifications, add a small “Certifications” section or badges (e.g. on the resume page or under Skills). This helps with both SEO and recruiter searches.

### 8. **Stronger Project Descriptions**
For each portfolio item, add one line on **outcome or impact** (e.g. “Reduced manual reporting time by X%” or “Used by Y for Z”). Even one sentence per project will make the portfolio more convincing.

### 9. **Contact Section**
- Add a line like: *“Best way to reach me: [Email / LinkedIn]. I usually reply within 24 hours.”*
- If you’re comfortable, add a “Book a short call” link (e.g. Calendly) to make it easy for recruiters to schedule a conversation.

---

## Lower Priority / Polish

### 10. **Consistent PDF Naming**
- English pages use `Resume.pdf` and German pages use `lebenslauf.pdf`. That’s fine; just ensure both files are up to date (you already updated `lebenslauf.pdf`). If you have an English PDF, keep it as `Resume.pdf` and update it when you change your CV.

### 11. **“Looker Studio” vs “Google Data Studio”**
You mention both; Looker Studio is the current name. Prefer “Looker Studio” in visible text and keep “Google Data Studio” in keywords/SEO if you want to catch older searches.

### 12. **Schema / SEO**
Your JSON-LD and meta tags are already strong (location, job titles, skills). When you add “Open to work” or “Key results,” you can optionally add one more line in the `description` or in the schema so search snippets reflect availability.

### 13. **Mobile**
Test the contact form and all buttons on a real phone. Ensure the “Download PDF” and “Contact” CTAs are easy to tap and that the form works with reCAPTCHA on mobile.

---

## Summary Checklist

| Priority | Action |
|----------|--------|
| High    | Add “Open to work / Based in NRW” message. |
| High    | Add “Why Hire Me” / key results (3–4 metrics) on homepage. |
| High    | Fix or remove dead “Report” links in portfolio. |
| High    | Add at least one GA4/GTM/Web Analytics project. |
| Medium  | Add profile photo in hero. |
| Medium  | Add “Download CV” in hero. |
| Medium  | Add certifications if you have them. |
| Medium  | Add outcome/impact to project descriptions. |
| Medium  | Clarify “best way to reach me” and optional Calendly. |
| Low     | Align “Looker Studio” naming; keep PDFs updated. |

---

*Generated as a reference for improving the site. Apply the changes that fit your situation first (e.g. “Open to work” and key results), then iterate.*
