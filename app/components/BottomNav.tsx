"use client";

type Tab = "home" | "schedule" | "rules" | "groups" | "info";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "home",     label: "Home",     icon: "◈" },
  { id: "rules",    label: "Rules",    icon: "○" },
  { id: "info",     label: "Info",     icon: "ℹ" },
  { id: "schedule", label: "Schedule", icon: "≡" },
  { id: "groups",   label: "Groups",   icon: "⊞" },
];

type Props = {
  active: Tab;
  onChange: (tab: Tab) => void;
};

export default function BottomNav({ active, onChange }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-paper/80 backdrop-blur-md border-t border-brown/[0.08]" />
      <div className="relative max-w-lg mx-auto flex items-center justify-around px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
        {TABS.map(({ id, label, icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`relative flex flex-col items-center justify-center gap-1 min-w-11 py-1 rounded-lg transition-all duration-200 ${
                isActive 
                  ? "bg-red text-paper" 
                  : "text-brown/30 hover:bg-brown/5 hover:text-brown/50"
              }`}
            >
              <span className="text-[18px] leading-none">
                {icon}
              </span>
              <span className="text-[8px] tracking-widest uppercase leading-none">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}