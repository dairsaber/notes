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
    a: 1
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

function getElement(selector) {
  return document.querySelector(selector);
}

function getElements(selector) {
  return document.querySelectorAll(selector);
}
/**
 * 加载纹理通用方法
 * @param {*} gl
 * @param {*} url
 * @param {*} texture
 * @param {*} callback
 */
function loadTexture(gl, url, u_Texture, callback) {
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = url;
  image.onload = (e) => {
    gl.activeTexture(gl.TEXTURE0);
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    /**
     *  glTexImage2D(GLenum target, GLint level, GLint components, GLsizei width, glsizei height, GLint border, GLenum format, GLenum type, const GLvoid *pixels);
     *  target	纹理类型，TEXTURE_2D代表2维纹理
     *  level	表示多级分辨率的纹理图像的级数，若只有一种分辨率，则 level 设为 0，通常我们使用一种分辨率
     *  components	纹理通道数，通常我们使用 RGBA 和 RGB 两种通道
     *  width	纹理宽度，可省略
     *  height	纹理高度，可省略
     *  border	边框，通常设置为0，可省略
     *  format	纹理映射的格式
     *  type	纹理映射的数据类型
     *  pixels	纹理图像的数据
     */
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    /**
     * gl.LINEAR 代表采用最靠近象素中心的四个象素的加权平均值，这种效果表现的更加平滑自然。
     * gl.NEAREST 采用最靠近象素中心的纹素，该算法可能使图像走样，但是执行效率高，不需要额外的计算。
     */
    gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    // 之后为片元着色器传递 0 号纹理单元：
    gl.uniform1i(u_Texture, 0);

    callback && callback(gl, e);
  };
}
