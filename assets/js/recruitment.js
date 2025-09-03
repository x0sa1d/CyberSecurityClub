// Recruitment Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const recruitmentForm = document.querySelector('.recruitment-form');
    
    // Initialize Bangladesh time display
    initializeBangladeshTime();
    
    if (recruitmentForm) {
        recruitmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = recruitmentForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ff4444';
                } else {
                    field.style.borderColor = '#28a745';
                }
            });
            
            if (isValid) {
                console.log('Form submitted successfully!');
                // Reset form after successful submission
                setTimeout(() => {
                    recruitmentForm.reset();
                    resetFieldColors();
                }, 2000);
            } else {
                alert('Please fill in all required fields.');
            }
        });
        
        // Add smooth scrolling for anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    function resetFieldColors() {
        const formFields = recruitmentForm.querySelectorAll('input, select, textarea');
        formFields.forEach(field => {
            field.style.borderColor = '';
        });
    }
    
    // Add interest tag functionality
    const interestCheckboxes = document.querySelectorAll('input[name="interests[]"]');
    interestCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.closest('.checkbox-label');
            if (this.checked) {
                label.style.backgroundColor = 'rgba(0, 0, 255, 0.1)';
                label.style.borderLeft = '3px solid #0000FF';
            } else {
                label.style.backgroundColor = '';
                label.style.borderLeft = '';
            }
        });
    });
    
    // Form field focus effects
    const formInputs = document.querySelectorAll('.recruitment-form input, .recruitment-form select, .recruitment-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});

// Bangladesh Time Functions
function initializeBangladeshTime() {
    updateBangladeshTime();
    // Update time every second
    setInterval(updateBangladeshTime, 1000);
}

function updateBangladeshTime() {
    const registrationTimeField = document.getElementById('registrationTime');
    if (registrationTimeField) {
        const bangladeshTime = getBangladeshTime();
        registrationTimeField.value = bangladeshTime;
    }
}

function getBangladeshTime() {
    // Create a new Date object for current time
    const now = new Date();
    
    // Convert to Bangladesh timezone (GMT+6)
    const bangladeshTime = new Date(now.getTime() + (6 * 60 * 60 * 1000));
    
    // Format the date and time
    const options = {
        timeZone: 'Asia/Dhaka',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    
    try {
        // Use Intl.DateTimeFormat for better timezone handling
        return new Intl.DateTimeFormat('en-US', options).format(now);
    } catch (error) {
        // Fallback formatting if Intl is not supported
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const bangladeshOffset = 6; // GMT+6
        const bangladeshTime = new Date(utc + (bangladeshOffset * 3600000));
        
        const year = bangladeshTime.getFullYear();
        const month = String(bangladeshTime.getMonth() + 1).padStart(2, '0');
        const day = String(bangladeshTime.getDate()).padStart(2, '0');
        let hours = bangladeshTime.getHours();
        const minutes = String(bangladeshTime.getMinutes()).padStart(2, '0');
        const seconds = String(bangladeshTime.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; // 0 should be 12
        hours = String(hours).padStart(2, '0');
        
        return `${month}/${day}/${year}, ${hours}:${minutes}:${seconds} ${ampm}`;
    }
}

// Function to get timestamp for form submission
function getCurrentBangladeshTimestamp() {
    const now = new Date();
    const options = {
        timeZone: 'Asia/Dhaka',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    
    try {
        return new Intl.DateTimeFormat('en-CA', options).format(now).replace(',', '');
    } catch (error) {
        // Fallback
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const bangladeshTime = new Date(utc + (6 * 3600000));
        return bangladeshTime.toISOString().replace('T', ' ').substring(0, 19);
    }
}
