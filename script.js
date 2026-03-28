const music = document.getElementById("bg-music");
const sndBtn = document.getElementById("sound-btn");

sndBtn.addEventListener("click", startCelebration);
function startCelebration() {
  if (music.paused || music.ended) {
    music.play().catch((error) => {
      console.log(
        "Audio play was blocked. Waiting for a stronger interaction.",
        error,
      );
    });
  } else {
    music.pause();
  }
}

window.addEventListener("load", function () {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  gsap.to("#loader", {
    autoAlpha: 0,
    duration: 0.5,
    onComplete: () => {
      document.getElementById("loader").style.display = "none";
    },
  });

  // --- SCENE 1: LANDING ---
  const introTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#intro",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
  });
  introTl
    .from("#intro", {
      autoAlpha: 0,
      duration: 1.8,
      ease: "power2.out",
    })
    .from(
      "#scrollMe",
      {
        autoAlpha: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=1", // What does this do?
    );

  // Master timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#animation-container",
      pin: true,
      start: "top top",
      end: "+=15000",
      scrub: 1, // Smoothly links the animation progress to the scrollbar (1 sec delay for the smoothness). Can this be increase to 2 or so?
    },
  });

  tl.to(".shrubs", { y: -200, scale: 3, duration: 1 })

    // Fade out layer to reveal Mehndi
    .to("#scene-landing", { autoAlpha: 0, duration: 0.5 });

  // --------------------------------------------------------------------------------------------------------------------
  // --- SCENE 2: MEHNDI ---
  tl.fromTo(
    ".l1",
    { scale: 1 },
    { x: -180, scale: 1.1, duration: 1 },
    "landing",
  )
    .fromTo(".l2", { scale: 1 }, { y: 600, scale: 1.1, duration: 1 }, "landing")
    .fromTo(".l3", { scale: 1 }, { x: 200, scale: 1.1, duration: 1 }, "landing")

    // Sun vanish and turns into a marigold
    .to(".sun", { autoAlpha: 0 })
    .to(".sunFlower", { autoAlpha: 1 }, "<")

    .fromTo(
      "#mehndiHeading",
      { autoAlpha: 0, scale: 0.8 },
      { autoAlpha: 1, scale: 1 },
    )

    // Removing greens to add marigold
    .to(".l1, .l2, .l3", { autoAlpha: 0 }, "<")
    // Moving Marigold borders in:
    .to(".floWallLeft", { x: "10vh" }, "<")
    .to(".floWallRight", { x: "-10vh" }, "<")

    .fromTo(".location", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 })
    .fromTo(".timings", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 })

    // Moving Marigold borders to close the scene:
    .to(".floWallLeft", { x: "35vh" }, "+=0.2")
    .to(".floWallRight", { x: "-35vh" }, "<")

    .to("#scene-mehndi", { autoAlpha: 0, duration: 1 }) // Reveal Sangeet

    // --------------------------------------------------------------------------------------------------------------------
    // --- SCENE 3: SANGEET ---
    .to("#carImg", {
      x: "1200vw",
      duration: 5,
    });

  tl.fromTo(
    "#sangeetDeets",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1 },
    "-=2",
  )

    .to("#sangeet", { x: "90vh", scale: 60, duration: 5 })

    .to("#scene-sangeet", { autoAlpha: 0, duration: 2 })

    // --------------------------------------------------------------------------------------------------------------------
    // --- SCENE 4: HALDI ---
    // (The Paint Transition)
    .to(
      ".paint-stroke",
      {
        scaleY: 1,
        duration: 1.5,
        stagger: 0.15,
        ease: "power2.inOut",
      },
      "<+=1.5",
    )

    .to(
      "#paint-transition",
      {
        autoAlpha: 0,
        duration: 2.5,
        ease: "power2.inOut",
      },
      "+=0.5",
    )
    .to(
      "#scene-haldi",
      {
        autoAlpha: 0,
        ease: "power2.inOut",
      },
      "<+=0.1",
    );

  // --------------------------------------------------------------------------------------------------------------------
  // --- SCENE 5: BARAAT  ---
  tl.fromTo(
    "#baraatIntro",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 0.5 },
  ).fromTo(
    "#scene-baraat",
    { autoAlpha: 1 },
    { autoAlpha: 0, duration: 1 },
    "+=2",
  );

  // --------------------------------------------------------------------------------------------------------------------
  // --- SCENE 6: TEMPLE (Your current code) ---

  // Old model
  // Temple scales up massively and fades out
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
        autoAlpha: 0,
        duration: 2.2,
        ease: "power2.inOut",
      },
      "start",
    )

    // Inner Scene (Couple and fire) starts slightly hidden/small, then scales up to meet the user
    .fromTo(
      ".couple",
      { scale: 2.3, autoAlpha: 0 },
      { scale: 2.5, autoAlpha: 1, duration: 2, ease: "power2.out" },
      "start+=0.8",
    )

    .to(".couple", {
      scale: 20,
      y: "100vh",
      duration: 3,
      ease: "power2.in",
    })

    .fromTo(
      ".fire",
      { scale: 1, autoAlpha: 0 },
      { scale: 0.5, autoAlpha: 1, duration: 2, ease: "power2.out" },
      "start+=2",
    )
    .to(
      ".inner-scene",
      {
        scale: 15,
        autoAlpha: 0,
        duration: 5,
        ease: "power2.in",
      },
      "end",
    );

  // --------------------------------------------------------------------------------------------------------------------
  tl.fromTo("#quoteContainer", { autoAlpha: 0 }, { autoAlpha: 1, duration: 2 });
  ScrollTrigger.refresh();
});

// --------------------------------------------------------------------------------------------------------------------
// --- WhatsApp RSVP Integration ---
const rsvpButton = document.querySelector("#rsvpBtn");
const groomPhoneNumber = "919935947653";

const rsvpMessage = `Namaste! We are so excited to confirm our attendance for Pavi and Bhavi's wedding!

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
