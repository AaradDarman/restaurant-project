import { FC } from "react";

import { ICartItemProp } from "interfaces/food.interfaces";
import { Badge, Typography } from "@mui/material";
import Image from "next/image";
import clsx from "clsx";

const CartItem: FC<{ item: ICartItemProp }> = ({
  item: { images, size, quantity },
}) => {
  return (
    <Badge
      overlap="circular"
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      badgeContent={quantity}
      color="info"
      sx={{
        "&": {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "4px",
        },
        "& .MuiBadge-badge": {
          borderRadius: "4px",
        },
      }}
    >
      <div
        className={clsx(
          "relative h-[60px] w-[60px]",
          "sm:h-[125px] sm:w-[125px] md:h-[150px] md:w-[150px]"
        )}
      >
        <Image
          src={images[0]}
          alt="pizza"
          fill
          className={`drop-shadow-2x object-cover`}
        />
      </div>
      <Typography variant="caption">{size}</Typography>
    </Badge>
  );
};

export default CartItem;
