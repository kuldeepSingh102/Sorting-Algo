import { useEffect, useRef } from 'react';
import Header from './header';
import { VisualizerProps } from '@sortViz/models/interfaces';
import classes from './visualizer.module.scss';
import useAlgo from '@sortViz/hooks/use-algo.hook';
import { motion } from 'framer-motion';
import VisualizerDisplay from './visualizer-display';

const Visualizer = ({
  array,
  algoFn,
  algoName = 'Bubble',
  onComplete,
}: VisualizerProps) => {
  const sortingArray = useRef([...array]);
  const {
    swapCount,
    compareCount,
    isCompleted,
    swaps,
    sorts,
    highlights,
    pivot,
    moves,
  } = useAlgo(sortingArray.current, algoFn);

  useEffect(() => {
    if (isCompleted) onComplete();
  }, [isCompleted, onComplete]);

  return (
    <motion.section
      className={classes.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header algoName={algoName} isCompleted={isCompleted} />
      <VisualizerDisplay
        pivot={pivot}
        array={sortingArray.current}
        swaps={swaps}
        highlights={highlights}
        sorts={sorts}
        moves={moves}
      />
      <footer>
        <span>
          Swaps: <strong>{swapCount}</strong>
        </span>
        <span>
          Comparisons: <strong>{compareCount}</strong>
        </span>
      </footer>
    </motion.section>
  );
};

export default Visualizer;
