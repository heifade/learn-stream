import { Writable, WritableOptions } from "stream";
import { createWriteStream, WriteStream } from "fs";

export class Writer extends Writable {
  private _writerStream: WriteStream;
  constructor(fileName: string, opts?: WritableOptions) {
    super(opts);

    this._writerStream = createWriteStream(fileName, { encoding: "utf8" });
  }

  _write(chunk: any, encoding: string, callback: (error?: Error | null) => void) {
    this._writerStream.write(chunk);
    callback();
  }

  close() {
    this._writerStream.close();
  }
}
