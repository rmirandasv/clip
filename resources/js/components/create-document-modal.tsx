import { SharedData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, usePage } from "@inertiajs/react";
import { FilePlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { SidebarMenuButton } from "./ui/sidebar";

const schema = z.object({
  directory: z.string().min(1, { message: "Directory is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  tags: z.array(z.string()).optional(),
  content: z.string(),
});

type CreateDocumentModalProps = {
  sidebar?: boolean;
  directory?: string;
};

export default function CreateDocumentModal({ sidebar = false, directory = "" }: CreateDocumentModalProps) {
  const { directories } = usePage<SharedData>().props;
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      directory,
      name: "",
      tags: [],
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    router.post(route("documents.store", values.directory), values, {
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
        <DialogTrigger className="flex w-full items-center gap-2">
          <SidebarMenuButton className="w-full">
            <FilePlus className="h-4 w-4" />
            <span>Document</span>
          </SidebarMenuButton>
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button className="flex w-fit items-center gap-2">
            <FilePlus className="h-4 w-4" />
            <span>Document</span>
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Document</DialogTitle>
          <DialogDescription>Create a new document to store your notes.</DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="directory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Directory</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a directory" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {directories.map((directory, index) => (
                          <SelectItem key={index} value={directory}>
                            {directory}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. My First Note" {...field} />
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
