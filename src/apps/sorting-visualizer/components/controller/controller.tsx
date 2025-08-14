import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@/host/store/hooks';
import {
  setIsPlaying,
  setReset,
} from '@sortViz/store/sorting-visualizer.slice';

import ArrayInput from './array-input';
import Execution from './execution';
import TypeSwitch from './type-switch';

function Controller() {
  const { algoName } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsPlaying(false));
    dispatch(setReset());
  }, [algoName, dispatch]);

  return (
    <section className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="flex-1 w-full">
          <ArrayInput />
        </div>
        <div className="flex-shrink-0">
          <TypeSwitch />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Execution />
      </div>
    </section>
  );
}

export default Controller;
