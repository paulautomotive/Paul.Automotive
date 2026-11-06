// Paul.Automotive

const elements = document.querySelectorAll(
    ".service-card, .video-card"
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    },
    {
        threshold: 0.1
    }
);

elements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(element);
});

// Haal automatisch de officiële voorbeeldafbeelding van iedere TikTok-video op.
document.querySelectorAll(".video-card").forEach(async (card) => {
    try {
        const videoUrl = card.href;
        const apiUrl = "https://www.tiktok.com/oembed?url=" + encodeURIComponent(videoUrl);
        const response = await fetch(apiUrl);

        if (!response.ok) return;

        const videoData = await response.json();
        if (!videoData.thumbnail_url) return;

        const thumbnail = new URL(videoData.thumbnail_url);
        const allowedHost = thumbnail.hostname.endsWith(".tiktokcdn.com") ||
            thumbnail.hostname.endsWith(".muscdn.com");

        if (!allowedHost) return;

        card.style.backgroundImage =
            'linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.12) 40%, rgba(0,0,0,.82)), url("' +
            thumbnail.href.replace(/["\\]/g, "") + '")';
    } catch (error) {
        // Als TikTok geen preview terugstuurt, blijft de nette donkere kaart zichtbaar.
        console.log("TikTok-preview kon niet worden geladen.");
    }
});

console.log("Welkom bij Paul.Automotive!");
