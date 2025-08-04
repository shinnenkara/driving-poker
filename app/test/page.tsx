import { UnderDevelopment } from "@/components/ui/general/under-development";
import { BackToHome } from "@/components/ui/general/back-to-home";

export default function TestPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex flex-col items-center gap-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Practice Tests</h1>
        <p className="text-lg text-muted-foreground">
          Test your knowledge of driving theory with interactive practice tests.
          Coming soon!
        </p>

        <UnderDevelopment />
        <BackToHome />
      </div>
    </div>
  );
}
