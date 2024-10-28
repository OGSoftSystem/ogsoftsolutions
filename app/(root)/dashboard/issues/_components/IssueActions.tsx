"use client";

import { deleteIssue, toggleOngoing } from "@/lib/actions/issue.action";
import { cn } from "@/lib/utils";
import { PowerCircleIcon, Trash2Icon } from "lucide-react";
import { useTransition } from "react";

export const DeleteItem = ({ id }: { id: string }) => {
  const [pending, startTransition] = useTransition();

  return (
    <div>
      <Trash2Icon
        className={cn(
          "text-red-500 cursor-pointer",
          pending && "animate-pulse"
        )}
        onClick={() =>
          startTransition(async () => {
            await deleteIssue(id);
          })
        }
      />
    </div>
  );
};

export const ToggleOngoing = ({
  id,
  ongoing,
}: {
  id: string;
  ongoing: boolean;
}) => {
  const [pending, startTransition] = useTransition();

  return (
    <div>
      <PowerCircleIcon
        className={cn("text-red-500 cursor-pointer", {
          "animate-pulse": pending,
          "text-green-500": ongoing,
        })}
        onClick={() =>
          startTransition(async () => {
            await toggleOngoing(id, !ongoing);
          })
        }
      />
    </div>
  );
};

// export const EditItem = ({ id }: { id: string }) => {
//   return (
//     <Link href={`/dashboard/intro-text/${id}/edit`}>
//       <Edit2Icon className={cn("text-APP_BTN_BLUE cursor-pointer")} />
//     </Link>
//   );
// };
