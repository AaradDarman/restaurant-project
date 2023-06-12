import http from "./xhr";

const getfood = (name: string) => {
  return http.get(`${process.env.NEXT_PUBLIC_SERVICE_URL}/food/${name}`);
};

const updateFoodViewCount = (id: string) => {
  return http.post(`${process.env.NEXT_PUBLIC_SERVICE_URL}/food/${id}`);
};

// eslint-disable-next-line
export default {
  getfood,
  updateFoodViewCount,
};
