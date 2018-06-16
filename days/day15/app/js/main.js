const $ctrl = $(".upload__input__ctrl");
const $image = $(".upload__input__image");
const $btn = $(".upload__btn");

$(document).ready(function() {
  $ctrl.on("drag dragover dragenter dragleave drop", function(e) {
    e.preventDefault();
    e.stopPropagation();

  });
  $ctrl.on("dragover", function() {
    $ctrl.addClass("dragged-on");
  });
  $ctrl.on("dragleave drop", function() {
    $ctrl.removeClass("dragged-on");
  });
  $ctrl.on("drop", function(e) {
    console.log(e.originalEvent.dataTransfer.files[0].name);
    addFile(e.originalEvent.dataTransfer);
  });
  $ctrl.on("change", function(e) {
    addFile($(this)[0]);
  });
});

function addFile(data) {
  console.log(data.files[0].name);
  $image.removeClass("upload__input__image--upload");
  $image.html(data.files[0].name);
  $btn.one("click", function() {
    console.log("clicked");
    $image.html("");
    $image.addClass("upload__input__image--sync");
    setTimeout(function() {
      $image.removeClass("upload__input__image--sync")
        .addClass("upload__input__image--done");
    }, 3500);
  });
}
