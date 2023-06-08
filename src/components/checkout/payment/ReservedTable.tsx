import {
  faEllipsisVertical,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Typography } from "@mui/material";
import Icon from "components/shared/Icon";
import Popover from "components/shared/Popover";
import { ICartState } from "interfaces/order.interfaces";
import moment from "moment-jalaali";
import React, { FC } from "react";
import { TTable } from "types/booking.types";

const ReservedTable: FC<{
  reserveTable: TTable & {
    date: string;
  };
}> = ({ reserveTable }) => {
  return (
    <>
      <div className="flex py-1">
        <Icon
          icon="reserved"
          size={80}
          className="absolute -top-[40px] left-1/2 -translate-x-[50%] bg-secondary-main px-2"
        />
        <Typography variant="h4">{`میز شماره ${reserveTable.name}`}</Typography>
      </div>
      <div className="absolute bottom-0 left-0 flex">
        <Typography variant="body2" className="py-1">
          <Icon icon="calendar" size={16} className="ml-1" />
          {moment(reserveTable.date).format("dddd jDD jMMMM")}
        </Typography>
        <Typography variant="body2" className="!mr-2 py-1">
          <Icon icon="clock" size={16} className="ml-1" />
          {moment(reserveTable.date).format("HH:mm")}
        </Typography>
      </div>
    </>
  );
};

export default ReservedTable;
