type Callback = (error: Error | null, result: unknown | null) => void;
type PromiseFunc = (...args: any[]) => Promise<unknown>;
type PromiseFuncCallbackPair = readonly [PromiseFunc, Callback];

export class AsyncQueue {
  private queue: Array<PromiseFuncCallbackPair> = [];
  private isProcessing = false;

  push(promiseFunc: PromiseFunc, callback: Callback) {
    this.queue.push([promiseFunc, callback]);

    if (!this.isProcessing) {
      this.isProcessing = true;
      this.processQueue();
    }
  }

  private takeFirst() {
    const [first] = this.queue.splice(0, 1);

    return first;
  }

  private processQueue() {
    while (this.queue.length > 0) {
      const first = this.takeFirst();
      this.executePromise(...first);
    }

    this.isProcessing = false;
  }

  private async executePromise(promiseFunc: PromiseFunc, callback: Callback) {
    try {
      const result = await promiseFunc();
      callback(null, result);
    } catch (error: any) {
      callback(error, null);
    }
  }

  public get length() {
    return this.queue.length;
  }
}
