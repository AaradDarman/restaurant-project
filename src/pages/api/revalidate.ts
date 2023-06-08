import { decodeToken } from "utils/token-helper";

export default async function handler(req: any, res: any) {
  let decodedToken = decodeToken(req.query.secret);

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
    return res.status(500).send("Error revalidating");
  }
}
