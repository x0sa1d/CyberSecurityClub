// News Detail Page JavaScript

// Sample news data (in a real application, this would come from a database/API)
const newsData = {
    1: {
        id: 1,
        title: "Join Our Executive Board 2025-2026: Leadership Opportunities Await!",
        category: "Recruitment",
        date: "August 25, 2025",
        author: "CSC Team",
        image: "../assets/images/News/Exe_25.png",
        content: `
<p>The Cyber Security Club at Uttara University is excited to announce recruitment for our <strong>Executive Board 2025-2026</strong>! We're seeking passionate, dedicated individuals who are ready to lead, innovate, and make a lasting impact in the cybersecurity community.</p>

<h3>🚀 Why This Opportunity Matters</h3>
<p>Our Executive Board represents the driving force behind all CSC initiatives. As a board member, you'll be at the forefront of cybersecurity education, community building, and professional development at Uttara University.</p>

<h3>📋 Available Leadership Positions</h3>

<h4>🎨 Media Secretary (2 Positions)</h4>
<ul>
  <li>Manage our digital presence across all social media platforms</li>
  <li>Create engaging visual content and promotional materials</li>
  <li>Handle media communications and public relations</li>
  <li>Develop creative campaigns for events and initiatives</li>
</ul>

<h4>💻 Development Secretary</h4>
<ul>
  <li>Lead technical development projects and infrastructure</li>
  <li>Maintain and enhance club websites and digital platforms</li>
  <li>Develop cybersecurity tools and educational resources</li>
  <li>Coordinate technical workshops and training sessions</li>
</ul>

<h4>📚 Research Secretary</h4>
<ul>
  <li>Focus on cybersecurity research and documentation</li>
  <li>Create educational content and learning materials</li>
  <li>Coordinate research projects and publications</li>
  <li>Organize academic conferences and seminars</li>
</ul>

<h4>📄 Office Secretary</h4>
<ul>
  <li>Handle official documentation and correspondence</li>
  <li>Coordinate meetings and administrative activities</li>
  <li>Maintain records and manage internal communications</li>
  <li>Ensure compliance with university policies</li>
</ul>

<h4>💰 Treasurer</h4>
<ul>
  <li>Manage financial planning and budget allocation</li>
  <li>Oversee resource management for club activities</li>
  <li>Handle sponsorship and funding opportunities</li>
  <li>Ensure transparent financial reporting</li>
</ul>

<h4>⭐ Executive Members (10 Positions)</h4>
<ul>
  <li>Actively support CTF competitions and events</li>
  <li>Participate in all major club initiatives</li>
  <li>Serve as ambassadors for the cybersecurity community</li>
  <li>Contribute to the growth and success of CSC</li>
</ul>

<h3>🎯 What You'll Gain</h3>
<ul>
  <li><strong>Leadership Experience:</strong> Develop essential leadership and management skills</li>
  <li><strong>Technical Growth:</strong> Hands-on experience in cybersecurity projects and CTF competitions</li>
  <li><strong>Portfolio Building:</strong> Real-world projects to enhance your professional portfolio</li>
  <li><strong>National Recognition:</strong> Represent Uttara University on national and international platforms</li>
  <li><strong>Network Building:</strong> Connect with cybersecurity professionals and peers</li>
  <li><strong>Career Advancement:</strong> Direct pathway to cybersecurity career opportunities</li>
</ul>

<h3>📅 Important Dates</h3>
<p><strong>Application Deadline:</strong> September 12, 2025</p>
<p><strong>Interview Period:</strong> September 15-20, 2025</p>
<p><strong>Results Announcement:</strong> September 25, 2025</p>
<p><strong>Orientation Session:</strong> October 1, 2025</p>

<h3>🔗 Apply Now</h3>
<p>Ready to take the next step in your cybersecurity journey? Submit your application today:</p>
<p><strong>Application Portal:</strong> <a href="https://cybersecurity.club.uttara.ac.bd/recruitment.html" target="_blank">cybersecurity.club.uttara.ac.bd/recruitment.html</a></p>
<p><strong>Learn About Membership:</strong> <a href="https://cybersecurity.club.uttara.ac.bd/membership.html" target="_blank">cybersecurity.club.uttara.ac.bd/membership.html</a></p>

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin-top: 20px; text-align: center;">
<h4>🤝 Together, Let's Lead, Secure, and Innovate!</h4>
<p>Join us in building a stronger cybersecurity community at Uttara University. Your journey to cybersecurity excellence starts here!</p>
</div>
        `,
        tags: ["Executive Board", "Leadership", "Recruitment", "2025-2026", "Opportunities", "Cybersecurity", "Team Building"]
    },
    2: {
        id: 2,
        title: "Congratulations to Dr. Kamal Uddin Sarker!",
        category: "Announcement",
        date: "September 4, 2025",
        author: "CSC Admin",
        image: "../assets/images/News/New_Chairman.png",
        content: `
            <p>We are thrilled to announce that <strong>Dr. Kamal Uddin Sarker</strong> has been appointed as the new <strong>Chairman of the Department of Computer Science and Engineering (CSE)</strong> at Uttara University!</p>
            
            <p>Dr. Sarker brings extensive experience in academia and research, with a strong background in computer science and engineering. His vision for innovation and excellence aligns perfectly with our department's mission to provide world-class education and foster cutting-edge research.</p>
            
            <h3>About Dr. Kamal Uddin Sarker</h3>
            <ul>
                <li>PhD in Computer Science and Engineering</li>
                <li>Over 15 years of academic and research experience</li>
                <li>Published numerous papers in international journals</li>
                <li>Expert in Artificial Intelligence, Machine Learning, and Software Engineering</li>
                <li>Former Associate Professor at leading universities</li>
            </ul>
            
            <h3>Our Excitement</h3>
            <p>As the <strong>Cyber Security Club</strong>, we are particularly excited about Dr. Sarker's appointment because of his strong support for student organizations and extracurricular activities. His leadership will undoubtedly enhance our club's initiatives and provide new opportunities for growth.</p>
            
            <p>We look forward to working closely with Dr. Sarker to:</p>
            <ul>
                <li>Expand our cybersecurity education programs</li>
                <li>Organize more technical workshops and seminars</li>
                <li>Participate in national and international competitions</li>
                <li>Build stronger industry partnerships</li>
                <li>Create more opportunities for student research</li>
            </ul>
            
            <p><strong>Please join us in congratulating Dr. Kamal Uddin Sarker on this well-deserved appointment!</strong></p>
            
            <p>We are confident that under his leadership, the CSE department will reach new heights of excellence, and our Cyber Security Club will continue to thrive and make significant contributions to the cybersecurity community.</p>
        `,
        tags: ["Chairman", "Appointment", "CSE Department", "Leadership", "Academic Excellence"]
    },
    3: {
        id: 3,
        title: "CTF Night 0x1: Beginner-Friendly Cybersecurity Challenge",
        category: "CTF",
        date: "August 15, 2025",
        author: "CTF Team",
        image: "../assets/images/News/CTF_Night0x1.png",
        content: `
            <p>Get ready for an exciting evening of cybersecurity challenges! The Cyber Security Club is proud to present <strong>CTF Night 0x1</strong>, our first beginner-friendly Capture The Flag competition of the semester.</p>
            
            <h3>🎯 Event Details</h3>
            <ul>
                <li><strong>Date:</strong> September 15, 2025</li>
                <li><strong>Time:</strong> 6:00 PM - 10:00 PM</li>
                <li><strong>Venue:</strong> Computer Lab 3, Uttara University</li>
                <li><strong>Registration:</strong> Free for all UU students</li>
                <li><strong>Team Size:</strong> 1-4 members</li>
            </ul>
            
            <h3>🏆 What to Expect</h3>
            <p>This CTF is specially designed for beginners and intermediate participants. We'll have challenges covering:</p>
            <ul>
                <li><strong>Web Security:</strong> Find vulnerabilities in web applications</li>
                <li><strong>Cryptography:</strong> Decode secret messages and break ciphers</li>
                <li><strong>Digital Forensics:</strong> Analyze digital evidence and recover hidden data</li>
                <li><strong>Binary Exploitation:</strong> Understanding basic buffer overflows</li>
                <li><strong>OSINT:</strong> Open Source Intelligence gathering techniques</li>
                <li><strong>Steganography:</strong> Find hidden messages in images and files</li>
            </ul>
            
            <h3>🎁 Prizes & Recognition</h3>
            <ul>
                <li><strong>1st Place:</strong> Gaming Mouse + Mechanical Keyboard + Certificate</li>
                <li><strong>2nd Place:</strong> Wireless Mouse + Certificate</li>
                <li><strong>3rd Place:</strong> CSC Merchandise Bundle + Certificate</li>
                <li><strong>All Participants:</strong> Digital Certificate of Participation</li>
            </ul>
            
            <h3>🚀 Why Participate?</h3>
            <ul>
                <li>Learn practical cybersecurity skills</li>
                <li>Network with like-minded peers</li>
                <li>Gain hands-on experience in ethical hacking</li>
                <li>Prepare for national CTF competitions</li>
                <li>Build your cybersecurity portfolio</li>
                <li>Have fun while learning!</li>
            </ul>
            
            <h3>📝 Registration</h3>
            <p>Registration is now open! Fill out the form below:</p>
            <p><strong>Registration Link:</strong> <a href="https://forms.gle/ctfnight0x1registration" target="_blank">https://forms.gle/ctfnight0x1registration</a></p>
            
            <p><strong>Registration Deadline:</strong> September 12, 2025</p>
            
            <h3>🤝 Preparation Tips</h3>
            <ul>
                <li>Brush up on basic networking concepts</li>
                <li>Familiarize yourself with Linux command line</li>
                <li>Learn about common web vulnerabilities (OWASP Top 10)</li>
                <li>Practice using tools like Wireshark and Burp Suite</li>
                <li>Join our Discord server for team formation and updates</li>
            </ul>
            
            <p><strong>Ready to test your skills? Join us for CTF Night 0x1 and embark on your cybersecurity journey!</strong></p>
            
            <p>For questions and updates, contact us at: <strong>cybersecurity@uttara.ac.bd</strong></p>
        `,
        tags: ["CTF", "Competition", "Cybersecurity", "Beginner", "Hands-on Learning"]
    }
};

