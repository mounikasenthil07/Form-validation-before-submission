Core Benefits:
Reduced User Frustration - Fix errors as you type, not after submitting
Improved Data Quality - Enforces strong passwords and valid email/phone formats
Professional UX - Smooth animations, visual feedback, no disruptive popups
Accessibility - Clear text errors for screen readers
Prevents Server Load - Catches invalid data before sending to backend

 Key Features Used in This Program
1. Real-Time Validation (onInput)
Validates fields instantly as the user types
Provides immediate visual feedback (green ✓ / red ✕)

2. Password Strength Meter
Visual progress bar with 4 segments (Weak → Strong)
5 rule-based checks: length (8+), uppercase, lowercase, number, special character
Color-coded feedback (red → orange → yellow → green)

3. Show/Hide Password Toggle
Eye icon toggles password visibility
Improves user experience during confirmation

4. Smart Field Touching
Validates on blur (after leaving field) to avoid premature errors
Shows errors only after user interaction

5. Comprehensive Validation Rules
Name: Letters, spaces, hyphens, apostrophes only (min 2 chars)
Email: Standard regex pattern with @ and domain
Phone: 7-16 digits, optional +, accepts spaces/dashes/parentheses
Password: Must meet at least 4 out of 5 security criteria
Confirm: Matches password exactly
Terms: Checkbox must be accepted

6. Visual Status Indicators
Green border + checkmark for valid fields
Red border + cross for invalid fields
Animated error messages below each field

7. Submission Guard & Shake Animation
Prevents submission if any validation fails
Shake animation on submit button to draw attention

8. Success Feedback
Temporary success banner (auto-hides after 4 seconds)
Form resets after successful submission
