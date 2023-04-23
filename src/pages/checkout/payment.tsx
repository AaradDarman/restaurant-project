import moment from "moment-jalaali";
import { GetServerSideProps } from "next";
import { useSelector } from "react-redux";
import {
  faEllipsisVertical,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, IconButton, Typography } from "@mui/material";
import Cookies from "cookies";
import Head from "next/head";

import NoSSRWraper from "components/NoSSRWraper";
import TablePickerButton from "components/booking/TablePickerButton";
import ActionButton from "components/checkout/ActionButton";
import CartItem from "components/checkout/payment/CartItem";
import Icon from "components/shared/Icon";
import Popover from "components/shared/Popover";
import SwiperComponent from "components/shared/Swiper";
import ToggleButton from "components/shared/ToggleButton";
import OrderContext from "context/OrderContext";
import { useBookingContext } from "context/booking-context";
import { useOrderContext } from "context/order-context";
import { RootState } from "redux/store";
import { numberWithCommas } from "utils/number-helper";
import { calculateTotalDiscount } from "hooks/useFoodCalculation";
import useBreakpoints from "hooks/useBreakPoints";

const Payment = () => {
  const { cart } = useSelector((state: RootState) => state);
  const { eatMethod, setEatMethod, paymentMethod, setPaymentMethod } =
    useOrderContext();
  const {
    selectedTable,
    openSelectTableDialog,
    openReserveEditDialog,
    handleCancelbooking,
  } = useBookingContext();
  let totalDiscount = calculateTotalDiscount(
    cart.totalPrice,
    cart.totalPriceWithDiscount
  );
  const { isMd } = useBreakpoints();

  return (
    <NoSSRWraper>
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_SITE_NAME} | خرید`}</title>
      </Head>
      <div className="flex flex-1 flex-col md:grid md:max-h-[calc(100vh_-_58px)] md:grid-cols-5 md:p-2 xl:p-4">
        <div className="mb-[108px] flex flex-1 flex-col justify-evenly px-4 md:col-span-4 md:mb-0 md:ml-1 md:items-start md:rounded-md md:border-[1px] md:border-primary-main">
          <SwiperComponent
            slidesPerView="auto"
            pagination={false}
            className="w-full"
            items={cart.items}
            RenderComponent={CartItem}
            swiperSlideClassName="!w-fit"
          />
          <div className="flex flex-col">
            <Typography variant="h6" component="h3" className="!mb-1">
              سفارش
            </Typography>
            <ToggleButton
              values={[
                { label: "سالن" },
                { label: "بیرون بری", isDisabled: !!cart.reserveTable },
              ]}
              value={eatMethod}
              onChange={(e, val) => {
                if (val !== null) {
                  setEatMethod(val);
                }
              }}
              className="!mx-1"
            />
          </div>
          <div className="flex flex-col">
            <Typography variant="h6" component="h3" className="!mb-1">
              روش پرداخت
            </Typography>
            <ToggleButton
              values={[
                {
                  label: "حضوری",
                  isDisabled: !!cart.reserveTable,
                },
                { label: "آنلاین" },
              ]}
              value={paymentMethod}
              onChange={(e, val) => {
                if (val !== null) {
                  setPaymentMethod(val);
                }
              }}
              className="!mx-1"
            />
          </div>

          {eatMethod === "بیرون بری" ? null : (
            <div className="flex flex-col">
              <Typography variant="h6" component="h3" className="!mb-1">
                میز
              </Typography>
              {!!cart.reserveTable ? (
                <div className="relative flex min-h-[110px] min-w-[220px] items-center justify-center rounded-md border-[1px] border-dashed border-primary-main p-2">
                  <Popover
                    content={({ onClose }) => (
                      <>
                        <Typography
                          onClick={() => {
                            onClose();
                            handleCancelbooking();
                          }}
                          variant="subtitle2"
                          sx={{
                            p: 1,
                            cursor: "pointer",
                          }}
                          className=" bg-primary-800 hover:bg-primary-900"
                        >
                          <Icon icon="delete" size={19} />
                          کنسل
                        </Typography>
                        <Typography
                          onClick={() => {
                            onClose();
                            openReserveEditDialog();
                          }}
                          variant="subtitle2"
                          sx={{
                            p: 1,
                            cursor: "pointer",
                          }}
                          className=" bg-primary-800 hover:bg-primary-900"
                        >
                          <FontAwesomeIcon icon={faPencil} width={19} />
                          ویرایش
                        </Typography>
                      </>
                    )}
                    renderTarget={({ isOpen, ...otherProps }) => (
                      <IconButton
                        {...otherProps}
                        className="!absolute !right-0 !top-1 !text-[19px]"
                      >
                        <FontAwesomeIcon icon={faEllipsisVertical} width={19} />
                      </IconButton>
                    )}
                  />

                  <div className="flex py-1">
                    <Icon
                      icon="reserved"
                      size={80}
                      className="absolute -top-[40px] left-1/2 -translate-x-[50%] bg-secondary-main px-2"
                    />
                    <Typography variant="h4">{`میز شماره ${cart.reserveTable.name}`}</Typography>
                  </div>
                  <div className="absolute bottom-0 left-0 flex">
                    <Typography variant="body2" className="py-1">
                      <Icon icon="calendar" size={16} className="ml-1" />
                      {moment(cart.reserveTable.date).format("dddd jDD jMMMM")}
                    </Typography>
                    <Typography variant="body2" className="!mr-2 py-1">
                      <Icon icon="clock" size={16} className="ml-1" />
                      {moment(cart.reserveTable.date).format("HH:mm")}
                    </Typography>
                  </div>
                </div>
              ) : (
                <TablePickerButton
                  value={selectedTable}
                  onClick={openSelectTableDialog}
                />
              )}
            </div>
          )}
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-secondary-800 px-1 pb-[60px] md:relative md:bottom-[unset] md:left-[unset] md:right-[unset] md:col-span-2 md:h-fit md:rounded-md md:border-[1px] md:border-primary-main md:bg-transparent md:p-2 md:pb-2 lg:col-span-1">
          <div className="hidden justify-between px-3 py-1 md:flex">
            <Typography variant="body1">جمع</Typography>
            <Typography variant="body1">
              {numberWithCommas(cart.totalPrice)}
            </Typography>
          </div>
          {cart.totalPriceWithDiscount != cart.totalPrice && isMd ? (
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
          <Divider variant="middle" className="!my-2 !hidden md:!block" />
          <div className="mb-4 hidden justify-between px-3 md:flex">
            <Typography variant="body1">جمع کل</Typography>
            <Typography variant="body1">
              {numberWithCommas(cart.totalPriceWithDiscount)}
            </Typography>
          </div>
          <ActionButton
            buttonText="ثبت سفارش و پرداخت"
            Icon={() => (
              <div className="flex items-center">
                <div className="flex flex-col leading-[1] md:hidden">
                  <Typography variant="caption">
                    {numberWithCommas(cart.totalPriceWithDiscount)}
                  </Typography>
                  <Typography variant="caption">تومان</Typography>
                </div>
                <Icon icon="credit-card" size={24} className="mr-1 md:mr-0" />
              </div>
            )}
            className="w-full !justify-between"
          />
        </div>
      </div>
    </NoSSRWraper>
  );
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

Payment.getLayout = function getLayout(page: JSX.Element) {
  return <OrderContext>{page}</OrderContext>;
};

export default Payment;
