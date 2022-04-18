class HookCodeFactory {
  setup(hookInstance, options) {
    hookInstance._x = options.taps.map((tapInfo) => tapInfo.fn);
  }
  init(options) {
    this.options = options;
  }
  args(config = {}) {
    const { after } = config;
    const args = [...this.options.args];
    if (after) {
      args.push(after);
    }
    return args.join(",");
  }

  header() {
    return `var _x = this._x\n`;
  }
  callTapsSeries() {
    const taps = this.options.taps;
    let code = "";
    for (let i = 0; i < taps.length; i++) {
      code += this.callTap(i);
    }

    return code;
  }
  callTapsParallel() {
    let code = "";
    const taps = this.options.taps;
    code += `var counter = ${taps.length}\n`;
    code += `
      var _done = function(){
        _callback()
      }\n
    `;
    for (let i = 0; i < taps.length; i++) {
      code += this.callTap(i);
    }

    return code;
  }
  callTap(tapIndex) {
    const tap = this.options.taps[tapIndex];
    let code = "";
    switch (tap.type) {
      case "sync":
        code += `fn${tapIndex} = _x[${tapIndex}]\n`;
        code += `fn${tapIndex}(${this.args()})\n`;
        break;
      case "async":
        code += `fn${tapIndex} = _x[${tapIndex}]\n`;
        code += `fn${tapIndex}(${this.args()},function(){\n
          if(--counter === 0) _done()\n
        })\n`;
        break;
    }
    console.log(code);

    return code;
  }
  create(options) {
    this.init(options);
    let fn;
    switch (this.options.type) {
      case "sync":
        fn = new Function(this.args(), this.header() + this.content());
        break;
      default:
      case "async":
        fn = new Function(
          this.args({ after: "_callback" }),
          this.header() + this.content()
        );
        break;
    }
    return fn;
  }
}

module.exports = HookCodeFactory;
