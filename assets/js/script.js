// Enhanced Mobile menu functionality
document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");
  const body = document.body;

  // Add keyframes for nav link animation if not already in the stylesheet
  if (!document.querySelector("#navLinkFadeKeyframes")) {
    const style = document.createElement("style");
    style.id = "navLinkFadeKeyframes";
    style.textContent = `
      @keyframes navLinkFade {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
  }

  if (burger) {
    burger.addEventListener("click", () => {
      // Toggle nav
      nav.classList.toggle("active");

      // Toggle body scroll lock
      if (nav.classList.contains("active")) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "";
      }

      // Animate links with staggered delay
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = "";
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`;
        }
      });

      // Burger animation
      burger.classList.toggle("toggle");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        nav.classList.contains("active") &&
        !nav.contains(e.target) &&
        !burger.contains(e.target)
      ) {
        nav.classList.remove("active");
        burger.classList.remove("toggle");
        body.style.overflow = "";

        navLinks.forEach((link) => {
          link.style.animation = "";
        });
      }
    });

    // Close menu when clicking on a nav link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        burger.classList.remove("toggle");
        body.style.overflow = "";

        navLinks.forEach((link) => {
          link.style.animation = "";
        });
      });
    });
  }
});

// Colorlib-style Carousel functionality
document.addEventListener("DOMContentLoaded", function () {
  const carouselItems = document.querySelectorAll(".carousel-item");
  const prevBtn = document.querySelector(".carousel-control-prev");
  const nextBtn = document.querySelector(".carousel-control-next");
  const indicators = document.querySelectorAll(".carousel-indicators li");
  let currentSlide = 0;
  let isAnimating = false;
  let autoSlideInterval;

  // Function to show a specific slide
  function showSlide(index) {
    if (isAnimating) return;
    isAnimating = true;

    // Hide current slide
    carouselItems[currentSlide].classList.remove("active");
    indicators[currentSlide].classList.remove("active");

    // Update current slide index
    currentSlide = index;

    // Show new slide
    carouselItems[currentSlide].classList.add("active");
    indicators[currentSlide].classList.add("active");

    // Reset animation flag after transition completes
    setTimeout(() => {
      isAnimating = false;
    }, 1000); // Match this with the CSS transition duration
  }

  // Function to show next slide
  function nextSlide() {
    const newIndex = (currentSlide + 1) % carouselItems.length;
    showSlide(newIndex);
  }

  // Function to show previous slide
  function prevSlide() {
    const newIndex =
      (currentSlide - 1 + carouselItems.length) % carouselItems.length;
    showSlide(newIndex);
  }

  // Add event listeners for carousel controls
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      clearInterval(autoSlideInterval);
      prevSlide();
      startAutoSlide();
    });

    nextBtn.addEventListener("click", () => {
      clearInterval(autoSlideInterval);
      nextSlide();
      startAutoSlide();
    });
  }

  // Add event listeners for indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      if (currentSlide === index || isAnimating) return;
      clearInterval(autoSlideInterval);
      showSlide(index);
      startAutoSlide();
    });
  });

  // Function to start auto-sliding
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 7000);
  }

  // Initialize carousel
  if (carouselItems.length > 0) {
    // Make sure first slide is active
    carouselItems[0].classList.add("active");
    indicators[0].classList.add("active");

    // Start auto-sliding
    startAutoSlide();
  }
});

