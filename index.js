function getQuery(query) {
  return query.split("&").reduce(function(acc, pairs) {
    const partial = pairs.split("=");
    acc[partial[0]] = partial[1] && decodeURIComponent(partial[1]);
    return acc;
  }, {});
}

const dogYearSymbolOfSky = {
  0: "庚", //1970   0
  1: "壬", //1982   12
  2: "甲", //1994   24
  3: "丙", //2006   36
  4: "戊", //2018   48
  5: "庚"
};

const dogYearSymbolOfEarth = "戌";

const sky = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const earth = [
  "子",
  "丑",
  "寅",
  "卯",
  "辰",
  "巳",
  "午",
  "未",
  "申",
  "酉",
  "戌",
  "亥"
];
const AD_1970 = 1970; //庚戌
const range = (v1, v2) =>
  Array.from({ length: Math.abs(v2 - v1 + 1) }, (_, index) => v1 + index);
const where = list => value => list.indexOf(value);
function mapLunarYears(skySymbols, earthSymbol) {
  return function(years, index) {
    const symbolOfSky = skySymbols[index % 5];
    const list = [];
    let symbolOfSkyIndex = where(sky)(symbolOfSky);
    let symbolOfEarthIndex = where(earth)(earthSymbol);
    for (let year of [years]) {
      list.push([year, `${sky[symbolOfSkyIndex]}${earth[symbolOfEarthIndex]}`]);
      symbolOfSkyIndex += 1;
      symbolOfSkyIndex %= 10;
      symbolOfEarthIndex += 1;
      symbolOfEarthIndex %= 12;
    }

    return list;
  };
}

const dedupe = (item, index, list) => {
  if (index > 0 && index <= list.length - 1) {
    let prevIndex = index - 1;
    let nextIndex = index + 1;
    let next = list[nextIndex];
    let prev = list[prevIndex];
    if (prev) {
      return prev[0] !== item[0];
    }
    if (next) {
      return next[0] !== item[0];
    }
    return true;
  } else {
    return true;
  }
};

const getLunarYearsOfDog = (dogYearSymbolOfSky, dogYearSymbolOfEarth) => {
  const groups = range(1070, 2030)
    .filter(year => (AD_1970 - year) % 12 === 0)
    .map(mapLunarYears(dogYearSymbolOfSky, dogYearSymbolOfEarth))
    .reduce(function(acc, curr) {
      acc.push(...curr);
      return acc;
    }, [])
    .filter(dedupe);

  console.log(groups);
};
getLunarYearsOfDog(dogYearSymbolOfSky, dogYearSymbolOfEarth);
