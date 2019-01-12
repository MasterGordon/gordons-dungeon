var ctx = {};
var mx;
var my;
var images = {}
images.items = {}
images.icons = {}
images.mobs = {}
images.bosses = {}
var allImages = []

var loaded = 0;

$(function() {
  ctx = $("#canvas")[0].getContext('2d');
  ctx.fillRect(0, 0, 1400, 900)
  $("#tooltip").hide();

  $("#canvas").mousemove(function(event) {
    mx = ((event.pageX - $("#canvas").offset().left) / $("#canvas").width()) * 1400;
    my = ((event.pageY - $("#canvas").offset().top) / $("#canvas").height()) * 900;
    mx = Math.round(mx);
    my = Math.round(my);
  });
  $("#canvas").mouseleave(function() {
    mx = -9999;
    my = -9999;
  })
  $("body").mousemove(function(event) {
    if (event.pageX + $("#tooltip").width() + 12 > $(".bg-image").width()) {
      $("#tooltip").css("left", event.pageX - $("#tooltip").width() - 6);
    } else {
      $("#tooltip").css("left", event.pageX + 8);
    }

    if (event.pageY + $("#tooltip").height() + 8 > $(".bg-image").height()) {
      $("#tooltip").css("top", event.pageY - $("#tooltip").height() - 6);
    } else {
      $("#tooltip").css("top", event.pageY + 2);
    }
  })
  loadImages();
  window.setTimeout(checkimageload, 500);
});

function loadImages() {
  loadItems();
  loadIcons();
  loadMobs();
}

function loadImage(path, folder) {
  var img = new Image;
  img.src = path;
  var item = path.split("/").pop()
  item = item.substring(0, item.length - 4);
  allImages.push(img)
  images[folder][item] = img
}

function loadItems() {
  $.get("./images/items/items.json", function(data) {
    for (var i = 0; i < data.length; i++) {
      loadImage("./images/items/" + data[i], "items")
      console.log("Image: " + (i + 1) + "/" + data.length)
    }
  })
}

function loadIcons() {
  $.get("./images/icons/icons.json", function(data) {
    for (var i = 0; i < data.length; i++) {
      loadImage("./images/icons/" + data[i], "icons");
      console.log(data[i]);
      console.log("Icon: " + (i + 1) + "/" + data.length)
    }
  })
}

function loadMobs() {
  $.get("./images/monster/monsters.json", function(data) {
    for (var i = 0; i < data.length; i++) {
      loadImage("./images/monster/" + data[i], "mobs");
      console.log(data[i]);
      console.log("Mob: " + (i + 1) + "/" + data.length)
    }
  })
  $.get("./images/bosses/bosses.json", function(data) {
    for (var i = 0; i < data.length; i++) {
      loadImage("./images/bosses/" + data[i], "bosses");
      console.log(data[i]);
      console.log("Boss: " + (i + 1) + "/" + data.length)
    }
  })
}

function checkimageload() {
  for (var i = 0; i < allImages.length; i++) {
    if (!allImages[i].complete) {
      requestAnimationFrame(checkimageload);
      return;
    }
  }
  console.log('%cFinished loading! ', 'color: darkgreen');
  isLoading = false;
  initPlayer();
  loadTooltips();
}

var hudTooltips = [];
var isTooltipVisible = false;

function loadTooltips() {
  $("body").mousemove(function(event) {
    isTooltipVisible = false
    for (var i = 0; i < hudTooltips.length; i++) {
      var tt = hudTooltips[i];
      if (mx > tt.x && mx < tt.x + tt.width && my > tt.y && my < tt.y + tt.height) {
        $("#tooltip").html(tt.html);
        isTooltipVisible = true
      }
    }
    if (isTooltipVisible)
      $("#tooltip").show();
    else
      $("#tooltip").hide();
  })
}
