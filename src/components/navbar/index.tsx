import Icon from "./Icon";
import SignBtns from "./SignBtns";
import NavBtns from "./NavBtns";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border px-6 py-3 flex items-center justify-between">
      <Icon />
      <NavBtns />
      <SignBtns />
    </header>
  );
}
