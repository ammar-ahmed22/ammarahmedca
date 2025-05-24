"use client";
import { EquationBlock } from "@/types/api/blocks";
import React from "react";
import Mathjax from "react-mathjax";

const Equation: React.FC<EquationBlock> = (block) => {
  return (
    <Mathjax.Provider>
      <div className="text-neutral">
        <Mathjax.Node formula={block.expression} />
      </div>
    </Mathjax.Provider>
  );
};

export default Equation;
