"use client";

import { useEffect, useState } from "react";
import { Comic, ComicsByYear, useComics } from "./Providers/ComicsProvider";
import ComicContainer from "./components/ComicContainer";
import OptionsSection from "./components/OptionsSection";

export default function Home() {
  const { comicData } = useComics();
  const [useCustomOptions, setUseCustomOptions] = useState(true);
  const [numComics, setNumComics] = useState(10);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [randomComics, setRandomComics] = useState<Comic[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (comicData.length !== 0) {
      const randCom = getRandomComics(comicData, useCustomOptions, numComics, selectedYears);
      setRandomComics(randCom);
    }
  }, [comicData]);

  const onUseCustomOptionsChange = (use: boolean) => {
    setUseCustomOptions(use);
  }

  const onRandomizeClick = () => {
    setRandomComics(
      getRandomComics(comicData, useCustomOptions, numComics, selectedYears)
    );
  };

  const onNumComicsChange = (num: number) => {
    setNumComics(num);
  };

  const onSelectedYearsChange = (years: string[]) => {
    setSelectedYears(years);
  };

  return (
    <main className="w-full h-full flex flex-col items-center overflow-auto">
      <header className="w-full flex items-center justify-center border-b-2 p-4">
        Welcome to the garfield comics library!
      </header>
      <div className="grid grid-rows-page-grid-rows xl:grid-cols-3 w-full h-full">
        <OptionsSection
        onUseCustomOptionsChange={onUseCustomOptionsChange}
          onRandomizeClick={onRandomizeClick}
          onNumComicsChanged={onNumComicsChange}
          onSelectedYearsChanged={onSelectedYearsChange}
        />

        {/* Assuming ComicContainer is a flex item and adapts based on its content */}
        <section className="w-full flex flex-col gap-4 justify-start items-center p-4">
          {randomComics &&
            randomComics.map((comic, index) => (
              <ComicContainer key={index} comic={comic} className="relative" />
            ))}
        </section>

        <section className="flex justify-center pointer-events-none">
          <p className="py-2 px-8 font-lighter text-sm">
            This website and archive were created to celebrate the legacy of
            Garfield comics and are made possible through the use of the Andrews
            McMeel Publishing Company’s comics archive. The comics depicted on
            this website are from the Garfield series, which is a trademark of
            Paws, Inc. All Garfield comics and characters are copyright ©1978 by
            Paws, Inc. All rights reserved.
            <br />
            <br />
            This site is intended for personal use and educational purposes
            only, and not for commercial gain. We acknowledge the copyrights and
            trademarks owned by Paws, Inc. and Paramount Global/Nickelodeon
            Group, and affirm that this site has no official affiliation with
            these entities. Our goal is to share the joy and humor of Garfield
            with fans around the world while respecting the rights of the
            copyright and trademark holders. If you are the copyright or
            trademark holder and have concerns about the use of any material on
            this site, please contact us at [your contact information], and we
            will address the matter promptly.
          </p>
        </section>
      </div>
    </main>
  );
}

function getRandomComics(
  comicData: ComicsByYear[],
  useCustomOptions: boolean,
  numComics: number,
  selectedYears: string[]
) {
  let comics: Comic[] = [];

  const getRandomComic = () => {
    const comicsByRandYear = comicData[randomInRange(0, comicData.length - 1)];
    const randCom =
      comicsByRandYear.comics[
        randomInRange(0, comicsByRandYear.comics.length - 1)
      ];

    return randCom;
  };

  if (!useCustomOptions) {
    return [getRandomComic()];
  }

  while (comics.length < numComics) {
    const comic = getRandomComic();
    if (!comics.find((c) => c.date === comic.date)) {
      if (selectedYears.length === 0) {
        comics.push(comic);
        continue;
      }

      const comicYear = comic.date.split("/")[2];
      if (selectedYears.find((y) => y === comicYear)) {
        comics.push(comic);
      }
    }
  }

  return comics;
}

function randomInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
