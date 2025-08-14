import { useAppDispatch, useAppSelector } from '@/host/store/hooks';
import NoInput from '@sortViz/components/visualizer/no-input';
import { algoList } from '@sortViz/sorting-algorithms/algo-list';
import { setIsPlaying } from '@sortViz/store/sorting-visualizer.slice';
import { sortCompletionMessage } from '@sortViz/config';
import { toast } from 'sonner';
import useCompletion from '@sortViz/hooks/use-completion.hook';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Visualizer from '../components/visualizer/visualizer';
import MainLayout from './main.layout';

function SingleAlgorithmLayout() {
  const { algoName } = useParams();
  const dispatch = useAppDispatch();
  const array = useAppSelector((state) => state.sortViz.array);
  const reset = useAppSelector((state) => state.sortViz.reset);

  const selectedAlgo =
    algoList.find(({ name }) => name === algoName) ?? algoList[0];
  const { onComplete, isComplete } = useCompletion(1, reset);

  useEffect(() => {
    if (isComplete) {
      toast.success(sortCompletionMessage);
      dispatch(setIsPlaying(null));
    }
  }, [dispatch, isComplete]);

  return (
    <MainLayout>
      {array.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <NoInput />
        </motion.div>
      ) : (
        <motion.div
          key={selectedAlgo.name + array.toString() + reset}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Visualizer
            array={array}
            algoName={selectedAlgo.name}
            algoFn={selectedAlgo.fn}
            onComplete={onComplete}
          />
        </motion.div>
      )}
    </MainLayout>
  );
}

export default SingleAlgorithmLayout;
