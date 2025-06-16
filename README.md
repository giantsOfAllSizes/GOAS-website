# Giants of All Sizes - Band Website

Official website for Giants of All Sizes, a 4-piece genre-bending band from Philadelphia.

## 🎸 Overview

This is a modern, responsive website built for the indie band Giants of All Sizes. The site features a dark, edgy design with vibrant gradient accents and includes all the essential features for a band website.

## 🚀 Features

- **Responsive Design**: Fully mobile-responsive layout using Tailwind CSS
- **Music Integration**: Bandcamp embed with placeholder for future Spotify integration
- **Shows Section**: Interactive map view, calendar export, and list view for tour dates
- **Band Information**: Detailed about section with individual member profiles
- **Interactive Guestbook**: Modern third-party guestbook with multiple options
- **Newsletter Signup**: Email collection via Buttondown
- **Social Media Feeds**: Integrated feeds from Instagram, Twitter/X, YouTube, and TikTok
- **Blog/News Section**: Full featured blog with categories and single post views
- **Photo Gallery**: Lightbox-enabled photo galleries
- **Song Lyrics**: Searchable lyrics database with stories
- **Setlist Archive**: Historical setlists with statistics
- **Electronic Press Kit**: Professional EPK for booking
- **Fan Content Gallery**: Showcase fan art, covers, and photos
- **Interactive Features**: Band member personality quiz and countdown timers
- **Music Player**: Sticky bottom player widget
- **Smooth Animations**: Parallax scrolling and fade-in effects

## 🛠️ Technologies Used

- HTML5
- Tailwind CSS (via CDN)
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts (Bebas Neue, Space Mono)
- Leaflet.js for interactive maps
- Giscus/HTML Comment Box for guestbook

## 📁 Project Structure

```
GOAS-website-main/
├── index.html          # Main website file
├── about.html          # Redirects to main page about section
├── script.js           # JavaScript functionality
├── style.css           # Legacy styles (kept for reference)
├── CNAME              # Custom domain configuration
├── README.md          # This file
├── CLAUDE.md          # AI assistant guidelines
├── images/
│   ├── band1.jpg      # Full band photo
│   ├── littleShits.png # Band logo
│   ├── tommy.jpg      # Band member photos
│   ├── jakob.jpeg
│   ├── dylan.jpeg
│   ├── calvin.jpeg
│   └── merle.jpeg
└── data/
    ├── shows.json      # Show listings with coordinates
    ├── music.json      # Music tracks data
    ├── photos.json     # Photo galleries data
    ├── lyrics.json     # Song lyrics database
    ├── epk.json        # Electronic press kit data
    ├── fan-content.json # Fan submissions
    ├── blog.json       # Blog posts
    ├── setlists.json   # Setlist archive
    └── interactive.json # Quiz and countdown data
```

## 🌐 Live Website

