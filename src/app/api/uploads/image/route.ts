import crypto from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName) {
      return NextResponse.json(
        { error: "Cloudinary cloud name is missing." },
        { status: 500 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder")?.toString() || "quicksite/uploads";

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file was provided." }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image uploads are supported." },
        { status: 400 },
      );
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "File is too large. Max 5MB." },
        { status: 400 },
      );
    }

    const cloudinaryForm = new FormData();
    cloudinaryForm.append("file", file);
    cloudinaryForm.append("folder", folder);

    const hasSignedCredentials = Boolean(apiKey && apiSecret);
    const hasUnsignedPreset = Boolean(uploadPreset);

    if (hasSignedCredentials) {
      const timestamp = Math.floor(Date.now() / 1000);
      const signaturePayload = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
      const signature = crypto
        .createHash("sha1")
        .update(signaturePayload)
        .digest("hex");

      cloudinaryForm.append("api_key", apiKey as string);
      cloudinaryForm.append("timestamp", String(timestamp));
      cloudinaryForm.append("signature", signature);
    } else if (hasUnsignedPreset) {
      cloudinaryForm.append("upload_preset", uploadPreset as string);
    } else {
      return NextResponse.json(
        {
          error:
            "Cloudinary credentials missing. Configure either API key/secret or NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET.",
        },
        { status: 500 },
      );
    }

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: cloudinaryForm,
      },
    );

    const result = await uploadResponse.json();
    if (!uploadResponse.ok || !result.secure_url) {
      return NextResponse.json(
        { error: result?.error?.message || "Failed to upload to Cloudinary." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      secureUrl: result.secure_url as string,
      publicId: result.public_id as string,
    });
  } catch (error) {
    console.error("Cloudinary upload API error:", error);
    return NextResponse.json(
      { error: "Unexpected upload error." },
      { status: 500 },
    );
  }
}
