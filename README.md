# Partystreusel

## Installation
Add **partystreusel** to your Gemfile `gem 'partystreusel'` and bundle. Done.

## Available components:
  * **Expandable Content:** enables a "read more" button to show or hide additional content.
  * **Accordion:** Allows for multiple nested accordions.

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