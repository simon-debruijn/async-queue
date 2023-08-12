import { AsyncQueue } from "./AsyncQueue";
import type { Callback } from "./AsyncQueue";

async function main() {
  const asyncQueue = new AsyncQueue();

  const promises = [promise1, promise2, promise3, promise4];

  promises.forEach((promise) => {
    asyncQueue.push(promise, createCallback(promise.name));
  });
}

main();

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

function createCallback(name: string): Callback {
  return function (error, result) {
    console.log(`${name} finished`, {
      error: error ? { message: error.message } : null,
      result,
    });
  };
}
