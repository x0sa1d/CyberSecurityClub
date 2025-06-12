// Sponsors Marquee Animation (Right to Left)

document.addEventListener("DOMContentLoaded", function () {
    const grid = document.querySelector('.home_sponsors-grid');
    if (!grid) return;

    // Get all sponsor images inside .home_sponsors-grid
    const sponsorImgs = Array.from(grid.querySelectorAll('img'));

    if (sponsorImgs.length === 0) return;

    // Create marquee wrapper
    const marquee = document.createElement('div');
    marquee.className = 'sponsors-marquee';

    const track = document.createElement('div');
    track.className = 'sponsors-marquee-track';

    // Duplicate images for seamless loop, wrap each in <a>
    sponsorImgs.concat(sponsorImgs).forEach(img => {
        const item = document.createElement('div');
        item.className = 'sponsor-marquee-item';
        const link = document.createElement('a');
        link.href = '/sponsors.html'; // Change to the actual sponsor page URL
        link.target = '_self';
        link.appendChild(img.cloneNode(true));
        item.appendChild(link);
        track.appendChild(item);
    });

    marquee.appendChild(track);

    // Replace grid content with marquee
    grid.innerHTML = '';
    grid.appendChild(marquee);
});
