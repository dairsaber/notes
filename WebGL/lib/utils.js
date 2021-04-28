/**
 * 生成随机颜色
 */
function randomColor() {
  const r = Math.round(Math.random() * 255);
  const g = Math.round(Math.random() * 255);
  const b = Math.round(Math.random() * 255);
  return {
    r,
    g,
    b,
    a: 1,
  };
}

/**
 * 清屏并设置背景色为黑色
 */
function clearBg() {
  // 设置清屏颜色
  gl.clearColor(0, 0, 0, 1.0);
  // 用上一步设置的清空画布颜色清空画布。
  gl.clear(gl.COLOR_BUFFER_BIT);
}

function resizeCanvas(canvas, width, height) {
  if (canvas.width !== width) {
    canvas.width = width ? width : window.innerWidth;
  }
  if (canvas.height !== height) {
    canvas.height = height ? height : window.innerHeight;
  }
}
