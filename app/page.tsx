import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Play, Spade} from "lucide-react";
import Image from "next/image";
import {HomeProfile} from "@/components/ui/auth/home-profile";

export default function HomePage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <header className="w-full flex justify-end">
            <HomeProfile />
        </header>
        <main className="flex flex-col gap-[32px] row-start-2 items-center text-center max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight">Driving Poker</h1>
        <p className="text-lg text-muted-foreground">
          Revolutionizing how you learn to drive.
        </p>
        <p className="text-lg text-muted-foreground">
          Turn boring theory into an engaging game that sticks.
        </p>
        <p className="text-lg text-muted-foreground">
          Master road rules effortlessly through card-based learning system.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild variant="default">
            <Link
              className="rounded-full flex items-center gap-2"
              href="/cards"
            >
              <Spade size={18} /> Learn Cards
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link
              className="rounded-full flex items-center gap-2"
              href="/test"
            >
              <Play size={18} /> Practice Tests
            </Link>
          </Button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Button asChild variant="secondary" size="sm">
          <Link
            className="rounded-full flex items-center gap-2"
            href="https://github.com/shinnenkara/driving-poker"
            target="_blank"
          >
            <Image src="/github.svg" alt="GitHub" width={16} height={16} /> GitHub
          </Link>
        </Button>
      </footer>
    </div>
  );
}
