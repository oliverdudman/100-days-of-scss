$(document).ready(function() {
  $(".tile__cover").on("click", function() {
    $(".contact").addClass("active");
  });
  $(".contact__close").on("click", function() {
    $(".contact").removeClass("active");
  })
});
