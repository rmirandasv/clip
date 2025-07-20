import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AppLayout from "@/layouts/app-layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import MDEditor from "@uiw/react-md-editor";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  name: z.string().min(1),
  content: z.string().min(1),
});

export default function DocumentCreate({ directory }: { directory: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      content: "",
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    router.post(route("documents.store", directory), data, {
      onStart: () => setIsLoading(true),
      onFinish: () => setIsLoading(false),
    });
  };

  return (
    <AppLayout
      breadcrumbs={[
        { title: "Directories", href: route("directories.index") },
        { title: directory, href: route("directories.show", directory) },
        { title: "Create Document", href: route("documents.create", directory) },
      ]}
    >
      <Container>
        <Heading title="Create Document" />
        <Card>
          <CardHeader>
            <CardTitle>Create Document</CardTitle>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-8">
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
                        <MDEditor value={field.value} onChange={field.onChange} height={500} preview="edit" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="mt-4 flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Document"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </Container>
    </AppLayout>
  );
}
