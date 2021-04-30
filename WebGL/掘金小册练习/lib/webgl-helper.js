class WebglHelper {
  gl;
  program;
  canvas;
  constructor(canvas, vertexId, fragmentId) {
    if (typeof canvas === "string") {
      this.canvas = document.querySelector(canvas);
    } else {
      this.canvas = canvas;
    }
    this.gl = this.getWebgl(this.canvas);

    this.program = this.generateProgram(vertexId, fragmentId);
    this.gl.useProgram(this.program);
  }

  getAttr(name) {
    return this.gl.getAttribLocation(this.program, name);
  }
  getUniform(name) {
    return this.gl.getUniformLocation(this.program, name);
  }
  generateProgram(vertexId, fragmentId) {
    const vertexShader = this.createVertexShader(vertexId);
    const fragmentShader = this.createFragmentShader(fragmentId);
    return this.createProgram(vertexShader, fragmentShader);
  }
  /**
   * 获取webgl对象
   */
  getWebgl(canvas) {
    return (
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    );
  }

  /*创建顶点着色器*/
  createVertexShader(selectorId) {
    return this.createShader(this.gl.VERTEX_SHADER, selectorId);
  }

  /*创建片元着色器*/
  createFragmentShader(selectorId) {
    return this.createShader(this.gl.FRAGMENT_SHADER, selectorId);
  }

  /*创建着色器程序*/
  createProgram(vertexShader, fragmentShader) {
    const program = this.gl.createProgram();
    // 将顶点着色器挂载在着色器程序上
    this.gl.attachShader(program, vertexShader);
    // 将片元着色器挂载到着色器程序上
    this.gl.attachShader(program, fragmentShader);
    // 连接着色器程序
    this.gl.linkProgram(program);
    return program;
  }

  /**
   * 创建通用shader的方法
   */
  createShader(shaderType, selectorId) {
    const shaderSource = document.querySelector(selectorId).innerHTML;
    const shader = this.gl.createShader(shaderType);
    this.gl.shaderSource(shader, shaderSource);
    // 编译
    this.gl.compileShader(shader);
    return shader;
  }
}
