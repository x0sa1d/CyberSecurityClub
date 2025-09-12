// Certificate Generator JavaScript
class CertificateGenerator {
    constructor() {
        this.studentData = null;
        this.initializeElements();
        this.bindEvents();
        this.loadStudentData();
    }

    initializeElements() {
        this.studentIdInput = document.getElementById('studentId');
        this.checkIdBtn = document.getElementById('checkIdBtn');
        this.nameInputSection = document.getElementById('nameInputSection');
        this.studentNameInput = document.getElementById('studentName');
        this.generateBtn = document.getElementById('generateBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.errorMessage = document.getElementById('errorMessage');
        this.successMessage = document.getElementById('successMessage');
        this.errorText = document.getElementById('errorText');
        
        // Certificate preview elements
        this.certificatePreview = document.getElementById('certificatePreview');
        this.certificateImage = document.getElementById('certificateImage');
        
        // Character counter removed since name is read-only
        this.validatedStudent = null;
    }

    bindEvents() {
        this.checkIdBtn.addEventListener('click', () => this.handleCheckId());
        this.generateBtn.addEventListener('click', () => this.handleGenerate());
        this.downloadBtn.addEventListener('click', () => this.downloadCertificate());
        

        
        // Allow Enter key to trigger ID check or generation
        this.studentIdInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                if (this.nameInputSection.classList.contains('hidden-step')) {
                    this.handleCheckId();
                }
            }
        });

        // Name input is read-only, no event listeners needed

        // Real-time input validation
        this.studentIdInput.addEventListener('input', (e) => {
            this.clearMessages();
            this.validateInputFormat(e.target.value);
            // Hide name section if student ID is modified
            if (!this.nameInputSection.classList.contains('hidden-step')) {
                this.resetToStep1();
            }
        });
    }

    async loadStudentData() {
        try {
            // Load student data from CSV or JSON file
            const response = await fetch('student-data.csv');
            if (!response.ok) {
                throw new Error('Could not load student data');
            }
            
            const csvText = await response.text();
            this.studentData = this.parseCSV(csvText);
            console.log('Student data loaded:', this.studentData.length, 'records');
        } catch (error) {
            console.error('Error loading student data:', error);
            this.showError('Could not load student database. Please try again later.');
        }
    }

    parseCSV(csvText) {
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        const data = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim());
            if (values.length === headers.length) {
                const record = {};
                headers.forEach((header, index) => {
                    record[header] = values[index];
                });
                data.push(record);
            }
        }

        return data;
    }

    async handleCheckId() {
        const studentId = this.studentIdInput.value.trim();
        
        if (!studentId) {
            this.showError('Please enter your Student ID');
            return;
        }

        if (!this.isValidStudentId(studentId)) {
            this.showError('Please enter your Uttara University Student ID (e.g., 2233081XXX)');
            return;
        }

        this.showLoading();
        this.checkIdBtn.disabled = true;

        try {
            // Simulate processing delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            const student = this.findStudent(studentId);
            if (!student) {
                throw new Error('Student ID not found in our records. Please check your ID or contact support.');
            }

            // Store validated student and show name input
            this.validatedStudent = student;
            this.showNameInputStep();
            this.clearMessages();

        } catch (error) {
            this.showError(error.message);
        } finally {
            this.hideLoading();
            this.checkIdBtn.disabled = false;
        }
    }

    async handleGenerate() {
        if (!this.validatedStudent) {
            this.showError('Please check your Student ID first');
            return;
        }

        if (!this.originalName) {
            this.showError('No name found for this student');
            return;
        }

        this.showLoading();
        this.generateBtn.disabled = true;

        try {
            // Simulate processing delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Use the original registered name directly
            const studentForCertificate = {
                ...this.validatedStudent,
                name: this.originalName
            };

            // Generate certificate
            await this.generateCertificate(studentForCertificate);
            this.showSuccess();

        } catch (error) {
            this.showError(error.message);
        } finally {
            this.hideLoading();
            this.generateBtn.disabled = false;
        }
    }

    showNameInputStep() {
        this.nameInputSection.classList.remove('hidden-step');
        this.nameInputSection.classList.add('visible-step');
        this.generateBtn.classList.remove('hidden-step');
        this.generateBtn.classList.add('visible-step');
        this.checkIdBtn.classList.add('hidden-step');
        this.studentIdInput.disabled = true;
        
        // Pre-fill with registered name (read-only)
        if (this.validatedStudent && this.validatedStudent.name) {
            const originalName = this.validatedStudent.name.trim();
            this.studentNameInput.value = originalName;
            this.originalName = originalName;
        }
        
        // Focus on generate button instead since name input is read-only
        this.generateBtn.focus();
    }

    initializeNameEditingRules() {
        // Calculate which characters can be edited (50% rule)
        if (!this.originalName) return;
        
        const nameLength = this.originalName.length;
        this.editablePositions = new Set();
        
        // Allow editing of every other character to distribute editable positions
        for (let i = 0; i < nameLength && this.editablePositions.size < this.maxEditable; i += 2) {
            this.editablePositions.add(i);
        }
        
        // If we still have slots, fill remaining positions
        for (let i = 1; i < nameLength && this.editablePositions.size < this.maxEditable; i += 2) {
            this.editablePositions.add(i);
        }
    }

    handleNameInput(e) {
        if (!this.originalName) return;
        
        const currentValue = e.target.value;
        const cursorPosition = e.target.selectionStart;
        
        // Validate the changes according to 50% rule
        if (!this.isValidNameEdit(currentValue)) {
            // Revert to last valid state
            e.target.value = this.getValidNameEdit(currentValue);
            // Restore cursor position
            setTimeout(() => {
                e.target.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
            }, 0);
        }
    }

    handleNameKeydown(e) {
        if (!this.originalName) return;
        
        const cursorPosition = e.target.selectionStart;
        const currentValue = e.target.value;
        
        // Allow navigation keys, backspace, delete, etc.
        const allowedKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'Tab', 'Enter', 'Escape'];
        if (allowedKeys.includes(e.key)) return;
        
        // Allow backspace and delete
        if (e.key === 'Backspace' || e.key === 'Delete') return;
        
        // For character input, check if position is editable
        if (e.key.length === 1) {
            // Calculate the difference from original name
            const differences = this.calculateDifferences(currentValue, this.originalName);
            
            // If we've reached the edit limit and this would add another change
            if (differences >= this.maxEditable && cursorPosition < this.originalName.length) {
                // Check if this position is already different from original
                if (cursorPosition < currentValue.length && 
                    currentValue[cursorPosition] === this.originalName[cursorPosition]) {
                    e.preventDefault();
                    return;
                }
            }
        }
    }

    calculateDifferences(current, original) {
        let differences = 0;
        const maxLength = Math.max(current.length, original.length);
        
        for (let i = 0; i < maxLength; i++) {
            const currentChar = current[i] || '';
            const originalChar = original[i] || '';
            if (currentChar !== originalChar) {
                differences++;
            }
        }
        
        return differences;
    }

    isValidNameEdit(newValue) {
        if (!this.originalName) return true;
        
        // Check character limit
        if (newValue.length > 25) return false;
        
        // Check 50% edit rule
        const differences = this.calculateDifferences(newValue, this.originalName);
        return differences <= this.maxEditable;
    }

    getValidNameEdit(newValue) {
        if (!this.originalName) return newValue;
        
        // If too long, truncate
        if (newValue.length > 25) {
            newValue = newValue.substring(0, 25);
        }
        
        // If too many changes, revert to original
        const differences = this.calculateDifferences(newValue, this.originalName);
        if (differences > this.maxEditable) {
            return this.studentNameInput.value; // Return previous valid value
        }
        
        return newValue;
    }

    updateCharacterCounter() {
        if (this.charCounter && this.studentNameInput) {
            const currentLength = this.studentNameInput.value.length;
            this.charCounter.textContent = `${currentLength}/25`;
            
            // Change color based on usage
            if (currentLength > 20) {
                this.charCounter.style.color = '#e74c3c';
                this.charCounter.style.backgroundColor = '#fdf2f2';
            } else if (currentLength > 15) {
                this.charCounter.style.color = '#f39c12';
                this.charCounter.style.backgroundColor = '#fef9e7';
            } else {
                this.charCounter.style.color = '#888';
                this.charCounter.style.backgroundColor = '#f5f5f5';
            }
        }
    }

    resetToStep1() {
        this.nameInputSection.classList.add('hidden-step');
        this.nameInputSection.classList.remove('visible-step');
        this.generateBtn.classList.add('hidden-step');
        this.generateBtn.classList.remove('visible-step');
        this.checkIdBtn.classList.remove('hidden-step');
        this.studentIdInput.disabled = false;
        this.validatedStudent = null;
        this.studentNameInput.value = '';
        this.originalName = null;
        
        this.clearMessages();
    }

    isValidStudentId(id) {
        // Basic validation for student ID format - accepts 10-digit IDs
        const pattern = /^\d{10}$/;
        return pattern.test(id);
    }

    findStudent(studentId) {
        if (!this.studentData) {
            throw new Error('Student database not loaded');
        }

        return this.studentData.find(student => 
            student.student_id === studentId || student.id === studentId
        );
    }

    async generateCertificate(student) {
        try {
            // Ensure Dancing Script font is loaded before generating certificate
            await this.loadDancingScriptFont();
            
            // Create canvas for certificate
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Set canvas dimensions (A4 landscape: 297mm x 210mm at 300 DPI)
            canvas.width = 3508;
            canvas.height = 2480;

            // Try to load Canva template first, fallback to programmatic generation
            try {
                await this.loadCanvaTemplate(ctx, student.name, canvas.width, canvas.height);
            } catch (templateError) {
                console.log('Template not found, using programmatic generation');
                // Fallback to programmatic certificate generation
                this.createCertificateBackground(ctx, canvas.width, canvas.height);
                this.addTextToCertificate(ctx, student.name, canvas.width, canvas.height);
            }

            // Convert canvas to blob
            return new Promise((resolve) => {
                canvas.toBlob((blob) => {
                    this.certificateBlob = blob;
                    resolve();
                }, 'image/png');
            });
        } catch (error) {
            throw new Error('Failed to generate certificate: ' + error.message);
        }
    }

    async loadDancingScriptFont() {
        // Load Dancing Script font using CSS Font Loading API
        if ('fonts' in document) {
            try {
                await document.fonts.load('400 180px Dancing Script');
                await document.fonts.load('600 150px Dancing Script');
                await document.fonts.load('700 150px Dancing Script');
                console.log('Dancing Script font loaded successfully');
            } catch (error) {
                console.warn('Failed to load Dancing Script font:', error);
                // Continue anyway - fallback fonts will be used
            }
        } else {
            // Fallback for browsers without CSS Font Loading API
            console.warn('CSS Font Loading API not supported, relying on font fallbacks');
        }
    }

    async loadCanvaTemplate(ctx, studentName, width, height) {
        return new Promise((resolve, reject) => {
            const templateImg = new Image();
            templateImg.crossOrigin = 'anonymous';
            
            templateImg.onload = () => {
                try {
                    // Draw the Canva template
                    ctx.drawImage(templateImg, 0, 0, width, height);
                    
                    // Add student name to the template
                    this.addNameToCanvaTemplate(ctx, studentName, width, height);
                    
                    resolve();
                } catch (error) {
                    reject(error);
                }
            };

            templateImg.onerror = () => {
                reject(new Error('Could not load Canva template'));
            };

            // Try to load Canva template (save your certificate image as this filename)
            templateImg.src = 'Certificate.png';
        });
    }

    addNameToCanvaTemplate(ctx, studentName, width, height) {
        //! Font customization updated from positioning helper tool
        //! Using Dancing Script font for elegant certificate styling #admin
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 180px Dancing Script, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Positioning optimized using the positioning helper tool
        const nameX = width * 0.500;
        const nameY = height * 0.480;
        
        // Add text shadow for better visibility
        ctx.shadowColor = 'rgba(255,255,255,0.8)';
        ctx.shadowBlur = 2;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        
        // Draw the student name
        ctx.fillText(studentName, nameX, nameY);
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
    }

    createCertificateBackground(ctx, width, height) {
        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Add outer border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 20;
        ctx.strokeRect(100, 100, width - 200, height - 200);

        // Add inner border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 5;
        ctx.strokeRect(150, 150, width - 300, height - 300);

        // Add decorative elements
        this.addDecorativeElements(ctx, width, height);
    }

    addDecorativeElements(ctx, width, height) {
        // Add CSC logo circle
        const centerX = width / 2;
        const logoY = 350;
        
        ctx.beginPath();
        ctx.arc(centerX, logoY, 150, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fill();
        
        // Add CSC text in circle
        ctx.fillStyle = 'white';
        ctx.font = 'bold 120px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('CSC', centerX, logoY + 20);
    }

    addTextToCertificate(ctx, studentName, width, height) {
        const centerX = width / 2;
        
        // Add title "CERTIFICATE"
        ctx.fillStyle = 'white';
        ctx.font = 'bold 200px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('CERTIFICATE', centerX, 600);

        // Add subtitle "of Participation"
        ctx.font = '80px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('of Participation', centerX, 720);

        // Add "This is to certify that"
        ctx.font = '60px Arial';
        ctx.fillText('This is to certify that', centerX, 950);

        // Add student name with underline - Using Dancing Script for consistency
        ctx.font = 'bold 150px Dancing Script, Arial, sans-serif';
        ctx.fillStyle = 'white';
        const nameY = 1150;
        ctx.fillText(studentName, centerX, nameY);

        // Add underline for name
        const nameWidth = ctx.measureText(studentName).width;
        ctx.beginPath();
        ctx.moveTo(centerX - nameWidth/2 - 100, nameY + 80);
        ctx.lineTo(centerX + nameWidth/2 + 100, nameY + 80);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 8;
        ctx.stroke();

        // Add description
        ctx.font = '60px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('has successfully participated in', centerX, 1400);
        
        ctx.font = 'bold 80px GEOMETOS, Arial, sans-serif';
        ctx.fillStyle = 'white';
        ctx.fillText('CyberCon 2024', centerX, 1500);
        
        ctx.font = '60px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText('organized by Cyber Security Club, Uttara University', centerX, 1600);

        // Add date
        const currentDate = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        ctx.font = '50px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(currentDate, 200, height - 300);

        // Add signature line and text
        const sigX = width - 600;
        const sigY = height - 250;
        
        // Signature line
        ctx.beginPath();
        ctx.moveTo(sigX - 200, sigY - 50);
        ctx.lineTo(sigX + 200, sigY - 50);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 4;
        ctx.stroke();
        
        // Signature text
        ctx.font = '45px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Faculty Advisor', sigX, sigY);

        // Add organization info
        ctx.font = '60px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.textAlign = 'center';
        ctx.fillText('Cyber Security Club', centerX, height - 180);
        
        ctx.font = '45px Arial';
        ctx.fillText('Uttara University', centerX, height - 120);
    }

    downloadCertificate() {
        if (!this.certificateBlob) {
            this.showError('No certificate available for download');
            return;
        }

        const studentId = this.studentIdInput.value.trim();
        const url = URL.createObjectURL(this.certificateBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Certificate_${studentId}_${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    showLoading() {
        this.clearMessages();
        this.loadingSpinner.classList.add('visible', 'animate-slide-in');
    }

    hideLoading() {
        this.loadingSpinner.classList.remove('visible', 'animate-slide-in');
    }

    showError(message) {
        this.clearMessages();
        this.errorText.textContent = message;
        this.errorMessage.classList.add('visible', 'animate-slide-in');
    }

    showSuccess() {
        this.clearMessages();
        this.successMessage.classList.add('visible', 'animate-slide-in');
        
        // Hide the generate button after successful generation
        this.generateBtn.style.display = 'none';
        
        // Show the certificate preview
        this.showCertificatePreview();
    }

    clearMessages() {
        this.loadingSpinner.classList.remove('visible', 'animate-slide-in');
        this.errorMessage.classList.remove('visible', 'animate-slide-in');
        this.successMessage.classList.remove('visible', 'animate-slide-in');
    }

    showCertificatePreview() {
        if (!this.certificateBlob) {
            console.error('No certificate available for preview');
            return;
        }

        // Create a URL for the certificate blob
        const certificateUrl = URL.createObjectURL(this.certificateBlob);
        
        // Set the image source
        this.certificateImage.src = certificateUrl;
        
        // Show the preview section
        this.certificatePreview.classList.add('visible');
        
        // Scroll to the preview section
        this.certificatePreview.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }





    validateInputFormat(value) {
        const input = this.studentIdInput;
        
        if (value.length === 0) {
            input.style.borderColor = '#e1e5e9';
            return;
        }
        
        if (this.isValidStudentId(value)) {
            input.style.borderColor = '#28a745';
            input.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.1)';
        } else {
            input.style.borderColor = '#dc3545';
            input.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CertificateGenerator();
});

// Add mobile navigation functionality (from main site)
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.navbar-burger');
    const menu = document.querySelector('.navbar-menu');

    if (burger && menu) {
        burger.addEventListener('click', function() {
            burger.classList.toggle('is-active');
            menu.classList.toggle('is-active');
        });
    }
});
