#= require partystreusel/base
#= require partystreusel/scroll_to
#= require jquery.cycle2
#= require jquery.cycle2.swipe

class Slider extends Partystreusel.Base
  @className = 'Slider'

  constructor: (el) ->
    super
    @initializeCycle()

  initializeCycle: ->
    # see for documenation and options:
    # https://github.com/malsup/cycle2
    @$el.cycle
      slides: '.slider__item'
      fx: 'scrollHorz'
      speed: 300
      timeout: 0
      next: '.slider__control-next'
      prev: '.slider__control-prev'
      pager: '.slider__nav'
      pagerActiveClass: 'slider__nav-item--active'
      pagerTemplate: "<a class='slider__nav-item' href='#'></a>"
      swipe: true

Partystreusel.Slider = Slider
