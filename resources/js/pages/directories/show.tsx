import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import AppLayout from "@/layouts/app-layout";
import { Link } from "@inertiajs/react";

export default function DirectoryShow({ directory, files }: { directory: string; files: string[] }) {
  return (
    <AppLayout
      breadcrumbs={[
        { title: "Directories", href: route("directories.index") },
        { title: directory, href: route("directories.show", directory) },
      ]}
    >
      <Container>
        <Heading title={directory} />
        {files.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-4 rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">No documents in this directory</p>
            <Button asChild>
              <Link href={route("documents.create", directory)}>Create Document</Link>
            </Button>
          </div>
        )}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {files.map((file) => (
            <div key={file} className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">
                <Link href={route("documents.show", [directory, file])}>{file}</Link>
              </p>
            </div>
          ))}
        </div>
      </Container>
    </AppLayout>
  );
}
