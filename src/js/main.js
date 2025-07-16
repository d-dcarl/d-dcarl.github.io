import * as THREE from '/node_modules/three/build/three.module.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// DOM Elements
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const navLinks = document.querySelectorAll('.nav-link');
const burger = document.querySelector('.burger');
const nav = document.querySelector('nav');
const header = document.querySelector('header');
const sections = document.querySelectorAll('.section');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initNavigation();
    initAnimations();
    initHeroCanvas();
    initContactForm();
    initImageModal();
});

// Custom cursor
function initCursor() {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;

        // Add a slight delay to follower for smooth effect
        gsap.to(cursorFollower, {
            duration: 0.3,
            left: e.clientX,
            top: e.clientY
        });
    });

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, input, textarea');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            cursorFollower.classList.add('active');
        });

        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            cursorFollower.classList.remove('active');
        });
    });
}

// Navigation and scroll handling
function initNavigation() {
    // Mobile menu toggle
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            burger.classList.remove('active');
            nav.classList.remove('active');

            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - header.offsetHeight,
                    behavior: 'smooth'
                });

                // Update active link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        // Header background opacity based on scroll
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Update active navigation link
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const sectionId = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// GSAP animations
function initAnimations() {
    // Fade in elements when scrolled into view
    const fadeElements = document.querySelectorAll('.section-title, .about-content, .project-card, .skills-category, .contact-container');

    fadeElements.forEach(element => {
        element.classList.add('fade-in');

        ScrollTrigger.create({
            trigger: element,
            start: 'top 80%',
            onEnter: () => element.classList.add('active'),
            once: true
        });
    });

    // Hero section animation
    gsap.from('.hero-content h1', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.2
    });

    gsap.from('.hero-content h2', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.4
    });

    gsap.from('.hero-content p', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.6
    });

    gsap.from('.cta-buttons', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.8
    });
}

// Three.js canvas in hero section
function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');

    if (!canvas) return;

    // Create scene
    const scene = new THREE.Scene();

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;

    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Materials
    const material = new THREE.PointsMaterial({
        size: 0.02,
        color: '#971132'
    });

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);

    // Animate
    const animate = () => {
        requestAnimationFrame(animate);

        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;

        renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        // Update camera
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        // Update renderer
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        gsap.to(particlesMesh.rotation, {
            x: mouseY * 0.3,
            y: mouseX * 0.3,
            duration: 2
        });
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }

            // In a real application, you would send this data to a server
            console.log('Form submitted:', { name, email, subject, message });

            // Show success message (in a real app, this would happen after successful submission)
            alert('Thank you for your message! I will get back to you soon.');

            // Reset form
            contactForm.reset();
        });
    }
}

// Image Modal Gallery
function initImageModal() {
    // Elements
    const modal = document.getElementById('imageModal');
    if (!modal) return; // Exit if modal doesn't exist

    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.querySelector('.modal-caption');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    const galleryImages = document.querySelectorAll('.gallery-image');

    // Gallery data
    let images = [];
    let currentIndex = 0;

    // Collect image data
    galleryImages.forEach(item => {
        const hiddenImg = item.querySelector('.hidden-image');
        if (hiddenImg) {
            images.push({
                src: hiddenImg.getAttribute('src'),
                alt: hiddenImg.getAttribute('alt')
            });
        }
    });

    // Remove duplicates
    images = Array.from(new Set(images.map(img => JSON.stringify(img))))
        .map(img => JSON.parse(img));

    // Open modal
    galleryImages.forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.getAttribute('data-index')) || 0;
            openModal(index);
        });
    });

    // Close modal
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Navigation
    prevBtn.addEventListener('click', () => {
        updateImage(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        updateImage(currentIndex + 1);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;

        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') updateImage(currentIndex - 1);
        if (e.key === 'ArrowRight') updateImage(currentIndex + 1);
    });

    // Functions
    function openModal(index) {
        currentIndex = index;
        updateImage(currentIndex);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Enable scrolling
    }

    function updateImage(index) {
        // Handle circular navigation
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;

        currentIndex = index;

        // Update image and caption
        if (images[index]) {
            modalImage.src = images[index].src;
            modalImage.alt = images[index].alt;
            modalCaption.textContent = images[index].alt;
        }
    }
} 