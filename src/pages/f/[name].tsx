import { FC, useEffect, useState } from "react";

import clsx from "clsx";
import Image from "next/image";
import { Chip, IconButton, Typography } from "@mui/material";
import Head from "next/head";
import styled from "@emotion/styled";
import { isEqual } from "lodash";
import { useDispatch, useSelector } from "react-redux";

import SwiperComponent from "components/shared/Swiper";
import foodslist from "data/foodslist.json";
import AddToCartButton from "components/food/AddToCartButton";
import SizeSelector from "components/food/SizeSelector";
import Price from "components/food/Price";
import useFoodCalculation from "hooks/useFoodCalculation";
import { TFoodItem } from "interfaces/food.interfaces";
import { TSize } from "types/food.types";
import {
  convetStringToUrlFormat,
  convetUrlToStringFormat,
} from "utils/string-helper";
import { RootState } from "redux/store/index";
import { addItemToLocalCart, removeItemFromLocalCart } from "redux/slices/cart";
import NoSSRWraper from "components/NoSSRWraper";
import useBreakpoints from "hooks/useBreakPoints";
import { useRouter } from "next/router";
import Icon from "components/shared/Icon";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

const StyledSwiperComponent = styled(SwiperComponent)`
  .swiper-pagination {
    bottom: 30px;
  }
`;

const Food: FC<{ food: TFoodItem }> = ({ food }) => {
  const { _id, name, description, isOutOfStock, images, sizes } = food;

  const [selectedSize, setSelectedSize] = useState<TSize>();

  const { discount, price } = useFoodCalculation({
    item: food,
    selectedSize: selectedSize
      ? selectedSize
      : sizes?.length
      ? sizes[0]
      : undefined,
  });

  const { cart } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const { isMd } = useBreakpoints();
  const [swiper, setSwiper] = useState<any>(null);
  // const [cartItem, setCartItem] = useState<any>(null);
  const router = useRouter();

  let cartItem = cart.items.find((item) => {
    if (sizes?.length) {
      if (item._id === _id && isEqual(item.size, selectedSize)) {
        return item;
      }
    } else if (item._id === _id) {
      return item;
    }
    return undefined;
  });

  useEffect(() => {
    setSelectedSize(sizes?.length ? sizes[0] : undefined);
    const element = document?.getElementById("test");
    if (typeof window != "undefined" && element) {
      element.style.minHeight = window.innerHeight + "px";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isMd) {
      swiper.autoplay.start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMd]);

  return (
    <div
      className="flex flex-col md:container md:mx-auto md:grid md:grid-cols-5 md:pt-[56px]"
      id="test"
    >
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_SITE_NAME} | ${name}`}</title>
      </Head>
      {/* Food Images Section */}
      <div className="bg-gradient pt-[39px] md:order-2 md:col-span-3 md:flex md:justify-start md:bg-none md:pt-0">
        <NoSSRWraper>
          <StyledSwiperComponent
            items={images.map((img) => {
              return { _id: img, src: img };
            })}
            loop={true}
            onSwiper={(swiper) => setSwiper(swiper)}
            className="md:mx-0 md:w-[400px]"
            swiperSlideClassName="!flex !justify-center px-[10px] pt-[10px] pb-[30px]"
            RenderComponent={({ item }) => (
              <div
                className={clsx(
                  "relative flex h-[300px] w-[90%] items-center justify-center drop-shadow-2xl md:h-[400px] md:w-[400px]",
                  "overflow-hidden rounded-md min-[425px]:w-[80%]"
                )}
              >
                <Image
                  src={item.src}
                  alt="pizza"
                  fill
                  className={`object-cover drop-shadow-2xl min-[425px]:object-contain ${
                    isOutOfStock && "grayscale"
                  }`}
                />
              </div>
            )}
          />
        </NoSSRWraper>
      </div>
      {/* Food Info Section */}
      <div
        className={clsx(
          "relative -mt-[20px] flex w-full flex-1 flex-col items-center md:col-span-2 md:-mt-0",
          "rounded-3xl bg-secondary-900 p-4 pb-[60px] pt-5 md:order-1 md:items-stretch md:justify-evenly md:px-8 md:pb-0 md:pt-0"
        )}
      >
        <IconButton
          sx={{
            backgroundColor: "transparent",
            fontSize: "24px",
            "&:hover": {
              backgroundColor: "transparent",
            },
            padding: "4px",
          }}
          onClick={() => router.back()}
          className="!hidden !self-start md:!inline-flex"
        >
          <Icon icon="arrow-right" size={24} />
        </IconButton>
        <Typography
          variant="h5"
          component="h1"
          color="secondary.300"
          className="md:!text-[32px]"
        >
          {name}
        </Typography>
        <Typography variant="body1" color="secondary.500">
          {description}
        </Typography>
        <div className="mt-auto flex w-full items-center md:mt-0 md:flex-col md:items-start">
          {sizes?.length && (
            <SizeSelector
              sizes={sizes}
              selectedSize={selectedSize}
              onChange={(e) => setSelectedSize(JSON.parse(e.target.value))}
              className="mb-5"
            />
          )}
          <div className="mr-auto flex flex-col md:mr-0 md:flex-row">
            <Price
              item={food}
              selectedSize={
                selectedSize
                  ? selectedSize
                  : sizes?.length
                  ? sizes[0]
                  : undefined
              }
              discountedPriceClassName="leading-[1] !text-[14px]"
              priceClassName="!text-secondary-300 !text-[13px]"
            />
            {discount && (
              <Chip
                label={`${discount}%`}
                color="error"
                size="small"
                className={clsx(
                  "absolute right-4 top-4 !text-[10px] md:relative md:right-0 md:top-0",
                  "sm:!text-[12px]"
                )}
                sx={{
                  "&": {
                    height: "16px",
                  },
                  "& .MuiChip-label": {
                    lineHeight: 1,
                    paddingRight: "4px",
                    paddingLeft: "4px",
                  },
                }}
              />
            )}
          </div>
        </div>
        <AddToCartButton
          className="!fixed !bottom-1 !left-1 !right-1 md:!relative md:!bottom-0 md:!left-0 md:!right-0 md:!mt-0"
          cartItem={cartItem}
          isOutOfStock={isOutOfStock}
          hasItemInCart={!!cart.itemsCount}
          isLoading={cart.status === "loading"}
          onAddToBasketClick={() => {
            dispatch(
              addItemToLocalCart({
                _id,
                name,
                size: selectedSize,
                price,
                discount,
                image: images[0],
              })
            );
          }}
          onRemoveFromBasketClick={() => {
            dispatch(
              removeItemFromLocalCart({
                _id,
                name,
                size: selectedSize,
              })
            );
          }}
        />
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = foodslist.map((f) => ({
    params: { name: convetStringToUrlFormat(f.name) },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let food = foodslist.find(
    (food) => food.name === convetUrlToStringFormat(params?.name as string)
  );

  return {
    props: {
      food,
    },
  };
};

export default Food;
