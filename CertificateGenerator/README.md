# CyberCon 2024 Certificate Generator

A professional web-based certificate generation system for CyberCon 2024 participants at Uttara University's Cyber Security Club. This system provides secure, validated certificate generation for verified event participants.

## Features

- **Two-Step Validation Process**: Student ID verification followed by name confirmation
- **Real Participant Database**: Contains 200+ verified CyberCon24 attendees  
- **Professional Template System**: Supports custom Canva templates with GEOMETOS font
- **Read-Only Security**: Uses registered names exactly as recorded (no modifications)
- **Responsive Design**: Optimized for desktop and mobile devices
- **Welcome Notifications**: Interactive popup announcements
- **Professional Styling**: Matches main website design with gradient buttons

## File Structure

```text
CertificateGenerator/
├── index.html                 # Main web interface with two-step validation
├── certificate-style.css      # Professional styling matching website design
├── certificate-generator.js   # Frontend logic with security features
├── student-data.csv           # CyberCon24 participant database (200+ entries)
├── Certificate.png            # Custom certificate template (user-provided)
├── positioning-helper.html    # Development tool for template positioning
├── config.json               # System configuration
├── CANVA_SETUP.md            # Template integration guide
├── cert/CyberCon24.png       # Welcome notification banner image
└── README.md                 # This documentation
```

## System Requirements

### Client-Side Only
- **Modern Web Browser**: Chrome, Firefox, Safari, Edge
- **JavaScript Enabled**: Required for certificate generation
- **Canvas Support**: HTML5 Canvas for certificate rendering
- **Font Loading**: Google Fonts API access for GEOMETOS font

### No Server Requirements
- **Pure Frontend System**: No backend server needed
- **No Database**: Uses CSV file for participant data
- **No API**: All processing done client-side
- **Static Hosting**: Can be deployed on any web server or CDN

## Quick Start

### For Students (Certificate Generation)

1. **Visit the Certificate Generator** page
2. **Enter Student ID** (10-digit format: e.g., 2243081091)
3. **Click "Check Student ID"** to verify registration
4. **Verify displayed name** (read-only, from registration data)
5. **Click "Generate Certificate"** to create your certificate
6. **Download** your personalized certificate (PNG format)

### CyberCon24 Participant Database

The `student-data.csv` file contains verified CyberCon24 participants:

```csv
ID,name,email,event,date
2243081091,Ahmed Rahman,ahmed.student@uu.edu.bd,CyberCon24,2024-12-15
2243081092,Sarah Ahmed,sarah.student@uu.edu.bd,CyberCon24,2024-12-15
```

**Database Features:**

- 200+ verified participants
- 10-digit Student ID format validation
- Read-only participant names
- CyberCon24 event registration data

## System Usage

### For Administrators (Template Setup)

1. **Create Certificate Template**:
   - Design your certificate (recommended: Canva)
   - Export as PNG (300 DPI, A4 landscape)
   - Save as `Certificate.png` in CertificateGenerator folder

2. **Participant Management**:
   - All CyberCon24 participants already loaded
   - Names are read-only for security
   - Student IDs validated against database

3. **System Monitoring**:
   - Check browser console for any errors
   - Verify template loading in developer tools
   - Monitor certificate generation success rates

## Technical Specifications

### Certificate Design

The certificate uses:

- Colors and gradients
- Optimized visual elements
- GEOMETOS font family for professional appearance
- Canvas-based rendering with HTML5

### Student ID Format

Student IDs must follow the 10-digit pattern:

```javascript
// In certificate-generator.js
const studentIdPattern = /^\d{10}$/; // Must be exactly 10 digits
```

Validation ensures:

- Exactly 10 digits (no letters or special characters)
- Matches participant database records
- Prevents unauthorized certificate generation

### Certificate Generation Process

1. **ID Validation**: Check against `student-data.csv`
2. **Name Display**: Show participant name (read-only)
3. **Template Loading**: Load `Certificate.png` template
4. **Text Rendering**: Apply GEOMETOS font at optimized position
5. **Download**: Generate PNG file with participant name

### Browser Requirements

**Client-Side Only:**

- Modern web browser with HTML5 Canvas support
- JavaScript enabled
- CSS3 support for responsive design
- No server requirements or PHP needed

## Troubleshooting

### Common Issues

1. **"Student database not loaded"**
   - Check if `student-data.csv` exists and is readable
   - Verify CSV format and encoding (UTF-8)

2. **"Could not load certificate template"**
   - Ensure certificate template files exist
   - Check file permissions

3. **Python script not working**
   - Install Pillow: `pip install Pillow`
   - Check Python path in PHP script
   - Verify font files are available

4. **Certificates not generating**
   - Check `certificates/` directory permissions
   - Verify Python script execution rights
   - Check browser console for JavaScript errors
   - Verify Certificate.png template is properly loaded
   - Ensure student-data.csv is accessible and properly formatted

## Installation

System requirements:

```bash
# No server required - Client-side only system
# Simply open index.html in any modern web browser
```

### Setup Steps

1. **Download Files**: Clone or download the certificate generator files
2. **Prepare Template**: Ensure `Certificate.png` template is in the main folder
3. **Verify Data**: Check `student-data.csv` contains participant information
4. **Open System**: Launch `index.html` in web browser
5. **Test Generation**: Try generating a certificate with valid Student ID

## Security Features

1. **Input Validation**: All student IDs validated against 10-digit pattern
2. **Read-Only Names**: Participant names cannot be modified for security
3. **Database Validation**: IDs must match CyberCon24 participant records
4. **Client-Side Processing**: No server-side data storage or transmission

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is developed for the Cyber Security Club at Uttara University. All rights reserved.

## Contact

- Contact: Cyber Security Club, Uttara University
- Email: [cybersecurity@club.uttara.ac.bd](mailto:cybersecurity@club.uttara.ac.bd)
- Website: [https://cybersecurity.club.uttara.ac.bd](cybersecurity.club.uttara.ac.bd)
- Discord: https://discord.gg/N83SjBHjzG