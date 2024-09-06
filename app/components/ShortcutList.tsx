import React, { useState, useMemo } from "react";
import { Shortcut } from "~/data/shortcuts";
import * as Accordion from "@radix-ui/react-accordion";
import * as Switch from "@radix-ui/react-switch";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface ShortcutListProps {
  shortcuts: Shortcut[];
  onSelectShortcut: (shortcutId: string) => void;
}

export function ShortcutList({
  shortcuts,
  onSelectShortcut,
}: ShortcutListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const filteredShortcuts = useMemo(() => {
    return shortcuts.filter(
      (shortcut) =>
        (showAdvanced || !shortcut.isAdvanced) &&
        (searchTerm
          ? shortcut.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            shortcut.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            shortcut.keys
              .join(" ")
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          : true)
    );
  }, [shortcuts, searchTerm, showAdvanced]);

  const groupedShortcuts = useMemo(() => {
    return filteredShortcuts.reduce((acc, shortcut) => {
      if (!acc[shortcut.category]) {
        acc[shortcut.category] = [];
      }
      acc[shortcut.category].push(shortcut);
      return acc;
    }, {} as Record<string, Shortcut[]>);
  }, [filteredShortcuts]);

  return (
    <div className="shortcut-list">
      <div className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Search shortcuts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="flex items-center justify-between">
          <label
            htmlFor="show-advanced"
            className="text-sm font-medium text-gray-700"
          >
            Show Advanced Shortcuts
          </label>
          <Switch.Root
            id="show-advanced"
            checked={showAdvanced}
            onCheckedChange={setShowAdvanced}
            className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-blue-500 outline-none cursor-pointer"
          >
            <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg transform transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-5" />
          </Switch.Root>
        </div>
      </div>
      <Accordion.Root type="multiple" className="w-full">
        {Object.entries(groupedShortcuts).map(
          ([category, categoryShortcuts]) => (
            <Accordion.Item
              value={category}
              key={category}
              className="mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:ring-2 focus-within:ring-blue-500"
            >
              <Accordion.Header className="flex">
                <Accordion.Trigger className="text-left group flex h-[45px] flex-1 cursor-pointer items-center justify-between bg-white px-5 text-[15px] leading-none text-gray-700 shadow-[0_1px_0_0_#e6e8eb] outline-none hover:bg-gray-100">
                  {category}
                  <ChevronDownIcon
                    className="text-gray-500 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
                    aria-hidden
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px] bg-gray-50">
                <ul className="space-y-2 p-5">
                  {categoryShortcuts.map((shortcut) => (
                    <li
                      key={shortcut.id}
                      onClick={() => onSelectShortcut(shortcut.id)}
                      className="cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors duration-150"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-medium text-gray-800">
                            {shortcut.name}
                          </span>
                          <p className="text-sm text-gray-600">
                            {shortcut.description}
                          </p>
                        </div>
                        <div className="flex flex-wrap justify-end gap-1 ml-2">
                          {shortcut.keys.map((key, index) => (
                            <span
                              key={index}
                              className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs"
                            >
                              {key}
                            </span>
                          ))}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </Accordion.Content>
            </Accordion.Item>
          )
        )}
      </Accordion.Root>
      {Object.keys(groupedShortcuts).length === 0 && (
        <p className="text-gray-500 italic">
          No shortcuts found matching your search.
        </p>
      )}
    </div>
  );
}
