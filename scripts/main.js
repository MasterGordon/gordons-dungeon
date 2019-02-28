var ctx = {};
var mx;
var my;
var images = {}
var lang = {}
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

  $("#popupcanvas").mousemove(function(event) {
    mx = ((event.pageX - $("#canvas").offset().left) / $("#canvas").width()) * 1400;
    my = ((event.pageY - $("#canvas").offset().top) / $("#canvas").height()) * 900;
    mx = Math.round(mx);
    my = Math.round(my);
  });
  $("#popupcanvas").mouseleave(function() {
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
  loadLang();
  window.setTimeout(checkimageload, 500);
});

function loadLang() {
  $.get("./assets/lang/english.json", function(data) {
    lang = data;
  })
}

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
  $.get("./assets/images/items/items.json", function(data) {
    for (var i = 0; i < data.length; i++) {
      loadImage("./assets/images/items/" + data[i], "items")
      console.log("Image: " + (i + 1) + "/" + data.length)
    }
  })
}

function loadIcons() {
  $.get("./assets/images/icons/icons.json", function(data) {
    for (var i = 0; i < data.length; i++) {
      loadImage("./assets/images/icons/" + data[i], "icons");
      console.log(data[i]);
      console.log("Icon: " + (i + 1) + "/" + data.length)
    }
  })
}

function loadMobs() {
  $.get("./assets/images/monster/monsters.json", function(data) {
    for (var i = 0; i < data.length; i++) {
      loadImage("./assets/images/monster/" + data[i], "mobs");
      console.log(data[i]);
      console.log("Mob: " + (i + 1) + "/" + data.length)
    }
  })
  $.get("./assets/images/bosses/bosses.json", function(data) {
    for (var i = 0; i < data.length; i++) {
      loadImage("./assets/images/bosses/" + data[i], "bosses");
      console.log(data[i]);
      console.log("Boss: " + (i + 1) + "/" + data.length)
    }
  })
}

async function checkimageload() {
  for (var i = 0; i < allImages.length; i++) {
    if (!allImages[i].complete) {
      await sleep(1000);
      requestAnimationFrame(checkimageload);
      return;
    }
  }
  await sleep(100);
  fontSpy('PS2P', {
    success: function() {
      console.log('%cFinished loading! ', 'color: darkgreen');
      isLoading = false;
      initPlayer();
      loadTooltips();
    },
    failure: function() {
      requestAnimationFrame(checkimageload);
    }
  });
}

var hudTooltips = [];
var isTooltipVisible = false;

function loadTooltips() {
  $("body").mousemove(function(event) {
    isTooltipVisible = false;
    for (var i = 0; i < hudTooltips.length; i++) {
      var tt = hudTooltips[i];
      if (mx > tt.x && mx < tt.x + tt.width && my > tt.y && my < tt.y + tt.height) {
        $("#tooltip").html(tt.html);
        isTooltipVisible = true;
      }
    }
    for (var i = 0; i < enemies.length; i++) {
      var abstand = 1400 / enemies.length;
      if (mx > abstand * i + (abstand / 2 - 187.5) && mx < abstand * i + (abstand / 2 - 187.5) + 375 && my > 100 && my < 475) {
        $("#tooltip").html(enemies[i].getTT());
        isTooltipVisible = true;
      }
    }
    if (isTooltipVisible)
      $("#tooltip").show();
    else
      $("#tooltip").hide();
  })
}
