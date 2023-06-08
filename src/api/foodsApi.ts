import http from "./xhr";

const getfoodNames = () => {
  return http.get(`${process.env.NEXT_PUBLIC_SERVICE_URL}/foods/names`);
};

const getfoods = (query?: object) => {
  return http.get(`${process.env.NEXT_PUBLIC_SERVICE_URL}/foods`, {
    params: query,
  });
};

// eslint-disable-next-line
export default {
  getfoodNames,
  getfoods,
};
