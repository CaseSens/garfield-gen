"use client";

import Toggle from "react-toggle";
import "./ToggleButton.css";
import Select, { StylesConfig, ThemeConfig } from "react-select";
import makeAnimated from "react-select/animated";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import LabeledOption from "./LabeledOption";

type YearOption = {
  value: number,
  label: number,
}

const yearOptions: YearOption[] = generateArrayFromRange(1978, 2024).map((year) => {
  return {
    value: year,
    label: year,
  };
});

const animatedComponents = makeAnimated();
const selectThemeProp: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#0B0E14",
    color: "#fe7a1b",
    borderColor: "#fe7a1b",
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: "#0B0E14",
    color: "#fe7a1b",
  }),
};

interface OptionsSectionProps extends ComponentPropsWithoutRef<"section"> {
  onUseCustomOptionsChange: (use: boolean) => void;
  onRandomizeClick: () => void;
  onNumComicsChanged: (num: number) => void;
  onSelectedYearsChanged: (years: string[]) => void;
}

const OptionsSection: React.FC<OptionsSectionProps> = ({
  onUseCustomOptionsChange,
  onRandomizeClick,
  onNumComicsChanged,
  onSelectedYearsChanged,
}) => {
  const [useOptions, setUseOptions] = useState(true);
  const [numComics, setNumComics] = useState<number>(1);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);

  const handleUseOptionsChange = () => {
    const newVal = !useOptions;
    onUseCustomOptionsChange(newVal);
    setUseOptions(!useOptions);
  };

  const handleNumComicsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Check if the input value is numeric
    if (/^\d*$/.test(value)) {
      // This regex matches an empty string or a string of digits
      setNumComics(parseInt(value, 10) || 0); // Convert to number and handle empty string as 0
    }
  };

  const handleSelectedYears = (years: YearOption[]) => {
    setSelectedYears(years.map(year => year.value.toString()));
  };

  useEffect(() => {
    onNumComicsChanged(numComics);
  }, [numComics]);

  useEffect(() => {
    onSelectedYearsChanged(selectedYears);
  }, [selectedYears]);

  return (
    <section
      className="flex justify-center overflow-auto min-w-max"
    >
      <div className="max-w-[600px] w-full flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between border-b-2 border-orange pb-2">
          <p>Use custom settings?</p>
          <Toggle
            defaultChecked={useOptions}
            aria-label="use custom settings?"
            icons={false}
            onChange={handleUseOptionsChange}
          />
        </div>
        {useOptions && (
          <div className="flex flex-col gap-4">
            <LabeledOption
              label={"Years to choose from"}
              onChange={() => {}}
              alignment="vertical"
            >
              <Select
                options={yearOptions}
                components={animatedComponents}
                closeMenuOnSelect={false}
                isMulti
                name="Years"
                className="basic-multi-select"
                classNamePrefix="select"
                styles={selectThemeProp}
                onChange={(newVal) => handleSelectedYears(newVal as YearOption[])}
              />
            </LabeledOption>
            <LabeledOption label={"Number of comics"} onChange={() => {}}>
              <input
                type="text"
                className="w-12 bg-transparent border-2 border-orange px-2 rounded-md text-white"
                value={numComics}
                onChange={handleNumComicsChange}
              />
            </LabeledOption>
            <LabeledOption label={"Generate consecutively"} onChange={() => {}}>
              <Toggle
                defaultChecked={false}
                aria-label="generate consecutively?"
                icons={false}
              />
            </LabeledOption>
          </div>
        )}
        <button
          className="w-full h-10 text-center bg-orange hover:bg-orange/[0.9] rounded-xl leading-none pb-[1px]"
          onClick={onRandomizeClick}
        >
          Randomize
        </button>
      </div>
    </section>
  );
};

export default OptionsSection;

function generateArrayFromRange(start: number, end: number) {
  let arr = [];

  for (let i = start; i <= end; i++) {
    arr.push(i);
  }

  return arr;
}
