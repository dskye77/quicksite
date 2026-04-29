/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type { TemplateProps } from "@/lib/templates";
import { Navbar, Footer } from "./layout";
import Home from "./Home";
import PricingPage from "./pricing";

export default function Template3({
  isEditor,
  content,
  onUpdate,
  slugs,
}: TemplateProps) {
  const handleUpdate = (path: string, value: any) => {
    if (onUpdate) onUpdate(path, value);
  };
  const subslug = slugs?.subslug;

  const renderContent = () => {
    if (!subslug) {
      return (
        <Home
          isEditor={isEditor}
          content={content}
          onUpdate={onUpdate}
          slugs={slugs}
        />
      );
    }

    const Subpage =
      template3Subpages[subslug as keyof typeof template3Subpages];
    if (Subpage) {
      return (
        <Subpage
          isEditor={isEditor}
          content={content}
          onUpdate={onUpdate}
          slugs={slugs}
        />
      );
    }

    return (
      <>
        <Navbar
          isEditor={isEditor}
          content={content}
          onUpdate={handleUpdate}
          slugs={slugs}
        />
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-6 py-40 text-center">
          <div className="text-5xl">🚀</div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Coming Soon
          </h2>
          <p className="mt-4" style={{ color: "var(--qs-text-muted)" }}>
            We&apos;re working hard to bring this page to life.
          </p>
        </div>
        <Footer isEditor={isEditor} content={content} onUpdate={handleUpdate} />
      </>
    );
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "var(--qs-bg)",
        color: "var(--qs-text)",
        fontFamily: "var(--qs-font)",
      }}
    >
      {renderContent()}
    </div>
  );
}

const template3Subpages = {
  pricing: PricingPage,
};

const template3StarterContent = ({
  selectedTitle,
  whatsappNumber,
}: {
  selectedTitle?: string;
  whatsappNumber?: string;
}) => {
  const getWhatsappLink = () =>
    !whatsappNumber ? {} : { type: "whatsapp", phone: whatsappNumber };

  return {
    navbar: {
      logo: "🚀",
      title: selectedTitle || "SaaSify",
      ctaButton: "Get Started",
      ctaButtonLink: getWhatsappLink(),
    },
    hero: {
      badge: "✨ New: AI-Powered Analytics",
      title: "Scale Your Business Faster Than Ever",
      desc: "The all-in-one platform to manage your projects, automate your workflow, and grow your revenue with data-driven insights.",
      primaryButton: "Start Free Trial",
      primaryButtonLink: getWhatsappLink(),
      image1:
        "https://res.cloudinary.com/dbfkzc5an/image/upload/v1777214672/image_wy9bs5.png",
    },
    logosHeading: "Trusted by over 500+ companies worldwide",
    logos: ["Acme Corp", "GlobalTech", "Nexus", "Intercom", "Stripe"],
    featuresHeading: "Everything You Need to Succeed",
    features: [
      {
        title: "Smart Automation",
        desc: "Automate repetitive tasks and focus on what matters.",
      },
      {
        title: "Real-time Data",
        desc: "Get instant insights into your business performance.",
      },
      {
        title: "Team Collaboration",
        desc: "Work seamlessly with your team in one unified space.",
      },
    ],
    pricingHeading: "Simple, Transparent Pricing",
    pricingPlans: [
      {
        name: "Starter",
        price: "$0",
        desc: "Perfect for individuals",
        features: ["3 Projects", "Basic Analytics"],
      },
      {
        name: "Pro",
        price: "$29",
        desc: "Best for growing teams",
        features: ["Unlimited Projects", "Advanced AI"],
      },
    ],
    faqHeading: "Frequently Asked Questions",
    faqs: [
      {
        q: "Is there a free trial?",
        a: "Yes, we offer a 14-day free trial for all new users.",
      },
      {
        q: "Can I cancel anytime?",
        a: "Absolutely. No hidden fees or long-term contracts.",
      },
    ],
    contact: {
      title: "Ready to Transform Your Workflow?",
      desc: "Join thousands of businesses scaling with our platform today.",
      primaryButton: "Contact Sales",
      primaryButtonLink: getWhatsappLink(),
    },
    footer: {
      brand: "SaaSify Inc.",
      copyright: `© ${new Date().getFullYear()} All rights reserved.`,
      socials: ["Twitter", "LinkedIn", "GitHub"],
    },
  };
};

export const template3 = {
  type: "template-3",
  meta: {
    title: "Business / SaaS",
    category: "Business",
    description:
      "A high-conversion landing page designed for startups and software products.",
  },
  config: { theme: "light", category: "business" },
  template: Template3,
  starterContent: template3StarterContent,
};
