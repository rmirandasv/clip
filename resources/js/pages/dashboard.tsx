import CreateDirectoryModal from "@/components/create-directory-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { Activity, ArrowRight, Clock, FileIcon, FileText, Folder, FolderOpen, Plus, TrendingUp } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
];

export default function Dashboard({ directories, documents }: { directories: string[]; documents: string[] }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <Container className="bg-secondary">
        <div className="mx-auto w-full max-w-7xl space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back! Here's what's happening with your documents.</p>
            </div>
            <div className="flex items-center gap-3">
              <CreateDirectoryModal />
              <Button asChild>
                <Link href={route("documents.create", "general")} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Document
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-muted/30 bg-background/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Directories</CardTitle>
                <Folder className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{directories.length}</div>
                <p className="text-xs text-muted-foreground">{directories.length === 0 ? "No directories yet" : "Active directories"}</p>
              </CardContent>
            </Card>

            <Card className="border-muted/30 bg-background/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Documents</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{documents.length}</div>
                <p className="text-xs text-muted-foreground">{documents.length === 0 ? "No documents yet" : "Markdown documents"}</p>
              </CardContent>
            </Card>

            <Card className="border-muted/30 bg-background/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Recent Activity</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">12</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+2</span> from last week
                </p>
              </CardContent>
            </Card>

            <Card className="border-muted/30 bg-background/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Storage Used</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">2.4 MB</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+12%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="border-muted/30 bg-background/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Recent Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {documents.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <FileText className="mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No documents yet</p>
                    <Button asChild variant="outline" size="sm" className="mt-2">
                      <Link href={route("documents.create", "general")}>Create your first document</Link>
                    </Button>
                  </div>
                ) : (
                  documents.slice(0, 5).map((document, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-muted/30 p-3 transition-colors hover:bg-muted/30"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                          <FileIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{document}</p>
                          <p className="text-xs text-muted-foreground">Markdown document</p>
                        </div>
                      </div>
                      <Button asChild variant="ghost" size="sm">
                        <Link href={route("documents.show", ["general", document])}>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card className="border-muted/30 bg-background/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link href={route("directories.index")} className="flex items-center gap-2">
                    <FolderOpen className="h-4 w-4" />
                    Browse Directories
                  </Link>
                </Button>

                <Button asChild className="w-full justify-start" variant="outline">
                  <CreateDirectoryModal />
                </Button>

                <Button asChild className="w-full justify-start" variant="outline">
                  <Link href={route("documents.create", "general")} className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Create New Document
                  </Link>
                </Button>

                <div className="pt-2">
                  <p className="mb-2 text-xs text-muted-foreground">Recent Directories</p>
                  {directories.length === 0 ? (
                    <p className="text-xs text-muted-foreground">No directories yet</p>
                  ) : (
                    <div className="space-y-2">
                      {directories.slice(0, 3).map((directory, index) => (
                        <Button key={index} asChild variant="ghost" size="sm" className="h-auto w-full justify-start p-2">
                          <Link href={route("directories.show", directory)} className="flex items-center gap-2">
                            <Folder className="h-3 w-3" />
                            <span className="text-xs">{directory}</span>
                          </Link>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {directories.length === 0 && documents.length === 0 && (
            <Card className="border-muted/30 bg-background/50">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">Welcome to Clip!</h3>
                <p className="mb-6 max-w-md text-sm text-muted-foreground">
                  Get started by creating your first directory to organize your documents, or create a document directly.
                </p>
                <div className="flex items-center gap-3">
                  <Button asChild>
                    <Link href={route("directories.create")} className="flex items-center gap-2">
                      <Folder className="h-4 w-4" />
                      Create Directory
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href={route("documents.create", "general")} className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Create Document
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </Container>
    </AppLayout>
  );
}
