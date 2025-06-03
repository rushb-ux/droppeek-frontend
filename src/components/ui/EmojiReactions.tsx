'use client';

import React, { useEffect, useState } from "react";
import { Flame, Laugh, Angry, Heart, Frown, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { JSX } from "react";


type Emoji = {
  label: string;
  icon: JSX.Element;
  color: string;
  count: number;
};

type EmojiReactionProps = {
  siteId: string;
  emojiCounts: {
    superb: number;
    love: number;
    wow: number;
    sad: number;
    laugh: number;
    angry: number;
  };
};

const defaultIcons: Record<string, JSX.Element> = {
  superb: <Flame className="w-5 h-5" />,
  love: <Heart className="w-5 h-5" />,
  wow: <Zap className="w-5 h-5" />,
  sad: <Frown className="w-5 h-5" />,
  laugh: <Laugh className="w-5 h-5" />,
  angry: <Angry className="w-5 h-5" />,
};

const defaultColors: Record<string, string> = {
  superb: "text-orange-500",
  love: "text-pink-500",
  wow: "text-yellow-500",
  sad: "text-blue-400",
  laugh: "text-green-500",
  angry: "text-red-600",
};

export default function EmojiReactions({ siteId, emojiCounts }: EmojiReactionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [emojis, setEmojis] = useState<Emoji[]>([]);

  useEffect(() => {
    const newEmojis: Emoji[] = Object.entries(emojiCounts || {}).map(([label, count]) => ({
      label,
      icon: defaultIcons[label as keyof typeof defaultIcons],
      color: defaultColors[label as keyof typeof defaultColors],
      count,
    }));
    setEmojis(newEmojis);
  }, [siteId, emojiCounts]);

  const handleClick = (label: string) => {
    setSelected(label);
    setEmojis((prev) =>
      prev.map((item) =>
        item.label === label ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  return (
    <div className="rounded-xl border p-4 shadow bg-white w-full">
      <h2 className="text-lg font-semibold text-center mb-4">What's your reaction?</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {emojis.map(({ label, icon, color, count }) => {
          const isActive = selected === label;
          return (
            <button
              key={label}
              onClick={() => handleClick(label)}
              className={cn(
                "flex flex-col items-center px-3 py-2 rounded-xl transition-all duration-200 border",
                isActive ? "bg-neutral-900 text-white" : "hover:bg-neutral-100"
              )}
            >
              <span className={isActive ? "text-white" : color}>{icon}</span>
              <span className="text-xs font-medium mt-1 capitalize">{label}</span>
              <span className="text-sm font-bold">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
