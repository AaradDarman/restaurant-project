import { FC } from "react";

import Link from "next/link";
import { faAdd, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Badge,
  ButtonBase,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { PulseLoader } from "react-spinners";

import Icon from "components/shared/Icon";
import { ICartState } from "interfaces/order.interfaces";

const AddToCartButton: FC<{
  className?: string;
  cartItem: ICartState["items"][0] | undefined;
  isOutOfStock?: boolean;
  isLoading: boolean;
  hasItemInCart: boolean;
  onAddToBasketClick: () => void;
  onRemoveFromBasketClick: () => void;
}> = ({
  className,
  cartItem,
  isOutOfStock,
  isLoading,
  hasItemInCart,
  onAddToBasketClick,
  onRemoveFromBasketClick,
}) => {
  let theme = useTheme();

  return (
    <ButtonBase
      component="div"
      disableRipple={!!cartItem}
      className={className}
      sx={{
        padding: "4px",
        marginTop: "auto",
        borderRadius: "9999px",
        backgroundColor: "accent.main",
        "&:hover": {
          backgroundColor: "accent.main",
        },
      }}
      classes={{
        disabled: `${isLoading ? "!bg-accent-500" : "!bg-white/[0.12]"}`,
      }}
      disabled={isOutOfStock}
      onClick={() => {
        !!cartItem ? null : onAddToBasketClick();
      }}
    >
      <div className="relative z-[1] flex w-full items-center justify-between">
        {cartItem ? (
          <div>
            <IconButton
              sx={{
                backgroundColor: "secondary.main",
                fontSize: "24px",
                "&:hover": {
                  backgroundColor: "secondary.main",
                },
              }}
              disabled={isLoading}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onAddToBasketClick();
              }}
            >
              <FontAwesomeIcon icon={faAdd} width={24} />
            </IconButton>
            {isLoading ? (
              <PulseLoader
                className="!inline"
                size={3}
                color={theme.palette.accent.main}
                loading={true}
              />
            ) : (
              <span className="inline-block min-w-[21px] text-center text-[16px]">
                {cartItem.quantity}
              </span>
            )}
            <IconButton
              disabled={isLoading}
              onClick={(e) => {
                onRemoveFromBasketClick();
                e.stopPropagation();
                e.preventDefault();
              }}
              sx={{
                backgroundColor: "secondary.main",
                fontSize: "24px",
                "&:hover": {
                  backgroundColor: "secondary.main",
                },
              }}
            >
              {cartItem.quantity > 1 ? (
                <FontAwesomeIcon icon={faMinus} width={24} />
              ) : (
                <Icon icon="delete" size={24} />
              )}
            </IconButton>
          </div>
        ) : (
          <Typography variant="body1" className="!mr-4">
            {isOutOfStock ? "نا موجود" : "افزودن به سبد خرید"}
          </Typography>
        )}
        <IconButton
          disabled={isLoading}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "64px",
            borderRadius: "9999px",
            backgroundColor: "secondary.main",
            "&:hover": {
              backgroundColor: "secondary.main",
            },
            padding: "8px",
          }}
        >
          <Badge
            overlap="circular"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            invisible={!hasItemInCart}
            variant="dot"
            color="error"
          >
            <Link
              href="/checkout/cart"
              className="leading-[1rem] hover:text-inherit"
            >
              <Icon icon="cart" size={24} />
            </Link>
          </Badge>
        </IconButton>
      </div>
    </ButtonBase>
  );
};

export default AddToCartButton;
