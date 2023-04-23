import _orders from "data/orders.json";
import { IOrder } from "interfaces/order.interfaces";
import OrdersList from "components/profile/recent-orders/OrdersList";
import ProfileLayout from "components/layout/ProfileLayout";
const orders: IOrder[] = _orders as IOrder[];

const RecentOrders = () => {
  return (
    <div className="overflow-y-auto px-2 gap-x-2 md:grid md:grid-cols-6">
      <OrdersList items={orders} />
    </div>
  );
};

RecentOrders.getLayout = function getLayout(page: JSX.Element) {
  return <ProfileLayout>{page}</ProfileLayout>;
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const cookies = new Cookies(ctx.req, ctx.res);
//   const authorization = cookies.get("authorization");
//   if (!authorization) {
//     return {
//       redirect: {
//         destination: `/auth?returnUrl=${ctx.resolvedUrl}&forceLogout=true`,
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {},
//   };
// };

export default RecentOrders;
