/**
 * scripts.js
 *
 * Computer Science 50
 * Problem Set 7
 *
 * Global JavaScript, if any.
 */

var selector_source = ['<div class="selector">',
    '<div class="thumb">',
    '<div class="items">',
      '<ul class="images">',
        '{{!#each images }}',
          '<li><img src="{{!this.url}}"/></li>',
        '{{!/each}}',
      '</ul>',
    '</div>',
  '</div>',
  '<div class="attributes">',
    '<span class="title">{{!title}}</span>',
    '<span class="provider">{{!provider_url}}</span>',
    '<p>{{!description}}</p>',
    '<div class="meta">',
      '<ul>',
        '<li><a href="#" class="left"><i class="fa fa-caret-left"></i></a></li>',
        '<li><a href="#" class="right"><i class="fa fa-caret-right"></i></a></li>',
      '</ul>',
      '<span class="pages">',
        '<span class="current">1</span> of <span>{{!images_count}}</span> Choose a Thumbnail</span>',
      '</span>',
    '</div>',
    '<span class="no-thumbnail"><input type="checkbox"/>No Thumbnail</span>',
  '</div>',
  '<div class="action"><a href="#" class="close"><i class="fa fa-remove"></i></a></div>',
  '<div class="cf"></div>',
'</div>'].join('');
 
var display_source = ['<div class="row">',
  '<div class="small-12 columns">',
    '<div class="update">',
      '<p>{{!status}}</p>',
      '<div class="meta">',
        '<div class="thumbnail">',
          '<img src="{{!thumbnail_url}}"/>',
        '</div>',
        '<div class="attributes">',
          '<span class="title">{{!title}}</span>',
          '<span class="provider">{{!provider_url}}</span>',
          '<p>{{!description}}</p>',
        '</div>',
      '</div>',
    '<div class="cf"></div>',
    '</div>',
  '</div>',
'</div>'].join('');
 
var selector = {
  render: function($elem, data, preview){
    // We need to know what to do when everything is closed up.
    $elem.on('close', function(){
      $('.selector-wrapper').html('');
    });
 
    // set the images count;
    data.images_count = data.images.length;
 
    // Create the handlebars template.
    var template = Handlebars.compile(selector_source);
    var html = template(data);
    $('.selector-wrapper').html(html);
 
    // if we close the selector, do the work.
    $('.selector-wrapper .close').on('click', function(){
      $('#id_status').trigger('close');
      $('.selector').remove();
      return false;
    });
 
    // Set up the thumb.
    $('.thumb').thumb({
      onchange: function(img){
        if (img === null){
          preview.update('thumbnail_url', null);
        } else {
          preview.update('thumbnail_url', $(img).attr('src'));
        }
      }
    });
 
    // set up the click events for toggle.
    $('.left').on('click', function(){
      $('.thumb').trigger('left');
      $('.meta .current').text($('.thumb').data('current'));
      return false;
    });
    $('.right').on('click', function(){
      $('.thumb').trigger('right');
      $('.meta .current').text($('.thumb').data('current'));
      return false;
    });
 
    $('.no-thumbnail input').on('change', function(){
      // Toogle the thumbnail information.
      $('.meta').toggle();
      var action = $(this).prop('checked')? 'hide':'show';
      $('.thumb').trigger(action);
    });
  }
};
 
// Set up preview on the status element.
$('#id_status').preview({selector:selector})
  .on('focus', function(){
    $(this).parents('.updater').addClass('active');
  });
 
// If the user click post render the display template.
$('.updater .button').on('click', function(){
  // Get the data stored on the element.
  var data = $('#id_status').data('preview');
  // add the status
  data.status = $('#id_status').val();
 
  // Close up shop.
  $('#id_status').trigger('close');
  $('#id_status').val('');
  $('.updater').removeClass('active');
 
  // Get the template and insert the html.
  var display_template = Handlebars.compile(display_source);
  var html = display_template(data);
  $('#feed').append(html);
});