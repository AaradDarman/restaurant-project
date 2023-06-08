import { IOrder } from "interfaces/order.interfaces";
import OrdersList from "components/profile/recent-orders/orders/OrdersList";
import ProfileLayout from "components/layout/ProfileLayout";
import { GetServerSideProps } from "next";
import Cookies from "cookies";
import { useEffect } from "react";
import { getOrders } from "redux/slices/user";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useOrderContext } from "context/order-context";
import OrderContext from "context/OrderContext";
import { useRouter } from "next/router";

// import _orders from "data/orders.json";
// const orders: IOrder[] = _orders as IOrder[];

const RecentOrders = () => {
  const dispatch = useDispatch<any>();
  const { user } = useSelector((state: RootState) => state);
  const router = useRouter();
  const { openSuccessPaymentDialog } = useOrderContext();

  useEffect(() => {
    dispatch(getOrders());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (router.query.status) {
      openSuccessPaymentDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return (
    <div className="flex-1 gap-x-2 overflow-y-auto px-2 md:grid md:grid-cols-6">
      <OrdersList items={user.orders} />
    </div>
  );
};

RecentOrders.getLayout = function getLayout(page: JSX.Element) {
  return (
    <ProfileLayout>
      <OrderContext>{page}</OrderContext>
    </ProfileLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = new Cookies(ctx.req, ctx.res);
  const authorization = cookies.get("authorization");
  if (!authorization) {
    return {
      redirect: {
        destination: `/auth?returnUrl=${ctx.resolvedUrl}&forceLogout=true`,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default RecentOrders;
