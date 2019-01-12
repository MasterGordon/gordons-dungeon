$(function() {
  centerCanvas();
})

$(window).resize(function() {
  centerCanvas();
});

function centerCanvas() {
  if (window.innerHeight < 900 && window.innerWidth < 1400) {

  } else if (window.innerHeight < 900) {
    $("#canvas").css("height", "100%");
    $("#canvas").css("top", 0);
    $("#canvas").css("width", "auto");
    $("#canvas").css("left", (window.innerWidth - $("#canvas").width()) / 2);
  } else if (window.innerWidth < 1400) {
    $("#canvas").css("width", "100%");
    $("#canvas").css("top", (window.innerHeight - $("#canvas").height()) / 2);
    $("#canvas").css("height", "auto");
    $("#canvas").css("left", 0);
  } else {
    $("#canvas").css("height", "auto");
    $("#canvas").css("top", (window.innerHeight - 900) / 2);
    $("#canvas").css("width", "auto");
    $("#canvas").css("left", (window.innerWidth - 1400) / 2);
  }
}
