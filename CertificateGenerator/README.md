# Certificate Generator

A web-based certificate generator system for the Cyber Security Club at Uttara University. This system allows students to generate participation certificates by entering their Student ID.

## Features

- **Student ID Validation**: Validates student ID format and checks against registered participants
- **Automatic Certificate Generation**: Creates personalized certificates with student names
- **Secure Download**: Generates certificates on-demand and provides secure download
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Feedback**: Shows loading states, error messages, and success notifications

## File Structure

```
CertificateGenerator/
├── index.html                 # Main web interface
├── certificate-style.css      # Styling for the web interface
├── certificate-generator.js   # Frontend JavaScript logic
├── student-data.csv           # Student database (CSV format)
├── certificate_generator.py   # Python backend for certificate generation
├── api.php                   # PHP API endpoint
├── certificate-template.html  # HTML template for certificate design
├── certificates/             # Generated certificates folder (auto-created)
└── README.md                 # This file
```

## Setup Instructions

### Prerequisites

1. **Web Server**: Apache/Nginx with PHP support
2. **Python 3**: With PIL (Pillow) library
3. **Fonts**: Arial font installed on server (for certificate text)

### Installation

1. **Clone/Copy the files** to your web server directory

2. **Install Python dependencies**:
   ```bash
   pip install Pillow
   ```

3. **Set up student data**:
   - Edit `student-data.csv` with your student information
   - Format: `student_id,name,email,event,date_registered`

4. **Configure permissions**:
   ```bash
   chmod 755 certificate_generator.py
   chmod 666 student-data.csv
   mkdir certificates
   chmod 755 certificates
   ```

5. **Test the Python script**:
   ```bash
   python3 certificate_generator.py --student-id 2021-1-60-001
   ```

### Student Data Format

The `student-data.csv` file should contain:

```csv
student_id,name,email,event,date_registered
2021-1-60-001,John Doe,john.doe@student.uu.edu.bd,CyberCon 2025,2025-01-15
2021-1-60-002,Jane Smith,jane.smith@student.uu.edu.bd,CyberCon 2025,2025-01-15
```

## Usage

### For Students

1. Open the certificate generator page in your browser
2. Enter your Student ID (format: YYYY-X-XX-XXX)
3. Click "Generate Certificate"
4. Wait for processing (2-3 seconds)
5. Download your certificate when ready

### For Administrators

#### Adding New Students
Edit the `student-data.csv` file and add new entries:

```csv
student_id,name,email,event,date_registered
2021-1-60-003,New Student,new.student@student.uu.edu.bd,CyberCon 2025,2025-01-20
```

#### Bulk Certificate Generation
Generate certificates for all students:

```bash
python3 certificate_generator.py --all
```

#### Generate Single Certificate
```bash
python3 certificate_generator.py --student-id 2021-1-60-001
```

## Customization

### Certificate Design
Edit `certificate_generator.py` to customize:
- Colors and gradients
- Text positioning
- Font sizes
- Certificate content
- Logo/images

### Student ID Format
Modify the validation regex in both JavaScript and Python:
```javascript
// In certificate-generator.js
const pattern = /^\d{4}-\d-\d{2}-\d{3}$/;
```

```python
# In certificate_generator.py
return preg_match('/^\d{4}-\d-\d{2}-\d{3}$/', $studentId)
```

### Event Information
Update event details in:
- `certificate_generator.py` (description text)
- `certificate-template.html` (HTML template)

## API Endpoints

### Generate Certificate
```http
POST /api.php
Content-Type: application/json

{
    "action": "generate",
    "student_id": "2021-1-60-001"
}
```

### Download Certificate
```http
GET /api.php?download=1&student_id=2021-1-60-001
```

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
   - Check server error logs

### Error Logs

Check server error logs for detailed error messages:
```bash
tail -f /var/log/apache2/error.log
# or
tail -f /var/log/nginx/error.log
```

## Security Considerations

1. **Input Validation**: All student IDs are validated for format
2. **File Permissions**: Certificates directory has restricted access
3. **Data Protection**: Student data is stored locally, not in database
4. **Download Security**: Certificates are generated with unique names

## Contributing

To contribute to this project:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is developed for the Cyber Security Club at Uttara University. All rights reserved.

## Support

For technical support or questions:
- Contact: Cyber Security Club, Uttara University
- Email: info@csc.uu.edu.bd
- Discord: https://discord.gg/N83SjBHjzG
