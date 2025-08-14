import { useAppDispatch, useAppSelector } from '@/host/store/hooks';
import { Theme } from '@/host/types/interfaces';
import { createPortal } from 'react-dom';
import { setTheme } from '@/host/store/app.slice';
import { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

function ThemeIcon({
  bottom = 20,
  right = 20,
}: {
  bottom?: number;
  right?: number;
}) {
  const dispatch = useAppDispatch();
  const storeTheme = useAppSelector((state) => state.app.theme);

  const prefTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? Theme.DARK
    : Theme.LIGHT;

  const currentTheme = storeTheme ?? prefTheme;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    dispatch(setTheme(currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };

  return createPortal(
    <button
      className="fixed z-50 p-3 rounded-full shadow-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform duration-200"
      style={{ bottom, right }}
      onClick={toggleTheme}
    >
      {currentTheme === Theme.LIGHT ? (
        <Sun size={20} color="yellow" />
      ) : (
        <Moon size={20} />
      )}
    </button>,
    document.getElementById('screen-layout')!
  );
}

export default ThemeIcon;
