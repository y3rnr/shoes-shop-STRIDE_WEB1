# STRIDE Shoes Shop - Assignment 5

## Team Members
- Yernur - Contact Form, Bootstrap integration.
- Abylai - Registration Form, CSS Grid.
- Ramazan - JavaScript Passwords Validation, Documentation.

## Website Topic
STRIDE - E-commerce store for urban and off-road shoes. 

## Form Validation Testing Results

| Test Case | Expected Result | Actual Result |
| :--- | :--- | :--- |
| **Empty required fields** | Form submission prevented, Bootstrap invalid feedback shown (red border). | Passed |
| **Invalid Email** | Submission prevented, "Please enter a valid email" tooltip shown. | Passed |
| **Short Message (<10 chars)** | Prevented, length validation error tooltip shown. | Passed |
| **Password < 8 chars** | Prevented, native HTML5 & Bootstrap minlength error displayed. | Passed |
| **Passwords do not match** | JS script sets CustomValidity, prevents submission, shows mismatch error. | Passed |
| **No country selected** | Prevented, select field shows invalid state. | Passed |
| **All values valid** | Form gets `.was-validated` class, green success alert displayed. | Passed |
| **Reset Form** | Clicking "Reset" clears all inputs, removes errors, hides success message. | Passed |
| **Mobile Layout** | Grid layout collapses to 1 column, inputs take 100% width, fully responsive. | Passed |
