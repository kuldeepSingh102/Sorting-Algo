import { NavLink } from 'react-router-dom';
import { useState, useEffect, useRef, JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Zap,
  Shuffle,
  Repeat,
  GitBranch,
  Layers,
  FastForward,
  Feather,
  Activity,
  Home,
} from 'lucide-react';
import { useAppSelector } from '@/host/store/hooks';
import { Theme } from '@/host/types/interfaces';

export interface Props {
  title: string;
  menuItems: string[];
}

// Map algorithm names to icons
const algoIcons: Record<string, JSX.Element> = {
  bubble: <Repeat size={16} className="inline mr-2" />,
  selection: <Layers size={16} className="inline mr-2" />,
  insertion: <Zap size={16} className="inline mr-2" />,
  heap: <GitBranch size={16} className="inline mr-2" />,
  merge: <Activity size={16} className="inline mr-2" />,
  quick: <FastForward size={16} className="inline mr-2" />,
  shell: <Feather size={16} className="inline mr-2" />,
  cocktail: <Shuffle size={16} className="inline mr-2" />,
};

function Navbar({ title, menuItems }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const currentTheme = useAppSelector((state) => state.app.theme);
  const prefTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? Theme.DARK
    : Theme.LIGHT;
  const activeTheme = currentTheme ?? prefTheme;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: 'afterChildren',
      },
    },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { staggerChildren: 0.1, when: 'beforeChildren' },
    },
  };
  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const headerClasses = `sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${
    activeTheme === Theme.LIGHT
      ? 'bg-white/70 border-gray-200'
      : 'bg-gray-900/70 border-gray-800'
  }`;

  const textClasses =
    activeTheme === Theme.LIGHT ? 'text-gray-900' : 'text-white';
  const linkClasses = (isActive: boolean) =>
    `relative flex items-center gap-1 transition-colors duration-200 ${
      activeTheme === Theme.LIGHT
        ? 'text-gray-700 hover:text-green-600'
        : 'text-gray-300 hover:text-green-400'
    } ${isActive ? 'text-green-600 font-semibold' : ''}`;

  const mobileLinkClasses = (isActive: boolean) =>
    `flex items-center gap-2 py-2 px-3 rounded transition ${
      activeTheme === Theme.LIGHT
        ? `hover:bg-green-50 ${isActive ? 'bg-green-100 font-semibold' : ''}`
        : `hover:bg-green-900/30 ${
            isActive ? 'bg-green-900/50 font-semibold' : ''
          }`
    }`;

  return (
    <header className={headerClasses}>
      <nav
        className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3"
        ref={navRef}
      >
        <motion.h1
          className={`text-xl font-bold flex items-center gap-2 ${textClasses}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Home size={20} className="text-green-500" /> {title}
        </motion.h1>

        <motion.ul
          className="hidden md:flex gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {menuItems.map((item) => (
            <motion.li
              key={item}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className="relative group"
            >
              <NavLink
                to={`/sorting-visualizer/${item}`}
                className={({ isActive }) => linkClasses(isActive)}
              >
                {({ isActive }) => (
                  <>
                    {algoIcons[item.toLowerCase()] ?? null}
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                    <motion.span
                      className="absolute left-0 bottom-0 h-[2px] bg-green-500"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  </>
                )}
              </NavLink>
            </motion.li>
          ))}
        </motion.ul>

        {/* Mobile Toggle */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            activeTheme === Theme.LIGHT
              ? 'hover:bg-gray-100'
              : 'hover:bg-gray-800'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? (
            <X size={24} className={textClasses} />
          ) : (
            <Menu size={24} className={textClasses} />
          )}
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
            className={`md:hidden shadow-lg overflow-hidden transition-colors duration-300 ${
              activeTheme === Theme.LIGHT
                ? 'bg-white border-t border-gray-200'
                : 'bg-gray-900 border-t border-gray-800'
            }`}
          >
            <div className="px-4 py-3 space-y-2">
              {menuItems.map((item) => (
                <motion.li key={item} variants={mobileItemVariants}>
                  <NavLink
                    to={`/sorting-visualizer/${item}`}
                    className={({ isActive }) => mobileLinkClasses(isActive)}
                    onClick={() => setIsOpen(false)}
                  >
                    {algoIcons[item.toLowerCase()] ?? null}
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </NavLink>
                </motion.li>
              ))}
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
