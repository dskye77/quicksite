import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignBtns() {
  return (
    <div className="flex items-center gap-4">
      <Link href="/signin">
        <Button
          variant="outline"
          className="cursor-pointer md:inline-flex hidden"
          size="lg"
        >
          Sign In
        </Button>
      </Link>
      <Link href="/signin">
        <Button
          variant="default"
          className="cursor-pointer md:hidden"
          size="lg"
        >
          Sign In
        </Button>
      </Link>

      <Link href="/signup">
        <Button className="cursor-pointer hidden md:inline-flex" size="lg">
          Get Started Free
        </Button>
      </Link>
    </div>
  );
}
