class Slider {
  constructor(id) {
    this.slider = document.querySelector('#' + id);
    this.init();
  }

  init = () => {
    this.index = 1;
    this.track = this.slider.querySelector('[data-slider-track]');
    this.cloneFirstAndLastSlides();
    this.slides = this.slider.querySelectorAll('[data-slide]');
    this.quantitySlides = this.slides.length;
    this.slideWidth = this.slides[0].offsetWidth;
    this.prevBtn = this.slider.querySelector('[data-prev]');
    this.nextBtn = this.slider.querySelector('[data-next]');
    this.dots = this.slider.querySelector('[data-dots]');
    this.setPositionTrack();
    this.navigation();
  }

  navigation = () => {
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', this.next);
    }

    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', this.prev);
    }

    if (this.dots) {
      this.dots.addEventListener('click', this.dotNavigation);
    }
  }

  cloneFirstAndLastSlides = () => {
    const firstSlide = this.track.firstElementChild;
    const lastSlide = this.track.lastElementChild;
    const firstSlideClone = this.createSlideClone(firstSlide, 'last')
    const lastSlideClone = this.createSlideClone(lastSlide, 'first')
    this.track.prepend(lastSlideClone);
    this.track.append(firstSlideClone);
  }

  createSlideClone = (donorSlide, valueDataAttr) => {
    const clone = document.createElement('span')
    clone.innerHTML = donorSlide.innerHTML;
    clone.classList.add('slide')
    clone.setAttribute('data-clone', valueDataAttr);
    clone.setAttribute('data-slide', '');
    return clone;
  }



  next = () => {
    this.index >= this.quantitySlides - 1 ? false : this.index++;
    this.track.style.transition = "transform .3s ease-in-out";
    this.setPositionTrack();
    this.changingTrackPositionByReachingEdge();
  }

  prev = () => {
    this.index <= 0 ? false : this.index--;
    this.track.style.transition = "transform .3s ease-in-out";
    this.setPositionTrack();
    this.changingTrackPositionByReachingEdge();
  }

  dotNavigation = (e) => {
    const dot = e.target.closest('[data-dot]');
    if (!dot) {
      return;
    }
    const dotIdx = dot.dataset.idx;
    this.index = dotIdx;
    this.track.style.transition = "transform .3s ease-in-out";
    this.setPositionTrack();
  }



  setPositionTrack = () => {
    const position = this.getShiftTrack()
    this.track.style.transform = `translateX(-${position}px)`;
  }
  getShiftTrack = () => {
    return this.index * this.slideWidth;
  }

  changingTrackPositionByReachingEdge = () => {
    this.track.addEventListener('transitionend', () => {
      this.slides[this.index].dataset.clone === 'last' ? this.index = 1 : this.index;

      this.slides[this.index].dataset.clone === 'first' ? this.index = this.quantitySlides - 2 : this.index;

      this.track.style.transition = "none";

      this.setPositionTrack()

    })
  }
}

const slider = new Slider('slider');
console.log(slider)