// Function to get URL parameters
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to load news article
function loadNewsArticle() {
    const newsId = getURLParameter('id');
    const article = newsData[newsId];
    
    if (!article) {
        // Handle case where article is not found
        document.querySelector('.news-detail-main').innerHTML = `
            <div class="error-message">
                <h2>Article Not Found</h2>
                <p>The requested article could not be found.</p>
                <a href="../NewsPortal/News.html" class="back-button">← Back to News</a>
            </div>
        `;
        return;
    }

    // Update page title
    document.title = `${article.title} - CSC News`;
    
    // Update article content
    document.getElementById('articleTitle').textContent = article.title;
    document.getElementById('articleCategory').textContent = article.category;
    document.getElementById('articleDate').textContent = article.date;
    document.getElementById('articleAuthor').textContent = article.author;
    document.getElementById('articleImage').src = article.image;
    document.getElementById('articleImage').alt = article.title;
    document.getElementById('articleContent').innerHTML = article.content;
    
    // Update tags
    const tagsContainer = document.getElementById('articleTags');
    tagsContainer.innerHTML = '';
    article.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
    });
    
    // Load related news (excluding current article)
    loadRelatedNews(newsId);
    
    // Update social sharing
    updateSocialSharing(article);
}

// Function to load related news
function loadRelatedNews(currentId) {
    const relatedContainer = document.getElementById('relatedNews');
    relatedContainer.innerHTML = '';
    
    // Get other articles (excluding current one)
    const relatedArticles = Object.values(newsData).filter(article => article.id != currentId);
    
    relatedArticles.forEach(article => {
        const relatedItem = document.createElement('div');
        relatedItem.className = 'related-news-card';
        relatedItem.innerHTML = `
            <img src="${article.image}" alt="${article.title}">
            <div class="related-news-content">
                <h4>${article.title}</h4>
                <p class="related-date">${article.date}</p>
            </div>
        `;
        relatedItem.addEventListener('click', () => {
            window.location.href = `news-detail.html?id=${article.id}`;
        });
        relatedContainer.appendChild(relatedItem);
    });
}

// Function to update social sharing
function updateSocialSharing(article) {
    const currentURL = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(article.title);
    const description = encodeURIComponent(`Read about ${article.title} on CSC News`);
    
    // Update Facebook share
    const fbShare = document.querySelector('.facebook-share');
    if (fbShare) {
        fbShare.href = `https://www.facebook.com/sharer/sharer.php?u=${currentURL}`;
    }
    
    // Update Twitter share
    const twitterShare = document.querySelector('.twitter-share');
    if (twitterShare) {
        twitterShare.href = `https://twitter.com/intent/tweet?url=${currentURL}&text=${title}`;
    }
    
    // Update LinkedIn share
    const linkedinShare = document.querySelector('.linkedin-share');
    if (linkedinShare) {
        linkedinShare.href = `https://www.linkedin.com/sharing/share-offsite/?url=${currentURL}`;
    }
}

// Load article when page loads
document.addEventListener('DOMContentLoaded', loadNewsArticle);
