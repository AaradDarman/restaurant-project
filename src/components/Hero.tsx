import { FC } from "react";

import Image from "next/image";
import clsx from "clsx";

const Hero: FC<{ item: { image: string } }> = ({ item }) => {
  return (
    <div
      className={clsx(
        "relative h-32 w-[100%] overflow-hidden rounded-lg md:h-[400px] "
      )}
    >
      <Image
        priority
        src={item.image}
        alt="hero"
        fill
        className="object-cover"
      />
    </div>
  );
};

export default Hero;
