// News Detail Page JavaScript

// Sample news data (in a real application, this would come from a database/API)
const newsData = {
    1: {
        id: 1,
        title: "Congratulations to Dr. Kamal Uddin Sarker!",
        category: "Announcement",
        date: "September 4, 2025",
        author: "CSC Admin",
        image: "../assets/images/News/New_Chairman.png",
        content: `
            <p>The Cyber Security Club, Uttara University extends its sincere congratulations to <strong>Dr. Kamal Uddin Sarker</strong>, Associate Professor, on his appointment as the Chairman of the Department of CSE, Uttara University.</p>
            
            <h3>Academic Background</h3>
            <p>Dr. Sarker earned his PhD from <strong>University UMT - Universiti Malaysia Terengganu</strong> and a Pg Cert from <strong>Coventry University, UK</strong>. His extensive educational background and research expertise make him an ideal leader for our department.</p>
            
            <h3>Leadership Vision</h3>
            <p>With his strong academic background, research expertise, and proven leadership capabilities, we are confident that the Department of CSE will continue to thrive and achieve new milestones under his guidance. Dr. Sarker brings a wealth of experience in:</p>
            <ul>
                <li>Computer Science Education</li>
                <li>Research and Development</li>
                <li>Industry Collaboration</li>
                <li>Student Mentorship</li>
            </ul>
            
            <h3>Future Outlook</h3>
            <p>Under Dr. Sarker's leadership, we expect to see enhanced collaboration between the department and industry partners, increased research opportunities for students, and continued excellence in computer science education.</p>
            
            <p>We wish him great success in this important role and look forward to working closely with him to advance the goals of both the CSE department and the Cyber Security Club.</p>
        `,
        tags: ["Leadership", "CSE Department", "Chairman", "Academic Excellence"]
    },
    2: {
        id: 2,
        title: "New Executive Board 2025-2026",
        category: "Team",
        date: "August 19, 2025",
        author: "CSC Team",
        image: "../assets/images/csc_blue.png",
        content: `
            <p>We're excited to announce our new executive board for 2025-2026. Meet the team that will lead us to new heights in cybersecurity education and innovation.</p>
            
            <h3>New Leadership Team</h3>
            <p>Our new executive board brings together experienced professionals and passionate students committed to advancing cybersecurity awareness and education at Uttara University. The team consists of:</p>
            
            <h4>Executive Positions</h4>
            <ul>
                <li><strong>President:</strong> Leading the overall vision and strategic direction</li>
                <li><strong>Vice President:</strong> Supporting operations and member engagement</li>
                <li><strong>Secretary:</strong> Managing documentation and communications</li>
                <li><strong>Treasurer:</strong> Overseeing financial planning and resources</li>
            </ul>
            
            <h4>Department Heads</h4>
            <ul>
                <li><strong>Events Coordinator:</strong> Organizing workshops, competitions, and seminars</li>
                <li><strong>Technical Lead:</strong> Managing CTF teams and technical projects</li>
                <li><strong>Public Relations:</strong> Handling external communications and partnerships</li>
                <li><strong>Marketing Director:</strong> Promoting club activities and achievements</li>
            </ul>
            
            <h3>Goals for 2025-2026</h3>
            <p>The new board has set ambitious goals for the upcoming academic year:</p>
            <ol>
                <li>Increase active membership by 50%</li>
                <li>Host monthly cybersecurity workshops</li>
                <li>Participate in national and international CTF competitions</li>
                <li>Establish partnerships with industry leaders</li>
                <li>Launch a cybersecurity awareness campaign</li>
            </ol>
            
            <p>We're confident that this talented team will drive our club to new achievements and continue building our reputation as a leading cybersecurity organization in Bangladesh.</p>
        `,
        tags: ["Executive Board", "Leadership", "Team", "2025-2026", "Goals"]
    },
    3: {
        id: 3,
        title: "CTF Night 0x1: Competition Event",
        category: "Event",
        date: "August 15, 2025",
        author: "CTF Team",
        image: "../assets/images/News/CTF_Night0x1.png",
        content: `
            <p>Join us for an exciting Capture The Flag competition night! Test your cybersecurity skills, learn new techniques, and compete with fellow enthusiasts in various security challenges.</p>
            
            <h3>Event Overview</h3>
            <p>CTF Night 0x1 is our inaugural monthly CTF competition designed to provide hands-on experience in cybersecurity. This event will feature multiple categories of challenges designed to test different aspects of information security knowledge.</p>
            
            <h3>Challenge Categories</h3>
            <ul>
                <li><strong>Web Security:</strong> Identify and exploit web application vulnerabilities</li>
                <li><strong>Cryptography:</strong> Solve encryption and decryption puzzles</li>
                <li><strong>Reverse Engineering:</strong> Analyze and understand compiled programs</li>
                <li><strong>Digital Forensics:</strong> Investigate digital evidence and artifacts</li>
                <li><strong>Network Security:</strong> Analyze network traffic and protocols</li>
                <li><strong>Steganography:</strong> Find hidden messages in images and files</li>
            </ul>
            
            <h3>Competition Format</h3>
            <p>The competition will run for 4 hours, from 6:00 PM to 10:00 PM. Participants can compete individually or in teams of up to 3 members. Challenges range from beginner to advanced levels, ensuring everyone can participate regardless of their experience.</p>
            
            <h3>Prizes and Recognition</h3>
            <ul>
                <li>1st Place: Trophy + Certificate + CSC Merchandise</li>
                <li>2nd Place: Certificate + CSC Merchandise</li>
                <li>3rd Place: Certificate + CSC Merchandise</li>
                <li>All participants receive participation certificates</li>
            </ul>
            
            <h3>Registration</h3>
            <p>Registration is free for all Uttara University students. Non-students can participate with a nominal fee. Register early as seats are limited!</p>
            
            <p>This event promises to be both educational and exciting. Whether you're a beginner looking to learn or an experienced player seeking a challenge, CTF Night 0x1 has something for everyone!</p>
        `,
        tags: ["CTF", "Competition", "Cybersecurity", "Hacking", "Challenge"]
    }
};

