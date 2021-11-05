import Swiper from 'swiper/swiper-bundle';
import Base from '../../_config/base';

class Slider extends Base {
  constructor(el) {
    super(el);
    /* eslint-disable no-unused-vars */
    const swiper = new Swiper('.swiper', {
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}

Slider.className = 'Slider';
export default Slider;
