var currentUser = {};

$(document).ready(function(){
  setInterval(function(){
    $('#messages-content').height($(window).height() - $('#header-content').height() - $('#input-message').height() - 20);
  }, 200)
})