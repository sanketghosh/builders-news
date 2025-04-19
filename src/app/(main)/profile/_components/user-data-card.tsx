"use client";

import { Button } from "@/components/ui/button";
import { PenIcon } from "lucide-react";
import { useState } from "react";
import UpdateUserDetails from "./update-user-details";

interface IUpdateUserDetailsPropsType {
  name: string;
  email: string;
}

export default function UserDataCard({
  email,
  name,
}: IUpdateUserDetailsPropsType) {
  const [showUpdateDetailsForm, setShowUpdateDetailsForm] =
    useState<boolean>(false);

  const handleToggleUpdateUserDetailsForm = () => {
    setShowUpdateDetailsForm(!showUpdateDetailsForm);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div>
          <h2 className="text-sm font-semibold md:text-base">{name}</h2>
          <p className="text-xs font-medium text-muted-foreground md:text-sm">
            {email}
          </p>
        </div>
        <Button
          size={"icon"}
          variant={showUpdateDetailsForm ? "destructive" : "secondary"}
          onClick={handleToggleUpdateUserDetailsForm}
        >
          <PenIcon />
        </Button>
      </div>
      {showUpdateDetailsForm && <UpdateUserDetails />}
    </div>
  );
}
