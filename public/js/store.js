gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CSSRulePlugin)

    let image = document.getElementById("image");
    let container = document.querySelector(".contain");
    let imageReveal = CSSRulePlugin.getRule(".img-container:after");
    let imageReveal1 = CSSRulePlugin.getRule(".img-container1:after");

const btn = document.querySelectorAll("#btn");

btn.forEach((btn,idx)=>{
    btn.addEventListener("click",()=>{
        gsap.to(window,{
        duration:1,
        scrollTo:{y: "#Section"+(idx + 1),
            autoKill:true,
        },
        });
    });
});


gsap.to("#image",{
    y:50,
    scrollTrigger:{
        trigger:"#Section2",
        scroller:"body",
        start:"top 50%",
        end:"bottom 50%",
        scrub:true,
    }
})


gsap.to(".image-c-2",{
    y:50,
    scrollTrigger:{
        trigger:"#Section2",
        scroller:"body",
        start:"top 50%",
        end:"bottom 50%",
        scrub:true,
    }
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

































var tl=gsap.timeline()



tl.from(".s-line",{
    x:-1490,
    duration:1,
})
tl.to(".contain", 0, { css: { visibility: "visible" } });
// Animate the mask from full width to 0%, revealing the image from left to right
tl.to(imageReveal, 0.5, { width: "0%", ease: "power2.inOut" });


gsap.from(".title-font",{
    x:300,
    duration:1,
})

gsap.from(".locate",{
    opacity:0,
    duration:1,
})


gsap.from(".time",{
    opacity:0,
    duration:1,
})



tl.from(".s-line2",{
    x:1490,
    duration:2,
})

tl.from(".image-c-2",{
    width:"0",
    duration:0.5,
})

tl.from(".title-font1",{
    x:300,
    duration:1,
})

tl.from(".locate1",{
    opacity:0,
    duration:1,
})


tl.from(".time1",{
    opacity:0,
    duration:1,
})

tl.from(".s-line3",{
    x:-1490,
    duration:2,
})
