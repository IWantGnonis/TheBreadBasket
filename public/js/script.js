gsap.registerPlugin(ScrollTrigger);



gsap.from(".animation",{
    y:100,
    duration:0.3,
    delay:0.4,
    stagger:1
})



  //Menu










//Video PAge Animation



gsap.from(".VIDEO video",{
    scale:0.4,
    scrollTrigger:{
        trigger:".VIDEO",
        scroller:"body",
        scrub:1,
        start:"top 100%",
        end:"bottom 100%",
    }
})
gsap.to("#texts",{
    transform:"translateX(-31%)",
    scrollTrigger:{
        trigger:".page3",
        scroller:"body",
        scrub:1,
        start:"top 0%",
        end:"top -100%",
        pin:true,
        pinSpacing:"texts"
      }
    })
    gsap.from(".left-img",{
      y:100,
      scrollTrigger:{
        trigger:".left-img",
        scroller:"body",
        scrub:1,
        start:"top 50%",
        end:"bottom 50%",
      }
})










  //Page4 Add animation for the bread title
  document.addEventListener('DOMContentLoaded', () => {
    // Create a timeline for the bread title parallax effect
    gsap.to('.bread-title', {
      scrollTrigger: {
        trigger: '.main-scroll',
        start: 'top top',
        end: 'bottom center',
        scrub: "true",
        // markers:"true", // Enable for debugging
      },
      y: 100, // Adjust this value to control scroll distance
      opacity: 0,
      ease: 'none'
    });
  
    // Optional: Add parallax effect to images as well
    gsap.to('.scrollimg1', {
      scrollTrigger: {
        trigger: '.main-scroll',
        start: 'top center',
        end: 'bottom center',
        scrub: true
      },
      y: 50,
      x:-50,
      ease: 'none'
    });
  
    gsap.to('.scrollimg2', {
      scrollTrigger: {
        trigger: '.main-scroll',
        start: 'top center',
        end: 'bottom center',
        scrub: true
      },
      y: -50,
      x:50,
      ease: 'none'
    });
  });
  















//Page5
document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.scroll-section');
  const scrollText = document.querySelector('.scroll-text');
  const leftImages = document.querySelectorAll('.left-images img');
  const rightImages = document.querySelectorAll('.right-images img');

  const handleScroll = () => {
    const rect = section.getBoundingClientRect();
    const scrollProgress = -rect.top / (rect.height - window.innerHeight);
    
    // Only update when section is in view
    if (rect.top <= 0 && rect.bottom >= 0) {
      // Move text based on scroll position
      const textMove = Math.max(-100, 100 - (scrollProgress * 200));
      scrollText.style.transform = `translateY(${textMove}vh)`;

      // Show images when they come into view
      // leftImages.forEach((img, index) => {
      //   if (scrollProgress > 0.1 + (index * 0.2)) {
      //     img.classList.add('visible');
      //   } else {
      //     img.classList.remove('visible');
      //   }
      // });

      // rightImages.forEach((img, index) => {
      //   if (scrollProgress > 0.2 + (index * 0.2)) {
      //     img.classList.add('visible');
      //   } else {
      //     img.classList.remove('visible');
      //   }
      // });
    }
  };

  // Initial check
  handleScroll();

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
});







/*Page-4*/
/*
var hover1=document.querySelector(".hover-set-1")

hover1.addEventListener("mouseenter",function(){
    gsap.to(".img1-page-5",{
        y:-470,
        duration:1.5,
    })
})
hover1.addEventListener("mouseleave",function(){
    gsap.to(".img1-page-5",{
        y:300,
        duration:3.5,
    })
})




var hover2=document.querySelector(".hover-set-2")

hover2.addEventListener("mouseenter",function(){
    gsap.to(".img2-page-5",{
        y:-470,
        duration:1.5,
    })
})
hover2.addEventListener("mouseleave",function(){

    gsap.to(".img2-page-5",{
        y:300,
        duration:3.5,
    })
})



var hover3=document.querySelector(".hover-set-3")

hover3.addEventListener("mouseenter",function(){
    gsap.to(".img3-page-5",{
        y:-470,
        duration:1.5,
    })
})
hover3.addEventListener("mouseleave",function(){

    gsap.to(".img3-page-5",{
        y:300,
        duration:3.5,
    })
})*/


// const elementsWorks = document.querySelectorAll(".item-work");
// const slidePicWorks = document.querySelector("#gallery-work");
// const slidePicsWorks = document.querySelector("#work-images");

// gsap.set(slidePicWorks, { autoAlpha: 0 });

// elementsWorks.forEach((element, index) => {
//   element.addEventListener("mouseenter", function () {
//     gsap.to(slidePicsWorks, {
//       marginTop: `-${280 * index}px`,
//       duration: 0.2,
//       ease: "power1",
//     });
//   });

//   element.addEventListener("mouseleave", function () {
//     gsap.to(element, { color: "initial", duration: 0.2, ease: "power1" });
//   });
// });

// window.addEventListener("mousemove", function (e) {
//   gsap.to(slidePicWorks, {
//     top: `${e.clientY}px`,
//     left: `${e.clientX}px`,
//     xPercent: -20,
//     yPercent: -45,
//     duration: 0.2,
//     ease: "power1",
//   });
// });

// document
//   .querySelector(".items-works")
//   .addEventListener("mouseenter", function () {
//     gsap.to(slidePicWorks, {
//       autoAlpha: 1,
//       duration: 0.2,
//       ease: "power1",
//     });
//   });

// document
//   .querySelector(".items-works")
//   .addEventListener("mouseleave", function () {
//     gsap.to(slidePicWorks, {
//       autoAlpha: 0,
//       duration: 0.2,
//       ease: "power1",
//     });
//   });








































/*footer*/

gsap.from(".grandbox",{
    opacity:0,
    scrollTrigger:{
      trigger:".grandbox",
      scroller:"body",
      start:"top 50%",
      end:"bottom 50%",
  
    }
  })

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    
    try {
        const response = await fetch('/your-endpoint', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            window.location.href = '/success-page'; // Redirect after successful submission
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Add this to prevent back navigation after form submission
window.history.pushState(null, '', window.location.href);
window.onpopstate = function () {
    window.history.pushState(null, '', window.location.href);
};










// Add this to your script file


