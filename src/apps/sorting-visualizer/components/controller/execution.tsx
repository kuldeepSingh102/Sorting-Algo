import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/host/store/hooks';
import {
  setIsPlaying,
  setReset,
  setSpeed,
  startTimer,
} from '@sortViz/store/sorting-visualizer.slice';
import pauseIcon from '/icons/pause.svg';
import playIcon from '/icons/play.svg';
import resetIcon from '/icons/reset.svg';

function Execution() {
  const dispatch = useAppDispatch();
  const array = useAppSelector((state) => state.sortViz.array);
  const speed = useAppSelector((state) => state.sortViz.speed);
  const isPlaying = useAppSelector((state) => state.sortViz.isPlaying);
  const reset = useAppSelector((state) => state.sortViz.reset);

  useEffect(() => {
    if (isPlaying) dispatch(startTimer());
  }, [dispatch, isPlaying]);

  useEffect(() => {
    dispatch(setIsPlaying(false));
  }, [dispatch, reset]);

  useEffect(() => {
    dispatch(setSpeed(speed));
  }, [dispatch, speed]);

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => dispatch(setIsPlaying(!isPlaying))}
        disabled={array.length === 0 || isPlaying === null}
        className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-green-50 transition-colors flex items-center justify-center"
      >
        <img
          src={isPlaying ? pauseIcon : playIcon}
          alt={isPlaying ? 'Pause' : 'Play'}
          height={24}
          width={24}
        />
      </button>
      <button
        onClick={() => dispatch(setReset())}
        disabled={array.length === 0}
        className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-red-50 transition-colors flex items-center justify-center"
      >
        <img src={resetIcon} height={24} width={24} />
      </button>

      <input
        type="range"
        min={1}
        max={20}
        value={speed}
        step={1}
        onChange={(e) => dispatch(setSpeed(e.target.valueAsNumber))}
        className="w-32 h-2 accent-green-400 rounded cursor-pointer"
      />
    </div>
  );
}

export default Execution;
