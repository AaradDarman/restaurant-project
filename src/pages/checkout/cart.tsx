import { Divider, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

import ActionButton from "components/checkout/ActionButton";
import OrderContext from "context/OrderContext";
import { calculateTotalDiscount } from "hooks/useFoodCalculation";
import { RootState } from "redux/store";
import { numberWithCommas } from "utils/number-helper";
import NoSSRWraper from "components/NoSSRWraper";
import ItemsList from "components/checkout/cart/ItemsList";
import Icon from "components/shared/Icon";
import emptyImg from "images/empty-cart.svg";

const Cart = () => {
  const { cart } = useSelector((state: RootState) => state);
  let totalDiscount = calculateTotalDiscount(
    cart.totalPrice,
    cart.totalPriceWithDiscount
  );
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col md:grid md:max-h-[calc(100vh_-_58px)] md:grid-cols-5 md:p-2 xl:p-4">
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_SITE_NAME} | سبد خرید`}</title>
      </Head>
      {isEmpty(cart?.items) ? (
        <div className="mb-[56px] flex w-full flex-1 flex-col items-center justify-center md:col-span-5">
          <Image src={emptyImg} alt="empty-cart" className="drop-shadow-2xl" />
          <Typography variant="h5">سبد خرید شما خالی می باشد!</Typography>
          <Link href="/" className="mt-3 text-accent-main underline">
            مشاهده منو
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-[220px] flex-1 content-start overflow-y-auto px-2 md:col-span-3 md:mb-0 md:ml-1 md:grid md:flex-[unset] md:grid-cols-4 md:rounded-md md:border-[1px] md:border-primary-main lg:col-span-4">
            <ItemsList items={cart.items} />
          </div>
          <div className="fixed bottom-0 left-0 right-0 bg-secondary-800 px-1 pb-[60px] md:relative md:bottom-[unset] md:left-[unset] md:right-[unset] md:col-span-2 md:h-fit md:rounded-md md:border-[1px] md:border-primary-main md:bg-transparent md:p-2 md:pb-2 lg:col-span-1">
            <div className="flex justify-between px-3 py-1">
              <Typography variant="body1">جمع</Typography>
              <Typography variant="body1">
                {numberWithCommas(cart.totalPrice)}
              </Typography>
            </div>
            {cart.totalPriceWithDiscount != cart.totalPrice ? (
              <div className="flex justify-between px-3 py-1">
                <Typography variant="body1">{`تخفیف %${totalDiscount.toFixed(
                  1
                )}`}</Typography>
                <Typography variant="body1" color="error">
                  {numberWithCommas(
                    cart.totalPrice - cart.totalPriceWithDiscount
                  )}
                  -
                </Typography>
              </div>
            ) : null}
            <Divider variant="middle" className="!my-2" />
            <div className="mb-4 flex justify-between px-3">
              <Typography variant="body1">جمع کل</Typography>
              <Typography variant="body1">
                {numberWithCommas(cart.totalPriceWithDiscount)}
              </Typography>
            </div>
            <ActionButton
              buttonText="ادامه سفارش"
              className="w-full"
              Icon={() => <Icon icon="arrow-left" size={24} />}
              onClick={() => router.push("/checkout/payment")}
            />
          </div>
        </>
      )}
    </div>
  );
};

Cart.getLayout = function getLayout(page: JSX.Element) {
  return (
    <OrderContext>
      <NoSSRWraper>{page}</NoSSRWraper>
    </OrderContext>
  );
};

export default Cart;
