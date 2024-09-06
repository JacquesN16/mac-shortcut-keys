import React from "react";
import { Shortcut } from "~/data/shortcuts";
import { keyboardLayout } from "~/constant/constant";

interface VirtualKeyboardProps {
  selectedShortcut: Shortcut | null;
}

interface KeyProps {
  label: string;
  width?: number;
  height?: number;
  isActive: boolean;
  isSpecial?: boolean;
}

const Key: React.FC<KeyProps> = ({
  label,
  width = 1,
  height = 1,
  isActive,
  isSpecial = false,
}) => {
  const isBgGray = isSpecial && !isActive;
  const isWhite = !isSpecial && !isActive;

  return (
    <div
      className={`
      relative flex items-center justify-center
      ${
        isActive
          ? "bg-blue-600 text-white shadow-lg ring-2 ring-blue-300"
          : "text-gray-700 shadow-sm hover:bg-gray-50"
      }
      ${isBgGray && "bg-gray-100"}
      ${isWhite && "bg-white"}
      rounded-lg
      text-xs font-medium
      transition-all duration-150 ease-in-out
    `}
      style={{
        width: `${width * 36}px`,
        height: `${height * 36}px`,
        margin: "2px",
        border: isActive ? "none" : "1px solid #e5e7eb",
      }}
    >
      <span className="select-none">{label}</span>
    </div>
  );
};

export function VirtualKeyboard({ selectedShortcut }: VirtualKeyboardProps) {
  const isKeyActive = (key: { label: string; isLeft?: boolean }) => {
    if (!selectedShortcut) return false;

    const lowercaseLabel = key.label.toLowerCase();

    if (lowercaseLabel === "⌘") {
      return selectedShortcut.keys.includes("⌘") && key.isLeft;
    }

    if (lowercaseLabel === "shift") {
      return selectedShortcut.keys.includes("shift") && key.isLeft;
    }

    if (lowercaseLabel === "space") {
      return (
        selectedShortcut.keys.includes("space") ||
        selectedShortcut.keys.includes("spacebar")
      );
    }

    return selectedShortcut.keys.includes(lowercaseLabel);
  };

  return (
    <div className="virtual-keyboard bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Virtual Keyboard
      </h2>
      <div className="keyboard-layout bg-gray-50 p-4 rounded-xl">
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center mb-1">
            {row.map((key, keyIndex) => (
              <Key
                key={`${rowIndex}-${keyIndex}`}
                label={key.label === "space" ? "" : key.label}
                width={key.width}
                height={key.height}
                isActive={isKeyActive(key)}
                isSpecial={key.isSpecial}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
