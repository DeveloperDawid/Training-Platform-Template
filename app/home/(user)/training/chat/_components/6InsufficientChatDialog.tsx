"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle, Loader2, RotateCcw } from "lucide-react";

interface InsufficientChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoadNewCase: () => void;
  isLoadingNewCase: boolean;
}

export default function InsufficientChatDialog({
  open,
  onOpenChange,
  onLoadNewCase,
  isLoadingNewCase,
}: InsufficientChatDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" /> Insufficient
            Conversation
          </DialogTitle>
          <DialogDescription>
            You need to have a more substantial conversation with the customer
            before getting feedback. Please engage with at least 2 support
            responses to provide meaningful assistance.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="space-y-2 sm:space-y-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Continue Chat
          </Button>
          <Button
            onClick={() => {
              onOpenChange(false);
              onLoadNewCase();
            }}
            disabled={isLoadingNewCase}
          >
            {isLoadingNewCase ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Loading...
              </>
            ) : (
              <>
                <RotateCcw className="h-4 w-4 mr-2" /> Start New Case
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
