
$(document).on("click", ".sharebar a", function() {
  window._gaq = window._gaq || [];
  var network = $(this).data("network"),
      article = $(this).data("title");
      
  _gaq.push(['_trackEvent', 'Sharing', network, article]);  
});
