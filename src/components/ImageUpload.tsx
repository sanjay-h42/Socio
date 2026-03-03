"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { XIcon } from "lucide-react";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "postImage" | "profileImage";
}


function ImageUpload({ endpoint, onChange, value }: ImageUploadProps) {
  if (value) {
    return (
      <div className="relative size-40 mx-auto">
        <img src={value} alt="Upload" className="rounded-md size-40 object-cover border" />
        <button
          onClick={() => onChange("")}
          className="absolute -top-2 -right-2 p-1 bg-destructive rounded-full shadow-md hover:bg-destructive/90 transition-colors"
          type="button"
        >
          <XIcon className="h-3 w-3 text-white" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        console.log("Upload complete:", res);
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.error("Upload error:", error);
        alert(`Upload failed: ${error.message}`);
      }}

      appearance={{
        container: "p-4 border-dashed border-2 border-muted-foreground/20 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer",
        uploadIcon: "w-8 h-8 text-muted-foreground mb-2",
        label: "text-xs text-muted-foreground font-medium",
        allowedContent: "text-[10px] text-muted-foreground/60",
        button: "bg-primary text-primary-foreground text-xs h-8 px-3 rounded-md mt-2",
      }}

      content={{
        label: "Click or drag to upload image",
      }}
    />
  );
}
export default ImageUpload;
