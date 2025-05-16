# Modern Blog Website

A responsive and modern blog website built with HTML5, CSS3, and JavaScript.
Visit the Wanderlust Blog Page at https://wanderlust-g5x19s58p-beth-njokis-projects.vercel.app/

## Features

- Responsive design that works on all devices
- Modern and clean user interface
- Mobile-friendly navigation menu
- Blog post grid layout
- Contact form with validation
- Smooth scrolling navigation
- Social media integration
- About section
- Dynamic blog post loading

## Technologies Used

- HTML5
- CSS3 (with Flexbox and Grid)
- JavaScript (ES6+)
- Font Awesome icons

## Getting Started

1. Clone this repository or download the files
2. Open `index.html` in your web browser
3. Customize the content in the HTML file
4. Modify the styles in `styles.css` to match your preferences
5. Update the blog posts data in `script.js`

## Customization

### Changing Colors

The main colors can be modified in the `styles.css` file:

- Primary color: `#3498db`
- Secondary color: `#2c3e50`
- Background colors and other styles can be adjusted as needed

### Adding Blog Posts

To add new blog posts, modify the `blogPosts` array in `script.js`:

```javascript
const blogPosts = [
  {
    title: "Your Post Title",
    date: "Date",
    author: "Author Name",
    excerpt: "Post excerpt...",
    image: "image-url",
  },
  // Add more posts here
];
```

### Contact Form

The contact form is currently set up to show a success message. To make it functional:

1. Set up a backend server
2. Modify the form submission handler in `script.js`
3. Add your server endpoint to process the form data

## Browser Support

The website is compatible with:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues and enhancement requests!
