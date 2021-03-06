const expect = require("expect");
const { cloneDeep } = require("../DeepClone/deepClone");

var myObj = {
  name: "Paddy",
  address: {
    town: "Lerum",
    country: "Sweden"
  }
};

describe("deepClone function", function() {
  it("should deep clone an object", function() {
    var newObject = cloneDeep(myObj);
    expect(newObject).toMatchObject(myObj);

    // We check that the object save the values not the reference.
    newObject.address.country = "India";
    expect(newObject.address.country).not.toBe(myObj.address.country);
  });

  it("should return empty object when no object inputted", function() {
    var newObject = cloneDeep();
    expect({}).toMatchObject(newObject);
  });

  it("should copy and compare date object", function() {
    const myObj = {
      name: "Paddy",
      address: {
        town: "Lerum",
        country: "Sweden",
        date: new Date(2020, 01, 01)
      },
      date: new Date(2020, 01, 01)
    };

    const newObject = cloneDeep(myObj);
    expect(newObject.date).toMatchObject(new Date(2020, 01, 01));
    expect(newObject.address.date).toMatchObject(new Date(2020, 01, 01));
  });
});
