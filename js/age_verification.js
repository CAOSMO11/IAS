document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {
        opacity: 0.5,
        inDuration: 500,
        outDuration: 500,
        startingTop: '4%',
        endingTop: '10%',
        preventScrolling: true,
        dismissible: false,
        onCloseEnd: function() {
            console.log('Modal closed');
        }
    });

    var ageVerificationModal = document.getElementById('age-verification-modal');
    var mmInput = document.getElementById('mm-input');
    var ddInput = document.getElementById('dd-input');
    var yyyyInput = document.getElementById('yyyy-input');
    var submitBtn = document.getElementById('submit-btn');

    function validateYear(year) {
        return year >= 1900 && year <= new Date().getFullYear();
    }

    function validateDate(month, day, year) {
        var currentDate = new Date();
        var inputDate = new Date(year, month - 1, day);
        return (
            month >= 1 && month <= 12 &&
            day >= 1 && day <= new Date(year, month, 0).getDate() &&
            year >= 1900 && year <= currentDate.getFullYear() &&
            inputDate <= currentDate
        );
    }

    function enableSubmit() {
        var month = parseInt(mmInput.value, 10);
        var day = parseInt(ddInput.value, 10);
        var year = parseInt(yyyyInput.value, 10);
        if (mmInput.value.length === 2 && ddInput.value.length === 2 && yyyyInput.value.length === 4) {
            submitBtn.disabled = !validateYear(year) || !validateDate(month, day, year);
            if (validateYear(year) && validateDate(month, day, year)) {
                submitBtn.classList.add('pulse');
            } else {
                submitBtn.classList.remove('pulse');
            }
        } else {
            submitBtn.disabled = true;
            submitBtn.classList.remove('pulse');
        }
    }

    mmInput.addEventListener('input', function() {
        if (mmInput.value.length === 2) {
            ddInput.focus();
        }
        enableSubmit();
    });

    ddInput.addEventListener('input', function() {
        if (ddInput.value.length === 2) {
            yyyyInput.focus();
        }
        enableSubmit();
    });

    yyyyInput.addEventListener('input', function() {
        if (yyyyInput.value.length > 4) {
            // Restrict input to 4 characters
            yyyyInput.value = yyyyInput.value.slice(0, 4);
        }
        enableSubmit();
    });

    mmInput.addEventListener('keydown', function(event) {
        if (event.key === 'Backspace' && mmInput.value.length === 0) {
            event.preventDefault();
            // Focus on the previous input
            ddInput.focus();
        }
    });

    ddInput.addEventListener('keydown', function(event) {
        if (event.key === 'Backspace' && ddInput.value.length === 0) {
            event.preventDefault();
            // Focus on the previous input
            mmInput.focus();
        }
    });

    yyyyInput.addEventListener('keydown', function(event) {
        if (event.key === 'Backspace' && yyyyInput.value.length === 0) {
            event.preventDefault();
            // Focus on the previous input
            ddInput.focus();
        }
    });

    submitBtn.addEventListener('click', function() {
        var dob = new Date(yyyyInput.value, mmInput.value - 1, ddInput.value);
        var today = new Date();
        var age = today.getFullYear() - dob.getFullYear();
        var monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        if (age >= 21) {
            // User is old enough, close the modal
            var modalInstance = M.Modal.getInstance(ageVerificationModal);
            modalInstance.close();

            // Set the flag indicating that the modal has been shown
            localStorage.setItem('modalShown', true);
        } else {
            // User is not old enough, redirect to NIH website
            window.location.href = 'https://www.niaaa.nih.gov/publications/brochures-and-fact-sheets/underage-drinking';
        }
    });

    // Allow pressing Enter to submit the form
    mmInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            submitBtn.click();
        }
    });
    ddInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            submitBtn.click();
        }
    });
    yyyyInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            submitBtn.click();
        }
    });

    // Check if the modal has been shown before
    var modalShown = localStorage.getItem('modalShown');
    if (!modalShown) {
        // Show the modal if it hasn't been shown before
        var modalInstance = M.Modal.getInstance(ageVerificationModal);
        modalInstance.open();
    }
});