Visit the live site at: [giantsofallsizes.net](https://giantsofallsizes.net)

## 🎨 Design Features

- **Color Scheme**: Dark background with pink (#ff0080), cyan (#40e0d0), and orange (#ff8c00) gradient accents
- **Typography**: Bebas Neue for headlines, Space Mono for body text
- **Visual Effects**: Glowing elements, animated background orbs, parallax scrolling
- **Layout**: Single-page design with smooth scroll navigation

## 📱 Mobile Responsiveness

The website is fully responsive and tested on:
- Desktop (1920x1080 and above)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🔧 Local Development

1. Clone the repository
2. Open `index.html` in a web browser
3. No build process required - uses CDN for dependencies

## 💬 Guestbook Setup

The website offers two modern guestbook options:

### Option 1: HTML Comment Box (Currently Active)
- **Free tier**: 100 comments/month
- **No account required** for visitors
- **Simple moderation** dashboard
- **Classic guestbook feel**

To customize:
1. Visit [htmlcommentbox.com](https://www.htmlcommentbox.com)
2. Create your widget
3. Replace the embed code in index.html

### Option 2: Giscus (GitHub-based)
- **Completely free**, unlimited comments
- **GitHub account required** to comment
- **More features**: reactions, threading, markdown
- **Better for tech-savvy audiences**

To set up:
1. Create a GitHub repository for your guestbook
2. Enable Discussions in repository settings
3. Visit [giscus.app](https://giscus.app) to generate configuration
4. Replace the Giscus script in index.html with your configuration

## 🎤 Managing Shows

The website includes an advanced show management system with map integration.

### Adding Shows
1. **Open shows.json** in the root directory
2. **Add show information** following this format:
```json
{
  "date": "2025-07-15",
  "venue": "The Fillmore",
  "city": "Philadelphia",
  "state": "PA",
  "ticketUrl": "https://ticketlink.com",
  "soldOut": false,
  "coordinates": {
    "lat": 39.9668,
    "lng": -75.1347
  },
  "address": "29 E Allen St, Philadelphia, PA 19123"
}
```

### Show Features:
- **List View**: Traditional chronological listing
- **Map View**: Interactive map showing all venues
- **Calendar Export**: Download all shows as .ics file
- **Directions**: Direct links to Google Maps
- **Ticket Integration**: Links to ticket vendors

## 📧 Email List Setup (Buttondown)

The website uses Buttondown for email list management.

### Setup Instructions:
1. **Create a Buttondown Account** at [buttondown.com](https://buttondown.com)
2. **Update the form** in index.html with your username
3. **Customize** your newsletter settings in Buttondown
4. **Test** the integration

### Features:
- Free for first 100 subscribers
- Privacy-focused
- Markdown support
- API access for future integrations

## 🎵 Music Player

The website includes a sticky music player widget.

### Managing Tracks:
1. **Open music.json** in the root directory
2. **Add track information** with streaming links
3. **Update featuredPlaylist** array with track IDs

### Features:
- Sticky bottom player
- Show/hide toggle
- Track navigation
- Progress indicator
- Mobile responsive

## 📸 Photo Gallery

### Managing Galleries:
1. **Open photos.json** in the root directory
2. **Add galleries** with cover photos and individual images
3. **Include** photographer credits and captions

### Features:
- Grid layout of albums
- Lightbox viewer
- Keyboard navigation
- Mobile swipe support

## 📝 Song Lyrics

### Managing Lyrics:
1. **Open lyrics.json** in the root directory
2. **Add songs** with structured lyrics (verses, chorus, etc.)
3. **Include** songwriter credits and stories

### Features:
- Full-text search
- Structured display
- Song stories
- Mobile optimized

## 📋 Electronic Press Kit (EPK)

### Managing EPK:
1. **Open epk.json** in the root directory
2. **Update** band information, bios, and technical requirements
3. **Add** achievements and press materials

### Features:
- Professional presentation
- Technical requirements
- Downloadable assets
- Booking information

## 🎨 Fan Content Gallery

### Managing Submissions:
1. **Open fan-content.json** in the root directory
2. **Review and approve** fan submissions
3. **Mark featured** content for highlighting

### Features:
- Filtered gallery (Art, Covers, Photos)
- Submission guidelines
- Moderation system
- Featured content

## 📰 Blog/News Section

### Managing Posts:
1. **Open blog.json** in the root directory
2. **Add posts** with categories and tags
3. **Mark featured** posts for homepage

### Features:
- Category filtering
- Featured posts
- Tag system
- Single post view

## 🎤 Setlist Archive

### Managing Setlists:
1. **Open setlists.json** in the root directory
2. **Add setlists** after each show
3. **Update statistics** are calculated automatically

### Features:
- Show statistics
- Most played songs
- Song request form
- Historical archive

## 🎮 Interactive Features

### Band Member Quiz
- 5-question personality quiz
- Matches fans with band members
- Shareable results

### Countdown Timers
- Live countdown to next show
- Album release countdowns
- Tour announcements

Configuration in `interactive.json`

## 📱 Social Media Integration

### Current Integrations:
- **Instagram**: Placeholder for embed service
- **Twitter/X**: Live timeline embed
- **YouTube**: Channel subscription button
- **TikTok**: Profile link

### Setup:
1. Update social media handles in HTML
2. Configure embeds with your accounts
3. Consider using Behold.so or SnapWidget for Instagram

## 🚀 Deployment

The site is configured for GitHub Pages:
1. Push to GitHub repository
2. Enable GitHub Pages in settings
3. CNAME file handles custom domain

## 📝 Future Enhancements

- [ ] Spotify integration when available
- [ ] Advanced ticketing integration
- [ ] Member login area
- [ ] Merchandise store integration
- [ ] Live stream embeds
- [ ] Discord community widget

## 👥 Band Members

- **Tommy Crotty** - Drums, Mallet Percussion
- **Jakob Stein** - Multi-instrumentalist, Guitar
- **Dylan Renner** - Bass, Guitar
- **Calvin Cooper** - Multi-instrumentalist, Vocals

## 📧 Contact

For bookings and inquiries: giantsofallsizes@gmail.com

## 📄 License

© 2025 Giants of All Sizes. All rights reserved.

---

Built with ❤️ for Giants of All Sizes