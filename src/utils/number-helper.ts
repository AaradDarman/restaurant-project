export const numberWithCommas = (number?: number) => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const numberWithoutCommas = (number: string) => {
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const toEnglishDigits = (str: any) => {
  // convert persian digits [۰۱۲۳۴۵۶۷۸۹]
  var e = "۰".charCodeAt(0);
  str = str.replace(/[۰-۹]/g, (t: any) => {
    return t.charCodeAt(0) - e;
  });

  // convert arabic indic digits [٠١٢٣٤٥٦٧٨٩]
  e = "٠".charCodeAt(0);
  str = str.replace(/[٠-٩]/g, (t: any) => {
    return t.charCodeAt(0) - e;
  });
  return str;
};

export const compactNumber = (num: number) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "هزار" },
    { value: 1e6, symbol: "میلیون" },
    { value: 1e9, symbol: "میلیارد" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(1).replace(rx, "$1") + item.symbol
    : "0";
};

export const isEven = (value: number) => {
  if (value % 2 == 0) return true;
  else return false;
};
