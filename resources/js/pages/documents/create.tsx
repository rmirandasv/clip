import DocumentForm, { DocumentFormData } from "@/components/document-form";
import { Container } from "@/components/ui/container";
import AppLayout from "@/layouts/app-layout";
import { router } from "@inertiajs/react";
import { useState } from "react";

export default function DocumentCreate({ directory }: { directory: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (data: DocumentFormData) => {
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
      <Container className="bg-secondary">
        <DocumentForm loading={isLoading} onSubmit={handleSubmit} submitButtonText="Create Document" loadingText="Creating..." />
      </Container>
    </AppLayout>
  );
}
