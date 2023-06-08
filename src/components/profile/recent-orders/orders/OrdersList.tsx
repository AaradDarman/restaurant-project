import { FC } from "react";

import { AnimatePresence, Variants, motion } from "framer-motion";

import { isEven } from "utils/number-helper";
import OrderItem from "./OrderItem";
import { IOrder } from "interfaces/order.interfaces";

const OrdersList: FC<{ items: Array<IOrder> }> = ({ items }) => {
  return (
    <AnimatePresence mode="popLayout">
      {items.map((order, index) => {
        let delay = index <= 3 ? +`0.${index + 1}` : isEven(index) ? 0.2 : 0.1;

        const cardVariants: Variants = {
          offscreen: {
            scale: 0.8,
            opacity: 0,
            transition: {
              type: "keyframes",
            },
          },
          onscreen: {
            scale: 1,
            opacity: 1,
            transition: {
              type: "spring",
              delay,
            },
          },
        };
        return (
          <motion.div
            layout
            variants={cardVariants}
            initial="offscreen"
            animate="onscreen"
            exit="offscreen"
            key={order._id}
            className="md:col-span-3 lg:col-span-2"
          >
            <OrderItem item={order} />
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
};

export default OrdersList;
