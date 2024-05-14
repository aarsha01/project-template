import React, { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface CropDialogProps {
  imageUrl: string;
  cropInit: Crop;
  aspect: number;
  onSetCrop: (crop: Crop) => void;
}

const ImageCropper = ({ imageUrl, crop, setCrop, aspect = 16 / 9 }) => {
  return (
    <ReactCrop
      crop={crop}
      onChange={(c) => setCrop(c)}
      ruleOfThirds={true}
      aspect={aspect}
    >
      <img src={imageUrl} />
    </ReactCrop>
  );
};

const CropDialog = ({
  imageUrl,
  cropInit,
  aspect,
  onSetCrop,
}: CropDialogProps) => {
  const [crop, setCrop] = useState<Crop>(cropInit);

  return (
    <Dialog>
      <DialogTrigger>
        <div className="underline cursor-pointer text-left">Crop Image</div>
      </DialogTrigger>
      <DialogContent className="min-w-[800px] min-h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>

        <div className="p-10 relative h-full flex-grow ">
          <ImageCropper
            imageUrl={imageUrl}
            crop={crop}
            setCrop={setCrop}
            aspect={aspect}
          />
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="default"
              onClick={() => onSetCrop(crop)}
            >
              Crop
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CropDialog;
