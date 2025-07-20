import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AppLayout from "@/layouts/app-layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  name: z.string().min(1),
  content: z.string().min(1),
});

export default function DocumentEdit({ directory, file, content }: { directory: string; file: string; content: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: file,
      content,
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    router.put(route("documents.update", { directory, file }), data, {
      onStart: () => setIsLoading(true),
      onFinish: () => setIsLoading(false),
    });
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: "Directories", href: route("directories.index") },
        { title: directory, href: route("directories.show", directory) },
        { title: file, href: route("documents.show", [directory, file]) },
        { title: "Edit", href: route("documents.edit", [directory, file]) },
      ]}
    >
      <Container>
        <Heading title={file} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <MDEditor value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit">
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </form>
        </Form>
      </Container>
    </AppLayout>
  );
}
