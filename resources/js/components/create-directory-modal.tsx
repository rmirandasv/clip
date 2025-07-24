import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { SidebarMenuButton } from "./ui/sidebar";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

type CreateDirectoryModalProps = {
  sidebar?: boolean;
};

export default function CreateDirectoryModal({ sidebar = false }: CreateDirectoryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    router.post(route("directories.store"), values, {
      onStart: () => setIsLoading(true),
      onSuccess: () => {
        setIsOpen(false);
        form.reset();
      },
      onFinish: () => setIsLoading(false),
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {sidebar ? (
        <DialogTrigger className="flex w-fit items-center gap-2">
          <SidebarMenuButton>
            <Plus />
            <span>Directory</span>
          </SidebarMenuButton>
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button className="flex w-fit items-center gap-2">
            <Plus />
            <span>Directory</span>
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Directory</DialogTitle>
          <DialogDescription>Create a new directory to store your notes.</DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Work" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
