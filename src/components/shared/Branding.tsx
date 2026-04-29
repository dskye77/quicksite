export default function Branding() {
  const SITE_DOMAIN_NAME = process.env.NEXT_PUBLIC_SITE_DOMAIN_NAME;
  const DOMAIN_NAME = process.env.NEXT_PUBLIC_DOMAIN_NAME;
  return (
    <p className="mt-2 text-xs" style={{ color: "var(--qs-text-muted)" }}>
      Powered by{" "}
      <a
        href={`https://${SITE_DOMAIN_NAME}${DOMAIN_NAME}`}
        target="_blank"
        className="underline hover:opacity-80"
      >
        Quicksite
      </a>
    </p>
  );
}
