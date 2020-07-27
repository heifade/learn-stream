import { Transform, TransformOptions, TransformCallback } from "stream";
import { threadId } from "worker_threads";

export class LineTransform extends Transform {
  private _data: string = "";
  constructor(opts?: TransformOptions) {
    super(opts);
  }

  _transform(chunk: any, encoding: string, callback: TransformCallback) {
    const data = this._data + chunk.toString(encoding);

    const lines = data.split("\n");
    this._data = lines.splice(lines.length - 1, 1)[0];

    for (const line of lines) {
      this.push(line + '\n');
    }

    callback();
  }
  _flush(callback: TransformCallback) {
    if (this._data) {
      this.push(this._data + '\n');
      this._data = "";
    }
    callback();
  }
}
