import { PropsWithChildren, useEffect } from "react";

import clsx from "clsx";
import { useRouter } from "next/router";

import CategoryFilter from "components/Foods/CategoryFilter";
import Hero from "components/Hero";
import SwiperComponent from "components/shared/Swiper";
import adsList from "data/head-ads.json";
import tables from "data/tables.json";
import { useBookingContext } from "context/booking-context";
import { convetStringToUrlFormat, convetUrlToStringFormat } from "utils/string-helper";

const IndexLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { tableNumber, category } = router.query;
  const { setSelectedTable } = useBookingContext();

  useEffect(() => {
    if (tableNumber) {
      setSelectedTable(tables.find((table) => table.name === tableNumber));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableNumber]);

  const handleSortChange = (category: string) => {
    if (category === "همه") {
      router.replace("/", undefined, { scroll: false });
    } else {
      router.replace(
        {
          pathname: `/${convetStringToUrlFormat(category)}`,
        },
        undefined,
        { scroll: false }
      );
    }
  };

  return (
    <div>
      <div
        className={clsx(
          "flex flex-col bg-secondary-main px-6 pb-[72px]",
          "md:w-[calc(100vw_-_56px)] md:px-8 lg:w-[calc(100vw_-_190px)]"
        )}
      >
        {/* <Hero /> */}
        <SwiperComponent
          autoplay
          navigation={false}
          className="w-full "
          items={adsList}
          RenderComponent={Hero}
          swiperSlideClassName="w-auto shrink-0 block max-h-full"
        />
        {/* Filter Foods Component */}
        <CategoryFilter
          value={category ? convetUrlToStringFormat(category as string) : "همه"}
          onChange={handleSortChange}
        />
        {children}
      </div>
    </div>
  );
};

export default IndexLayout;
