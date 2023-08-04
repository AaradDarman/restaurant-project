export type TPaymentType = "آنلاین" | "حضوری" | "نقدی" | "کارت خوان";

export type TTransactionDetail = {
  _id: string;
  price: number;
  orderNumber: string;
  trackingNumber: string;
  status: "SUCCESS" | "FAILED";
  paidAt: string;
};
