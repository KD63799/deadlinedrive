import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const YoursEvents = ({ tasks }) => {


  const now = new Date();

  // Filter the tasks, only the three tasks that is after the date of today is show
  const recentTasks = tasks
    .filter(task => new Date(task.deadline) >= now)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 3);


  return (
    <div>
      <h2 className="py-7 font-semibold text-xl flex justify-center">Vos èvénements</h2>
      <div className="grid md:grid-cols-3">
        {recentTasks.map((task, index) => (
          <motion.div 
            key={index}
            className="border-solid border-2 border-caramel rounded-lg m-6 p-4"
            initial={{ opacity: 0, x: -100 }} // Start off-screen to the left
            animate={{ opacity: 1, x: 0 }}    // Slide in to the final position
            transition={{ duration: 0.5, delay: index * 0.2 }} // Add delay for staggered effect
          >
            <p className="font-semibold text-align">{task.title}</p>
            <p className="text-align">{new Date(task.deadline).toLocaleDateString()}</p>
            <p className="text-align">{task.description}</p>
            <p className="text-align italic">{task.status}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default YoursEvents;
