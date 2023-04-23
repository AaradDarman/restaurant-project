import React, { ComponentType, FC, useEffect } from "react";

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import isEmpty from "lodash/isEmpty";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import NoSSRWraper from "components/NoSSRWraper";
import useBreakpoints from "hooks/useBreakPoints";

const StyledSwiper = styled(Swiper)`
  .swiper-pagination-bullet {
    background: #0b171d;
    opacity: 0.9;
  }
  .swiper-pagination-bullet-active {
    background: #ffffff;
  }
  .swiper-pagination {
    /* bottom: 30px; */
  }
`;

const SwiperComponent: FC<
  SwiperProps & {
    items: Array<{ _id: string }>;
    RenderComponent: React.ElementType;
    swiperSlideClassName?: string;
  }
> = ({
  items,
  RenderComponent,
  swiperSlideClassName,
  slidesPerView,
  pagination,
  ...otherProps
}) => {
  const { isMd } = useBreakpoints();

  return !isEmpty(items) ? (
    <StyledSwiper
      {...otherProps}
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={slidesPerView ?? 1}
      pagination={
        pagination ?? {
          dynamicBullets: true,
        }
      }
    >
      {items.map((item, index) => (
        <SwiperSlide
          className={swiperSlideClassName}
          key={`${item?._id}-${index}`}
        >
          <RenderComponent item={item} />
        </SwiperSlide>
      ))}
    </StyledSwiper>
  ) : null;
};

export default SwiperComponent;
