$(document).ready(function() {

  var dqptLink;
  var dqptXhrRequest;
  var dqptContainer;

  var dqptTransitionSpeed = 200;

  var urlToLoad;
  var current = document.location;
  var currentURL = current.href;
  var title = document.title;

  dqptContainer = $('#dqptContainer');

  function dqptresetScrollPosition() {
    window.scrollTo(0,0);
  }

  function dqpterror(e, jqxhr) {}

  function dqptInitLinks() {
    dqptLink = $('.dqPT');
    dqptLink.off('click');
    dqptLink.on('click', function(event) {
      event.preventDefault();
      urlToLoad = this.href;
      if (current.href == this.href) {
        return;
      } else {
        history.pushState(urlToLoad, title, urlToLoad);
        dqptContainer.fadeOut(dqptTransitionSpeed, function(){
          dqptXhrRequest(urlToLoad);
        });
      }
    });
  }

  function dqptBeforeSend() {}

  function dqptSuccess() {}

  function dqptProcessData(data) {
    var content = $('#dqptContainer', data);
    $('#dqptContainer').html(content);
    var newTitle = $(data).filter('title').text();
    document.title = newTitle;
    dqptInitLinks();
    dqptresetScrollPosition();
    dqptContainer.fadeIn();
  }

  var dqptXhrRequest = function(urlToLoad) {
    $.ajax({
      type: "GET",
      cache: false,
      url: urlToLoad,
      dataType: "html",
      contentType: "text/html",
      beforeSend: dqptBeforeSend,
      success: dqptProcessData,
      error: dqpterror
    });
  };

  window.onpopstate = function(event) {
    urlToLoad = event.state;
    dqptXhrRequest(urlToLoad);
  }

  dqptInitLinks();

});
