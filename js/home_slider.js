document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.slider');
    var options = {
      indicators: false,  // Hide slide indicators
      duration: 500,      // Transition duration in milliseconds
      interval: 5000      // Autoplay interval in milliseconds
    };
    var instances = M.Slider.init(elems, options);
});
  // Or with jQuery
  
 // $(document).ready(function(){
   // $('.slider').slider({
   //   indicators: false  // Hide slide indicators
   // });
  //});
  
