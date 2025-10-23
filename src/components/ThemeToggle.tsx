import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="p-2 rounded-full bg-opacity-20 hover:bg-opacity-30 transition-colors duration-200"
      style={{
        backgroundColor: `rgb(var(--color-text-primary) / 0.1)`,
      }}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5" style={{ color: 'rgb(var(--color-text-primary))' }} />
      ) : (
        <Moon className="w-5 h-5" style={{ color: 'rgb(var(--color-text-primary))' }} />
      )}
    </motion.button>
  );
};
