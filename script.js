// Wait for the DOMContentLoaded event before executing the JavaScript code
document.addEventListener("DOMContentLoaded", function() {
  // Get all the menu links
  const menuLinks = document.querySelectorAll('.nav-links a');

  // Attach click event listeners to each menu link
  menuLinks.forEach(link => {
    link.addEventListener("click", scrollToSection);
  });

  // Add scroll event listener to the window
  window.addEventListener("scroll", highlightCurrentSection);

  // Smooth scroll to the target section
  function scrollToSection(event) {
    event.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    const targetPosition = targetSection.offsetTop;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });

    // Close the mobile menu if open
    const checkboxToggle = document.getElementById("checkbox_toggle");
    checkboxToggle.checked = false;
  }

  // Highlight the current section in the menu
  function highlightCurrentSection() {
    const sections = document.querySelectorAll("section");
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

      if (section.offsetTop <= scrollPosition + 100 && section.offsetTop + section.offsetHeight > scrollPosition + 100) {
        navLink.classList.add("active");
      } else {
        navLink.classList.remove("active");
      }
    });
  }

  // Back to top button functionality
  let mybutton = document.getElementById("myBtn");
  mybutton.addEventListener("click", scrollToTop);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  // Show or hide the back to top button based on the scroll position
  window.addEventListener("scroll", toggleBackToTopButton);

  function toggleBackToTopButton() {
    if (window.scrollY > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }
});
