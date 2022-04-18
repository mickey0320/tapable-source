const SyncHook = require("./SyncHook");
const AsyncParallelHook = require("./AsyncParallelHook");

// const syncHook = new SyncHook(["name", "age"]);
// syncHook.tap("1", (name, age) => {
//   console.log(name, age);
// });
// syncHook.tap("1", (name, age) => {
//   console.log(name, age);
// });

// syncHook.call("yanjian", 25);

const asyncHook = new AsyncParallelHook(["name", "age"]);
asyncHook.tapAsync("1", (name, age, done) => {
  setTimeout(() => {
    console.log(name, age);
    done();
  }, 1000);
});
asyncHook.tapAsync("1", (name, age, done) => {
  setTimeout(() => {
    console.log(name, age);
    debugger;
    done();
  }, 2000);
});

asyncHook.callAsync("yanjian", 25, () => {
  console.log("done");
});

module.exports = { SyncHook, AsyncParallelHook };
