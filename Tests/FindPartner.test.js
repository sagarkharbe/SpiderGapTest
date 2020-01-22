const expect = require("expect");

const {
  getNearByPartners,
  orderPartnersByName
} = require("../FindPartners/index");

const Partners = require("../FindPartners/partners");

describe("Get Nearby Partners", () => {
  it("should find partners within 100km from main office with default values", () => {
    const partners = getNearByPartners(Partners);
    expect(partners.length).toBe(2);
  });

  it("should return an empty array when no arguments was given", () => {
    const partners = getNearByPartners();
    expect(partners.length).toBe(0);
  });

  it("should find partners within a given range", () => {
    const partners = getNearByPartners(Partners, 300);
    expect(partners.length).toBe(4);
  });

  it("should sort partners by name in ascending order", () => {
    const partners = orderPartnersByName(Partners);
    expect(partners[0].organization).toBe("Ask Leadership");
  });

  it("should return an empty array if no array is passed", () => {
    const partners = orderPartnersByName();
    expect(partners.length).toBe(0);
  });
});
