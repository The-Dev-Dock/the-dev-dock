# The Dev Dock Website

A modern, responsive one-page website for The Dev Dock, a platform that provides internship opportunities, training programs, and mentorship for college students.

## Features

- Modern and responsive design
- Smooth scrolling navigation
- Animated sections and elements
- Contact form with email integration
- Mobile-friendly layout
- Interactive UI elements

## Technologies Used

- HTML5
- CSS3 (with modern features like CSS Grid and Flexbox)
- JavaScript (ES6+)
- EmailJS for contact form functionality
- Font Awesome for icons
- Google Fonts (Poppins)

## Setup Instructions

1. Clone this repository to your local machine
2. Sign up for an EmailJS account at https://www.emailjs.com/
3. Create an email service and template in EmailJS
4. Update the EmailJS configuration in `script.js`:
   - Replace `YOUR_SERVICE_ID` with your EmailJS service ID
   - Replace `YOUR_TEMPLATE_ID` with your EmailJS template ID
   - Replace `YOUR_PUBLIC_KEY` with your EmailJS public key

5. Add the EmailJS SDK to your HTML file by adding this line in the `<head>` section:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   ```

6. Host the website on your preferred web hosting service

## Customization

### Colors
The website uses a modern color scheme defined in CSS variables. You can customize the colors by modifying the variables in the `:root` selector in `styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #3b82f6;
    --accent-color: #60a5fa;
    --text-color: #1f2937;
    --light-text: #6b7280;
    --background: #ffffff;
    --section-bg: #f3f4f6;
}
```

### Content
- Update the text content in `index.html`
- Modify the services and features sections to match your offerings
- Update the social media links in the footer
- Add your own images and logos

## Browser Support

The website is compatible with all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

The website is optimized for performance with:
- Minimal external dependencies
- Optimized animations
- Responsive images
- Efficient CSS and JavaScript

## Contact

For any questions or support, please contact us through the contact form on the website.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 