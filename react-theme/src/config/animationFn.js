export function scrollAnimation(slider,slideItems) {
  const services = document.querySelector(slider);
  if(services){
    const startAnimation = services.offsetTop - window.innerHeight/2;
    const slides = services.querySelectorAll(slideItems);

    window.addEventListener('scroll', () => {
      if(window.scrollY > startAnimation && !services.classList.contains('animated')){
        services.classList.add('animated');
        let duration = 500;
        if (window.innerWidth < 1024)
          duration = 0;
        slides.forEach( (slide, i) => {
          setTimeout( () => {
            slide.classList.add('animated', 'fadeIn');
          }, i * duration);
        });
      }
    })
  }
};