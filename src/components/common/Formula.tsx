import React, { useMemo } from 'react';
import katex from 'katex';

interface FormulaProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const Formula: React.FC<FormulaProps> = ({ math, block = false, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
      });
    } catch {
      return math;
    }
  }, [math, block]);

  if (block) {
    return (
      <div
        className={`my-4 py-3 px-4 bg-[#FFFDF8] dark:bg-[var(--bg-page)] rounded-lg border border-[#E7E1D6] dark:border-[#383632] overflow-x-auto text-center font-serif text-[#7F1D1D] dark:text-[#E2B765] ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={`inline-block mx-1 font-serif text-[#7F1D1D] dark:text-[#E2B765] ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
