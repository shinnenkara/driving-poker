import {BackToHome} from "@/components/ui/custom/back-to-home";
import {UnderDevelopment} from "@/components/ui/custom/under-development";

export default function CardsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="flex flex-col items-center gap-8 text-center">
                <h1 className="text-3xl font-bold tracking-tight">Learn Cards</h1>
                <p className="text-lg text-muted-foreground">
                    Improve your knowledge of driving theory with interactive cards.
                    Coming soon!
                </p>

                <UnderDevelopment />
                <BackToHome />
            </div>
        </div>
    );
}
