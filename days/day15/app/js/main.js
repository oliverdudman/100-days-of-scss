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
    $ctrl.addClass("dragged-on");
  });
  $ctrl.on("dragleave drop", function() {
    $ctrl.removeClass("dragged-on");
  });
  $ctrl.on("drop", function(e) {
    addFile(e.originalEvent.dataTransfer);
  });
  $ctrl.on("change", function(e) {
    addFile($(this)[0]);
  });
}

function addFile(data) {
  $image.removeClass("upload__input__image--upload");
  $image.html(data.files[0].name);

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