// Form validation
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    // Don't prevent default form submission - let Formspree handle it
    // But still do client-side validation

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Reset previous error messages
    document.querySelectorAll(".error-message").forEach((el) => {
      el.style.display = "none";
    });

    let isValid = true;

    // Validate name
    if (!name.trim()) {
      showError("name", "Name is required");
      isValid = false;
    }

    // Validate email
    if (!email.trim()) {
      showError("email", "Email is required");
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError("email", "Please enter a valid email address");
      isValid = false;
    }

    // Validate subject
    if (!subject.trim()) {
      showError("subject", "Subject is required");
      isValid = false;
    }

    // Validate message
    if (!message.trim()) {
      showError("message", "Message is required");
      isValid = false;
    }

    // If validation fails, prevent form submission
    if (!isValid) {
      e.preventDefault();
    }

    // If valid, Formspree will handle the submission and redirect
  });
}

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorElement = field.nextElementSibling;
  if (errorElement && errorElement.classList.contains("error-message")) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Enhanced Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  const logo = document.querySelector(".logo h1");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (window.scrollY > 50) {
    // Add scrolled class for styling
    navbar.classList.add("scrolled");

    // Apply styles for scrolled state
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";

    // Smooth transition for logo size
    logo.style.fontSize = "1.5rem";

    // Adjust nav links for compact header
    navLinks.forEach((link) => {
      link.style.fontSize = "0.95rem";
      link.style.padding = "0.4rem 0";
    });
  } else {
    // Remove scrolled class
    navbar.classList.remove("scrolled");

    // Revert to original styles
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.1)";

    // Reset logo size
    logo.style.fontSize = "1.8rem";

    // Reset nav links
    navLinks.forEach((link) => {
      link.style.fontSize = "1rem";
      link.style.padding = "0.5rem 0";
    });
  }
});

// Sample blog posts data (in a real application, this would come from a server)
const blogPosts = [
  {
    title: "Exploring the Hidden Beaches of Bali",
    date: "March 15, 2024",
    author: "Travel Explorer",
    excerpt:
      "Discover secluded paradise beaches in Bali that most tourists never find...",
    image: "assets/images/hiddenbeachesofbali.jpg",
  },
  {
    title: "A Food Lover's Guide to Tokyo",
    date: "March 14, 2024",
    author: "Culinary Wanderer",
    excerpt:
      "From street food to Michelin stars, explore Tokyo's incredible culinary scene...",
    image: "assets/images/tokyofood.jpg",
  },
  {
    title: "Safari Adventures: Kenya's Maasai Mara",
    date: "March 13, 2024",
    author: "Wildlife Photographer",
    excerpt:
      "Experience the thrill of witnessing the Big Five and the Great Migration in Kenya's most famous reserve...",
    image: "assets/images/safari.jpg",
  },
];

// Function to create blog post cards
function createBlogPost(post) {
  return `
        <article class="post-card">
            <img src="${post.image}" alt="${post.title}">
            <div class="post-content">
                <h3>${post.title}</h3>
                <p class="post-meta">Posted on <span class="date">${post.date}</span> by <span class="author">${post.author}</span></p>
                <p class="post-excerpt">${post.excerpt}</p>
                <a href="#" class="read-more">Read More</a>
            </div>
        </article>
    `;
}

// Function to load blog posts
function loadBlogPosts() {
  const postsGrid = document.querySelector(".posts-grid");
  if (postsGrid) {
    // Clear existing posts
    postsGrid.innerHTML = "";
    // Add new posts
    blogPosts.forEach((post) => {
      postsGrid.innerHTML += createBlogPost(post);
    });
  }
}

// Load blog posts when the page loads
document.addEventListener("DOMContentLoaded", loadBlogPosts);

