import { useRef, ReactNode, Children } from 'react';
import { motion, useInView } from 'framer-motion';

// Backward compatibility hook
export const useScrollAnimation = (options: any = {}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: options.triggerOnce ?? true,
    margin: options.rootMargin || "0px 0px -50px 0px",
    amount: options.threshold || 0.1
  });
  return { ref, isVisible: isInView };
};

// Animation wrapper component
interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out';
  delay?: number;
  duration?: number;
}

const variantsMap = {
  'fade-up': { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  'fade-down': { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
  'fade-left': { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
  'fade-right': { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  'zoom-in': { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } },
  'zoom-out': { hidden: { opacity: 0, scale: 1.1 }, visible: { opacity: 1, scale: 1 } },
};

export const AnimatedSection = ({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  duration = 0.5
}: AnimatedSectionProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variantsMap[animation]}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Staggered children animation
interface StaggeredContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggeredContainer = ({
  children,
  className = '',
  staggerDelay = 0.1
}: StaggeredContainerProps) => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className={className}
    >
      {Children.map(children, (child) => (
        <motion.div variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};
