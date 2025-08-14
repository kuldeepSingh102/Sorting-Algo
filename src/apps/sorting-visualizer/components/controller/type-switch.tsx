import Switch from 'react-switch';
import { useAppDispatch, useAppSelector } from '@/host/store/hooks';
import { toggleVisualizerType } from '@sortViz/store/sorting-visualizer.slice';

function TypeSwitch() {
  const dispatch = useAppDispatch();
  const visualizerType = useAppSelector(
    (state) => state.sortViz.visualizerType
  );

  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-700 font-medium">Cell</span>
      <Switch
        onChange={() => dispatch(toggleVisualizerType())}
        checked={visualizerType === 'bar'}
        checkedIcon={false}
        uncheckedIcon={false}
        height={20}
        width={40}
        offColor="#2b4bfe"
        onColor="#34D399"
        handleDiameter={18}
      />
      <span className="text-gray-700 font-medium">Bar</span>
    </div>
  );
}

export default TypeSwitch;
