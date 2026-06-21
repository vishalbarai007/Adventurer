import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const counterData = [
  { value: 500, label: "Users" },
  { value: 158, label: "Cities" },
  { value: 98, label: "Travel Partners" },
  { value: 79, label: "Destinations" },
  { value: 34, label: "Reviews" },
];

const CounterCard: React.FC<{ value: number; label: string }> = ({ value, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Runs only once when visible

  useEffect(() => {
    if (isInView) {
      let current = 0;
      const interval = setInterval(() => {
        if (current >= value) {
          clearInterval(interval);
        } else {
          current += 1;
          setCount(current);
        }
      }, 10); // Adjust speed

      return () => clearInterval(interval);
    }
  }, [isInView, value]);

  return (
    <motion.div 
      ref={ref}
      className="border border-white rounded-lg p-6 text-center align-middle text-white bg-transparent"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1 }}
    >
      <p className="text-4xl font-bold">{count}+</p>
      <p className="text-lg mt-2">{label}</p>
    </motion.div>
  );
};

const CounterSection: React.FC = () => {
  return (
    <div className="Counter grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 p-10 w-full mx-auto bg-black">
      {counterData.map((item, index) => (
        <CounterCard key={index} value={item.value} label={item.label} />
      ))}
    </div>
  );
};

export default CounterSection;
