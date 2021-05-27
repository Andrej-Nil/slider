class Slider {
  constructor(id) {
    this.index = 1;
    this.slider = document.querySelector('#' + id);
    this.track = this.slider.querySelector('[data-slider-track]');
    this.slides = this.slider.querySelectorAll('[data-slide]');
    this.prevBtn = this.slider.querySelector('[data-prev]');
    this.nextBtn = this.slider.querySelector('[data-next]');
    this.dots = this.slider.querySelector('[data-dots]');
    this.sliderWidth = this.slides[0].offsetWidth;
    this.firstSlide = this.track.firstElementChild;
    this.lastSlide = this.track.lastElementChild;
    this.firstSlideClone = this.createSlideClone(this.firstSlide, 'data-first-clone')
    this.listSlideClone = this.createSlideClone(this.lastSlide, 'data-last-clone')
    this.track.prepend(this.listSlideClone);
    this.track.append(this.firstSlideClone);
  }

  createSlideClone(donorSlide, attribute) {
    const clone = document.createElement('span')
    clone.innerHTML = donorSlide.innerHTML;
    clone.classList.add('slide')
    clone.setAttribute(attribute, '');
    return clone;
  }

  startPositionTrack() {

  }








}

const slider = new Slider('slider');
console.log(slider)