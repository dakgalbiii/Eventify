"use client";

import { useState, useMemo, useRef } from "react";
import { groups } from "../../lib/groups";

export default function GroupsTab() {
  const [search, setSearch]       = useState("");
  const [open, setOpen]           = useState<string | null>(null);
  const inputRef                  = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return groups;
    return groups.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.leader.toLowerCase().includes(q) ||
        g.members.some((m) => m.toLowerCase().includes(q))
    );
  }, [search]);

  function hl(text: string) {
    const q = search.trim().toLowerCase();
    if (!q) return <>{text}</>;
    const idx = text.toLowerCase().indexOf(q);
    if (idx === -1) return <>{text}</>;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-gold/20 text-brown rounded-[2px] px-[1px]">
          {text.slice(idx, idx + q.length)}
        </mark>
        {text.slice(idx + q.length)}
      </>
    );
  }

  return (
    <div className="px-7 pt-12 pb-28">
      {/* Header */}
      <div className="fade-up delay-1 mb-8">
        <p className="text-[10px] tracking-widest2 uppercase text-brown/30 mb-1">
          Find your people
        </p>
        <h2 className="text-[32px] font-medium tracking-tight text-brown leading-none">
          Small Groups
        </h2>
      </div>

      {/* Search */}
      <div className="fade-up delay-2 mb-8">
        <div className="flex items-center gap-3 border-b border-brown/15 pb-3 focus-within:border-brown/40 transition-colors duration-200">
          <span className="text-brown/25 text-base leading-none">⌕</span>
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your name..."
            className="flex-1 bg-transparent text-[13px] text-brown outline-none placeholder:text-brown/25"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-brown/25 text-xs hover:text-brown/50 transition-colors"
            >
              ✕
            </button>
          )}
        </div>
        {search.trim() && (
          <p className="text-[10px] text-brown/25 mt-2">
            {filtered.length === 0
              ? "No results"
              : `${filtered.length} group${filtered.length !== 1 ? "s" : ""}`}
          </p>
        )}
      </div>

      {/* List */}
      <div className="fade-up delay-3">
        {filtered.map((group) => {
          const isOpen = open === group.name;
          return (
            <div key={group.name} className="border-b border-brown/[0.07] last:border-0">
              <button
                onClick={() => setOpen(isOpen ? null : group.name)}
                className="w-full flex items-center justify-between py-[13px] text-left gap-4"
              >
                <div className="flex items-baseline gap-3 min-w-0">
                  <span className="text-[13px] text-brown shrink-0">
                    {hl(group.name)}
                  </span>
                  <span className="text-[10px] text-brown/30 truncate">
                    {hl(group.leader)}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[10px] text-brown/22">
                    {group.members.length}
                  </span>
                  <span
                    className={`text-[10px] text-brown/22 transition-transform duration-200 inline-block ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    ↓
                  </span>
                </div>
              </button>

              {/* Expanded members */}
              {isOpen && (
                <div className="pb-5">
                  <p className="text-[9px] tracking-widest2 uppercase text-brown/25 mb-3">
                    Members
                  </p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {group.members.map((member) => (
                      <span key={member} className="text-[12px] text-brown/55 font-light">
                        {hl(member)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && search && (
          <div className="py-14 text-center">
            <p className="text-[12px] text-brown/25">No results for "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
