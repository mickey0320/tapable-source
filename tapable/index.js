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

// const asyncHook = new AsyncParallelHook(["name", "age"]);
// asyncHook.tapAsync("1", (name, age, done) => {
//   setTimeout(() => {
//     console.log(name, age);
//     done();
//   }, 1000);
// });
// asyncHook.tapAsync("1", (name, age, done) => {
//   setTimeout(() => {
//     console.log(name, age);
//     debugger;
//     done();
//   }, 2000);
// });

// asyncHook.callAsync("yanjian", 25, () => {
//   console.log("done");
// });

const asyncHook = new AsyncParallelHook(["name", "age"]);
asyncHook.tapPromise("1", function (name, age) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(name, age);
      resolve();
    }, 1000);
  });
});
asyncHook.tapPromise("1", (name, age) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(name, age);
      resolve();
    }, 2000);
  });
});

asyncHook.promise("yanjian", 25).then(() => {
  console.log("done");
});

module.exports = { SyncHook, AsyncParallelHook };