// Destinations Page Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Continent text rotation
  const continentSpans = document.querySelectorAll(".continent-text span");
  if (continentSpans.length > 0) {
    let currentIndex = 0;

    function rotateContinent() {
      // Remove active class from current continent
      continentSpans[currentIndex].classList.remove("active");

      // Move to next continent
      currentIndex = (currentIndex + 1) % continentSpans.length;

      // Add active class to new continent
      continentSpans[currentIndex].classList.add("active");

      // Schedule next rotation
      setTimeout(rotateContinent, 3000);
    }

    // Start rotation after 3 seconds
    setTimeout(rotateContinent, 3000);
  }

  // Filter functionality
  const filterButtons = document.querySelectorAll(".filter-btn");
  const destinationCards = document.querySelectorAll(".destination-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      destinationCards.forEach((card) => {
        if (
          filterValue === "all" ||
          card.getAttribute("data-category") === filterValue
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Travel Tips Page Category Filter Functionality
  const categoryButtons = document.querySelectorAll(".category-btn");
  const tipSections = document.querySelectorAll(".tip-section");
  const sidebarNavLinks = document.querySelectorAll(".sidebar-nav a");

  // Function to filter tips by category
  function filterTipsByCategory(categoryValue) {
    // Update active state on category buttons
    categoryButtons.forEach((btn) => {
      if (
        btn.getAttribute("data-category") === categoryValue ||
        (categoryValue === "all" && btn.getAttribute("data-category") === "all")
      ) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Update active state on sidebar links
    sidebarNavLinks.forEach((link) => {
      if (
        link.getAttribute("data-category") === categoryValue ||
        (categoryValue === "all" &&
          link.getAttribute("data-category") === "all")
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Show/hide tip sections based on category
    tipSections.forEach((section) => {
      if (
        categoryValue === "all" ||
        section.getAttribute("data-category") === categoryValue
      ) {
        section.style.display = "block";
      } else {
        section.style.display = "none";
      }
    });
  }

  // Add event listeners to category buttons
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const categoryValue = button.getAttribute("data-category");
      filterTipsByCategory(categoryValue);
    });
  });

  // Add event listeners to sidebar navigation links
  sidebarNavLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const categoryValue = link.getAttribute("data-category");
      filterTipsByCategory(categoryValue);

      // Scroll to the top of the tips content
      document
        .querySelector(".travel-tips-content")
        .scrollIntoView({ behavior: "smooth" });
    });
  });

  // Modal functionality
  const modal = document.getElementById("destinationModal");
  const closeModal = document.querySelector(".close-modal");
  const readMoreButtons = document.querySelectorAll(".read-more-btn");

  // Sample destination data (in a real application, this would come from a database)
  const destinationData = {
    bali: {
      title: "Bali, Indonesia",
      images: [
        "https://source.unsplash.com/800x600/?bali-beach",
        "https://source.unsplash.com/800x600/?bali-temple",
        "https://source.unsplash.com/800x600/?bali-rice-terrace",
      ],
      description: `
                <h2>Bali - The Island of the Gods</h2>
                <p>Bali is a beautiful Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches, and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple.</p>

                <h3>Best Time to Visit</h3>
                <p>The best time to visit Bali is during the dry season, from April to October. The weather is perfect for beach activities and exploring the island.</p>

                <h3>Top Attractions</h3>
                <ul>
                    <li>Ubud Monkey Forest</li>
                    <li>Tegallalang Rice Terraces</li>
                    <li>Uluwatu Temple</li>
                    <li>Seminyak Beach</li>
                    <li>Sacred Monkey Forest Sanctuary</li>
                </ul>

                <h3>Local Culture</h3>
                <p>Bali is known for its unique Hindu culture, which is different from the rest of Indonesia. The island is famous for its traditional dance performances, intricate temple ceremonies, and vibrant festivals.</p>
            `,
    },
    kyoto: {
      title: "Kyoto, Japan",
      images: [
        "https://source.unsplash.com/800x600/?kyoto-temple",
        "https://source.unsplash.com/800x600/?kyoto-garden",
        "https://source.unsplash.com/800x600/?kyoto-street",
      ],
      description: `
                <h2>Kyoto - Japan's Cultural Heart</h2>
                <p>Kyoto is Japan's former capital and one of the country's most beautiful cities. It's known for its numerous classical Buddhist temples, gardens, imperial palaces, Shinto shrines, and traditional wooden houses.</p>

                <h3>Best Time to Visit</h3>
                <p>The best times to visit Kyoto are during spring (March-May) for cherry blossoms and autumn (October-November) for fall colors.</p>

                <h3>Top Attractions</h3>
                <ul>
                    <li>Fushimi Inari Shrine</li>
                    <li>Kinkaku-ji (Golden Pavilion)</li>
                    <li>Arashiyama Bamboo Grove</li>
                    <li>Gion District</li>
                    <li>Kiyomizu-dera Temple</li>
                </ul>

                <h3>Local Culture</h3>
                <p>Kyoto is the center of traditional Japanese culture, including tea ceremonies, geisha performances, and traditional crafts like pottery and textiles.</p>
            `,
    },
    santorini: {
      title: "Santorini, Greece",
      images: [
        "https://source.unsplash.com/800x600/?santorini-sunset",
        "https://source.unsplash.com/800x600/?santorini-streets",
        "https://source.unsplash.com/800x600/?santorini-beach",
      ],
      description: `
                <h2>Santorini - The Crown Jewel of the Aegean</h2>
                <p>Santorini is one of the Cyclades islands in the southern Aegean Sea. It's known for its stunning white-washed buildings, blue-domed churches, and dramatic views of the caldera.</p>

                <h3>Best Time to Visit</h3>
                <p>The best time to visit Santorini is from May to October, when the weather is warm and perfect for beach activities and exploring the island.</p>

                <h3>Top Attractions</h3>
                <ul>
                    <li>Oia Village</li>
                    <li>Fira Town</li>
                    <li>Red Beach</li>
                    <li>Ancient Thera</li>
                    <li>Akrotiri Archaeological Site</li>
                </ul>

                <h3>Local Culture</h3>
                <p>Santorini is famous for its wine production, particularly the sweet Vinsanto wine. The island also has a rich history dating back to the Minoan civilization.</p>
            `,
    },
    "maasai-mara": {
      title: "Maasai Mara, Kenya",
      images: [
        "https://source.unsplash.com/800x600/?maasai-mara-safari",
        "https://source.unsplash.com/800x600/?maasai-mara-wildlife",
        "https://source.unsplash.com/800x600/?maasai-mara-landscape",
      ],
      description: `
        <h2>Maasai Mara - Kenya's Wildlife Paradise</h2>
        <p>The Maasai Mara is one of Africa's most famous wildlife reserves, known for its exceptional population of lions, leopards, cheetahs, and the annual wildebeest migration.</p>

        <h3>Best Time to Visit</h3>
        <p>The best time to visit is during the dry season (July to October) when the wildebeest migration occurs and wildlife viewing is at its peak.</p>

        <h3>Top Attractions</h3>
        <ul>
            <li>Wildebeest Migration</li>
            <li>Big Five Safari</li>
            <li>Maasai Village Visits</li>
            <li>Hot Air Balloon Safaris</li>
            <li>Bird Watching</li>
        </ul>

        <h3>Local Culture</h3>
        <p>The Maasai people are known for their distinctive customs, dress, and warrior traditions. Visitors can experience their rich cultural heritage through village visits and cultural performances.</p>
      `,
    },
    "diani-beach": {
      title: "Diani Beach, Kenya",
      images: [
        "https://source.unsplash.com/800x600/?diani-beach-kenya",
        "https://source.unsplash.com/800x600/?diani-beach-sunset",
        "https://source.unsplash.com/800x600/?diani-beach-water",
      ],
      description: `
        <h2>Diani Beach - Kenya's Tropical Paradise</h2>
        <p>Diani Beach is a stunning coastal destination known for its pristine white sand beaches, crystal clear waters, and vibrant coral reefs.</p>

        <h3>Best Time to Visit</h3>
        <p>The best time to visit is during the dry seasons: January to March and June to October, when the weather is perfect for beach activities.</p>

        <h3>Top Attractions</h3>
        <ul>
            <li>Snorkeling and Diving</li>
            <li>Colobus Monkey Conservation</li>
            <li>Shimba Hills National Reserve</li>
            <li>Kisite Marine Park</li>
            <li>Water Sports Activities</li>
        </ul>

        <h3>Local Culture</h3>
        <p>The coastal region is rich in Swahili culture, offering visitors a chance to experience traditional music, dance, and cuisine.</p>
      `,
    },
    capetown: {
      title: "Cape Town, South Africa",
      images: [
        "https://source.unsplash.com/800x600/?capetown-table-mountain",
        "https://source.unsplash.com/800x600/?capetown-beach",
        "https://source.unsplash.com/800x600/?capetown-city",
      ],
      description: `
        <h2>Cape Town - The Mother City</h2>
        <p>Cape Town is a vibrant city that offers a perfect blend of natural beauty, cultural diversity, and modern urban life.</p>

        <h3>Best Time to Visit</h3>
        <p>The best times to visit are during spring (March to May) and autumn (September to November) when the weather is mild and pleasant.</p>

        <h3>Top Attractions</h3>
        <ul>
            <li>Table Mountain</li>
            <li>Robben Island</li>
            <li>Cape of Good Hope</li>
            <li>V&A Waterfront</li>
            <li>Kirstenbosch Botanical Gardens</li>
        </ul>

        <h3>Local Culture</h3>
        <p>Cape Town is a melting pot of cultures, offering a rich blend of African, European, and Asian influences in its food, music, and traditions.</p>
      `,
    },
    egypt: {
      title: "Egypt",
      images: [
        "https://source.unsplash.com/800x600/?egypt-pyramids",
        "https://source.unsplash.com/800x600/?egypt-nile",
        "https://source.unsplash.com/800x600/?egypt-temple",
      ],
      description: `
        <h2>Egypt - Land of the Pharaohs</h2>
        <p>Egypt is home to some of the world's most iconic ancient monuments and a rich cultural heritage that spans thousands of years.</p>

        <h3>Best Time to Visit</h3>
        <p>The best time to visit is during the cooler months from October to April, when temperatures are more comfortable for exploring.</p>

        <h3>Top Attractions</h3>
        <ul>
            <li>Pyramids of Giza</li>
            <li>Valley of the Kings</li>
            <li>Nile River Cruise</li>
            <li>Egyptian Museum</li>
            <li>Abu Simbel Temples</li>
        </ul>

        <h3>Local Culture</h3>
        <p>Egypt's culture is a fascinating blend of ancient traditions and modern influences, with a rich history of art, architecture, and religious practices.</p>
      `,
    },
    sydney: {
      title: "Sydney, Australia",
      images: [
        "https://source.unsplash.com/800x600/?sydney-opera-house",
        "https://source.unsplash.com/800x600/?sydney-harbour",
        "https://source.unsplash.com/800x600/?sydney-beach",
      ],
      description: `
        <h2>Sydney - Australia's Harbor City</h2>
        <p>Sydney is Australia's largest and most iconic city, known for its stunning harbor, beautiful beaches, and vibrant cultural scene.</p>

        <h3>Best Time to Visit</h3>
        <p>The best times to visit are during spring (September to November) and autumn (March to May) when the weather is mild and pleasant.</p>

        <h3>Top Attractions</h3>
        <ul>
            <li>Sydney Opera House</li>
            <li>Bondi Beach</li>
            <li>Sydney Harbour Bridge</li>
            <li>Royal Botanic Garden</li>
            <li>The Rocks District</li>
        </ul>

        <h3>Local Culture</h3>
        <p>Sydney offers a diverse cultural experience with its mix of indigenous heritage, colonial history, and modern multicultural society.</p>
      `,
    },
    queenstown: {
      title: "Queenstown, New Zealand",
      images: [
        "https://source.unsplash.com/800x600/?queenstown-mountains",
        "https://source.unsplash.com/800x600/?queenstown-lake",
        "https://source.unsplash.com/800x600/?queenstown-adventure",
      ],
      description: `
        <h2>Queenstown - Adventure Capital of the World</h2>
        <p>Queenstown is New Zealand's premier adventure destination, surrounded by stunning alpine landscapes and offering thrilling activities.</p>

        <h3>Best Time to Visit</h3>
        <p>The best time to visit is during summer (December to February) for outdoor activities, or winter (June to August) for skiing and snowboarding.</p>

        <h3>Top Attractions</h3>
        <ul>
            <li>Bungee Jumping</li>
            <li>Skiing and Snowboarding</li>
            <li>Milford Sound</li>
            <li>Wine Tasting Tours</li>
            <li>Hiking Trails</li>
        </ul>

        <h3>Local Culture</h3>
        <p>Queenstown combines Maori heritage with a vibrant adventure tourism culture, offering unique experiences and warm hospitality.</p>
      `,
    },
    rio: {
      title: "Rio de Janeiro, Brazil",
      images: [
        "https://source.unsplash.com/800x600/?rio-christ-redeemer",
        "https://source.unsplash.com/800x600/?rio-copacabana",
        "https://source.unsplash.com/800x600/?rio-carnival",
      ],
      description: `
        <h2>Rio de Janeiro - The Marvelous City</h2>
        <p>Rio de Janeiro is a vibrant city known for its stunning beaches, iconic landmarks, and lively cultural scene.</p>

        <h3>Best Time to Visit</h3>
        <p>The best time to visit is during summer (December to March), especially during Carnival season, when the city comes alive with celebrations.</p>

        <h3>Top Attractions</h3>
        <ul>
            <li>Christ the Redeemer</li>
            <li>Copacabana Beach</li>
            <li>Sugarloaf Mountain</li>
            <li>Carnival Celebrations</li>
            <li>Tijuca Forest</li>
        </ul>

        <h3>Local Culture</h3>
        <p>Rio's culture is a vibrant mix of Portuguese, African, and indigenous influences, expressed through music, dance, and festivals.</p>
      `,
    },
    "machu-picchu": {
      title: "Machu Picchu, Peru",
      images: [
        "https://source.unsplash.com/800x600/?machu-picchu-ruins",
        "https://source.unsplash.com/800x600/?machu-picchu-mountains",
        "https://source.unsplash.com/800x600/?machu-picchu-temple",
      ],
      description: `
        <h2>Machu Picchu - Lost City of the Incas</h2>
        <p>Machu Picchu is an ancient Incan citadel set high in the Andes Mountains, offering breathtaking views and rich historical significance.</p>

        <h3>Best Time to Visit</h3>
        <p>The best time to visit is during the dry season (May to September) when the weather is clear and hiking conditions are optimal.</p>

        <h3>Top Attractions</h3>
        <ul>
            <li>Inca Trail</li>
            <li>Sun Gate</li>
            <li>Temple of the Sun</li>
            <li>Intihuatana Stone</li>
            <li>Sacred Plaza</li>
        </ul>

        <h3>Local Culture</h3>
        <p>The site preserves the remarkable engineering and architectural achievements of the Inca civilization, offering insights into their sophisticated culture.</p>
      `,
    },
  };

  // Image slider functionality
  let currentImageIndex = 0;
  let imageSliderInterval;

  function createImageSlider(images) {
    const sliderHTML = `
            <div class="image-slider">
                <div class="slider-container">
                    <img src="${
                      images[0]
                    }" alt="Destination image" class="active">
                </div>
                <div class="slider-controls">
                    <button class="prev-btn"><i class="fas fa-chevron-left"></i></button>
                    <button class="next-btn"><i class="fas fa-chevron-right"></i></button>
                </div>
                <div class="slider-dots">
                    ${images
                      .map(
                        (_, index) => `
                        <span class="dot ${
                          index === 0 ? "active" : ""
                        }" data-index="${index}"></span>
                    `
                      )
                      .join("")}
                </div>
            </div>
        `;
    return sliderHTML;
  }

  function updateSlider(images, index) {
    const sliderContainer = document.querySelector(".slider-container");
    const dots = document.querySelectorAll(".dot");

    // Update image
    sliderContainer.innerHTML = `<img src="${images[index]}" alt="Destination image" class="active">`;

    // Update dots
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  readMoreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const destinationId = button.getAttribute("data-destination");
      const destination = destinationData[destinationId];

      if (destination) {
        const modalBody = document.querySelector(".modal-body");
        modalBody.innerHTML = `
                    ${createImageSlider(destination.images)}
                    <div class="destination-details-content">
                        ${destination.description}
                    </div>
                `;

        // Set up slider controls
        const prevBtn = modalBody.querySelector(".prev-btn");
        const nextBtn = modalBody.querySelector(".next-btn");
        const dots = modalBody.querySelectorAll(".dot");

        currentImageIndex = 0;

        function showNextImage() {
          currentImageIndex =
            (currentImageIndex + 1) % destination.images.length;
          updateSlider(destination.images, currentImageIndex);
        }

        function showPrevImage() {
          currentImageIndex =
            (currentImageIndex - 1 + destination.images.length) %
            destination.images.length;
          updateSlider(destination.images, currentImageIndex);
        }

        prevBtn.addEventListener("click", () => {
          clearInterval(imageSliderInterval);
          showPrevImage();
          startImageSlider();
        });

        nextBtn.addEventListener("click", () => {
          clearInterval(imageSliderInterval);
          showNextImage();
          startImageSlider();
        });

        dots.forEach((dot) => {
          dot.addEventListener("click", () => {
            clearInterval(imageSliderInterval);
            currentImageIndex = parseInt(dot.getAttribute("data-index"));
            updateSlider(destination.images, currentImageIndex);
            startImageSlider();
          });
        });

        function startImageSlider() {
          imageSliderInterval = setInterval(showNextImage, 5000);
        }

        startImageSlider();
        modal.style.display = "block";
      }
    });
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    clearInterval(imageSliderInterval);
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      clearInterval(imageSliderInterval);
    }
  });
});
