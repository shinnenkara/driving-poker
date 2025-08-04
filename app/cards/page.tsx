import { BackToHome } from "@/components/ui/general/back-to-home";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CardsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex flex-col items-center gap-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Learn Cards</h1>
        <p className="text-lg text-muted-foreground">
          Improve your knowledge of driving theory with interactive cards.
        </p>
        <Button asChild variant="default">
          <Link href="/play/cards" className="rounded-full">
            Learn
          </Link>
        </Button>
        <BackToHome />
      </div>
    </div>
  );
}
