import { Reader } from "./reader";
import { Writer } from "./writer";
import { LineTransform } from "./lineTransform";
import { resolve } from "path";
import { createGunzip } from "zlib";

const reader = new Reader(resolve(__dirname, "../data/source.txt.gz"));
const writer = new Writer(resolve(__dirname, "../data/target.txt"));

reader
  .pipe(createGunzip())
  .pipe(new LineTransform({ objectMode: true }))
  .pipe(writer);
