const Hook = require("./Hook");
const HookCodeFactory = require("./HookCodeFactory");

class SyncHookCodeFactory extends HookCodeFactory {
  content() {
    return this.callTapsSeries();
  }
}

const factory = new SyncHookCodeFactory();

class SyncHook extends Hook {
  compile(options) {
    factory.setup(this, options);

    return factory.create(options);
  }
}

// const x = new SyncHook(['name','age'])

module.exports = SyncHook;
