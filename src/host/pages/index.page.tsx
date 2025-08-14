import Navbar from '@/apps/sorting-visualizer/components/navbar/navbar';
import { menuItems } from '@/apps/sorting-visualizer/config';
import ThemeIcon from '@/lib/components/theme-icon/theme-icon';

function Index() {
  return (
    <>
      <ThemeIcon bottom={10} right={20} />
      <Navbar title="Sorting Visualizer" menuItems={menuItems} />
    </>
  );
}

export default Index;
