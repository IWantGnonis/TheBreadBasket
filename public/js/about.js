gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);








gsap.from(".text-1",{
    opacity:0,
    stagger:1,
    duration:1,
    delay:1.5
})
gsap.from(".grandbox",{
  opacity:0,
  scrollTrigger:{
    trigger:".grandbox",
    scroller:"body",
    start:"top 50%",
    end:"bottom 50%",

  }
})

gsap.to(window,{
  scrollTo:0
})

