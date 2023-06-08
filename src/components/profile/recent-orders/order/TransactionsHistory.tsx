import { FC } from "react";
import { Typography } from "@mui/material";
import moment from "moment-jalaali";
import Image from "next/image";

import MyAccordion from "components/shared/Accordion";
import DotDevider from "components/shared/DotDivider";
import { IOrder } from "interfaces/order.interfaces";
import { TTransactionDetail } from "types/payment.types";
import { getPersianDateWithMonthInLetters } from "utils/date-helper";
import { numberWithCommas } from "utils/number-helper";
import failedImg from "images/failed.svg";
import successImg from "images/success.svg";

const TransactionsHistory: FC<{ order: IOrder }> = ({ order }) => {
  let discountedTotalPrice = order.items.reduce((total, item) => {
    if (item.discount) {
      return (
        (item.price - Math.round((item.price * item.discount) / 100)) *
          item.quantity +
        total
      );
    } else {
      return item.price * item.quantity + total;
    }
  }, 0);

  return (
    <MyAccordion
      btnTitle={
        <div className="flex flex-1 flex-col gap-y-3 lg:flex-row lg:items-center">
          <Typography variant="body1" className="order-total-price flex">
            <span className="ml-auto text-gray-400 lg:ml-[8px]">مبلغ</span>
            {`${numberWithCommas(order.totalPrice)} تومان`}
          </Typography>
          {order.totalPrice - discountedTotalPrice != 0 && (
            <>
              <DotDevider className="!hidden lg:!inline-block" />
              <Typography
                gutterBottom
                className="!mb-0 flex items-baseline justify-between"
                variant="body1"
                component="div"
              >
                <span className="ml-[8px] text-gray-400">سود شما از خرید</span>
                <span>
                  {`${numberWithCommas(
                    order.totalPrice - discountedTotalPrice
                  )} تومان`}
                </span>
              </Typography>
            </>
          )}
          <div className="flex self-center text-[13px] lg:mr-auto lg:self-end">
            <Typography
              className="!ml-2 !text-[0.8rem] text-accent-800 hover:text-accent-800"
              variant="body1"
              component="div"
            >
              تاریخچه تراکنش ها
            </Typography>
          </div>
        </div>
      }
      iconClassName="!text-accent-main"
    >
      <>
        {order?.transactionDetails?.map((transaction: TTransactionDetail) => (
          <div
            key={transaction._id}
            className="flex flex-col items-start rounded-[4px] border-[1px] border-primary-main p-[0.7rem] lg:flex-row"
          >
            <Image
              src={transaction.status === "FAILED" ? failedImg : successImg}
              alt="transaction-status"
              className="ml-2"
            />
            <div className="flex w-full flex-col lg:w-auto">
              <Typography
                variant="body1"
                className="flex w-full justify-between lg:block lg:w-auto"
              >
                <span className="ml-[4px] inline text-gray-400 lg:hidden">
                  توضیحات
                </span>
                {transaction.status === "FAILED"
                  ? "پرداخت ناموفق"
                  : "پرداخت موفق"}
              </Typography>
              <Typography
                variant="body1"
                className="flex w-full justify-between lg:block lg:w-auto"
              >
                <span className="ml-[4px] text-gray-400">شماره پیگیری</span>
                {transaction.trackingNumber}
              </Typography>
            </div>
            <div className="mr-0 flex w-full flex-col items-center lg:mr-auto lg:w-auto lg:flex-row">
              <Typography
                variant="body1"
                className="flex w-full justify-between lg:block lg:w-auto"
              >
                <span className="ml-[4px] inline text-gray-400 lg:hidden">
                  زمان
                </span>
                {getPersianDateWithMonthInLetters(
                  moment(transaction.paidAt).toDate()
                )}
              </Typography>
              <DotDevider className="!hidden lg:!inline-block" />
              <Typography
                variant="body1"
                className="flex w-full justify-between lg:block lg:w-auto"
              >
                <span className="ml-[4px] inline text-gray-400 lg:hidden">
                  مبلغ
                </span>
                {`${numberWithCommas(transaction.price)} تومان`}
              </Typography>
            </div>
          </div>
        ))}
      </>
    </MyAccordion>
  );
};

export default TransactionsHistory;
