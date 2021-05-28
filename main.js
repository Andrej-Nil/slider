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
    this.nextBtn.addEventListener('click', this.next)
    this.prevBtn.addEventListener('click', this.prev)
  }

  cloneFirstAndLastSlides = () => {
    const firstSlide = this.track.firstElementChild;
    const lastSlide = this.track.lastElementChild;
    const firstSlideClone = this.createSlideClone(firstSlide, 'lastSlideClone')
    const lastSlideClone = this.createSlideClone(lastSlide, 'firstSlideClone')
    this.track.prepend(lastSlideClone);
    this.track.append(firstSlideClone);
  }

  createSlideClone = (donorSlide, valueDataAttr) => {
    const clone = document.createElement('span')
    clone.innerHTML = donorSlide.innerHTML;
    clone.classList.add('slide')
    clone.setAttribute('data-idx', valueDataAttr);
    clone.setAttribute('data-slide', '');
    return clone;
  }

  setPositionTrack = () => {
    const position = this.getShistTrack()
    this.track.style.transform = `translateX(-${position}px)`;
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

  changingTrackPositionByReachingEdge = () => {
    this.track.addEventListener('transitionend', () => {
      this.slides[this.index].getAttribute('data-idx') === 'lastSlideClone' ? this.index = 1 : this.index;

      this.slides[this.index].getAttribute('data-idx') === 'firstSlideClone' ? this.index = this.quantitySlides - 2 : this.index;

      this.track.style.transition = "none";

      this.setPositionTrack()

    })
  }

  getShistTrack = () => {
    return this.index * this.slideWidth;
  }
}

const slider = new Slider('slider');
console.log(slider)