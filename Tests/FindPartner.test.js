const expect = require("expect");

const { getNearByPartners } = require("../FindPartners/index");

const allPartners = require("../FindPartners/partners");

describe("Get Nearby Partners", () => {
  it("should find partners within 100km from main office with default values", () => {
    const partners = getNearByPartners(allPartners);
    expect(partners.length).toBe(2);
  });

  it("should return an empty array when no arguments was given", () => {
    const partners = getNearByPartners();
    expect(partners.length).toBe(0);
  });

  it("should find partners within a given range", () => {
    const partners = getNearByPartners(allPartners, 300);
    expect(partners.length).toBe(4);
  });
});
