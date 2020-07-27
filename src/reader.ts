import { createReadStream, ReadStream } from "fs";
import { Readable, ReadableOptions } from "stream";

export class Reader extends Readable {
  private _readStream: ReadStream;

  constructor(fileName: string, opts?: ReadableOptions) {
    super(opts);

    this._readStream = createReadStream(fileName);

    this._readStream.pause();

    this._readStream.on("data", this._readData);
    this._readStream.on("end", this._readData);
  }

  _readData = (chunk: Buffer) => {
    // this.push 当缓存写满时，返回false。此时应当暂停读取
    if (!this.push(chunk || null)) {
      this._readStream.pause(); // 暂停读取
    }
  };

  // 当流读取的缓存差不多读完时，调用。此时应当继续读取
  _read(size: number) {
    this._readStream.resume();
  }

  close() {
    this._readStream.close();
  }
}
