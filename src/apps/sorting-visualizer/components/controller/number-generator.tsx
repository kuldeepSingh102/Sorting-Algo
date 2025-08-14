import React, { useState } from 'react';
import {
  configureArray,
  getRndmNumInRange,
} from '@sortViz/helpers/array-helpers';
import { useAppDispatch, useAppSelector } from '@/host/store/hooks';
import { NumberGenProps } from '@sortViz/models/interfaces';
import { numberGenerator as limits } from '@sortViz/config';
import { setArray } from '@sortViz/store/sorting-visualizer.slice';
import {
  ArrowsRightLeftIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/solid';

const options = ['random', 'ascending', 'descending'];

function NumberGenerator({ setInput }: NumberGenProps) {
  const dispatch = useAppDispatch();
  const array = useAppSelector((state) => state.sortViz.array);
  const [inputMode, setInputMode] = useState('random');

  const onGenerate = () => {
    let newInput = Array.from(
      { length: getRndmNumInRange(limits.min, limits.max) },
      () => getRndmNumInRange()
    );

    if (inputMode !== 'random') {
      newInput = configureArray(inputMode, newInput);
    }

    setInput(newInput.join(', '));
    dispatch(setArray(newInput));
  };

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mode = e.target.value;
    setInputMode(mode);
    const sortedArray = configureArray(mode, array);
    setInput(sortedArray.join(', '));
    dispatch(setArray(sortedArray));
  };

  return (
    <div className="flex flex-wrap gap-4 w-full items-center">
      {/* Generate Button */}
      <button
        onClick={onGenerate}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white font-medium
                   rounded-lg hover:bg-green-600 transition-colors duration-150"
      >
        <ArrowsRightLeftIcon className="h-5 w-5" />
        Generate
      </button>

      {/* Mode Select */}
      <div className="relative flex-grow max-w-xs">
        <select
          value={inputMode}
          onChange={onChange}
          className="w-full py-2 pl-3 pr-8 border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-1 focus:ring-green-300 text-gray-700
                     cursor-pointer appearance-none"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>

        {/* Dropdown Arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500">
          <ChevronDownIcon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

export default NumberGenerator;
