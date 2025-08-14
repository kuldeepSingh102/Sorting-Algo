import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import {
  convertArrayStringToArray,
  convertInputToArrayString,
} from '@sortViz/helpers/array-helpers';
import {
  setArray,
  setIsPlaying,
  setReset,
} from '@sortViz/store/sorting-visualizer.slice';
import { useAppDispatch, useAppSelector } from '@/host/store/hooks';
import NumberGenerator from './number-generator';
import { Bars3Icon } from '@heroicons/react/24/solid';

const inputVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.3,
    },
  },
};

function ArrayInput() {
  const dispatch = useAppDispatch();
  const array = useAppSelector((state) => state.sortViz.array);
  const [input, setInput] = useState(array.join(', '));

  useEffect(() => {
    dispatch(setIsPlaying(false));
    dispatch(setReset());
  }, [array, dispatch]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAsStr = convertInputToArrayString(e.target.value);
    setInput(inputAsStr);
    const inputAsArray = convertArrayStringToArray(inputAsStr);
    dispatch(setArray(inputAsArray));
  };

  return (
    <motion.div
      className="flex flex-col gap-5 w-full max-w-4xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <NumberGenerator setInput={setInput} />

      <div className="relative w-full">
        <motion.input
          id="user-input"
          type="text"
          placeholder="Enter numbers separated by commas (e.g., 5, 3, 8, 1)"
          value={input}
          onChange={onInputChange}
          variants={inputVariants}
          whileFocus={{
            borderColor: '#4ade80',
            boxShadow: '0 0 0 3px rgba(74, 222, 128, 0.2)',
          }}
          className="w-full p-3.5 pl-11 text-gray-700 bg-white border-2 border-gray-200 rounded-xl shadow-sm transition-all duration-200 
                     focus:outline-none focus:ring-1 focus:ring-green-300 placeholder:text-gray-400"
        />
        <Bars3Icon className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>
    </motion.div>
  );
}

export default ArrayInput;
