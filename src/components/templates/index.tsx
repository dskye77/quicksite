import TemplateCard from "./TemplateCard";
const templates = [
  {
    id: 1,
    title: "Naija Bites",
    category: "Restaurant",
    description: "Hot menus, online orders, table booking.",
    imageUrl: "/assets/template-restaurant.jpg",
  },
  {
    id: 2,
    title: "FashionHouse",
    category: "Store",
    description: "Showcase collections in Ankara style.",
    imageUrl: "/assets/template-fashion.jpg",
  },
  {
    id: 3,
    title: "GlowSalon",
    category: "Service",
    description: "Bookings, services, gallery — all in one.",
    imageUrl: "/assets/template-salon.jpg",
  },
  // ... add the rest of your items here
];

const categories = ["All", "Restaurant", "Store", "Service", "Portfolio"];

export const TemplateGallery = () => {
  return (
    <section className="pt-16 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <span className="inline-flex items-center border px-2.5 py-0.5 text-xs rounded-full mb-4 font-medium">
            Templates
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            Beautiful designs, ready in one click.
          </h1>
          <p className="text-muted-foreground text-lg">
            Hand-crafted templates for every Nigerian business. All free to
            start.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition-all ${
                i === 0
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card text-muted-foreground hover:border-foreground/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {templates.map((template, index) => (
            <TemplateCard key={template.id} {...template} delay={index * 40} />
          ))}
        </div>
      </div>
    </section>
  );
};
