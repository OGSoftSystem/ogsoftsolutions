"use client";

import { useTransition } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Spinner from "@/components/atom/Spinner";
import { deleteUser, makeAdmin } from "@/lib/actions/user.action";

export function EditUser({ userId }: { userId: string }) {
  return (
    <DropdownMenuItem asChild>
      <Link href={`/dashboard/${userId}/edit`}>Edit</Link>
    </DropdownMenuItem>
  );
}

export function DeleteUser({ userId }: { userId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await deleteUser(userId);
          router.refresh();
        })
      }
    >
      Delete {isPending && <Spinner />}
    </DropdownMenuItem>
  );
}

export function MakeAdmin({
  userId,
}: //   isAdmin,
{
  userId: string;
  //   isAdmin: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await makeAdmin(userId);
          router.refresh();
        })
      }
    >
      Toggle Role
      {isPending && <Spinner />}
    </DropdownMenuItem>
  );
}

// export function ToggleUserActive({
//   userId,
// }: // verify,
// {
//   userId: string;
//   // verify: boolean;
// }) {
//   const [isPending, startTransition] = useTransition();
//   return (
//     <DropdownMenuItem
//       disabled={isPending}
//       onClick={() =>
//         startTransition(async () => {
//           await toggleVerification(userId);
//         })
//       }
//     >
//       {/* {verify ? "Deactivate" : "Activate"} */}
//       Not Verified
//     </DropdownMenuItem>
//   );
// }
