const Hook = require("./Hook");
const HookCodeFactory = require("./HookCodeFactory");

class AsyncParallelHookCodeFactory extends HookCodeFactory {
  content() {
    return this.callTapsParallel();
  }
}

const factory = new AsyncParallelHookCodeFactory();

class SyncHook extends Hook {
  compile(options) {
    factory.setup(this, options);

    return factory.create(options);
  }
}

// const x = new SyncHook(['name','age'])

module.exports = SyncHook;
