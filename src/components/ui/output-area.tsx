import { cn } from "@/lib/utils";

interface OutputAreaProps {
  children: React.ReactNode;
  className?: string;
}

const OutputArea = ({ children, className }: OutputAreaProps) => {
  return (
    <div className={cn(
      "bg-muted text-foreground p-4 rounded-lg mt-4 min-h-[80px] font-mono text-sm",
      "whitespace-pre-wrap break-words border border-border shadow-soft",
      className
    )}>
      {children}
    </div>
  );
};

export default OutputArea;