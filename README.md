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

## 📧 Email List Setup (Mailchimp)

The website uses Mailchimp for email list management. To set it up:

1. **Create a Mailchimp Account**
   - Go to [mailchimp.com](https://mailchimp.com) and sign up (free tier available)
   - Create an audience for your band

2. **Get Your Signup Form URL**
   - In Mailchimp, go to Audience → Signup forms
   - Select "Embedded forms"
   - Choose "Naked" form style
   - Copy the form action URL from the code

3. **Update the Website**
   - Open `index.html`
   - Find `https://YOUR-MAILCHIMP-URL-HERE` (line ~342)
   - Replace with your Mailchimp form action URL
   - Update the hidden field name (line ~347) with your list ID

4. **Test the Integration**
   - Submit a test email on your website
   - Check your Mailchimp audience to confirm it was added

## 💬 Guestbook Setup (Disqus)

The website uses Disqus for the guestbook functionality. To set it up:

1. **Create a Disqus Account**
   - Go to [disqus.com](https://disqus.com) and sign up
   - Choose "I want to install Disqus on my site"

2. **Configure Your Site**
   - Website Name: Giants of All Sizes
   - Category: Music
   - Note your shortname (e.g., "giantsofallsizes")

3. **Update the Website**
   - Open `index.html`
   - Find `YOUR-DISQUS-SHORTNAME` (line ~407)
   - Replace with your actual Disqus shortname

4. **Styling Disqus**
   - In Disqus admin, go to Settings → General
   - Set color scheme to "Dark" to match the website
   - Customize appearance in Settings → Appearance

### Alternative: HTML Comment Box

If you prefer not to use Disqus, you can use HTML Comment Box:

1. Go to [htmlcommentbox.com](https://www.htmlcommentbox.com)
2. Configure your widget (choose dark theme)
3. Copy the provided code
4. In `index.html`, comment out the Disqus section and uncomment the HTML Comment Box section

### Local Development Note

When running locally, the guestbook will automatically fall back to a localStorage-based version for testing.

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