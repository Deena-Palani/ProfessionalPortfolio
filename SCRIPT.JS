// Loading Screen
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
      // Initialize animations after loading
      initAnimations();
    }, 500);
  }, 2000);
});

// Initialize all animations
function initAnimations() {
  animateCounters();
  animateSkills();
  setupScrollAnimations();
  setupNavigation();
  setupContactForm();
  setupMobileMenu();
  setupThemeToggle();
}

// Animated Counters
function animateCounters() {
  const counters = document.querySelectorAll(".stat-value");
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-count");
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current) + "+";
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target + "+";
      }
    };

    // Start animation when element is in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(counter);
  });
}

// Animate skill bars
function animateSkills() {
  const skillBars = document.querySelectorAll(".skill-level");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const level = entry.target.getAttribute("data-level");
          entry.target.style.width = level + "%";
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    },
  );

  skillBars.forEach((bar) => observer.observe(bar));
}

// Scroll animations for sections
function setupScrollAnimations() {
  const sections = document.querySelectorAll(".section");

  // Add hidden class to all sections except hero
  sections.forEach((section, index) => {
    if (index > 0) {
      section.classList.add("hidden");
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  sections.forEach((section) => observer.observe(section));
}

// Navigation highlighting and smooth scroll
function setupNavigation() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNav() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  }

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });

        // Close mobile menu if open
        document.querySelector(".nav-menu").classList.remove("active");
        document.querySelector(".hamburger").classList.remove("active");
      }
    });
  });

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav(); // Initialize on load
}

// Contact form submission
function setupContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
      };

      // In a real implementation, you would send this data to a server
      // For now, we'll just show an alert and log to console
      console.log("Form submitted:", formData);

      // Show success message
      alert(
        "Thank you for your message, " +
          formData.name +
          "! I'll get back to you within 24 hours.",
      );

      // Reset form
      this.reset();

      // Optional: Send form data to a server
      // fetch('/api/contact', {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(formData)
      // })
      // .then(response => response.json())
      // .then(data => {
      //     alert('Message sent successfully!');
      //     contactForm.reset();
      // })
      // .catch(error => {
      //     console.error('Error:', error);
      //     alert('There was an error sending your message. Please try again.');
      // });
    });
  }
}

// Mobile menu toggle
function setupMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const hamburger = document.querySelector(".hamburger");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
      }
    });
  }
}

// Theme toggle (dark/light mode)
function setupThemeToggle() {
  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = document.querySelector(".theme-toggle i");

  // Check for saved theme preference or default to dark
  const savedTheme = localStorage.getItem("theme") || "dark";
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    themeIcon.className = "fas fa-sun";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    // Update icon
    if (document.body.classList.contains("light-theme")) {
      themeIcon.className = "fas fa-sun";
      localStorage.setItem("theme", "light");
    } else {
      themeIcon.className = "fas fa-moon";
      localStorage.setItem("theme", "dark");
    }
  });
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add any initialization that doesn't depend on the loading screen
  console.log("Portfolio loaded successfully!");

  // Set current year in footer (optional)
  const yearElement = document.querySelector(".copyright");
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace("2024", currentYear);
  }
});
