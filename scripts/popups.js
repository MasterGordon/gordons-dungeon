var popupctx = {}
$(() => {
  popupctx = $("#popupcanvas")[0].getContext('2d');
})

async function popup(x, y, text) {
  popupctx.clearRect(0, 0, 1400, 900);
  popupctx.fillStyle = "white";
  popupctx.textAlign = "center";
  for (var i = 0; i < 6; i++) {
    await sleep(100)
    popupctx.font = (22 + i) + "px PS2P";
    popupctx.clearRect(0, 0, 1400, 900);
    popupctx.fillText(text, x, y);
  }
  for (var i = 0; i < 10; i++) {
    await sleep(50)
    popupctx.font = (27 - i) + "px PS2P";
    popupctx.clearRect(0, 0, 1400, 900);
    popupctx.fillText(text, x, y);
  }
  popupctx.clearRect(0, 0, 1400, 900);
}
