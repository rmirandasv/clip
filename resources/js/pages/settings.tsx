import AppearanceTabs from "@/components/appearance-tabs";
import HeadingSmall from "@/components/heading-small";
import { Container } from "@/components/ui/container";
import AppLayout from "@/layouts/app-layout";

export default function SettingsPage() {
  return (
    <AppLayout breadcrumbs={[{ title: "Settings", href: route("settings") }]}>
      <Container>
        <div className="flex flex-col gap-4">
          <HeadingSmall title="Settings" description="Manage your settings" />
          <AppearanceTabs className="w-fit" />
        </div>
      </Container>
    </AppLayout>
  );
}
