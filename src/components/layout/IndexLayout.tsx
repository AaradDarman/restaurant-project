import { PropsWithChildren, useEffect } from "react";

import clsx from "clsx";
import { useRouter } from "next/router";

import CategoryFilter from "components/Foods/CategoryFilter";
import Hero from "components/Hero";
import SwiperComponent from "components/shared/Swiper";
import adsList from "data/head-ads.json";
import tables from "data/tables.json";
import { useBookingContext } from "context/booking-context";
import {
  convetStringToUrlFormat,
  convetUrlToStringFormat,
} from "utils/string-helper";
import { SORT_OPTIONS } from "constants/index";
import DropDown from "components/shared/DropDown";
import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
import useBreakpoints from "hooks/useBreakPoints";

const IndexLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { tableNumber, category, sortBy } = router.query;
  const { setSelectedTable } = useBookingContext();
  const { isLg } = useBreakpoints();

  useEffect(() => {
    if (tableNumber) {
      setSelectedTable(tables.find((table) => table.name === tableNumber));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableNumber]);

  const handleCategoryChange = (category: string) => {
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

  const handleSortChange = (sortBy: string) => {
    let { category } = router.query;

    if (convetUrlToStringFormat(sortBy) === "جدید ترین") {
      if (category) {
        router.replace(`/${category}`, undefined, { scroll: false });
      } else {
        router.replace(`/`, undefined, { scroll: false });
      }
    } else {
      if (category) {
        router.replace(
          {
            pathname: `/${category}/s`,
            query: { sortBy: convetStringToUrlFormat(sortBy) },
          },
          undefined,
          { scroll: false }
        );
      } else {
        router.replace(
          {
            pathname: "/s",
            query: { sortBy: convetStringToUrlFormat(sortBy) },
          },
          undefined,
          { scroll: false }
        );
      }
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
        <div className="mb-4 flex flex-wrap items-center justify-between">
          <CategoryFilter
            value={
              category ? convetUrlToStringFormat(category as string) : "همه"
            }
            onChange={handleCategoryChange}
          />
          <DropDown
            items={SORT_OPTIONS}
            onChange={handleSortChange}
            value={convetUrlToStringFormat(sortBy as string)}
            IconComponent={!isLg ? () => null : undefined}
            renderValue={
              !isLg
                ? () => {
                    return (
                      <IconButton className="!text-[19px]">
                        <FontAwesomeIcon
                          width={19}
                          icon={faArrowDownWideShort}
                        />
                      </IconButton>
                    );
                  }
                : undefined
            }
            sx={
              !isLg
                ? {
                    "&": {
                      minWidth: 0,
                    },
                    "& .MuiInputBase-input.MuiInput-input": {
                      padding: 0,
                      paddingRight: 0,
                    },
                  }
                : undefined
            }
          />
        </div>

        {children}
      </div>
    </div>
  );
};

export default IndexLayout;
