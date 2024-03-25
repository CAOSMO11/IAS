$(document).ready(function(){
    // Select the search icon element
    var searchIcon = $('#topnav-search-icon');
    
    // Select the search input element
    var searchInput = $('#topnav-form-input');
    
    // Select the close search icon element
    var closeSearchIcon = $('#topnav-close-search');
    
    // Function to expand the search input
    function expandSearchInput() {
        searchInput.addClass('expanded');
        closeSearchIcon.addClass('expanded');
    }
    
    // Function to collapse the search input
    function collapseSearchInput() {
        searchInput.removeClass('expanded');
        closeSearchIcon.removeClass('expanded');
    }
    
    // Function to clear the input value
    function clearInput() {
        searchInput.val('');
    }
    
    // Toggle search input expansion/collapse on search icon click
    searchIcon.click(function(event) {
        event.stopPropagation(); // Prevent event propagation to the document click handler
        if (!searchInput.hasClass('expanded')) {
            expandSearchInput();
        } else if (searchInput.val().trim() === '') {
            collapseSearchInput();
        }
    });
    
    // Collapse search input if empty and clicking outside
    $(document).click(function(event) {
        if (!searchInput.is(event.target) && searchInput.val().trim() === '') {
            collapseSearchInput();
        }
    });

    // Collapse search input if empty and scrolling
    $(document).scroll(function() {
        if (searchInput.val().trim() === '') {
            collapseSearchInput();
        }
    });
    
    // Clear input value on close icon click
    closeSearchIcon.click(function(event) {
        event.stopPropagation(); // Prevent event propagation to the document click handler
        clearInput();
    });
    
    // Expand search input on input field click
    searchInput.click(function(event) {
        event.stopPropagation(); // Prevent event propagation to the document click handler
        if (!searchInput.hasClass('expanded')) {
            expandSearchInput();
        }
    });

    // Clear input value on Enter key press
    searchInput.keypress(function(event) {
        if (event.key === 'Enter') {
            clearInput();
        }
    });
});
