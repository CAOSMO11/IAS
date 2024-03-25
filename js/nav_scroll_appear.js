document.addEventListener('DOMContentLoaded', function() {
    var prevScrollpos = window.scrollY;
    var navbar = document.querySelector('.navbar-fixed');
    var scrolled = false;
    
    window.addEventListener('scroll', function() {
        var currentScrollPos = window.scrollY;
        
        // Check if the page has been scrolled a little bit
        if (currentScrollPos > 50) {
            scrolled = true;
        } else {
            scrolled = false;
        }

        // If scrolled and scrolling down, hide navbar
        if (scrolled && prevScrollpos < currentScrollPos) {
            navbar.style.transition = "top 0.5s";
            navbar.style.top = "-64px"; // Adjust this value based on your navbar height
        } 
        // If scrolled and scrolling up, show navbar
        else if (scrolled && prevScrollpos > currentScrollPos) {
            navbar.style.transition = "top 0.5s";
            navbar.style.top = "0";
        }
        prevScrollpos = currentScrollPos;
    });
});
