# 🎨 Canva Template Integration Guide

## Step-by-Step Instructions to Use Your Canva Template

### 📋 **Step 1: Prepare Your Canva Template**

1. **Open your Canva design**: 
   - Go to: https://www.canva.com/design/DAGTSemWm5E/s2Woj2RqBgYZYJKi6LMXCQ/edit

2. **Prepare the name field**:
   - Find the "Your paragraph text" field
   - This is where student names will appear
   - **Option A**: Leave it as is (we'll replace it programmatically)
   - **Option B**: Replace it with a placeholder like "STUDENT NAME"

3. **Optimize for certificate generation**:
   - Make sure text is readable and well-positioned
   - Ensure the design works in landscape format
   - Consider text color contrast for name visibility

### 📥 **Step 2: Export Your Template**

1. **Download from Canva**:
   - Click "Share" button in top-right
   - Select "Download"
   - Choose **PNG** format
   - Select **highest quality** (recommended: 300 DPI)
   - Click "Download"

2. **Save the file**:
   - Right-click on the certificate image you shared
   - Save it as: `Certificate.png` (exactly this name)
   - Save it in your CertificateGenerator folder:
   ```
   c:\Users\PRANXTEN\Documents\CyberSec_UU\CertificateGenerator\Certificate.png
   ```

### ⚙️ **Step 3: Configure Text Positioning**

After adding your template, you'll need to adjust where the student name appears:

1. **Open the certificate generator**
2. **Test with a sample student ID** (like `2021-1-60-003`)
3. **Adjust text position** if needed by editing the JavaScript

#### Text Position Settings (in certificate-generator.js):

```javascript
// Find this function and adjust coordinates:
addNameToCanvaTemplate(ctx, studentName, width, height) {
    // Adjust these values based on your template:
    const nameX = width / 2;        // Horizontal position (center = width/2)
    const nameY = height / 2;       // Vertical position (adjust based on your design)
    
    // Adjust text styling:
    ctx.fillStyle = '#000000';      // Text color (black, change if needed)
    ctx.font = 'bold 120px Arial';  // Font size and family
}
```

### 🎯 **Step 4: Fine-tune Text Positioning**

To get the exact position where "Your paragraph text" appears:

1. **Measure your template**:
   - Open your `certificate-template.png` in an image editor
   - Note the approximate position of the text field
   - Convert to pixel coordinates

2. **Update coordinates**:
   - If your template is 3508×2480 pixels (A4 300 DPI)
   - Adjust `nameX` and `nameY` values accordingly

#### Common Position Examples:
```javascript
// Center of certificate
const nameX = width / 2;          // 1754 pixels from left
const nameY = height / 2;         // 1240 pixels from top

// Upper center (for header-style names)
const nameX = width / 2;          // 1754 pixels from left  
const nameY = height * 0.4;       // 992 pixels from top

// Custom position (adjust as needed)
const nameX = 1800;               // Specific pixel position
const nameY = 1200;               // Specific pixel position
```

### ✅ **Step 5: Test Your Template**

1. **Add your template file** (`certificate-template.png`) to the CertificateGenerator folder
2. **Open the certificate generator** in your browser
3. **Test with Ahmed Rahman** (ID: `2021-1-60-003`)
4. **Check if the name appears correctly** on your template
5. **Adjust positioning** if needed

### 🔧 **Troubleshooting**

#### If template doesn't load:
- Check file name is exactly: `certificate-template.png`
- Ensure file is in the correct folder
- Check browser console for error messages
- The system will automatically fallback to programmatic generation if template fails

#### If name position is wrong:
- Edit the `nameX` and `nameY` values in `addNameToCanvaTemplate` function
- Test different font sizes and colors
- Consider text contrast against your background

#### If text is not visible:
- Try different text colors (white: `#FFFFFF`, black: `#000000`)
- Adjust font size (bigger: `150px`, smaller: `80px`)
- Add text shadow for better visibility

### 📱 **Template Specifications**

**Recommended settings:**
- **Format**: PNG
- **Resolution**: 300 DPI
- **Size**: A4 Landscape (3508×2480 pixels)
- **Background**: Included in template
- **Text area**: Clear space for student name

### 🚀 **After Setup**

Once your template is configured:
1. Students can generate certificates using your Canva design
2. Names will be automatically placed in the correct position
3. Certificates maintain your professional branding
4. High-quality PNG output ready for printing

### Example File Structure:
```
CertificateGenerator/
├── certificate-template.png    ← Your Canva template (ADD THIS)
├── index.html                 ← Main interface
├── certificate-generator.js   ← Updated to use your template
├── student-data.csv           ← Student database
└── other files...
```

**Next Step**: Save your certificate image as `Certificate.png` in the CertificateGenerator folder!
