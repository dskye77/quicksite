import { deleteImage } from "@/lib/cloudinary";

export async function DELETE(req: Request) {
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    return Response.json(
      { error: "Server misconfiguration: Cloudinary credentials are not set" },
      { status: 500 }
    );
  }

  try {
    const { publicId } = await req.json();

    if (!publicId || typeof publicId !== "string") {
      return Response.json({ error: "publicId is required" }, { status: 400 });
    }

    await deleteImage(publicId);

    return Response.json({ success: true });
  } catch (err) {
    console.error("[imageDelete] Failed:", err);
    const message = err instanceof Error ? err.message : "Unexpected error";
    return Response.json({ error: message }, { status: 500 });
  }
}