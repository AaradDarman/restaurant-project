import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import { NextPageWithLayout } from "../../_app";
import userApi from "api/userApi";
import { IOrder } from "interfaces/order.interfaces";
import Cookies from "cookies";
import axios from "axios";
import {
  Avatar,
  AvatarGroup,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import Icon from "components/shared/Icon";
import Image from "next/image";
import {
  addHoursToDate,
  getPersianDateWithMonthInLetters,
} from "utils/date-helper";
import moment from "moment-jalaali";
import DotDevider from "components/shared/DotDivider";
import warningImg from "images/warning.svg";
import { useCountdown } from "hooks/useCountDown";
import { useOrderContext } from "context/order-context";
import OrderContext from "context/OrderContext";
import ReservedTable from "components/checkout/payment/ReservedTable";
import OrderItem from "components/profile/recent-orders/order/OrderItem";
import TransactionsHistory from "components/profile/recent-orders/order/TransactionsHistory";

interface ObjectLiteral {
  [key: string]: any;
}

const statusOptions: ObjectLiteral = {
  "wait-for-pay": "در انتظار پرداخت",
  "in-progress": "در حال پردازش",
  shipped: "ارسال شده",
  delivered: "تحویل شده",
  cancelled: "لغو شده",
};

const Order: NextPageWithLayout<{ order: IOrder }> = ({ order }) => {
  const router = useRouter();
  const [days, hours, minutes, seconds] = useCountdown(
    moment(order.createAt).add(3, "minute").toDate()
  );
  const { payBill } = useOrderContext();

  return (
    <div className="flex flex-1 flex-col sm:px-16">
      <div className="flex items-center">
        <IconButton
          sx={{
            backgroundColor: "transparent",
            fontSize: "24px",
            padding: "4px",
            marginRight: "4px",
          }}
          onClick={() => router.back()}
          className="!self-start"
        >
          <Icon icon="arrow-right" size={24} />
        </IconButton>
        <Typography variant="h6">جزئیات سفارش</Typography>
      </div>
      {order.status === "wait-for-pay" && (
        <div className="border-b-secondary-dark-200 dark:border-b-secondary-dark-800 flex flex-col items-center justify-center border-b-[1px] border-solid p-[1rem] md:flex-row md:items-center md:justify-between">
          <Typography
            variant="body1"
            className="flex w-full items-center justify-between text-[0.75rem] text-[#f9a825] lg:w-auto"
          >
            <Image src={warningImg} alt="wait-for-pay" width={18} height={18} />
            <span className="mr-2">
              {`در صورت عدم پرداخت تا ${
                minutes >= 0 ? minutes : 0
              } دقیقه دیگر، سفارش شما لغو خواهد شد.`}
            </span>
          </Typography>
          <Button
            variant="contained"
            onClick={() => payBill(order._id)}
            classes={{
              root: "!mr-auto !bg-accent-700 hover:!bg-accent-800 !text-white !mt-auto !text-center",
            }}
          >
            پرداخت
          </Button>
        </div>
      )}
      <div className="flex flex-col gap-y-3 sm:p-3">
        <div className="order-status flex items-center py-2">
          {/* <Image
            src={orderStates[order.status]}
            alt="order-status"
            width={48}
            height={48}
          /> */}
          <span className="mr-2">{statusOptions[order.status]}</span>
          <Icon className="me-auto" icon="chevron-left" size={24} />
        </div>
        <div className="flex flex-col items-center gap-y-3 lg:flex-row">
          <Typography
            variant="body1"
            className="flex w-full justify-between font-mono lg:block lg:w-auto"
          >
            <span className="ml-[4px] font-Byekan text-gray-400">
              شماره سفارش
            </span>
            {order?.orderNumber}
          </Typography>
          <DotDevider className="!hidden lg:!inline-block" />
          <Typography
            variant="body1"
            className="flex w-full justify-between lg:block lg:w-auto"
          >
            <span className="ml-[4px] text-gray-400">تاریخ ثبت سفارش</span>
            {getPersianDateWithMonthInLetters(moment(order?.createAt).toDate())}
          </Typography>
        </div>
      </div>
      <TransactionsHistory order={order} />
      {order.bookDetail && (
        <div className="relative mt-8 flex min-h-[110px] min-w-[220px] items-center justify-center rounded-md border-[1px] border-dashed border-primary-main p-2 sm:self-start">
          <ReservedTable reserveTable={order.bookDetail} />
        </div>
      )}
      <div className="flex flex-wrap">
        {order.items.map((item) => (
          <OrderItem key={`${item.name}-${item?.size}`} item={item} />
        ))}
      </div>
    </div>
  );
};

Order.getLayout = function getLayout(page: JSX.Element) {
  return <OrderContext>{page}</OrderContext>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = new Cookies(ctx.req, ctx.res);
  const authorization = cookies.get("authorization");
  if (!authorization) {
    return {
      redirect: {
        destination: `/users/login?returnUrl=${ctx.resolvedUrl}&forceLogout=true`,
        permanent: false,
      },
    };
  }

  try {
    const { data, status } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVICE_URL}/user/orders/${ctx.query.orderNumber}`,
      {
        headers: {
          authorization: authorization,
        },
      }
    );

    console.log(data);

    return {
      props: {
        order: data.order,
      },
    };
  } catch (error) {
    ctx.res.statusCode = 500;
    return {
      props: {},
    };
  }
};

export default Order;
