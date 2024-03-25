<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve the submitted date of birth
    $dob_month = $_POST["mm-input"];
    $dob_day = $_POST["dd-input"];
    $dob_year = $_POST["yyyy-input"];

    // Validate the date of birth
    $dob = mktime(0, 0, 0, $dob_month, $dob_day, $dob_year);
    $min_dob = strtotime("-21 years");
    $max_dob = strtotime("now");

    if ($dob >= $min_dob && $dob <= $max_dob) {
        // User is of legal drinking age, redirect to the homepage
        header("Location: /IAS/home.html"); // Adjust the URL as needed
        exit;
    } else {
        // User is not of legal drinking age, redirect to NIH website
        header("Location: https://www.niaaa.nih.gov/publications/brochures-and-fact-sheets/underage-drinking");
        exit;
    }
} else {
    // Redirect to homepage if accessed directly without form submission
    header("Location: /IAS/home.html"); // Adjust the URL as needed
    exit;
}
?>