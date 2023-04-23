import { FC } from "react";

import { Avatar, AvatarGroup, Typography } from "@mui/material";
import LinesEllipsis from "react-lines-ellipsis";
import responsiveHOC from "react-lines-ellipsis/lib/responsiveHOC";
const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);
import moment from "moment-jalaali";

import Icon from "components/shared/Icon";
import { IOrder } from "interfaces/order.interfaces";
import { numberWithCommas } from "utils/number-helper";

const OrderItem: FC<{ item: IOrder }> = ({
  item: { createAt, items, totalPrice },
}) => {

  return (
    <div className="my-1 flex h-[77px] items-center rounded-2xl bg-primary-main px-3 py-4">
      <div className="flex shrink-0 flex-col items-start">
        <Typography variant="caption" className="py-1">
          <Icon icon="calendar" size={10} className="ml-1" />
          {moment(createAt).format("dddd jDD jMMMM")}
        </Typography>
        <Typography
          variant="caption"
          className="rounded-lg bg-secondary-main p-1"
        >
          {`${numberWithCommas(totalPrice)} تومان`}
        </Typography>
      </div>
      <ResponsiveEllipsis
        text={items
          .map((item) => `${item.name} ${item?.size?.label ?? ""}`)
          .join(" , ")}
        maxLine="3"
        ellipsis="..."
        trimRight
        basedOn="letters"
        className="px-2 text-[12px]"
      />
      <div className="flex">
        <AvatarGroup
          max={3}
          sx={{
            "& .MuiAvatar-root": {
              color: "text.primary",
              borderColor: "primary.main",
              backgroundColor: "secondary.main",
            },
            "& .MuiAvatar-img": {
              padding: "2px",
            },
          }}
        >
          {items.map((item) => (
            <Avatar
              key={`${item.name}-${item?.size?.label}`}
              alt={item.name}
              src={item.images[0]}
            />
          ))}
        </AvatarGroup>
      </div>
    </div>
  );
};

export default OrderItem;
