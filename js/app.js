/**
 * 
 * Interactive Navigation and Section Highlighting.
 * This script programmatically builds the navigation menu,
 * scrolls to the respective section, and highlights sections 
 * when they come into view.
 * 
 * Dependencies: None
 * 
 * JS Version: ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */
const navMenu = document.getElementById('main-nav-list'); // Navigation list element
const pageSections = document.querySelectorAll('section'); // All section elements

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

/**
 * Creates the navigation items dynamically based on sections.
 * Adds them to the navbar.
 */
const generateNavMenu = () => {
    let navHTML = '';
    pageSections.forEach(section => {
        const sectionId = section.id;
        const sectionLabel = section.dataset.nav;

        navHTML += `<li><a class="nav-link" href="#${sectionId}">${sectionLabel}</a></li>`;
    });
    navMenu.innerHTML = navHTML;
};

generateNavMenu();

/**
 * Calculates the offset for each section to determine visibility.
 * 
 * @param {HTMLElement} section - The section element.
 * @returns {number} - The vertical offset of the section.
 */
const getSectionOffset = (section) => {
    return Math.floor(section.getBoundingClientRect().top);
};

/**
 * Removes the active class and styling from a section.
 * 
 * @param {HTMLElement} section - The section element.
 */
const deactivateSection = (section) => {
    section.classList.remove('active-section');
    section.style.cssText = "background-color: rgba(255,255,255,.1);";
};

/**
 * Adds the active class and styling to a section.
 * 
 * @param {boolean} condition - Whether the section should be active.
 * @param {HTMLElement} section - The section element.
 */
const activateSection = (condition, section) => {
    if (condition) {
        section.classList.add('active-section');
        section.style.cssText = "background-color: rgba(255,255,0,.3);";
    }
};

/**
 * Controls the activation of sections when in the viewport.
 */
const monitorSectionActivation = () => {
    pageSections.forEach(section => {
        const sectionOffset = getSectionOffset(section);
        const isInViewport = sectionOffset < 150 && sectionOffset >= -150;

        deactivateSection(section);
        activateSection(isInViewport, section);
    });
};

window.addEventListener('scroll', monitorSectionActivation);

/**
 * Scroll to the respective section when a nav link is clicked.
 */
const enableSmoothScrolling = () => {
    const navLinks = document.querySelectorAll('.navbar__menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').slice(1); // Remove '#' from href
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
};

enableSmoothScrolling();

/**
 * End Main Functions
 * Begin Events
 * 
 */
