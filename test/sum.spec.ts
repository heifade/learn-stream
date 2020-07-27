import { expect } from "chai";
import "mocha";
import { sum } from "../src/sum";

describe("sum", function() {
  it("sum ", () => {
    expect(sum(1, 2)).to.equal(3);
  });
});
