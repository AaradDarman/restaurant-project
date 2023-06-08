import http from "./xhr";

const getfood = (name: string) => {
  return http.get(`${process.env.NEXT_PUBLIC_SERVICE_URL}/food/${name}`);
};

// eslint-disable-next-line
export default {
  getfood,
};
