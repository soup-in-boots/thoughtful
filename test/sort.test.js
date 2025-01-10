import { expect } from "chai";
import { sort } from "../src/index.js";

describe("sort", function () {
  it("requires width, height, length, and mass arguments in order", function () {
    expect(() => sort()).to.throw(/width/);
    expect(() => sort(1)).to.throw(/height/);
    expect(() => sort(1, 1)).to.throw(/length/);
    expect(() => sort(1, 1, 1)).to.throw(/mass/);
    expect(() => sort(1, 1, 1, 1)).not.to.throw();
  });

  it("requires all arguments to be numbers", function () {
    expect(() => sort("a", 1, 1, 1)).to.throw("width must be a number");
    expect(() => sort(1, "a", 1, 1)).to.throw("height must be a number");
    expect(() => sort(1, 1, "a", 1)).to.throw("length must be a number");
    expect(() => sort(1, 1, 1, "a")).to.throw("mass must be a number");
    expect(() => sort(1, 1, 1, 1)).not.to.throw();

    expect(() => sort(NaN, 1, 1, 1)).to.throw("width must be a number");
    expect(() => sort(1, NaN, 1, 1)).to.throw("height must be a number");
    expect(() => sort(1, 1, NaN, 1)).to.throw("length must be a number");
    expect(() => sort(1, 1, 1, NaN)).to.throw("mass must be a number");
    expect(() => sort(1, 1, 1, 1)).not.to.throw();
  });

  it("requires all arguments to be greater than zero", function () {
    expect(() => sort(0, 1, 1, 1)).to.throw();
    expect(() => sort(1, 0, 1, 1)).to.throw();
    expect(() => sort(1, 1, 0, 1)).to.throw();
    expect(() => sort(1, 1, 1, 0)).to.throw();
    expect(() => sort(1, 1, 1, 1)).not.to.throw();
  });

  it("requires all arguments to be finite", function () {
    expect(() => sort(Infinity, 1, 1, 1)).to.throw();
    expect(() => sort(1, Infinity, 1, 1)).to.throw();
    expect(() => sort(1, 1, Infinity, 1)).to.throw();
    expect(() => sort(1, 1, 1, Infinity)).to.throw();
    expect(() => sort(1, 1, 1, 1)).not.to.throw();
  });

  describe("given a package", function () {
    describe("with an oversized width dimension", function () {
      let width = 200;
      let height = 50;
      let length = 50; // total volume: 500,000 cm^3
      describe("and an acceptable weight", function () {
        let mass = 1; // it's heckin light
        it("should be sent to the special stack", function () {
          expect(sort(width, height, length, mass)).to.equal("SPECIAL");
        });
      });
      describe("and an unacceptable weight", function () {
        let mass = 50;
        it("should be sent to the rejected stack", function () {
          expect(sort(width, height, length, mass)).to.equal("REJECTED");
        });
      });
    });
    describe("with an oversized height dimension", function () {
      let width = 50;
      let height = 200;
      let length = 50; // total volume: 500,000 cm^3
      describe("and an acceptable weight", function () {
        let mass = 1; // it's heckin light
        it("should be sent to the special stack", function () {
          expect(sort(width, height, length, mass)).to.equal("SPECIAL");
        });
      });
      describe("and an unacceptable weight", function () {
        let mass = 50;
        it("should be sent to the rejected stack", function () {
          expect(sort(width, height, length, mass)).to.equal("REJECTED");
        });
      });
    });
    describe("with an oversized length dimension", function () {
      let width = 50;
      let height = 50;
      let length = 200; // total volume: 500,000 cm^3
      describe("and an acceptable weight", function () {
        let mass = 1; // it's heckin light
        it("should be sent to the special stack", function () {
          expect(sort(width, height, length, mass)).to.equal("SPECIAL");
        });
      });
      describe("and an unacceptable weight", function () {
        let mass = 50;
        it("should be sent to the rejected stack", function () {
          expect(sort(width, height, length, mass)).to.equal("REJECTED");
        });
      });
    });
    describe("with an oversized width dimension", function () {
      let width = 200;
      let height = 50;
      let length = 50; // total volume: 500,000 cm^3
      describe("and an acceptable weight", function () {
        let mass = 1; // it's heckin light
        it("should be sent to the special stack", function () {
          expect(sort(width, height, length, mass)).to.equal("SPECIAL");
        });
      });
      describe("and an unacceptable weight", function () {
        let mass = 50;
        it("should be sent to the rejected stack", function () {
          expect(sort(width, height, length, mass)).to.equal("REJECTED");
        });
      });
    });
    describe("with well-constrained dimensions", function () {
      describe("an acceptable volume", function () {
        let width = 50;
        let height = 50;
        let length = 50; // total volume: 125,000 cm^3
        describe("and an acceptable weight", function () {
          let mass = 1; // it's heckin light
          it("should be sent to the standard stack", function () {
            expect(sort(width, height, length, mass)).to.equal("STANDARD");
          });
        });
        describe("and an unacceptable weight", function () {
          let mass = 50;
          it("should be sent to the special stack", function () {
            expect(sort(width, height, length, mass)).to.equal("SPECIAL");
          });
        });
      });
      describe("an unacceptable volume", function () {
        let width = 100;
        let height = 100;
        let length = 100; // total volume: 1,000,000 cm^3
        describe("and an acceptable weight", function () {
          let mass = 1; // it's heckin light
          it("should be sent to the special stack", function () {
            expect(sort(width, height, length, mass)).to.equal("SPECIAL");
          });
        });
        describe("and an unacceptable weight", function () {
          let mass = 50;
          it("should be sent to the rejected stack", function () {
            expect(sort(width, height, length, mass)).to.equal("REJECTED");
          });
        });
      });
    });
  });
});
