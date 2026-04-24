/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useRef, useEffect } from "react";
import { Check, MessageCircle, X } from "lucide-react";

interface WaFloatProps {
  number: string;
  ctaLabel: string;
  editable?: boolean;
  onNumberChange?: (v: string) => void;
  onCtaChange?: (v: string) => void;
}

export default function WaFloatButton({
  number,
  ctaLabel,
  editable,
  onNumberChange,
}: WaFloatProps) {
  const [open, setOpen] = useState(false);
  const [localNum, setLocalNum] = useState(number);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setLocalNum(number), [number]);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const href = number ? `https://wa.me/${number.replace(/\D/g, "")}` : "#";

  return (
    <div
      ref={ref}
      className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3"
    >
      {/* Popup */}
      {open && (
        <div className="relative w-[280px] rounded-xl bg-white shadow-2xl border border-gray-100 p-4">
          {/* close */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>

          {editable ? (
            <>
              <p className="text-[11px] font-bold text-gray-500 mb-2 uppercase tracking-wide">
                WhatsApp Number
              </p>

              <div className="flex gap-2">
                <input
                  value={localNum}
                  onChange={(e) => setLocalNum(e.target.value)}
                  placeholder="+234 800 000 0000"
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-400"
                />

                <button
                  onClick={() => {
                    onNumberChange?.(localNum);
                    setOpen(false);
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-3 flex items-center justify-center"
                >
                  <Check size={16} />
                </button>
              </div>

              <p className="text-[10px] text-gray-400 mt-2">
                Customers will message this number
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-semibold text-gray-800">
                Chat with us on WhatsApp
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {number ? `+${number.replace(/\D/g, "")}` : "No number set"}
              </p>

              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2 text-sm font-semibold"
              >
                <MessageCircle size={16} />
                Start Chat
              </a>
            </>
          )}
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-2xl z-[9999]"
      >
        <MessageCircle size={18} />
        <span className="text-sm font-semibold">
          {ctaLabel || "Order on WhatsApp"}
        </span>
      </button>
    </div>
  );
}
