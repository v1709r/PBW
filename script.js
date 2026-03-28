// JAVASCRIPT

// Define our audio and overlay elements
const music = document.getElementById("bg-music");
const sndBtn = document.getElementById("sound-btn");

sndBtn.addEventListener("click", startCelebration);

// Function to handle the starting interaction
function startCelebration() {
  if (music.paused || music.ended) {
    music.play().catch((error) => {
      // This handles edge cases where the play is still blocked (e.g., in low-power mode)
      console.log(
        "Audio play was blocked. Waiting for a stronger interaction.",
        error,
      );
    });
  } else {
    music.pause();
  }
}

// Register plugin
gsap.registerPlugin(ScrollTrigger);

// New multi-scene model:
// --- SCENE 1: LANDING ---

gsap.to("#loader", { opacity: 0, duration: 10 }, "loader");

// Intro text animation. Appears as soon as the page loads.
const introTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#intro",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse",
    once: false,
  },
});
introTl
  .from(
    "#intro",
    {
      opacity: 0,
      duration: 1.8,
      ease: "power2.out",
    },
    "<+5=loader",
  )
  .from("#scrollMe", {
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
  });

// Create the master timeline
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#animation-container",
    pin: true, // Lock the screen in place
    start: "top top", // When the top of the container hits top of the viewport
    end: "+=15000", // Creates 2500px of artificial scroll space for the animation
    scrub: 1, // Smoothly links the animation progress to the scrollbar (1 sec delay for the smoothness). Can this be increase to 2 or so?
  },
});

tl

  // Shrubs rise
  .to(".shrubs", { y: -200, scale: 3, duration: 1 })

  // Fade out layer to reveal Mehndi
  .to("#scene-landing", { opacity: 0, duration: 0.5 })

  // Zoom through leaves vanishes
  // .fromTo(
  //   ".l1",
  //   { scale: 1 },
  //   { x: -100, scale: 1.1, duration: 1, opacity: 0 },
  //   "#scene-landing",
  // )
  // .fromTo(
  //   ".l2",
  //   { scale: 1 },
  //   { y: 500, scale: 1.1, duration: 1, opacity: 0 },
  //   "#scene-landing",
  // )
  // .fromTo(
  //   ".l3",
  //   { scale: 1 },
  //   { x: 200, scale: 1.1, duration: 1, opacity: 0 },
  //   "#scene-landing",
  // );

  // Zoom through-no vanishes
  .fromTo(
    ".l1",
    { scale: 1 },
    { x: -180, scale: 1.1, duration: 1 },
    "#scene-landing",
  )
  .fromTo(
    ".l2",
    { scale: 1 },
    { y: 600, scale: 1.1, duration: 1 },
    "#scene-landing",
  )
  .fromTo(
    ".l3",
    { scale: 1 },
    { x: 200, scale: 1.1, duration: 1 },
    "#scene-landing",
  );

// --- SCENE 2: MEHNDI ---
tl

  // Sun vanish and turns into a marigold
  .to(".sun", { opacity: 0 })
  .to(".sunFlower", { opacity: 1 }, ".sun")

  .fromTo(
    "#mehndiHeading",
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1 },
  )

  // Removing greens to add marigold
  .to(".l1", { opacity: 0 }, "#mehndiHeading")
  .to(".l2", { opacity: 0 }, "#mehndiHeading")
  .to(".l3", { opacity: 0 }, "#mehndiHeading")

  // Moving Marigold borders in:
  .to(".floWallLeft", { x: "10vh" }, "#mehndiHeading")
  .to(".floWallRight", { x: "-10vh" }, "#mehndiHeading")

  .fromTo(".location", { opacity: 0 }, { opacity: 1, duration: 1 })
  .fromTo(".timings", { opacity: 0 }, { opacity: 1, duration: 1 })

  // Moving Marigold borders to close the scene:
  .to(".floWallLeft", { x: "35vh" }, ".timings+0.2")
  .to(".floWallRight", { x: "-35vh" }, ".timings+0.2")

  .to("#scene-mehndi", { opacity: 0, duration: 1 }); // Reveal Sangeet

// --- SCENE 3: SANGEET ---

// Driver drives across
gsap.to("#carImg", {
  x: "1200vw",
  duration: 5,
  scrollTrigger: {
    trigger: "scene-sangeet",
    start: "top center",
    scrub: "true",
  },
});

