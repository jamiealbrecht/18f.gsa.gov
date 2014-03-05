$(document).ready(function () {
  // load posts from tumblr
  var blog = '18fblog.tumblr.com';
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  $.ajax({
    url: '//api.tumblr.com/v2/blog/' + blog + '/posts/text?notes_info=true&limit=3&filter=text&api_key=cA9agkd1WdAsFUFL5iq1Wnn0m4Dmcv5vf5otES3Ou08r2D3Ldu',
    type: 'GET',
    contentType: 'application/json',
    dataType: 'jsonp',
    jsonpCallback: 'jsonp',
    success: function (result) {
      $("#blog-loading").hide();
      for (i in result.response.posts) {
        // render post to the page
        var post = result.response.posts[i];
        $('#blog' + i + ' .blog-title').html(post.title);
        $('#blog' + i + ' .blog-title').attr('href', post.post_url);
        $('#blog' + i + ' .blog-text').html(post.body);
        $('#blog' + i + ' .readmore').attr('href', post.post_url);
        var tagHtml = '';
        for (j in post.tags) {
          if (j != 0) {
            tagHtml += ', ';
          }
          tagHtml += '<a href="http://' + blog + '/tagged/' + encodeURIComponent(post.tags[j]) + '">' + post.tags[j] + '</a>';
        }
        $('#blog' + i + ' .blog-tags').html(tagHtml);
        var d = new Date(post.timestamp * 1000);
        var date = months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
        $('#blog' + i + ' .blog-date').html(date);
        $('#blog' + i).show();
      }
      $(".blog-snippet").dotdotdot({
        watch: "window",
        after: "a.readmore"
      });
    },
    error: function (e) {
      $("#blog-loading .error").show();
    }
  });


  // linear fade-ins
  $('.fadeIn').each(function (e) { 
    $(this).addClass('fade-'+e);
    var t = setTimeout("$('.fade-"+e+"').fadeIn(500)",500*e);
  });

  // team hover effect
  $('.bio').mouseenter(function () {
    var $img = $(this).find('img');
    $img.data('original',$img.attr('src'));
    $img.attr('src',$img.data('color'));
  }).mouseleave(function () {
    var $img = $(this).find('img');
    $img.attr('src',$img.data('original'));
  });

});
