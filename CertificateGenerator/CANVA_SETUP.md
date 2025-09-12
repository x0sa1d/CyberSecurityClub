# 🎨 CyberCon 2024 Certificate Template Setup Guide

## Complete Setup Instructions for Certificate Generation System

### 📋 **Step 1: Prepare Your Certificate Template**

1. **Design Requirements**:
   - **Format**: Landscape orientation (A4 recommended)
   - **Resolution**: 300 DPI for high-quality printing
   - **Dimensions**: 3508×2480 pixels (A4 landscape at 300 DPI)
   - **Name Area**: Clear space for participant names using GEOMETOS font

2. **Template Specifications**:
   - Background design should be complete
   - Leave designated area for participant names
   - Consider text contrast for name visibility
   - Ensure CyberCon 2024 branding is included

3. **Font Requirements**:
   - Names will be rendered using **GEOMETOS font** at 180px
   - Ensure the design accommodates this font size
   - Test with sample names of varying lengths

### 📥 **Step 2: Save Your Certificate Template**

1. **File Requirements**:
   - **File Name**: Must be exactly `Certificate.png`
   - **Format**: PNG with transparency support
   - **Quality**: Highest quality (300 DPI recommended)
   - **Size**: 3508×2480 pixels for A4 landscape

2. **File Location**:
   - Save the certificate template in the CertificateGenerator folder
   - **Exact Path**: `c:\Users\PRANXTEN\Documents\CyberSec_UU\CertificateGenerator\Certificate.png`
   - The system automatically detects this file for certificate generation

3. **Important Notes**:
   - File name is case-sensitive
   - PNG format ensures best quality and transparency support
   - If file is missing, system falls back to programmatic generation

### ⚙️ **Step 3: Text Positioning Configuration**

The certificate system uses predefined positioning optimized for professional certificates:

1. **Current Text Settings**:
   - **Font**: GEOMETOS (imported from Google Fonts)
   - **Size**: 180px bold
   - **Color**: Black (#000000)
   - **Position**: Centered horizontally, vertically positioned at 48% of height
   - **Shadow**: White shadow for better visibility

2. **Automatic Positioning**:
   - Names are automatically centered horizontally
   - Vertical position: `height * 0.480` (optimized for standard certificates)
   - Text alignment: Center-aligned for professional appearance

3. **Current Implementation** (in certificate-generator.js):

```javascript
addNameToCanvaTemplate(ctx, studentName, width, height) {
    // Professional certificate styling
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 180px GEOMETOS, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Optimized positioning for certificates
    const nameX = width * 0.500;    // Perfect horizontal center
    const nameY = height * 0.480;   // Optimal vertical position
    
    // Enhanced visibility with shadow
    ctx.shadowColor = 'rgba(255,255,255,0.8)';
    ctx.shadowBlur = 2;
    ctx.fillText(studentName, nameX, nameY);
}
```

### 🎯 **Step 4: Testing Your Template**

Use the built-in testing system to verify your template:

1. **Access Certificate Generator**: Open the main certificate page
2. **Test with Real Data**: Use Student ID `2243081091` (sample CyberCon24 participant)
3. **Check Name Positioning**: Verify names appear correctly on your template
4. **Quality Check**: Ensure 300 DPI output maintains professional quality

**Note**: The system is pre-configured with optimal settings for most certificate designs.

### ✅ **Step 5: System Verification**

**Current System Status:**

1. **Template Integration**: ✅ Ready for Certificate.png
2. **Student Database**: ✅ Contains 200+ CyberCon24 participants
3. **Font System**: ✅ GEOMETOS font loaded from Google Fonts
4. **Text Positioning**: ✅ Optimized for professional certificates
5. **Validation System**: ✅ 10-digit Student ID format verification

### 🔧 **Troubleshooting Guide**

**Template Loading Issues:**

- **Check File Name**: Must be exactly `Certificate.png` (case-sensitive)
- **Verify Location**: File must be in CertificateGenerator folder
- **Fallback System**: Automatic programmatic generation if template missing
- **Browser Console**: Check for loading errors in developer tools

**Text Positioning Issues:**

- **Current Settings**: Pre-optimized for standard certificate layouts
- **GEOMETOS Font**: Automatically loaded, fallback to Arial if unavailable
- **Shadow Effects**: Built-in white shadow for text visibility
- **Professional Sizing**: 180px font size for clear readability

### 📊 **Current System Features**

**Implemented Capabilities:**

- **Two-Step Validation**: ID check followed by name verification
- **Read-Only Names**: Uses exact registered names (no modifications allowed)
- **Real Participant Data**: CyberCon24 participant database integrated
- **Professional Styling**: Website-consistent design with gradient buttons
- **Welcome Notification**: CyberCon24 availability announcement popup
- **Responsive Design**: Works on desktop and mobile devices

### 🎯 **Template Specifications**

**Optimized Settings:**

- **Format**: PNG with transparency support
- **Resolution**: 300 DPI (3508×2480 pixels)
- **Layout**: A4 Landscape orientation
- **Font**: GEOMETOS 180px bold with shadow effects
- **Positioning**: Mathematically centered for professional appearance

### 🚀 **Ready-to-Use System**

**Current Status:**

✅ **Certificate Generator**: Fully functional web interface  
✅ **Student Database**: 200+ verified CyberCon24 participants  
✅ **Template System**: Ready for Certificate.png integration  
✅ **Professional Design**: Matches main website branding  
✅ **Security**: Read-only names, validated Student IDs  

### File Structure

```text
CertificateGenerator/
├── Certificate.png            ← Add your template here
├── index.html                ← Main web interface  
├── certificate-generator.js  ← Frontend logic
├── certificate-style.css     ← Professional styling
├── student-data.csv          ← CyberCon24 participants
├── cert/CyberCon24.png       ← Notification banner
└── positioning-helper.html   ← Development tool
```

**Final Step**: Save your certificate design as `Certificate.png` in the CertificateGenerator folder!
