gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);




gsap.from(".screen", {
    y: "100vh",
    ease: "power2.in",
    duration: 1.5
})
