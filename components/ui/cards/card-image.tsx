import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageIcon } from "lucide-react";
import type React from "react";

export type CardImageProps = {
  src: string;
  alt: string;
};

type Props = {
  image: CardImageProps;
  onClick: (e: any) => void;
};

export function CardImage({ image, onClick }: Props) {
  return (
    <div className="flex justify-center mb-4">
      <Avatar
        className="w-24 h-24 rounded-md border border-slate-200 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={onClick}
      >
        <AvatarImage
          src={image.src || "/placeholder.svg"}
          alt="Answer illustration"
          className="object-contain rounded-md"
        />
        <AvatarFallback className="bg-slate-100 rounded-md">
          <ImageIcon className="w-6 h-6 text-slate-400" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
