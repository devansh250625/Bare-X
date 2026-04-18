import { SiteHeader } from "@/components/layout/site-header";
import { ResultClient } from "@/app/result/result-client";

export default function ResultPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <ResultClient />
    </main>
  );
}
