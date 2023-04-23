import React from "react";

import { Badge } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";

import Icon from "components/shared/Icon";
import { RootState } from "redux/store";

const CartIcon = () => {
  const { cart } = useSelector((state: RootState) => state);

  return (
    <Badge
      overlap="circular"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      badgeContent={cart?.itemsCount}
      color="error"
    >
      <Link href="/checkout/cart" className="p-1 hover:text-inherit">
        <Icon icon="cart" size={24} />
      </Link>
    </Badge>
  );
};

export default CartIcon;
