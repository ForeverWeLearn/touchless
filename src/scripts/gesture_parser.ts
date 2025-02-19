import { Executor } from "./executor";
import { Queue } from "../utils/queue";
// @ts-ignore
const executor: Executor = new Executor();

export class GestureParser {
  public labels: string[] = [];
  public hold_time: number = 0;
  private queue: Queue<[number, number]>;

  constructor() {
    this.read_labels();
    this.queue = new Queue<[number, number]>();
  }
  // @ts-ignore
  public parse(labelID: number, keypoints: number[][]) {
    const front = this.queue.peek_front();
    if (front && front[0] !== labelID) {
      this.queue.clear();
    }

    const now = performance.now();
    this.queue.push([labelID, now]);

    const back = this.queue.peek_back();
    if (back) {
      this.hold_time = now - back[1];
    } else {
      this.hold_time = 0;
    }
  }

  private read_labels() {
    fetch("labels.json")
      .then((response) => response.json())
      .then((data) => {
        this.labels.push(...data);
      });
  }
}
