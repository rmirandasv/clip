import AppLayout from "@/layouts/app-layout";

export default function DirectoryIndex() {
  return (
    <AppLayout breadcrumbs={[{ title: "Directories", href: route("directories.index") }]}>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Directories</h1>
      </div>
    </AppLayout>
  );
}
