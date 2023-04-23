export type TSize = {
  label: string;
  height?: number;
  diameter?: number;
  content?: string;
};

export type TPrice = {
  size: string;
  p: number;
};

export type TIsOutOfStock = boolean;

export type TDiscount = {
  size: string;
  amount: number;
};

export type TDiscounts = Array<TDiscount> | number;

export type TCategory = {
  _id: string;
  name: string;
  slug: string;
  parent: string;
  ancestors: Array<Pick<TCategory, "_id" | "name" | "slug">>;
};
