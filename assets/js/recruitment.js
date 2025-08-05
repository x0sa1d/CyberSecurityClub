// Recruitment Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const recruitmentForm = document.querySelector('.recruitment-form');
    
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
                // Show success message
                showSubmissionMessage();
                
                // Here you would typically send the form data to a server
                // For now, we'll just simulate a successful submission
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
    
    function showSubmissionMessage() {
        // Create or get the message element
        let messageElement = document.getElementById('submissionMessage');
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.id = 'submissionMessage';
            messageElement.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #4caf50;
                color: white;
                padding: 15px 20px;
                border-radius: 5px;
                z-index: 1000;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                transition: all 0.3s ease;
            `;
            document.body.appendChild(messageElement);
        }
        
        messageElement.textContent = 'Application submitted successfully!';
        messageElement.style.display = 'block';
        
        // Hide after 3 seconds
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 3000);
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
