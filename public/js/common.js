window.addEventListener('load', function (){

  // kind of handMade Swiper with gasp, can improve this to infinity
  // I would use simple ccs transition instead of gasp if it wasnt required
  // nobody is saved from bugs, but I havent seen any
  // u can reuse it many times with diff sett
  function customSlider(containerSelector, sett){
    let cont = document.querySelector(containerSelector);
    let slider = {
      //container
      sliderCont: cont,
      //slides
      slides: cont.querySelectorAll('.custom-slide-js'),
      //it take props from sett obj
      transitionDuration: sett.transitionDuration || 1,
      autoplay: sett.autoplay,
      autoplayReverse: sett.autoplayReverse,
      initialSlide: sett.initialSlide || 0,
      keyBoardControll: sett.keyBoardControll,
      arrowsPrev: document.querySelectorAll(sett.arrowsPrev || '.custom-prev-js'),
      arrowsNext: document.querySelectorAll(sett.arrowsNext || '.custom-next-js'),

      //
      activeSlide: 0,
      currentPositionX: 0,
      getSliderWidth: function (){
        let sliderW = 0;
        for (let slide of this.slides){
          sliderW += slide.offsetWidth;
        }
        return sliderW;
      },
      getSlideWidth: function (index=this.activeSlide){
        return this.slides[index].offsetWidth;
      },
      slideNext: function (event, transitionDuration=this.transitionDuration){
        let nextIndex = this.activeSlide + 1;
        let Xcord = this.currentPositionX - this.getSlideWidth();
        if (nextIndex >= this.slides.length){
          nextIndex = 0;
          Xcord = 0;
        }
        this.activeSlide = nextIndex;
        this.currentPositionX = Xcord;

        gsap.to(this.sliderCont, {x: Xcord, duration: transitionDuration, ease: "power1.inOut"});
      },
      slidePrev: function (event, transitionDuration=this.transitionDuration){
        let nextIndex = this.activeSlide - 1;
        let Xcord = this.currentPositionX + this.getSlideWidth();

        if (nextIndex < 0){
          nextIndex = this.slides.length-1;
          Xcord = (this.getSliderWidth() - this.getSlideWidth(this.slides.length-1)) * -1;
        }
        this.activeSlide = nextIndex;
        this.currentPositionX = Xcord;

        gsap.to(this.sliderCont, {x: Xcord, duration: transitionDuration, ease: "power1.inOut"});
      },
      slideTo: function (index, duration=0){
        if (index > this.activeSlide){
          while (index > this.activeSlide){
            this.slideNext(undefined, duration);
            //-this.activeSlide = this.activeSlide + 1;
          }
        }else{
          while (index < this.activeSlide){
            this.slidePrev(undefined, duration);
          }
        }
      },
      //
      setKeyBoardControll: function (){
        if (!this.keyBoardControll) return

        let slider = this;
        let keyBoardContaroll = function (){
          if (event.key === 'ArrowLeft'){
            slider.slidePrev();
          }
          if (event.key === 'ArrowRight'){
            slider.slideNext();
          }
        };

        this.sliderCont.addEventListener('mouseenter',function (){
          window.addEventListener('keyup', keyBoardContaroll);
        });
        this.sliderCont.addEventListener('mouseleave',function (){
          window.removeEventListener('keyup', keyBoardContaroll);
        })

      },
      init: function (){
        if (this.initialSlide && this.initialSlide >= 0 && this.initialSlide < this.slides.length){
          this.slideTo(this.initialSlide);
        }
        this.setKeyBoardControll();

        //
        for (let next of this.arrowsNext){
          next.addEventListener('click', this.slideNext.bind(this));
        }
        for (let prev of this.arrowsPrev){
          prev.addEventListener('click', this.slidePrev.bind(this));
        }

        if (this.autoplay && Number.isInteger(this.autoplay)){
          if (this.autoplayReverse){
            window.setInterval(this.slidePrev.bind(this), this.autoplay);
          }
          else{
            window.setInterval(this.slideNext.bind(this), this.autoplay);
          }
        }
      },
    };
    slider.init();
    return slider;
  }

  let banerSlider = customSlider('.custom-slider-js', {
    arrowsPrev: '.custom-prev1-js',
    arrowsNext: '.custom-next1-js',

    //
    keyBoardControll: true,
    //transitionDuration: 3,
    //initialSlide: 2,
    //autoplay: 3000,
    //autoplayReverse: true,
  });
  console.log(banerSlider.sliderCont);

  let banerSlider2 = customSlider('.custom-slider2-js', {
    arrowsPrev: '.custom-prev2-js',
    arrowsNext: '.custom-next2-js',
    //
    keyBoardControll: true,
    transitionDuration: 0.5,
    initialSlide: 2,
    autoplay: 5000,
    autoplayReverse: true,
  });
  console.log(banerSlider2.slides);

  //methods and property examples
  //console.log(banerSlider.getSliderWidth());
  //console.log(banerSlider.getSlideWidth());
  //console.log(banerSlider.slideNext());
  //console.log(banerSlider.slidePrev());
  //console.log(banerSlider.slideTo());

  //console.log(banerSlider.sliderCont);
  //console.log(banerSlider.slides);

})
