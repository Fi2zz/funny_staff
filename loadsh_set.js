const target = [
  {
    key: "abc.bcd.efg",
    value: "John Wick"
  },
  {
    key: "abc.bcd.hij",
    value: "Tony Stack"
  },
  {
    key: "abc.bcd.jkm",
    value: "Cold Sharp"
  },

  {
    key: "abc.bcd.jkm.mno",
    value: "NeZha"
  }
];

const expected = {};

const _ = require("lodash");

// _.forEach(target,)

target.forEach(item => {
  _.set(expected, item.key, item.value);
});

console.log(JSON.stringify(expected, null, 2));
