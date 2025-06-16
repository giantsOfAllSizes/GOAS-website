# Claude AI Assistant Guidelines

This document provides context and guidelines for AI assistants working on the Giants of All Sizes website.

## Project Overview

This is the official website for Giants of All Sizes, a 4-piece indie band from Philadelphia. The website serves as the band's primary online presence for fans, industry professionals, and potential bookers.

## Design Philosophy

- **Aesthetic**: Dark, edgy, and modern with retro-futuristic elements
- **Color Palette**: Black background with pink (#ff0080), cyan (#40e0d0), and orange (#ff8c00) gradient accents
- **Typography**: Bebas Neue for headlines, Space Mono for body text
- **User Experience**: Single-page design with smooth scrolling and mobile-first responsiveness

## Key Components

### 1. Hero Section
- Features the band name with gradient text effect
- Includes the transparent band logo (littleShits.png)
- Animated background orbs for visual interest
- Call-to-action buttons for music and shows

### 2. Music Section
- Bandcamp embed for current demos
- Placeholder for future Spotify integration
- Links to other streaming platforms (ready for activation)

### 3. Shows Section
- Currently displays placeholder for upcoming shows
- Designed to accommodate dynamic show listings
- Includes ticket purchase buttons

### 4. About Section
- Band description and group photo
- Individual member cards with photos and influences
- Responsive grid layout

### 5. Interactive Features
- **Guestbook**: Uses Disqus for production, localStorage fallback for development
- **Newsletter**: Mailchimp integration for professional email management
- **Mobile Menu**: Hamburger menu for small screens

## Technical Stack

- **Framework**: None (vanilla HTML/CSS/JS)
- **CSS**: Tailwind CSS via CDN
- **Icons**: Font Awesome
- **Storage**: localStorage for client-side data
- **Hosting**: GitHub Pages (via CNAME)

## Development Guidelines

### Code Style
- Use semantic HTML5 elements
- Follow Tailwind CSS utility classes
- Keep JavaScript vanilla and modern (ES6+)
- Ensure all interactive elements are keyboard accessible

### Performance
- Images should be optimized for web
- Minimize external dependencies
- Use CDNs for libraries when possible
- Implement lazy loading for images if adding galleries

### SEO Considerations
- Maintain descriptive meta tags
- Use semantic HTML structure
- Ensure proper heading hierarchy
- Keep alt text on all images

## Common Tasks

### Adding New Shows
```javascript
// Shows should be added to the shows section
// Format: Date - Venue, City, State
// Include ticket link when available
```

### Updating Social Links
- Social media links are in the footer
- Currently placeholders - update when band provides handles

### Modifying Color Scheme
- Primary gradient: `linear-gradient(45deg, #ff0080, #ff8c00, #40e0d0)`
- Hover states use semi-transparent versions
- Background uses dark grays (#1a1a1a, #2d2d2d)

## Testing Checklist

- [ ] Mobile responsiveness (320px - 767px)
- [ ] Tablet responsiveness (768px - 1024px)
- [ ] Desktop view (1025px+)
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] Form validation (guestbook, newsletter)
- [ ] Smooth scrolling navigation
- [ ] Social media links
- [ ] External links open in new tabs

## Service Integrations

### Email List (Mailchimp)
- Production: Mailchimp embedded form
- Replace `YOUR-MAILCHIMP-URL-HERE` with actual form action URL
- Update hidden field with correct list ID
- Free tier supports up to 500 contacts

### Guestbook (Disqus)
- Production: Disqus commenting system
- Replace `YOUR-DISQUS-SHORTNAME` with actual shortname
- Configure dark theme in Disqus admin
- Alternative: HTML Comment Box for simpler setup

## Future Considerations

1. **Analytics**: Add Google Analytics or similar
2. **Accessibility**: Ensure WCAG 2.1 AA compliance
3. **Performance**: Consider static site generation if content grows
4. **CMS**: Potential integration with headless CMS for easy updates
5. **Social Media**: Add real Instagram feed widget when handle is available

## Contact

For questions about the website or band:
- Email: giantsofallsizes@gmail.com
- Website: giantsofallsizes.net

---

Last Updated: 2025-06-16