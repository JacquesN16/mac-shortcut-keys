import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { ShortcutList } from "~/components/ShortcutList";
import { VirtualKeyboard } from "~/components/VirtualKeyboard";
import { shortcuts, Shortcut } from "~/data/shortcuts";

export const meta: MetaFunction = () => {
  return [
    { title: "Mac Keyboard Shortcuts" },
    {
      name: "description",
      content: "Interactive Mac keyboard shortcuts guide",
    },
  ];
};

export default function Index() {
  const [selectedShortcut, setSelectedShortcut] = useState<Shortcut | null>(
    null
  );

  const handleSelectShortcut = (shortcutId: string) => {
    const shortcut = shortcuts.find((s) => s.id === shortcutId) || null;
    setSelectedShortcut(shortcut);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-light text-center font-bold  ">
            Mac Keyboard Shortcuts
          </h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <ShortcutList
              shortcuts={shortcuts}
              onSelectShortcut={handleSelectShortcut}
            />
          </div>
          <div className="space-y-6">
            <VirtualKeyboard selectedShortcut={selectedShortcut} />
            {selectedShortcut && (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {selectedShortcut.name}
                </h3>
                <p className="text-gray-600 mb-2">
                  {selectedShortcut.description}
                </p>
                <p className="text-sm text-gray-500">
                  Keys: {selectedShortcut.keys.join(" + ")}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
