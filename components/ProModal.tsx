"use client";

import { use, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "./ui/dialog";
import { useProModal } from "@/hooks/useProModal.hook";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { set } from "zod";
import { createURL } from "@/lib/utils";

const ProModal = () => {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  });

  const onSubscribe = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        new Request(createURL("/api/stripe"), {
          method: "GET",
        })
      );
      const response = await res.json();
      window.location.href = response.url;
    } catch (error) {
      toast("Error", {
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null;
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center">Upgrade to Pro</DialogTitle>
          <DialogDescription className="text-center space-y-2">
            Create <span className="text-sky-500 font-medium">Custom AI</span>{" "}
            Companions!
          </DialogDescription>
          <Separator />
          <div className="flex justify-between">
            <p className="text-2xl font-medium">
              $9<span className="text-sm font-normal">.99 / mo</span>
            </p>
            <Button variant="premium" onClick={onSubscribe} disabled={loading}>
              {" "}
              Subscribe
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
