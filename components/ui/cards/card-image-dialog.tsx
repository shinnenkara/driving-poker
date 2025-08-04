import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageIcon } from "lucide-react";
import { useState } from "react";
import { CardImage, CardImageProps } from "@/components/ui/cards/card-image";

type Props = {
  image: CardImageProps;
};

export function CardImageDialog({ image }: Props) {
  const [open, setOpen] = useState(false);

  const handleClick = (e: any) => {
    setOpen(true);
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CardImage image={image} onClick={handleClick} />
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="max-w-4xl max-h-[90vh] p-0 overflow-hidden"
      >
        <DialogHeader className="sr-only">
          <DialogTitle className="bg-black"></DialogTitle>
        </DialogHeader>
        <DialogClose asChild>
          <button
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-all z-10"
            aria-label="Close image"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </DialogClose>
        <div className="relative w-full h-full flex items-center justify-center bg-black min-h-[400px]">
          <Avatar className="w-full h-full max-w-full max-h-[90vh] rounded-none">
            <AvatarImage
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              className="object-contain w-full h-full"
            />
            <AvatarFallback className="bg-slate-800 rounded-none w-full h-full flex items-center justify-center">
              <div className="text-center text-white">
                <ImageIcon className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                <p className="text-lg font-medium">Image not available</p>
                <p className="text-sm text-slate-400 mt-2">
                  The image could not be loaded
                </p>
              </div>
            </AvatarFallback>
          </Avatar>
        </div>
      </DialogContent>
    </Dialog>
  );
}
