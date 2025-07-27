import CreateDirectoryModal from "@/components/create-directory-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppLayout from "@/layouts/app-layout";
import { Link, router } from "@inertiajs/react";
import { Filter, Folder, FolderOpen, Grid3X3, List, Search } from "lucide-react";
import { ChangeEvent, useState } from "react";

export default function DirectoryIndex({ directories }: { directories: string[] }) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const search = (e: ChangeEvent<HTMLInputElement>) => {
    router.get(route("directories.index"), { search: e.target.value }, { preserveState: true });
  };

  const sort = (value: string) => {
    router.get(route("directories.index"), { sort: value }, { preserveState: true });
  };

  return (
    <AppLayout breadcrumbs={[{ title: "Directories", href: route("directories.index") }]}>
      <Container className="bg-secondary">
        <div className="mx-auto w-full max-w-7xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-foreground">Directories</h1>
              <p className="text-sm text-muted-foreground">
                {directories.length} director{directories.length !== 1 ? "ies" : "y"} available
              </p>
            </div>
            <CreateDirectoryModal />
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search directories..." className="pl-10" onChange={search} />
            </div>
            <div className="flex items-center gap-3">
              <Select defaultValue="asc" onValueChange={sort}>
                <SelectTrigger className="w-32">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Ascending</SelectItem>
                  <SelectItem value="desc">Descending</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center rounded-md border border-muted/30 bg-background/50">
                <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" className="h-8 w-8 p-0" onClick={() => setViewMode("grid")}>
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" className="h-8 w-8 p-0" onClick={() => setViewMode("list")}>
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {directories.length === 0 ? (
            <Card className="border-muted/30 bg-background/50">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="mb-4 rounded-full bg-muted/50 p-3">
                  <Folder className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">No directories yet</h3>
                <p className="mb-4 text-center text-sm text-muted-foreground">
                  Get started by creating your first directory to organize your documents.
                </p>
                <CreateDirectoryModal />
              </CardContent>
            </Card>
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "space-y-3"}>
              {directories.map((directory) => (
                <Link key={directory} href={route("directories.show", directory)}>
                  <Card
                    className={`group cursor-pointer border-muted/30 bg-background/50 transition-all hover:border-primary/30 hover:shadow-lg ${
                      viewMode === "list" ? "flex items-center p-4" : ""
                    }`}
                  >
                    {viewMode === "grid" ? (
                      <>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="min-w-0 flex-1">
                              <CardTitle className="text-base font-medium text-foreground transition-colors group-hover:text-primary">
                                {directory}
                              </CardTitle>
                            </div>
                            <div className="flex items-center gap-1">
                              <Badge variant="outline" className="text-xs">
                                DIR
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Directory</span>
                            <div className="flex items-center gap-1">
                              <Folder className="h-3 w-3" />
                              <span>Folder</span>
                            </div>
                          </div>
                        </CardContent>
                      </>
                    ) : (
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <Folder className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-foreground transition-colors group-hover:text-primary">{directory}</span>
                            <span className="text-sm text-muted-foreground">Directory</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            DIR
                          </Badge>
                          <FolderOpen className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
                        </div>
                      </div>
                    )}
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Container>
    </AppLayout>
  );
}
