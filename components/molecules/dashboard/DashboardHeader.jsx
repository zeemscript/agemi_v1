import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/form/Button";

const DashboardHeader = ({ title, subtitle, showButton, buttonText, onButtonClick }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between px-6 py-8 gap-4 bg-transparent border-b border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          {title || "Dashboard"}
        </h1>
        <p className="text-slate-400 mt-2 text-sm md:text-base font-medium max-w-xl">
          {subtitle || "Current edge telemetry and global security overview."}
        </p>
      </motion.div>
      
      {showButton && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button 
            round 
            onClick={onButtonClick} 
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold h-12 px-8 min-w-[160px] shadow-lg shadow-cyan-500/20"
          >
            {buttonText || "Check Status"}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default DashboardHeader;
