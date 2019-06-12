import Topbar from './02-molecules/topbar/topbar';
import Accordion from './02-molecules/accordion/accordion';
import Tab from './02-molecules/tab/tab';
import Dropdown from './02-molecules/dropdown/dropdown';
import Slider from './02-molecules/slider/slider';
import Embed from './02-molecules/embed/embed';
import Offcanvas from './03-organisms/offcanvas/offcanvas';

require('./main.scss');

function ready(fn) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(() => {
  const html = document.querySelector('html');
  const Streusel = window.Streusel || {};

  html.classList.remove('no-js');

  Streusel.Topbar = Topbar.init();
  Streusel.Accordion = Accordion.init();
  Streusel.Tab = Tab.init();
  Streusel.Dropdown = Dropdown.init();
  Streusel.Slider = Slider.init();
  Streusel.Embed = Embed.init();
  Streusel.Offcanvas = Offcanvas.init();
});
