"use client";

import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { set } from "zod";
import { createURL } from "@/lib/utils";

interface SubscriptionButtonProps {
  isPro: boolean;
}
const SubscriptionButton = ({ isPro = false }: SubscriptionButtonProps) => {
  const [isloading, setIsLoading] = useState(false);
  const onClick = async () => {
    try {
      setIsLoading(true);

      const res = await fetch(
        new Request(createURL("/api/stripe"), {
          method: "GET",
        })
      );
      const response = await res.json();

      window.location.href = response.url;
    } catch (e) {
      toast("Error", {
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      disabled={isloading}
      onClick={onClick}
      size="sm"
      variant={isPro ? "default" : "premium"}
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Sparkles className="h-4 w-4 fill-white text-white ml-2" />}
    </Button>
  );
};

export default SubscriptionButton;
