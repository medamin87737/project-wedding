import { ScriptFlourish } from "./DecorativeAssets";

export default function OrnamentDivider({ className = "" }: { className?: string }) {
  return <ScriptFlourish className={`py-4 ${className}`} />;
}
