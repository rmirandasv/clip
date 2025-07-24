import { useAppearance } from "@/hooks/use-appearance";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

const schema = z.object({
  name: z.string().min(1),
  content: z.string().min(1),
  tags: z.array(z.string()).optional(),
});

export type DocumentFormData = z.infer<typeof schema>;

type DocumentFormProps = {
  initialValues?: {
    name: string;
    tags: string[];
    content: string;
  };
  loading?: boolean;
  onSubmit: (data: DocumentFormData) => void;
  submitButtonText?: string;
  loadingText?: string;
};

export default function DocumentForm({
  initialValues,
  loading = false,
  onSubmit,
  submitButtonText = "Create Document",
  loadingText = "Creating...",
}: DocumentFormProps) {
  const { appearance } = useAppearance();
  const [tagInput, setTagInput] = useState("");
  const form = useForm<DocumentFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: initialValues?.name || "File Name",
      content: initialValues?.content || "# Document Content\n\nThis is a document content.",
      tags: initialValues?.tags || [],
    },
  });
  const colorMode = appearance === "dark" ? "dark" : "light";

  const handleAddTag = () => {
    if (tagInput.trim() && !form.getValues("tags")?.includes(tagInput.trim())) {
      const currentTags = form.getValues("tags") || [];
      form.setValue("tags", [...currentTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags") || [];
    form.setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove),
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleFormSubmit = (data: DocumentFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    {...field}
                    placeholder="File name"
                    className="min-h-12 border-none bg-transparent text-4xl font-medium text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Add a tag and press Enter"
                  className="h-10 border-muted/30 bg-background/50 text-sm focus:border-primary/50"
                />
                <Button type="button" onClick={handleAddTag} size="sm" variant="outline" className="h-10 px-3 text-xs">
                  Add
                </Button>
              </div>
            </div>
          </div>
          {form.watch("tags") && form.watch("tags")!.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {form.watch("tags")!.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary transition-colors hover:bg-primary/20"
                >
                  {tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-2 transition-colors hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="overflow-hidden rounded-lg border border-muted/30 bg-background/50">
                    <MDEditor
                      className="border-none"
                      value={field.value}
                      onChange={field.onChange}
                      height={500}
                      preview="live"
                      data-color-mode={colorMode}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="pt-4">
          <Button type="submit" variant="ghost" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {loadingText}
              </>
            ) : (
              submitButtonText
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
