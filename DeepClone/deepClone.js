const cloneDeep = (inObj = {}) => {
  let outObj, value, key;

  if (typeof inObj !== "object" || inObj === null) {
    return inObj; // Return if inObj is not an object
  }

  // Check if Date instance
  if (inObj instanceof Date) {
    outObj = new Date();
    outObj.setTime(inObj.getTime());
    return outObj;
  }

  // Check if Array or an Object
  outObj = Array.isArray(inObj) ? [] : {};

  for (key in inObj) {
    value = inObj[key];

    // Recursively copy for nested objects and arrays
    outObj[key] =
      typeof value === "object" && value !== null ? cloneDeep(value) : value;
  }
  // console.log(outObj);

  return outObj;
};

let input = { name: "Paddy", address: { town: "Lerum", country: "Sweden" } };

let deepCloneCopy = cloneDeep(input);

deepCloneCopy.address.country = "Norway";

console.log(deepCloneCopy, input);

module.exports = {
  cloneDeep
};
