const fetch = require("node-fetch");

const D = 100;

const PI = Math.PI;

const coordinates = [51.515419 / (180 / PI), -0.121099 / (180 / PI)];

const R = 6371; //Radius of earth in km

(function getSourceData() {
  fetch("https://success.spidergap.com/partners.json")
    .then(response => response.json())
    .then(data => getNearByPartners(data))
    .then(partners => console.log())
    .catch(err => console.log("ERROR - ", err));
})();

const getNearByPartners = (data = [], distance = D) => {
  let partners = data.filter(company => {
    for (let i = 0; i < company.offices.length; i++) {
      const location = toRadians(company.offices[i].coordinates);
      let Δφ = location[0] - coordinates[0];
      let Δλ = location[1] - coordinates[1];
      let a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(location[1]) *
          Math.cos(coordinates[1]) *
          Math.sin(Δλ / 2) *
          Math.sin(Δλ / 2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      if (R * c < distance) {
        return company;
      }
    }
  });
  return orderPartnersByName(partners);
};

const toRadians = coordinates => {
  return coordinates
    .split(",")
    .map(Number)
    .map(num => num / (180 / PI));
};

const orderPartnersByName = (partners = []) => {
  return partners.sort((partnerA, partnerB) => {
    const nameA = partnerA.organization.toLowerCase();
    const nameB = partnerB.organization.toLowerCase();

    // sort use merge sort and is base in Unicode points
    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
  });
};

module.exports = {
  getNearByPartners
};
