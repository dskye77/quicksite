import { Zap } from "lucide-react";
export default function Icon() {
  return (
    <div className="flex items-center gap-2">
      <Zap
        size={40}
        className="text-primary-foreground bg-primary p-2 rounded-lg"
      />
      <div className="flex flex-col gap-0">
        <h1 className="text-xl text-foreground text font-bold">QuickSite</h1>
        <p className="text-sm text-muted-foreground">.com.ng</p>
      </div>
    </div>
  );
}
