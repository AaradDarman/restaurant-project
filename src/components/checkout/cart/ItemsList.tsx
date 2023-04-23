import { FC } from "react";

import { ICartItemProp } from "interfaces/food.interfaces";
import CartItem from "./CartItem";
import { isEven } from "utils/number-helper";
import { AnimatePresence, Variants, motion } from "framer-motion";

const ItemsList: FC<{ items: Array<ICartItemProp> }> = ({ items }) => {
  return (
    <AnimatePresence mode="popLayout">
      {items.map((item, index) => {
        let delay = +`0.${index + 1}`;

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
            key={`${item.name}-${item?.size?.label}`}
            className="md:col-span-4 md:h-fit lg:col-span-2"
          >
            <CartItem item={item} />
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
};

export default ItemsList;
