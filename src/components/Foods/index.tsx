import { FC } from "react";

import Food from "components/Food";
import { isEven } from "utils/number-helper";
import { TFoodItem } from "interfaces/food.interfaces";
import { isEmpty } from "lodash";
import Image from "next/image";
import noResultImg from "images/no-result.svg";
import { IUserState } from "interfaces/auth.interfaces";

const FoodsList: FC<{ foods: IUserState["favoriteList"] }> = ({ foods }) => {
  return (
    <>
      {isEmpty(foods) ? (
        <div className="flex flex-col items-center">
          <Image
            src={noResultImg}
            alt="no-result"
            className="drop-shadow-2xl"
          />
          <div>نتیجه ای یافت نشد</div>
        </div>
      ) : (
        <div className="grid grid-cols-10 gap-3 sm:grid-cols-9 md:grid-cols-8 lg:grid-cols-10">
          {foods.map((item, index) => {
            return (
              <Food
                className="col-span-5 sm:col-span-3 md:col-span-2 lg:col-span-2"
                delay={
                  index <= 3 ? +`0.${index + 1}` : isEven(index) ? 0.2 : 0.1
                }
                item={item as TFoodItem}
                key={item._id}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default FoodsList;
