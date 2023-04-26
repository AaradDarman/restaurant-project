import { FC } from "react";

import Image from "next/image";
import Link from "next/link";
import { Chip, Typography } from "@mui/material";
import { Variants, motion } from "framer-motion";
import clsx from "clsx";
import LinesEllipsis from "react-lines-ellipsis";
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC";
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

import { numberWithCommas } from "utils/number-helper";
import { TFoodItem } from "interfaces/food.interfaces";
import useFoodCalculation from "hooks/useFoodCalculation";
import { convetStringToUrlFormat } from "utils/string-helper";

const Food: FC<
  { item: TFoodItem } & {
    className: string;
    delay: number;
  }
> = ({ className, delay, item }) => {
  const { price, discount, discountedPrice } = useFoodCalculation({
    item,
  });
  const { name, description, isOutOfStock, images } = item;

  const cardVariants: Variants = {
    offscreen: {
      opacity: 0,
    },
    onscreen: {
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
        delay: delay,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.4 }}
      className={`${className} ${clsx(
        "group relative z-0 flex max-h-[285px] max-w-[300px] flex-col",
        "rounded-2xl bg-primary-main"
      )}`}
    >
      <Link
        href={`/f/${convetStringToUrlFormat(name)}`}
        className="flex h-full flex-col items-center p-2"
      >
        <div
          className={clsx(
            "relative h-[100px] w-[100px]",
            "sm:h-[125px] sm:w-[125px] md:h-[150px] md:w-[150px]"
          )}
        >
          <Image
            src={images[0]}
            alt="pizza"
            fill
            className={`drop-shadow-2x object-cover duration-700 ${
              isOutOfStock && "grayscale"
            }`}
          />
        </div>
        <div className="flex flex-col text-center">
          <Typography variant="h6" component="h3">
            {name}
          </Typography>
          <ResponsiveEllipsis
            text={description}
            maxLine="3"
            ellipsis="..."
            trimRight
            basedOn="letters"
            className="py-1 text-[10px] text-primary-500 sm:text-[12px]"
          />
        </div>
        <div className="mt-auto flex justify-between">
          {isOutOfStock ? (
            <Typography variant="caption">ناموجود</Typography>
          ) : (
            <>
              {discount && (
                <Chip
                  label={`${discount}%`}
                  color="error"
                  size="small"
                  className={clsx(
                    "absolute right-1 top-1 !text-[10px]",
                    "sm:!text-[12px] md:relative md:right-0 md:top-0 md:ml-2",
                    isOutOfStock && "grayscale"
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
              <div className="flex w-full flex-col items-center">
                <Typography variant="caption">{`${
                  discount
                    ? numberWithCommas(discountedPrice)
                    : numberWithCommas(price)
                } تومان`}</Typography>
                {discount && (
                  <Typography
                    variant="caption"
                    className="text-gray-400 line-through"
                  >
                    {numberWithCommas(price)}
                  </Typography>
                )}
              </div>
            </>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default Food;
