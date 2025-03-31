# Game Designer Portfolio

A professional, interactive web portfolio designed for game designers seeking entry-level positions at top-tier game studios.

## Features

- Modern, responsive design optimized for all devices
- Interactive 3D particle background using Three.js
- Smooth animations and transitions with GSAP
- Custom cursor effects for enhanced interactivity
- Comprehensive sections for showcasing skills and projects
- Contact form for potential employers to reach out
- Clean, professional aesthetic that appeals to the game industry

## Getting Started

### Prerequisites

- Node.js and npm installed on your system

### Installation

1. Clone or download this repository
2. Navigate to the project directory in your terminal
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Your portfolio will be available at `http://localhost:5173`

## Customization

### Personal Information

1. Edit `index.html` to update:
   - Your name and title
   - About me section
   - Education and location details
   - Skills and expertise
   - Project details
   - Contact information

### Style Customization

1. The main styling is in `src/scss/main.scss`:
   - Update the color variables at the top of the file to change the color scheme
   - Modify font families and sizes as needed
   - Adjust spacing and layout properties

### Adding Projects

1. In the projects section of `index.html`, duplicate the project card structure:

```html
<div class="project-card">
    <div class="project-image">
        <!-- Add your project image here -->
        <div class="image-placeholder">Project Image</div>
    </div>
    <div class="project-info">
        <h3>Project Title</h3>
        <p>Project description goes here.</p>
        <div class="project-tags">
            <span>Skill 1</span>
            <span>Skill 2</span>
            <span>Skill 3</span>
        </div>
        <div class="project-links">
            <a href="#" class="btn small">View Details</a>
            <a href="#" class="link-icon">Github</a>
            <a href="#" class="link-icon">Demo</a>
        </div>
    </div>
</div>
```

### Adding Images

1. Create an `images` folder in the `src` directory
2. Add your personal photo, project screenshots, and any other images
3. Update the HTML to reference your images:

```html
<img src="src/images/your-photo.jpg" alt="Your Name">
```

## Building for Production

When you're ready to deploy your portfolio:

```bash
npm run build
```

This will create a `dist` folder with optimized files ready for deployment to any web hosting service.

## Deployment Recommendations

- **GitHub Pages**: Free and easy to set up for personal portfolios
- **Netlify**: Offers free hosting with easy deployment from Git
- **Vercel**: Great for front-end applications with automatic deployments

## Tips for a Successful Game Design Portfolio

1. **Quality over Quantity**: Showcase your best 3-5 projects rather than many mediocre ones
2. **Show Your Process**: Include design documents, sketches, and iterations
3. **Demonstrate Problem-Solving**: Explain the challenges you faced and how you overcame them
4. **Include Playable Demos**: If possible, provide links to playable versions of your games
5. **Keep It Updated**: Regularly add new projects and remove outdated ones
6. **Tailor to Target Studios**: Research the studios you're applying to and highlight relevant skills

## License

This project is licensed under the MIT License - see the LICENSE file for details. 