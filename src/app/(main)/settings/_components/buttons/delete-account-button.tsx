"use client";

// packages
import { Trash2Icon } from "lucide-react";
import { useTransition } from "react";

// local modules
import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth-client";

// components
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function DeleteAccountButton() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleDeleteAccount = () => {
    startTransition(async () => {
      try {
        await authClient.deleteUser({
          callbackURL: "/sign-up",
        });
        toast({
          title: "SUCCESS!",
          description: "Account and its data has been deleted.",
        });
      } catch (error) {
        toast({
          title: "ERROR!",
          description: "Failed to delete account.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"}>
          <Trash2Icon />
          Delete Account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant={"destructive"}
            onClick={handleDeleteAccount}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Continue"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