document.addEventListener('DOMContentLoaded', function() {
    loadNewsArticle();
    loadRelatedNews();
});

function loadNewsArticle() {
    // Get article ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id') || '1';
    
    // Get article data
    const article = newsData[articleId];
    
    if (article) {
        // Update page content
        document.getElementById('articleTitle').textContent = article.title;
        document.getElementById('articleImage').src = article.image;
        document.getElementById('articleImage').alt = article.title;
        document.getElementById('articleContent').innerHTML = article.content;
        
        // Update meta information
        const metaSection = document.querySelector('.article-meta');
        metaSection.innerHTML = `
            <span class="article-category">${article.category}</span>
            <span class="article-date"><i class="fas fa-calendar"></i> ${article.date}</span>
            <span class="article-author"><i class="fas fa-user"></i> ${article.author}</span>
        `;
        
        // Update tags
        const tagsSection = document.getElementById('articleTags');
        if (article.tags && article.tags.length > 0) {
            tagsSection.innerHTML = `
                <h4>Tags:</h4>
                <div class="tag-list">
                    ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            `;
        }
        
        // Update page title
        document.title = `${article.title} - Cyber Security Club, Uttara University`;
    } else {
        // Handle article not found
        document.getElementById('articleTitle').textContent = 'Article Not Found';
        document.getElementById('articleContent').innerHTML = '<p>The requested article could not be found.</p>';
    }
}

function loadRelatedNews() {
    const relatedNewsContainer = document.getElementById('relatedNews');
    
    // Get current article ID
    const urlParams = new URLSearchParams(window.location.search);
    const currentId = urlParams.get('id') || '1';
    
    // Get related articles (excluding current one)
    const relatedArticles = Object.values(newsData)
        .filter(article => article.id.toString() !== currentId)
        .slice(0, 3); // Show only 3 related articles
    
    if (relatedArticles.length > 0) {
        relatedNewsContainer.innerHTML = relatedArticles.map(article => `
            <div class="related-news-card">
                <div class="related-news-image">
                    <img src="${article.image}" alt="${article.title}">
                </div>
                <div class="related-news-content">
                    <h4 class="related-news-title">${article.title}</h4>
                    <p class="related-news-date">${article.date}</p>
                    <a href="news-detail.html?id=${article.id}" class="related-news-link">Read More</a>
                </div>
            </div>
        `).join('');
    } else {
        relatedNewsContainer.innerHTML = '<p>No related articles found.</p>';
    }
}

// Social sharing functions
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.getElementById('articleTitle').textContent);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.getElementById('articleTitle').textContent);
    window.open(`https://twitter.com/intent/tweet?text=${title}&url=${url}`, '_blank', 'width=600,height=400');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.getElementById('articleTitle').textContent);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(function() {
        // Show success message
        const copyBtn = document.querySelector('.share-btn.copy');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.style.background = '#28a745';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.style.background = '';
        }, 2000);
    });
}
