/* eslint-disable import/no-anonymous-default-export */
import Cookies from "cookies";

export default (req: any, res: any) => {
  const cookies = new Cookies(req, res);

  cookies.set("authorization");
  res.end();
};
