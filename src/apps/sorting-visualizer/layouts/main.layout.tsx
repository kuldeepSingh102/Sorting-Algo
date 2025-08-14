import { motion, Variants } from 'framer-motion';
import ThemeIcon from '@/lib/components/theme-icon/theme-icon';
import Controller from '@sortViz/components/controller/controller';
import Navbar from '@sortViz/components/navbar/navbar';
// import { menuItems } from '@/sortViz/config';
import { PropsWithChildren } from 'react';
import { useAppSelector } from '@/host/store/hooks';
import { Theme } from '@/host/types/interfaces';
import { menuItems } from '../config';

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, when: 'beforeChildren' },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function MainLayout({ children }: PropsWithChildren) {
  const currentTheme = useAppSelector((state) => state.app.theme);
  const prefTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? Theme.DARK
    : Theme.LIGHT;
  const activeTheme = currentTheme ?? prefTheme;

  return (
    <motion.div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        activeTheme === Theme.LIGHT
          ? 'bg-gray-50 text-gray-900'
          : 'bg-gray-900 text-white'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Floating Theme Button */}
      <ThemeIcon bottom={20} right={20} />

      {/* Main Animated Container */}
      <motion.div
        className="flex flex-col flex-1 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Navbar */}
        <motion.div variants={itemVariants} className="w-full">
          <Navbar title="Sorting Visualizer" menuItems={menuItems} />
        </motion.div>

        {/* Controller */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-7xl mx-auto mt-6 sm:mt-8 px-2 sm:px-4"
        >
          <Controller />
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={itemVariants}
          className="flex-1 w-full mx-auto mt-6 px-2 sm:px-4 py-6 sm:py-8"
          transition={{ delay: 0.2 }}
        >
          <div
            className={`rounded-xl shadow-sm p-3 sm:p-6 border transition-all duration-300 ${
              activeTheme === Theme.LIGHT
                ? 'bg-white border-gray-100'
                : 'bg-gray-800 border-gray-700'
            }`}
          >
            {children}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default MainLayout;
