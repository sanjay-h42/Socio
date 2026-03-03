import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

export const ourFileRouter = {
    // define routes for different upload types
    postImage: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 1,
        },
    })
        .middleware(async () => {
            console.log("UploadThing middleware hit");
            const { userId } = await auth();
            console.log("UploadThing userId:", userId);
            if (!userId) throw new Error("Unauthorized");
            return { userId };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("UploadThing onUploadComplete hit:", file.url);
            return { fileUrl: file.url };
        }),

    profileImage: f({
        image: {
            maxFileSize: "1MB",
            maxFileCount: 1,
        },
    })
        .middleware(async () => {
            const { userId } = await auth();
            if (!userId) throw new Error("Unauthorized");
            return { userId };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            return { fileUrl: file.url };
        }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
