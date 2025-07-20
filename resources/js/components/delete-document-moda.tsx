import { router } from "@inertiajs/react";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export function DeleteDocumentModal({ directory, file }: { directory: string; file: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = () => {
    router.delete(route("documents.destroy", { directory, file }), {
      onStart: () => setIsLoading(true),
      onSuccess: () => {
        setIsOpen(false);
      },
      onFinish: () => setIsLoading(false),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <Trash className="h-4 w-4 text-red-500" />
          <span className="text-red-500">Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Document</DialogTitle>
          <DialogDescription>Are you sure you want to delete this document? This action cannot be undone</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button disabled={isLoading} variant="destructive" onClick={handleDelete}>
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
