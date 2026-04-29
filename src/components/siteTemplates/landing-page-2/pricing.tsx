/* eslint-disable @typescript-eslint/no-explicit-any */
import { TemplateProps } from "@/lib/templates";
import { Navbar, Footer } from "./layout";

export default function PricingPage({
  isEditor,
  content,
  onUpdate,
  slugs,
}: TemplateProps) {
    const handleUpdate = (path: string, value: any) => {
        if (onUpdate) onUpdate(path, value);
      };
  const plans = content?.pricingPlans ?? [];
  
  return (
    <>
      <Navbar
        isEditor={isEditor}
        content={content}
        onUpdate={handleUpdate}
        slugs={slugs}
      />
      <section className="mx-auto max-w-6xl px-6 py-24">
        <h1 className="text-center text-4xl font-bold md:text-6xl">
          {content?.pricingHeading}
        </h1>
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {plans.map((plan: any, i: number) => (
            <div
              key={i}
              className="rounded-3xl border-2 p-10 flex flex-col items-center text-center"
              style={{
                borderColor: i === 1 ? "var(--qs-primary)" : "var(--qs-border)",
              }}
            >
              <h2 className="text-2xl font-bold">{plan.name}</h2>
              <div className="my-6 text-5xl font-black">{plan.price}</div>
              <p className="mb-8 opacity-70">{plan.desc}</p>
              <ul className="mb-10 space-y-4 text-left">
                {plan.features.map((f: string, j: number) => (
                  <li key={j}>✅ {f}</li>
                ))}
              </ul>
              <button
                className="w-full rounded-full py-4 font-bold"
                style={{
                  background: "var(--qs-primary)",
                  color: "var(--qs-primary-fg)",
                }}
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </section>
      <Footer isEditor={isEditor} content={content} onUpdate={handleUpdate} />
    </>
  );
}
