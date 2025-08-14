import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/host/store/hooks';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

import MainLayout from './main.layout';
import Visualizer from '@sortViz/components/visualizer/visualizer';
import NoInput from '@sortViz/components/visualizer/no-input';
import useCompletion from '@sortViz/hooks/use-completion.hook';
import { algoList } from '@sortViz/sorting-algorithms/algo-list';
import { setIsPlaying } from '@sortViz/store/sorting-visualizer.slice';
import { sortCompletionMessage } from '@sortViz/config';

export default function AllAlgorithmLayout() {
  const dispatch = useAppDispatch();
  const array = useAppSelector((state) => state.sortViz.array);
  const reset = useAppSelector((state) => state.sortViz.reset);
  const selectedAlgosStatus = useAppSelector(
    (state) => state.sortViz.selectedAlgosStatus
  );

  let selectedAlgos = algoList.filter((_, idx) => selectedAlgosStatus[idx]);
  if (selectedAlgos.length === 0) selectedAlgos = algoList;

  const { onComplete, isComplete } = useCompletion(selectedAlgos.length, reset);

  useEffect(() => {
    if (isComplete) {
      toast.success(sortCompletionMessage);
      dispatch(setIsPlaying(null));
    }
  }, [dispatch, isComplete]);

  if (array.length === 0)
    return (
      <MainLayout>
        <NoInput />
      </MainLayout>
    );

  return (
    <MainLayout>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <AnimatePresence>
          {selectedAlgos.map((algo) => (
            <motion.div
              key={array.toString() + reset + algo.name}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <Visualizer
                array={array}
                algoName={algo.name}
                algoFn={algo.fn}
                onComplete={onComplete}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </MainLayout>
  );
}
