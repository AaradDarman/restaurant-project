import { decodeToken } from "utils/token-helper";

export default async function handler(req: any, res: any) {
  console.log("REVALIDATE");
  console.log(req.query.secret);
  let decodedToken = await decodeToken(req.query.secret);
  console.log(decodeToken);

  if (!decodedToken) {
    return res.status(401).json({ message: "Invalid token" });
  }
  console.log((decodedToken as any).paths);

  try {
    await Promise.all(
      (decodedToken as any).paths.map(
        async (path: string) => await res.revalidate(path)
      )
    );

    return res.json({ revalidated: true });
  } catch (err) {
    console.log(err);

    return res.status(500).send("Error revalidating");
  }
}
