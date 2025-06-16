# Giants of All Sizes - Band Website

Official website for Giants of All Sizes, a 4-piece genre-bending band from Philadelphia.

## 🎸 Overview

This is a modern, responsive website built for the indie band Giants of All Sizes. The site features a dark, edgy design with vibrant gradient accents and includes all the essential features for a band website.

## 🚀 Features

- **Responsive Design**: Fully mobile-responsive layout using Tailwind CSS
- **Music Integration**: Bandcamp embed with placeholder for future Spotify integration
- **Shows Section**: Ready for upcoming tour dates and ticket sales
- **Band Information**: Detailed about section with individual member profiles
- **Interactive Guestbook**: Old-school guestbook with local storage
- **Newsletter Signup**: Email collection for fan updates
- **Social Media Links**: Footer with links to all band platforms
- **Smooth Animations**: Parallax scrolling and fade-in effects

## 🛠️ Technologies Used

- HTML5
- Tailwind CSS (via CDN)
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts (Bebas Neue, Space Mono)

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
└── images/
    ├── band1.jpg      # Full band photo
    ├── littleShits.png # Band logo
    ├── tommy.jpg      # Band member photos
    ├── jakob.jpeg
    ├── dylan.jpeg
    └── calvin.jpeg
```

## 🌐 Live Website

Visit the live site at: [giantsofallsizes.net](https://giantsofallsizes.net)

## 🎨 Design Features

- **Color Scheme**: Dark background with pink/cyan/orange gradient accents
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

## 📧 Email List Setup (Buttondown)

The website uses Buttondown for email list management - a simple, privacy-focused newsletter service perfect for indie bands.

### Why Buttondown?
- **Free for first 100 subscribers** (perfect for starting bands)
- **No tracking or analytics** by default (privacy-focused)
- **Simple embed forms** that work with static sites
- **Markdown support** for writing newsletters
- **API access** for future integrations

### Setup Instructions:

1. **Create a Buttondown Account**
   - Go to [buttondown.com](https://buttondown.com) and sign up
   - Choose a username (this will be your newsletter URL)

2. **Update the Website**
   - Open `index.html`
   - Find `giantsofallsizes` in the form action URL (line ~356)
   - Replace with your Buttondown username

3. **Customize Your Newsletter**
   - In Buttondown settings, add your band logo
   - Set up a custom domain if desired
   - Configure your welcome email

4. **Test the Integration**
   - Submit a test email on your website
   - Check your Buttondown subscribers to confirm

## 💬 Guestbook

The website uses a simple localStorage-based guestbook that stores messages directly in visitors' browsers.

### Features:
- **No backend required** - works on any static hosting
- **Privacy-focused** - no data sent to external services
- **Instant updates** - messages appear immediately
- **Persistent storage** - messages saved between visits

### How it Works:
- Messages are stored in the browser's localStorage
- Each visitor sees their own messages plus a default message
- Great for creating a retro guestbook feel
- No moderation needed since messages are local

### Future Enhancement Options:
If you want a shared guestbook in the future, consider:
- Using a service like Formspree or Netlify Forms
- Adding a simple backend with Firebase or Supabase
- Implementing a static site comment system

## 🎤 Managing Shows

The website includes a simple show management system. To add/edit shows:

1. **Open shows.json** in the root directory
2. **Add show information** following this format:
```json
{
  "date": "2025-07-15",
  "venue": "The Fillmore",
  "city": "Philadelphia",
  "state": "PA",
  "ticketUrl": "https://ticketlink.com",
  "soldOut": false
}
```
3. **Save the file** - shows will automatically display in chronological order

### Show Properties:
- `date`: Show date in YYYY-MM-DD format
- `venue`: Name of the venue
- `city`: City name
- `state`: State abbreviation
- `ticketUrl`: Link to ticket sales (optional)
- `soldOut`: Set to true if show is sold out

## 📝 Future Enhancements

- [ ] Spotify integration when band joins the platform
- [ ] Instagram feed integration
- [ ] Dynamic shows listing with ticketing system
- [ ] Backend for guestbook and newsletter
- [ ] Photo gallery section
- [ ] Music video embeds

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