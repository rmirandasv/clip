import { DeleteDocumentModal } from "@/components/delete-document-moda";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import AppLayout from "@/layouts/app-layout";
import { Link } from "@inertiajs/react";
import MDEditor from "@uiw/react-md-editor";
import { Pencil } from "lucide-react";

export default function DocumentShow({ directory, file, content }: { directory: string; file: string; content: string }) {
  return (
    <AppLayout
      breadcrumbs={[
        { title: "Directories", href: route("directories.index") },
        { title: directory, href: route("directories.show", directory) },
        { title: file, href: route("documents.show", [directory, file]) },
      ]}
    >
      <Container>
        <Heading title={file} />
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{file}</CardTitle>
            <div className="flex flex-col items-center gap-2 md:flex-row">
              <DeleteDocumentModal directory={directory} file={file} />
              <Button variant="outline" asChild>
                <Link href={route("documents.edit", [directory, file])} className="flex items-center gap-2">
                  <Pencil className="h-4 w-4" />
                  <span>Edit</span>
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <MDEditor.Markdown className="rounded-lg px-6 py-4" source={content} />
          </CardContent>
        </Card>
      </Container>
    </AppLayout>
  );
}
