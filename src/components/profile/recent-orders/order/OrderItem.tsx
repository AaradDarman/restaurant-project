import { FC } from "react";

import { faAdd, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chip, IconButton, Typography } from "@mui/material";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { PulseLoader } from "react-spinners";

import Icon from "components/shared/Icon";
import { useOrderContext } from "context/order-context";
import useFoodCalculation from "hooks/useFoodCalculation";
import { ICartItemProp } from "interfaces/food.interfaces";
import { numberWithCommas } from "utils/number-helper";
import { convetStringToUrlFormat } from "utils/string-helper";

const CartItem: FC<{ item: ICartItemProp }> = ({ item }) => {
  const { price, discount, discountedPrice } = useFoodCalculation({
    item,
    selectedSize: item.size,
  });
  const { _id, name, images, quantity, size } = item;

  return (
    <Link
      href={`/f/${convetStringToUrlFormat(name)}`}
      className="relative flex items-stretch p-2"
    >
      <div
        className={clsx(
          "relative h-[80px] w-[80px]",
          "sm:h-[125px] sm:w-[125px] md:h-[150px] md:w-[150px]"
        )}
      >
        <Image
          src={images[0]}
          alt="pizza"
          fill
          className={`drop-shadow-2x object-cover duration-700 group-hover:rotate-180`}
        />
      </div>
      <div className="mr-5 flex flex-col items-start justify-evenly">
        <Typography variant="h6" component="h3">
          {`${name} ${size ?? ""}`}
        </Typography>
        <div className="flex justify-between">
          <div className="flex w-full flex-col">
            <Typography variant="caption">{`${
              discount
                ? numberWithCommas(discountedPrice)
                : numberWithCommas(price)
            } تومان`}</Typography>
            {discount && (
              <div className="flex">
                <Chip
                  label={`${discount}%`}
                  color="error"
                  size="small"
                  className={clsx(
                    "absolute right-1 top-1 !text-[10px]",
                    "ml-1 sm:!text-[12px]"
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
                <Typography
                  variant="caption"
                  className="text-gray-400 line-through"
                >
                  {numberWithCommas(price)}
                </Typography>
              </div>
            )}
          </div>
        </div>
        <Typography variant="caption" className="text-gray-400">
          {`${quantity} عدد`}
        </Typography>
      </div>
    </Link>
  );
};

export default CartItem;
