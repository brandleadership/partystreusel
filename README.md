# Partystreusel

## Installation
Add **partystreusel** to your Gemfile `gem 'partystreusel'` and bundle. Done.

## Available components:
  * **Expandable Content:** enables a "read more" button to show or hide additional content.
  * **Accordion:** Allows for multiple nested accordions.
  * **Carousel:** Allows 2-dimensional scrolling in vertical and horizontal direction. The images are thereby divided into image-groups. The image-group to image-group scrolling is vertically, scrolling inside the image-group is horizontally.

## Usage in Rails:
Most components have a backbone.js dependency. Satisfy it by loading backbone.js:

    gem 'rails-backbone'

Then, require backbone.js and underscore.js in your manifest, usually application.js(.coffee):

    #= require underscore
    #= require backbone

## Expandable Content

Load it inside your manifest, usually application.js(.coffee):

    #= require sc.expandable_content

#### Required Markup:

    #jump_id.expandable
      … your content …
      %a.more{ :href => '#' } read more
      .expandable-content.hidden
        … read more content …
        %a.less{ :href => '#jump_id' } read less

#### Required Styles:

    .hidden
      display: none

#### Use it:

    $(".expandable").each ->
      new SC.ExpandableContent(el: $(this))

## Accordion

Load it inside your manifest, usually application.js(.coffee):

    #= require sc.accordion

#### Required Markup:

    .accordion
      .accordion-item
        .title
          The clickable header of the accordion item
        .content
          … The content which is toggled by clicking the header …

#### Required Styles:

    .open .content
      display: block

    .content
      display: none

#### Use it:

    $(".accordion").each ->
      new SC.Accordion(el: $(this))

## Carousel

The carousel component has dependencies to jQuery and jQuery-UI-Effects.
Load them together with the carousel inside your manifest, usually application.js(.coffee):

    #= require jquery
    #= require jquery-ui
    #= require sc.carousel

#### Required Model (json):

The model needs a 'photos' attribute per image-group.<br />
Inside the 'photos' the images with their specific urls are defined.<br />
Here's an example of two image-groups. The first includes two images, the second three:

    {
      "photos": [
        {
          "image": {
            "url": <imageUrl>
          }
        }, 
        {
          "image": {
            "url": <imageUrl>
          }
        }
      ]
    }, 
    {
      "photos": [
        {
          "image": {
            "url": <imageUrl>
          }
        }, 
        {
          "image": {
            "url": <imageUrl>
          }
        },
        {
          "image": {
            "url": <imageUrl>
          }
        }
      ]
    }

#### Required Markup:

    #projects-carousel-viewport
      %script{:type=>'text/template', :id=>'project-details-template'}
        … put HTML elements (e.g. a link with the title of the image-group and a paragraph with a short description of that image-group) here.
        Those elements are then rendered into '.project-detail' div …

      %script{:type=>'text/template', :id=>'photo-details-template'}
        … put HTML elements (e.g. a link with the title of the image and a paragraph with a short description of that image) here.
        Those elements are then rendered into '.photo-detail' div …

      %script{:type=>'text/template', :id=>'project-template'}
        … define here the HTML element into which the images defined in the model shall be rendered (e.g. %div or %a, whatever is needed).
        The rendered elements are then put into '.stage' div …

      .stage
      
      %span.project-detail

      %span.photo-detail

      %a{ :href => "#", :class => "previous-project" }
      %a{ :href => "#", :class => "next-project" }
      %a{ :href => "#", :class => "previous" }
      %a{ :href => "#", :class => "next" }

#### Required Styles:
    
    #projects-carousel-viewport
      position: relative

    .stage
      img
        position: absolute
        display: none

    .previous-project
      <addYourStyleHere>

    .next-project
      <addYourStyleHere>

    .previous
      <addYourStyleHere>

    .next
      <addYourStyleHere>

#### Use it:

    $('#projects-carousel-viewport').each ->
      projects = new SC.ProjectsCollection <yourModelJson>
      app = new SC.Carousel projects: projects, el: this