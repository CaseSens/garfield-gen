"use client";

import { ComponentPropsWithoutRef, useState } from "react";
import { Comic } from "../Providers/ComicsProvider";

interface ComicContainerProps extends ComponentPropsWithoutRef<"div"> {
  comic: Comic;
}

function ComicContainer({ comic, ...divProps }: ComicContainerProps) {
  const [showDate, setShowDate] = useState(false);

  return (
    <div
      {...divProps}
      onMouseEnter={() => {
        setShowDate(true);
      }}
      onMouseLeave={() => {
        setShowDate(false);
      }}
    >
      <span
        style={{ opacity: showDate ? "100" : "0" }}
        className="transition duration-300 absolute flex items-center justify-center w-full h-full select-none backdrop-filter backdrop-blur-sm"
      >
        <p>{comic.date}</p>
      </span>
      <img src={comic.imageUrl} className="" />
    </div>
  );
}

export default ComicContainer;
