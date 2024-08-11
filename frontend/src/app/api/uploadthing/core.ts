import instance from "@/lib/axios";
import { getSessionFromCookies } from "@/lib/crypt";
import { FileType } from "@/types/File";
import { UserType } from "@/types/User";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = async (req: Request) => {
    const user: UserType | null = await getSessionFromCookies();
    return user;
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    profilePicture: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
        // Set permissions and file types for this FileRoute
        .middleware(async ({ req }) => {
            // This code runs on your server before upload
            const user = await auth(req);

            // If you throw, the user will not be able to upload
            if (!user) throw new UploadThingError("Unauthorized");

            // Whatever is returned here is accessible in onUploadComplete as `metadata`
            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload
            // console.log("Upload complete for userId:", metadata.userId);
            // console.log("file", file);

            const res = await instance('POST', '/file', { 
                file_url: 'https://utfs.io/a/' + process.env.UPLOADTHING_APP_ID + '/' + file.key,
                user_id: metadata.userId,
                type: FileType.PROFILE_PICTURE,
                uploaded_at: (new Date()).toISOString()
            });
            // console.log(res.data.data);

            // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
            return res.data;
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;