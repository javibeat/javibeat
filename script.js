// Wait for the DOMContentLoaded event before executing the JavaScript code
document.addEventListener("DOMContentLoaded", function() {
    // Get the button
    let mybutton = document.getElementById("myBtn");
  
    // Add scroll event listener to the window
    window.addEventListener("scroll", scrollFunction);
  
    function scrollFunction() {
      if (window.scrollY > 20) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }
  
    // Add click event listener to the button
    mybutton.addEventListener("click", topFunction);
  
    function topFunction() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  });  
