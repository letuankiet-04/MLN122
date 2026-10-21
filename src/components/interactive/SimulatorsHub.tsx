import React, { useState } from 'react';
import { Layers, Brain, Calculator, Clock, Cpu, ArrowRight } from 'lucide-react';
import { SurplusValueSimulator } from './SurplusValueSimulator';
import { CapitalCirculationExplorer } from './CapitalCirculationExplorer';
import { ContradictionExplorer } from './ContradictionExplorer';
import { LaborPowerModule } from './LaborPowerModule';
import { ConstantVariableExplorer } from './ConstantVariableExplorer';
import { SurplusValueCalculator } from './SurplusValueCalculator';
import { SurplusValueMethodsSimulator } from './SurplusValueMethodsSimulator';
import { MindMapExplorer } from './MindMapExplorer';

interface SimulatorsHubProps {
  onNavigateToSection: (sectionId: string) => void;
}

export const SimulatorsHub: React.FC<SimulatorsHubProps> = ({ onNavigateToSection }) => {
  const [activeSim, setActiveSim] = useState<
    'mindmap' | 'cotton' | 'circulation' | 'contradiction' | 'labor' | 'constant-variable' | 'calculator' | 'methods'
  >('mindmap');

  const tabs = [
    { id: 'mindmap', label: 'Sơ đồ tư duy', icon: Brain },
    { id: 'cotton', label: 'Xưởng kéo sợi bông', icon: Clock },
    { id: 'circulation', label: 'Lưu thông (H-T-H / T-H-T′)', icon: Layers },
    { id: 'contradiction', label: 'Mâu thuẫn công thức chung', icon: Cpu },
    { id: 'labor', label: 'Hàng hóa sức lao động', icon: Layers },
    { id: 'constant-variable', label: 'Tư bản c & v (G = c+v+m)', icon: Layers },
    { id: 'calculator', label: 'Máy tính m′ & M', icon: Calculator },
    { id: 'methods', label: 'Tuyệt đối vs Tương đối', icon: Clock },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="border-b border-[var(--border-color)] dark:border-[var(--border-color)] pb-5">
        <span className="text-xs uppercase tracking-wider font-semibold text-[#8A6328] dark:text-[#C2A267]">
          Phòng thí nghiệm kinh tế chính trị tương tác
        </span>
        <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
          Mô phỏng & Công cụ tính toán tương tác
        </h2>
        <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
          Trực quan hóa sinh động các quy luật kinh tế trừu tượng qua các mô hình số học và sơ đồ động
        </p>
      </div>

      {/* Tabs Bar */}
      <div className="p-1.5 rounded-2xl bg-[var(--bg-surface)]/80 dark:bg-[var(--bg-page)]/80 backdrop-blur-md border border-[var(--border-color)] dark:border-[var(--border-color)] shadow-sm flex flex-wrap gap-1.5">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeSim === t.id;

          return (
            <button
              key={t.id}
              onClick={() => setActiveSim(t.id as any)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? 'bg-[#682626] text-amber-50 shadow-md shadow-[#682626]/20 ring-1 ring-[#8A6328]/40 dark:bg-[#C2A267] dark:text-[#1B1A18] dark:shadow-[#C2A267]/20 font-bold scale-[1.02]'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-[var(--bg-subtle)]/70 dark:hover:bg-[var(--bg-subtle)]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 transition-transform duration-200 ${isActive ? 'scale-110 text-amber-300 dark:text-[#1B1A18]' : ''}`} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Simulator Display */}
      <div className="animate-in fade-in duration-150">
        {activeSim === 'mindmap' && (
          <MindMapExplorer onNavigateToSection={onNavigateToSection} />
        )}
        {activeSim === 'cotton' && <SurplusValueSimulator />}
        {activeSim === 'circulation' && <CapitalCirculationExplorer />}
        {activeSim === 'contradiction' && <ContradictionExplorer />}
        {activeSim === 'labor' && <LaborPowerModule />}
        {activeSim === 'constant-variable' && <ConstantVariableExplorer />}
        {activeSim === 'calculator' && <SurplusValueCalculator />}
        {activeSim === 'methods' && <SurplusValueMethodsSimulator />}
      </div>
    </div>
  );
};
