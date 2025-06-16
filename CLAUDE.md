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
- **Guestbook**: Simple localStorage-based guestbook (no backend needed)
- **Newsletter**: Buttondown integration (free for 100 subscribers)
- **Mobile Menu**: Hamburger menu for small screens
- **Shows**: JSON-based show management

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

## Implemented Features

### Navigation & Sections
- **Home**: Hero section with animated orbs and gradient text
- **Music**: Bandcamp embed with streaming platform links
- **News**: Blog system with categories and single post views
- **Shows**: List/map views with calendar export
- **Setlists**: Archive with statistics and song requests
- **About**: Band info and member profiles
- **Lyrics**: Searchable database with song stories
- **Photos**: Gallery system with lightbox
- **Press**: Electronic Press Kit (EPK)
- **Social**: Multi-platform feed integration
- **Merch**: External store link
- **Guestbook**: Third-party comment system
- **Contact**: Email link

### Data Management
All content is managed through JSON files:
- `shows.json`: Tour dates with coordinates
- `music.json`: Track listings
- `photos.json`: Gallery data
- `lyrics.json`: Song lyrics database
- `epk.json`: Press kit information
- `fan-content.json`: Fan submissions
- `blog.json`: News posts
- `setlists.json`: Show history
- `interactive.json`: Quiz and countdowns

## Common Tasks

### Adding New Shows
```javascript
// Edit shows.json
{
  "date": "2025-07-15",
  "venue": "The Fillmore",
  "city": "Philadelphia",
  "state": "PA",
  "ticketUrl": "",
  "soldOut": false,
  "coordinates": {
    "lat": 39.9668,
    "lng": -75.1347
  },
  "address": "29 E Allen St, Philadelphia, PA 19123"
}
```

### Updating Social Links
- Social media links are in the footer and social feed section
- Update usernames in HTML for embed services
- Instagram requires third-party embed service

### Modifying Color Scheme
- Primary gradient: `linear-gradient(45deg, #ff0080, #ff8c00, #40e0d0)`
- Hover states use semi-transparent versions
- Background uses dark grays (#1a1a1a, #2d2d2d)
- Custom marker styles for maps

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

### Email List (Buttondown)
- Simple newsletter service perfect for bands
- Free for first 100 subscribers
- Replace `giantsofallsizes` with your Buttondown username
- No complex setup required

### Guestbook (HTML Comment Box)
- Third-party service with free tier (100 comments/month)
- No account required for visitors to comment
- Custom styled to match site design
- Alternative Giscus option available (GitHub-based)
- Setup instructions included in HTML comments

### Shows Management
- Edit `shows.json` to add/update shows
- Includes venue coordinates for map view
- Interactive map powered by Leaflet.js
- Calendar export functionality (.ics format)
- Google Maps integration for directions
- Supports ticket links and sold out status

### Social Media Integration
- Instagram: Ready for Behold.so or SnapWidget embed
- Twitter/X: Live timeline embed configured
- YouTube: Channel subscription widget
- TikTok: Profile link (no embed available)
- Platform switcher for easy navigation

### Interactive Features
- **Quiz System**: Personality quiz matching fans to band members
- **Countdown Timers**: Live countdowns to shows and releases
- **Map Integration**: Interactive venue map with custom markers
- **Calendar Export**: Download shows to any calendar app

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

Last Updated: 2025-01-21

## Recent Updates

- Added interactive map view for shows with Leaflet.js
- Implemented calendar export for all shows (.ics format)
- Replaced localStorage guestbook with HTML Comment Box
- Added personality quiz "Which Band Member Are You?"
- Implemented countdown timers for upcoming events
- Added social media feed integration section
- Enhanced shows with venue coordinates and directions
- Added Giscus as alternative guestbook option