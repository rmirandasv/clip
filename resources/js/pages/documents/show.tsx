import { DeleteDocumentModal } from "@/components/delete-document-moda";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import AppLayout from "@/layouts/app-layout";
import { Link } from "@inertiajs/react";
import MDEditor from "@uiw/react-md-editor";
import { Pencil, Tag } from "lucide-react";

export default function DocumentShow({
  directory,
  file,
  name,
  tags,
  content,
}: {
  directory: string;
  file: string;
  name: string;
  tags: string[];
  content: string;
}) {
  return (
    <AppLayout
      breadcrumbs={[
        { title: "Directories", href: route("directories.index") },
        { title: directory, href: route("directories.show", directory) },
        { title: file, href: route("documents.show", [directory, file]) },
      ]}
    >
      <Container className="bg-secondary">
        <div className="mx-auto w-full max-w-7xl space-y-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-foreground">{name}</h1>
                {tags && tags.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <DeleteDocumentModal directory={directory} file={file} />
                <Button variant="outline" asChild className="flex items-center gap-2">
                  <Link href={route("documents.edit", [directory, file])}>
                    <Pencil className="h-4 w-4" />
                    <span>Edit</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <MDEditor.Markdown
            source={content}
            className="!bg-transparent !text-foreground"
            style={{
              backgroundColor: "transparent",
              color: "inherit",
            }}
          />
        </div>
      </Container>
    </AppLayout>
  );
}
