import { FC } from "react";

import Food from "components/Food";
import { isEven } from "utils/number-helper";
import { TFoodItem } from "interfaces/food.interfaces";

const FoodsList: FC<{ foods: Array<TFoodItem> }> = ({ foods }) => {
  return (
    <div className="grid grid-cols-10 gap-3 sm:grid-cols-9 md:grid-cols-8 lg:grid-cols-10">
      {foods.map((item, index) => {
        return (
          <Food
            className="col-span-5 sm:col-span-3 md:col-span-2 lg:col-span-2"
            delay={index <= 3 ? +`0.${index + 1}` : isEven(index) ? 0.2 : 0.1}
            item={item}
            key={item._id}
          />
        );
      })}
    </div>
  );
};

export default FoodsList;
