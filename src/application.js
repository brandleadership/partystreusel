import 'babel-polyfill';
import $ from 'jquery';
import Topbar from './materials/molecules/topbar/topbar';
import Accordion from './materials/molecules/accordion/accordion';
import Tab from './materials/molecules/tab/tab';
import Dropdown from './materials/molecules/dropdown/dropdown';
import Slider from './materials/molecules/slider/slider';

$(() => {
  $('html').removeClass('no-js');

  Topbar.init()
  Accordion.init()
  Tab.init()
  Dropdown.init()
  Slider.init()
});
