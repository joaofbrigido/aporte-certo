import { CircleCheck, CircleX } from "lucide-react";

type PlansCardItemProps = {
  title: string;
  notSupport?: boolean;
};

export const PlansCardItem = ({ title, notSupport }: PlansCardItemProps) => {
  return (
    <li>
      <div className="flex items-center gap-2">
        {notSupport ? (
          <CircleX
            size={20}
            className="min-w-5 min-h-5 text-muted-foreground/70"
          />
        ) : (
          <CircleCheck size={20} className="min-w-5 min-h-5" />
        )}

        <span className={notSupport ? "text-muted-foreground/70" : ""}>
          {title}
        </span>
      </div>
    </li>
  );
};
