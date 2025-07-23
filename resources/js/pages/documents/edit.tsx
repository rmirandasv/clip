import DocumentForm from "@/components/document-form";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AppLayout from "@/layouts/app-layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

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
        <DocumentForm directory={directory} initialValues={{ name, tags, content }} />
      </Container>
    </AppLayout>
  );
}
