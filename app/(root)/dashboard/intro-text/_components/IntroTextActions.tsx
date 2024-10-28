"use client";

import { deleteIntroText, toggleIntroText } from "@/lib/actions/intro.action";

import { cn } from "@/lib/utils";
import { Edit2Icon, PowerCircleIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
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
            await deleteIntroText(id);
          })
        }
      />
    </div>
  );
};

export const ToggleItemLive = ({ id, live }: { id: string; live: boolean }) => {
  const [pending, startTransition] = useTransition();

  
  return (
    <div>
      <PowerCircleIcon
        className={cn("text-red-500 cursor-pointer", {
          "animate-pulse": pending,
          "text-green-500": live,
        })}
        onClick={() =>
          startTransition(async () => {
            await toggleIntroText(id, !live);
          })
        }
      />
    </div>
  );
};

export const EditItem = ({ id }: { id: string }) => {
  return (
    <Link href={`/dashboard/intro-text/${id}/edit`}>
      <Edit2Icon className={cn("text-APP_BTN_BLUE cursor-pointer")} />
    </Link>
  );
};
