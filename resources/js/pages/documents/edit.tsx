import DocumentForm, { DocumentFormData } from "@/components/document-form";
import { Container } from "@/components/ui/container";
import AppLayout from "@/layouts/app-layout";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function DocumentEdit({
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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (data: DocumentFormData) => {
    router.put(route("documents.update", [directory, file]), data, {
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
      <Container className="bg-secondary">
        <DocumentForm
          initialValues={{ name, tags, content }}
          loading={isLoading}
          onSubmit={handleSubmit}
          submitButtonText="Update Document"
          loadingText="Updating..."
        />
      </Container>
    </AppLayout>
  );
}
