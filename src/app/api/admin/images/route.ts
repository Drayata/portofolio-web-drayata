import { isAdmin } from "@/lib/auth";
import { createInsforgeServerClient } from "@/lib/insforge";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function POST(request: Request) {
  if (!(await isAdmin())) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file");
  const oldKey = formData.get("oldKey");

  if (!(file instanceof File)) return Response.json({ error: "File gambar wajib dipilih." }, { status: 400 });
  if (!IMAGE_TYPES.has(file.type)) return Response.json({ error: "Gunakan JPG, PNG, WebP, atau GIF." }, { status: 400 });
  if (file.size > MAX_IMAGE_SIZE) return Response.json({ error: "Ukuran gambar maksimal 5 MB." }, { status: 400 });

  const client = await createInsforgeServerClient();

  if (typeof oldKey === "string" && oldKey.trim()) {
    try {
      await client.storage.from("portfolio-images").remove(oldKey.trim());
    } catch (err) {
      console.warn("Failed to delete previous image", err);
    }
  }

  const { data, error } = await client.storage
    .from("portfolio-images")
    .uploadAuto(file);

  if (error || !data) {
    console.error("Failed to upload portfolio image", error);
    return Response.json({ error: "Upload gambar gagal." }, { status: 500 });
  }

  return Response.json({ url: data.url, key: data.key });
}

export async function DELETE(request: Request) {
  if (!(await isAdmin())) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { key } = (await request.json()) as { key?: string };
    if (key && typeof key === "string" && key.trim()) {
      const client = await createInsforgeServerClient();
      await client.storage.from("portfolio-images").remove(key.trim());
    }
    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to delete image", error);
    return Response.json({ error: "Gagal menghapus gambar." }, { status: 500 });
  }
}
