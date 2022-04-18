class Hook {
  constructor(args) {
    this.args = args || [];
    this.taps = [];
    this.call = CALL_DELEGATE;
    this.callAsync = CALL_ASYNC_DELEGATE;
    this.promise = PROMISE_DELEGATE;
  }
  tap(options, fn) {
    this._tap("sync", options, fn);
  }
  tapAsync(options, fn) {
    this._tap("async", options, fn);
  }
  tapPromise(options, fn) {
    this._tap("promise", options, fn);
  }
  _tap(type, options, fn) {
    if (typeof options === "string") {
      options = { name: options };
    }
    const tapInfo = { ...options, type, fn };
    this._insert(tapInfo);
  }
  _insert(tapInfo) {
    this.taps.push(tapInfo);
  }
  _createCall(type) {
    return this.compile({
      taps: this.taps,
      args: this.args,
      type,
    });
  }
}

function CALL_DELEGATE(...args) {
  this.call = this._createCall("sync");

  return this.call(...args);
}

function CALL_ASYNC_DELEGATE(...args) {
  this.callAsync = this._createCall("async");

  return this.callAsync(...args);
}

function PROMISE_DELEGATE(...args) {
  this.promise = this._createCall("promise");

  return this.promise(...args);
}

module.exports = Hook;
