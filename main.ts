import { AsyncQueue } from "./AsyncQueue";

function promise1() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("first"), 3000);
  });
}
function promise2() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("second"), 2000);
  });
}
function promise3() {
  return new Promise((_resolve, reject) => {
    reject(new Error("NOOO"));
  });
}
function promise4() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("fourth"), 5000);
  });
}

async function main() {
  const asyncQueue = new AsyncQueue();

  asyncQueue.push(promise1, (error, result) => {
    console.log("promise1 finished", { error, result });
  });
  asyncQueue.push(promise2, (error, result) => {
    console.log("promise2 finished", { error, result });
  });
  asyncQueue.push(promise3, (error, result) => {
    console.log("promise3 finished", { error, result });
  });
  asyncQueue.push(promise4, (error, result) => {
    console.log("promise4 finished", { error, result });
  });
}

main();
