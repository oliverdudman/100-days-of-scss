const $ctrl = $(".upload__input__ctrl");
const $image = $(".upload__input__image");
const $btn = $(".upload__btn");
const $bar = $(".loading-bar");

$(document).ready(function() {
  $(document).on("drag dragover dragenter dragleave drop", function(e){
    e.preventDefault();
    e.stopPropagation();
  });
  resetListeners();
});

function resetListeners() {
  $ctrl.on("drag dragover dragenter dragleave drop", function(e) {
    e.preventDefault();
    e.stopPropagation();
  });
  $ctrl.on("dragover", function() {
    $image.addClass("dragged-on");
  });
  $ctrl.on("dragleave drop", function() {
    $image.removeClass("dragged-on");
  });
  $ctrl.on("drop", function(e) {
    addFile(e.originalEvent.dataTransfer.files[0].name);
  });
  $ctrl.on("change", function(e) {
    if ($(this)[0].files[0]) addFile($(this)[0].files[0].name); //only update if file has been selected
  });
}

function addFile(name) {
  $image.removeClass("upload__input__image--upload");
  $image.html(name);

  $btn.one("click", function() {
    $ctrl.off("drag dragover dragenter dragleave drop change");
    $ctrl.prop("disabled", true);
    $image.html("");
    $image.addClass("upload__input__image--sync");
    $bar.addClass("active");
    $btn.html("Uploading...");
    setTimeout(function() {
      $image.removeClass("upload__input__image--sync")
        .addClass("upload__input__image--done");
      $btn.html("Done");
      $btn.one("click", function() {
        $image.removeClass("upload__input__image--done")
          .addClass("upload__input__image--upload");
        $bar.removeClass("active");
        $btn.html("Upload file");
        $ctrl.prop("disabled", false);
        resetListeners();
      });
    }, 3500);
  });
}
