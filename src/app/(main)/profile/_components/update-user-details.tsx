"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircleIcon } from "lucide-react";

export default function UpdateUserDetails() {
  return (
    <div className="grid grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-2">
      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <Input placeholder="" />
          <Button variant={"secondary"}>
            Update Name
            <CheckCircleIcon />
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <Input placeholder="" />
          <Button variant={"secondary"}>
            Update Email
            <CheckCircleIcon />
          </Button>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <Input placeholder="" />
          <Input placeholder="" />
          <Button variant={"secondary"}>
            Update Name
            <CheckCircleIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
