#!/usr/bin/env python3
"""
Certificate Generator Backend
This script handles certificate generation using Python and PIL
"""

import os
import csv
from PIL import Image, ImageDraw, ImageFont
from datetime import datetime
import argparse

class CertificateGenerator:
    def __init__(self):
        self.template_width = 3508  # A4 landscape at 300 DPI
        self.template_height = 2480
        self.student_data = []
        self.load_student_data()

    def load_student_data(self):
        """Load student data from CSV file"""
        csv_file = 'student-data.csv'
        if os.path.exists(csv_file):
            with open(csv_file, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                self.student_data = list(reader)
            print(f"Loaded {len(self.student_data)} student records")
        else:
            print("student-data.csv not found!")

    def find_student(self, student_id):
        """Find student by ID"""
        for student in self.student_data:
            if student['student_id'] == student_id:
                return student
        return None

    def create_certificate_template(self):
        """Create a blank certificate template"""
        # Create a new image with gradient background
        img = Image.new('RGB', (self.template_width, self.template_height), color='white')
        draw = ImageDraw.Draw(img)

        # Create gradient background
        for y in range(self.template_height):
            # Calculate color based on position
            ratio = y / self.template_height
            r = int(102 + (118 - 102) * ratio)  # 667eea to 764ba2
            g = int(126 + (75 - 126) * ratio)
            b = int(234 + (162 - 234) * ratio)
            color = (r, g, b)
            draw.line([(0, y), (self.template_width, y)], fill=color)

        # Add border
        border_margin = 100
        border_width = 20
        draw.rectangle([
            border_margin, border_margin, 
            self.template_width - border_margin, self.template_height - border_margin
        ], outline=(255, 255, 255, 80), width=border_width)

        # Add inner border
        inner_margin = 150
        draw.rectangle([
            inner_margin, inner_margin,
            self.template_width - inner_margin, self.template_height - inner_margin
        ], outline=(255, 255, 255, 120), width=5)

        return img, draw

    def add_text_to_certificate(self, img, draw, student_name):
        """Add text to certificate"""
        try:
            # Try to load fonts
            title_font = ImageFont.truetype("arial.ttf", 200)
            subtitle_font = ImageFont.truetype("arial.ttf", 80)
            name_font = ImageFont.truetype("arial.ttf", 150)
            text_font = ImageFont.truetype("arial.ttf", 60)
            small_font = ImageFont.truetype("arial.ttf", 45)
        except OSError:
            # Fallback to default font if custom fonts not available
            title_font = ImageFont.load_default()
            subtitle_font = ImageFont.load_default()
            name_font = ImageFont.load_default()
            text_font = ImageFont.load_default()
            small_font = ImageFont.load_default()

        # Center coordinates
        center_x = self.template_width // 2
        
        # Add title
        title_text = "CERTIFICATE"
        title_bbox = draw.textbbox((0, 0), title_text, font=title_font)
        title_width = title_bbox[2] - title_bbox[0]
        draw.text((center_x - title_width // 2, 400), title_text, 
                 fill=(255, 255, 255), font=title_font)

        # Add subtitle
        subtitle_text = "of Participation"
        subtitle_bbox = draw.textbbox((0, 0), subtitle_text, font=subtitle_font)
        subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
        draw.text((center_x - subtitle_width // 2, 650), subtitle_text, 
                 fill=(255, 255, 255, 200), font=subtitle_font)

        # Add "This is to certify that"
        certify_text = "This is to certify that"
        certify_bbox = draw.textbbox((0, 0), certify_text, font=text_font)
        certify_width = certify_bbox[2] - certify_bbox[0]
        draw.text((center_x - certify_width // 2, 900), certify_text, 
                 fill=(255, 255, 255, 200), font=text_font)

        # Add student name
        name_bbox = draw.textbbox((0, 0), student_name, font=name_font)
        name_width = name_bbox[2] - name_bbox[0]
        name_y = 1100
        draw.text((center_x - name_width // 2, name_y), student_name, 
                 fill=(255, 255, 255), font=name_font)

        # Add underline for name
        underline_y = name_y + 180
        underline_margin = 100
        draw.line([
            (center_x - name_width // 2 - underline_margin, underline_y),
            (center_x + name_width // 2 + underline_margin, underline_y)
        ], fill=(255, 255, 255, 100), width=8)

        # Add description
        desc_lines = [
            "has successfully participated in",
            "CyberCon 2025",
            "organized by Cyber Security Club, Uttara University"
        ]
        
        desc_y = 1400
        for i, line in enumerate(desc_lines):
            if i == 1:  # Make event name bold/larger
                font = ImageFont.truetype("arial.ttf", 80) if title_font != ImageFont.load_default() else text_font
            else:
                font = text_font
                
            line_bbox = draw.textbbox((0, 0), line, font=font)
            line_width = line_bbox[2] - line_bbox[0]
            draw.text((center_x - line_width // 2, desc_y + i * 100), line, 
                     fill=(255, 255, 255, 220), font=font)

        # Add date
        current_date = datetime.now().strftime("%B %d, %Y")
        draw.text((200, self.template_height - 300), current_date, 
                 fill=(255, 255, 255, 200), font=text_font)

        # Add signature placeholder
        sig_text = "Faculty Advisor"
        sig_x = self.template_width - 600
        sig_y = self.template_height - 250
        
        # Signature line
        draw.line([
            (sig_x - 200, sig_y - 50),
            (sig_x + 200, sig_y - 50)
        ], fill=(255, 255, 255, 100), width=4)
        
        sig_bbox = draw.textbbox((0, 0), sig_text, font=small_font)
        sig_width = sig_bbox[2] - sig_bbox[0]
        draw.text((sig_x - sig_width // 2, sig_y), sig_text, 
                 fill=(255, 255, 255, 200), font=small_font)

        # Add organization
        org_lines = ["Cyber Security Club", "Uttara University"]
        org_y = self.template_height - 180
        
        for i, line in enumerate(org_lines):
            font = text_font if i == 0 else small_font
            line_bbox = draw.textbbox((0, 0), line, font=font)
            line_width = line_bbox[2] - line_bbox[0]
            draw.text((center_x - line_width // 2, org_y + i * 60), line, 
                     fill=(255, 255, 255, 200), font=font)

    def generate_certificate(self, student_id, output_dir="certificates"):
        """Generate certificate for a student"""
        student = self.find_student(student_id)
        if not student:
            print(f"Student ID {student_id} not found in database")
            return None

        # Create output directory
        os.makedirs(output_dir, exist_ok=True)

        # Create certificate
        img, draw = self.create_certificate_template()
        self.add_text_to_certificate(img, draw, student['name'])

        # Save certificate
        output_path = os.path.join(output_dir, f"certificate_{student_id}.png")
        img.save(output_path, "PNG", quality=95, dpi=(300, 300))
        
        print(f"Certificate generated for {student['name']}: {output_path}")
        return output_path

    def generate_all_certificates(self, output_dir="certificates"):
        """Generate certificates for all students"""
        if not self.student_data:
            print("No student data available")
            return

        generated = 0
        for student in self.student_data:
            try:
                self.generate_certificate(student['student_id'], output_dir)
                generated += 1
            except Exception as e:
                print(f"Error generating certificate for {student['student_id']}: {e}")

        print(f"Generated {generated} certificates out of {len(self.student_data)} students")

def main():
    parser = argparse.ArgumentParser(description='Generate certificates for students')
    parser.add_argument('--student-id', help='Generate certificate for specific student ID')
    parser.add_argument('--all', action='store_true', help='Generate certificates for all students')
    parser.add_argument('--output', default='certificates', help='Output directory for certificates')
    
    args = parser.parse_args()
    
    generator = CertificateGenerator()
    
    if args.student_id:
        generator.generate_certificate(args.student_id, args.output)
    elif args.all:
        generator.generate_all_certificates(args.output)
    else:
        print("Please specify --student-id or --all")
        print("Usage examples:")
        print("  python certificate_generator.py --student-id 2021-1-60-001")
        print("  python certificate_generator.py --all")

if __name__ == "__main__":
    main()
