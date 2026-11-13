document.addEventListener("DOMContentLoaded", function() {

    const envelope = document.getElementById("envelope");
    const openButton = document.getElementById("openInvitation");

    openButton.addEventListener("click", function() {

        // Open the envelope
        envelope.classList.add("opened");

        // Hide the envelope after 1.5 seconds
        setTimeout(function() {
            envelope.classList.add("hidden");
        }, 1500);

    });

});
// Wedding date
const weddingDate = new Date("December 27, 2026 14:00:00").getTime();
// Update countdown
function updateCountdown() {

    const now = new Date().getTime();

    const difference = weddingDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

}

// Run immediately
updateCountdown();

// Update every second
setInterval(updateCountdown, 1000);
// RSVP Form


// GOOGLE SHEETS CONNECTION

const scriptURL = "https://script.google.com/macros/s/AKfycbysXbczWqjNlILJluAlyiQb8rr267p0HeQdJPQZRGw0lwW8XnD0fdTUvZdU81-bRGGU4Q/exec";

const rsvpForm = document.getElementById("rsvpForm");

rsvpForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const guestName = document.getElementById("guestName").value;
    const attendance = document.getElementById("attendance").value;
    const guestCount = document.getElementById("guestCount").value;

    const message = document.getElementById("rsvpMessage");
    const submitButton = rsvpForm.querySelector("button");

    const formData = {
        guestName: guestName,
        attendance: attendance,
        guestCount: guestCount
    };

    submitButton.disabled = true;
    message.innerText = "Submitting your response...";

    try {

        await fetch(scriptURL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain"
            },
            body: JSON.stringify(formData)
        });

        message.innerText =
            "Thank you, " + guestName + "! Your response has been submitted.";

        rsvpForm.reset();

    } catch (error) {

        message.innerText =
            "Something went wrong. Please try again.";

        console.error(error);

    } finally {

        submitButton.disabled = false;

    }

});
// Background Music


const music = document.getElementById("weddingMusic");
const musicButton = document.getElementById("musicButton");

musicButton.addEventListener("click", function () {

    if (music.paused) {

        music.play()
            .then(function () {
                musicButton.innerText = "Ⅱ";
            })
            .catch(function (error) {
                console.error("Music playback failed:", error);
                alert("Music could not be played. Please check the audio file.");
            });

    } else {

        music.pause();
        musicButton.innerText = "♫";

    }

});

// Reveal sections when they enter the screen
const revealSections = document.querySelectorAll(
    "#countdown, #details, #venue, #rsvp"
);

revealSections.forEach(section => {
    section.classList.add("reveal");
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealSections.forEach(section => {
    observer.observe(section);
});
