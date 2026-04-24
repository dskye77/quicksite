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
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const href = number ? `https://wa.me/${number.replace(/\D/g, "")}` : "#";

  if (editable) {
    return (
      <div className="qs-whatsapp-float" ref={ref}>
        {open && (
          <div className="qs-phone-input-bubble">
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#888",
                fontFamily: "Georgia, serif",
                marginBottom: 2,
              }}
            >
              WHATSAPP NUMBER
            </p>
            <div style={{ display: "flex", gap: 6 }}>
              <input
                type="text"
                value={localNum}
                onChange={(e) => setLocalNum(e.target.value)}
                placeholder="+234 800 000 0000"
                style={{
                  flex: 1,
                  border: "1.5px solid #e0e0e0",
                  borderRadius: 8,
                  padding: "7px 10px",
                  fontSize: 13,
                  fontFamily: "Georgia, serif",
                  outline: "none",
                  color: "#111",
                }}
              />
              <button
                onClick={() => {
                  onNumberChange?.(localNum);
                  setOpen(false);
                }}
                style={{
                  background: "#25d366",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "0 12px",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                <Check size={14} />
              </button>
            </div>
            <p
              style={{
                fontSize: 10,
                color: "#aaa",
                fontFamily: "Georgia, serif",
              }}
            >
              Customers will message this number
            </p>
          </div>
        )}
        <button
          className="qs-wa-btn"
          onClick={() => setOpen((p) => !p)}
          style={{ boxShadow: "0 8px 32px rgba(37,211,102,0.4)" }}
        >
          <MessageCircle size={18} />
          {ctaLabel || "Order on WhatsApp"}
          <span style={{ fontSize: 10, opacity: 0.7, marginLeft: 4 }}>
            {open ? "▲" : "▼"}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="qs-whatsapp-float" ref={ref}>
      {open && (
        <div className="qs-phone-input-bubble">
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#333",
              fontFamily: "Georgia, serif",
            }}
          >
            Chat with us on WhatsApp
          </p>
          <p
            style={{
              fontSize: 12,
              color: "#555",
              fontFamily: "Georgia, serif",
            }}
          >
            {number ? `+${number.replace(/\D/g, "")}` : "No number set"}
          </p>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "#25d366",
              color: "#fff",
              borderRadius: 8,
              padding: "8px 16px",
              fontWeight: 700,
              fontSize: 13,
              textDecoration: "none",
              fontFamily: "Georgia, serif",
              justifyContent: "center",
            }}
          >
            <MessageCircle size={15} /> Start Chat
          </a>
          <button
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#aaa",
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}
      <button
        className="qs-wa-btn"
        onClick={() => setOpen((p) => !p)}
        style={{ boxShadow: "0 8px 32px rgba(37,211,102,0.4)" }}
      >
        <MessageCircle size={18} />
        {ctaLabel || "Order on WhatsApp"}
      </button>
    </div>
  );
}