tl.fromTo("#sangeetDeets", { opacity: 0 }, { opacity: 1, duration: 1 }, "<+=3")

  .to("#sangeet", { x: "80vh", scale: 15, duration: 5 }, "<+=10") // Zoom into text

  .to("#scene-sangeet", { opacity: 0, duration: 2 })

  // --- SCENE 4: HALDI (The Paint Transition) ---
  // 1. Paint the screen yellow OVER the Sangeet zoom
  .to(
    ".paint-stroke",
    {
      scaleY: 1, // Grow the paint to full height
      duration: 1.5,
      stagger: 0.15, // Delay each stroke slightly for a realistic wiping effect
      ease: "power2.inOut",
    },
    "<+=1.5",
  ) // Starts painting just as the text zoom is finishing

  // Fade out the yellow paint to reveal the beautifully styled Haldi scene underneath
  .to(
    "#paint-transition",
    {
      opacity: 0,
      duration: 2.5,
      ease: "power2.inOut",
    },
    "+=0.5",
  )
  .to(
    "#scene-haldi",
    {
      opacity: 0,
      // duration: 2.5, // Required! This dictates how much scrolling it takes to fade out
      ease: "power2.inOut",
    },
    "<+=0.1",
  );

// --- SCENE 5: BARAAT  ---
tl.fromTo("#baraatIntro", { opacity: 0 }, { opacity: 1, duration: 0.5 }).fromTo(
  "#scene-baraat",
  { opacity: 1 },
  { opacity: 0, duration: 1 },
  "+=2",
);

// --- SCENE 6: TEMPLE (Your current code) ---
// This happens at the very end of the timeline

// tl.to(
//   ".temple-left",
//   { rotationY: -120, duration: 5, ease: "power1.out" },
//   "templeStart",
// ).to(
//   ".temple-right",
//   { rotationY: 120, duration: 5, ease: "power1.out" },
//   "templeStart",
// );
// ... rest of your temple logic
// ----------------------

// Old model
// Step 1: Temple scales up massively and fades out
tl.to(
  ".temple-left",
  {
    rotationY: -120,
    duration: 4,
    ease: "power1.out",
  },
  "start",
)
  .to(
    ".temple-right",
    {
      rotationY: 120,
      duration: 4,
      ease: "power1.out",
    },
    "start",
  )

  .to(
    ".temple-wrapper",
    {
      scale: 3,
      y: -200,
      opacity: 0,
      duration: 2.2, // Slightly longer than the swing for the doors to open smoothly
      ease: "power2.inOut",
    },
    "start", // "start" is a label for multiple animation to happen at the same time
  )

  // Step 2: Inner Scene (Couple and fire) starts slightly hidden/small, then scales up to meet the user
  .fromTo(
    ".couple",
    { scale: 2.3, opacity: 0 },
    { scale: 2.5, opacity: 1, duration: 2, ease: "power2.out" },
    "start+=0.8", // starts slightly after the temple begins opening
  )

  .to(".couple", {
    scale: 20,
    // opacity: 0,
    y: "100vh",
    duration: 3,
    ease: "power2.in",
  })

  .fromTo(
    ".fire",
    { scale: 1, opacity: 0 },
    { scale: 0.5, opacity: 1, duration: 2, ease: "power2.out" },
    "start+=2",
  )

  // Step 3: User scrolls completely INTO the fire (scales massive, fades out)
  .to(
    ".inner-scene",
    {
      scale: 15,
      opacity: 0,
      duration: 5,
      ease: "power2.in",
    },
    "end",
  );
// .to(
//   "#animation-container",
//   {
//     scale: 100,
//     duration: 2,
//     ease: "power2.in",
//   },
//   "end",
// );

tl.fromTo("#quoteContainer", { opacity: 0 }, { opacity: 1, duration: 2 });

// --- WhatsApp RSVP Integration ---
const rsvpButton = document.querySelector("#rsvpBtn");
const groomPhoneNumber = "91993547653";

const rsvpMessage = `Namaste! We are so excited to confirm our attendance for Pavi and Bhavi's wedding! 🎉

Here are our details:
* Names of Guests: 
* Total Number of People: 
* Expected Arrival (Date & Time): 

(Note: We are attaching our Aadhar cards to this chat for the hotel check-in as requested!)`;
const encodedMessage = encodeURIComponent(rsvpMessage);
const whatsappUrl = `https://wa.me/${groomPhoneNumber}?text=${encodedMessage}`;
rsvpButton.addEventListener("click", () => {
  window.open(whatsappUrl, "_blank");
});
