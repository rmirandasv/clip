import DocumentForm from "@/components/document-form";
import { Container } from "@/components/ui/container";
import AppLayout from "@/layouts/app-layout";

export default function DocumentCreate({ directory }: { directory: string }) {
  return (
    <AppLayout
      breadcrumbs={[
        { title: "Directories", href: route("directories.index") },
        { title: directory, href: route("directories.show", directory) },
        { title: "Create Document", href: route("documents.create", directory) },
      ]}
    >
      <Container className="bg-secondary">
        <DocumentForm directory={directory} />
      </Container>
    </AppLayout>
  );
}
