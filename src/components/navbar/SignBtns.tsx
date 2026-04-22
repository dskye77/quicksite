import { Button } from "@/components/ui/button";

export default function SignBtns() {
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        className="cursor-pointer md:inline-flex hidden"
        size="lg"
      >
        Sign In
      </Button>
      <Button variant="default" className="cursor-pointer md:hidden" size="lg">
        Sign In
      </Button>
      <Button className="cursor-pointer hidden md:inline-flex" size="lg">
        Get Started Free
      </Button>
    </div>
  );
}
