import CreateDocumentModal from "@/components/create-document-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppLayout from "@/layouts/app-layout";
import { Link } from "@inertiajs/react";
import { FileText, Filter, Grid3X3, List, Plus, Search } from "lucide-react";
import { useState } from "react";

export default function DirectoryShow({ directory, files }: { directory: string; files: string[] }) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <AppLayout
      breadcrumbs={[
        { title: "Directories", href: route("directories.index") },
        { title: directory, href: route("directories.show", directory) },
      ]}
    >
      <Container className="bg-secondary">
        <div className="mx-auto w-full max-w-7xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-foreground">{directory}</h1>
              <p className="text-sm text-muted-foreground">
                {files.length} document{files.length !== 1 ? "s" : ""} in this directory
              </p>
            </div>
            <CreateDocumentModal directory={directory} />
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search documents..." className="pl-10" />
            </div>
            <div className="flex items-center gap-3">
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
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

          {files.length === 0 ? (
            <Card className="border-muted/30 bg-background/50">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="mb-4 rounded-full bg-muted/50 p-3">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">No documents yet</h3>
                <p className="mb-4 text-center text-sm text-muted-foreground">Get started by creating your first document in this directory.</p>
                <Button asChild>
                  <Link href={route("documents.create", directory)} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Create Document
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "space-y-3"}>
              {files.map((file) => (
                <Link key={file} href={route("documents.show", [directory, file])}>
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
                                {file}
                              </CardTitle>
                            </div>
                            <div className="flex items-center gap-1">
                              <Badge variant="outline" className="text-xs">
                                MD
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Document</span>
                            <div className="flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              <span>Markdown</span>
                            </div>
                          </div>
                        </CardContent>
                      </>
                    ) : (
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/50">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-foreground transition-colors group-hover:text-primary">{file}</span>
                            <span className="text-sm text-muted-foreground">Markdown Document</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            MD
                          </Badge>
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
