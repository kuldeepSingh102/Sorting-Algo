import { useAppSelector } from '@/host/store/hooks';
import BarUI from '@sortViz/components/bar/bar-ui';
import CellUI from '@sortViz/components/cell/cell-ui';
import { UIProps } from '@sortViz/models/interfaces';
import { motion } from 'framer-motion';

const visualizerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

function VisualizerDisplay(props: UIProps) {
  const visualizerType = useAppSelector(
    (state) => state.sortViz.visualizerType
  );

  return (
    <motion.div
      variants={visualizerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {visualizerType === 'cell' && <CellUI {...props} />}
      {visualizerType === 'bar' && <BarUI {...props} />}
    </motion.div>
  );
}

export default VisualizerDisplay;
