function main() {
  //获得canvas  元素
  const canvas = document.querySelector("#example");
  if (!canvas) {
    console.log("this is no canvas");
    return;
  }
  //  get the rendering context for 2DCG
  const ctx = canvas.getContext("2d");

  // draw a blue rectangle
  ctx.fillStyle = "rgba(0,0,255,1.0)";
  /*x      y   width height  */
  ctx.fillRect(120, 10, 150, 150);
}
