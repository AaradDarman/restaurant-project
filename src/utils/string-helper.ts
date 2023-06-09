import kebabCase from "lodash/kebabCase";

export const shorten = (text: string, maxLength: number) => {
  var ret = text;
  if (ret.length > maxLength) {
    ret = ret.substr(0, maxLength - 3) + "...";
  }
  return ret;
};

export const convetStringToUrlFormat = (str: string | undefined) => {
  if (str) {
    return kebabCase(str);
  }
  return undefined;
};

export const convetUrlToStringFormat = (str: string | undefined) => {
  if (str) {
    return str.replace(/-/g, " ");
  }
  return undefined;
};
