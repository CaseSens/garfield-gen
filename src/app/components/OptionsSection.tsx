'use client';

import Toggle from "react-toggle";
import "./ToggleButton.css";
import Select, { StylesConfig, ThemeConfig } from "react-select";
import makeAnimated from "react-select/animated";
import { ComponentPropsWithoutRef, useState } from "react";
import LabeledOption from "./LabeledOption";

const yearOptions = generateArrayFromRange(1978, 2024).map((year) => {
  return {
    value: year,
    label: year,
  };
});

const animatedComponents = makeAnimated();
// const selectThemeProp: ThemeConfig = (theme) => ({
//   ...theme,
//   colors: {
//     ...theme.colors,
//     neutral0: "transparent",
//     primary25: "#fe7a1b",
//     neutral5: "#000000",
//   },
// });
const selectThemeProp: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
    color: "#fe7a1b",
    borderColor: "#fe7a1b",
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
    color: "#fe7a1b",
  }),
};

interface OptionsSectionProps extends ComponentPropsWithoutRef<"section"> {
  onRandomizeClick: () => void;
}

const OptionsSection: React.FC<OptionsSectionProps> = ({ onRandomizeClick }) => {
  const [useOptions, setUseOptions] = useState(true);

  const toggleOptionsVisibility = () => {
    setUseOptions(!useOptions);
  };

  return (
    <section
      id="options"
      className="flex justify-center overflow-auto min-w-max"
    >
      <div className="max-w-[600px] w-full flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between border-b-2 border-orange pb-2">
          <p>Use custom settings?</p>
          <Toggle
            defaultChecked={useOptions}
            aria-label="use custom settings?"
            icons={false}
            onChange={toggleOptionsVisibility}
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
                // theme={selectThemeProp}
                styles={selectThemeProp}
              />
            </LabeledOption>
            <LabeledOption label={"Number of comics"} onChange={() => {}}>
              <input
                type="text"
                className="w-12 bg-transparent border-2 border-orange px-2 rounded-md text-white"
                defaultValue={1}
              />
            </LabeledOption>
            <LabeledOption label={"Generate consecutively"} onChange={() => {}}>
              <Toggle
                defaultChecked={useOptions}
                aria-label="use custom settings?"
                icons={false}
                onChange={toggleOptionsVisibility}
              />
            </LabeledOption>
          </div>
        )}
        <button className="w-full h-10 text-center bg-orange hover:bg-orange/[0.9] rounded-xl leading-none pb-[1px]" onClick={onRandomizeClick}>
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
