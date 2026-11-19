import type { GenerateRequest, RefineRequest } from "@/types";

const API_BASE = "/api";

export async function generateMessage(req: GenerateRequest): Promise<string> {
  const res = await fetch(`${API_BASE}/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "فشل الاتصال بالخادم" }));
    throw new Error(err.error || "حدث خطأ أثناء إنشاء الرسالة");
  }
  const data = await res.json();
  return data.content as string;
}

export async function refineMessage(req: RefineRequest): Promise<string> {
  const res = await fetch(`${API_BASE}/refine`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "فشل الاتصال بالخادم" }));
    throw new Error(err.error || "حدث خطأ أثناء المعالجة");
  }
  const data = await res.json();
  return data.content as string;
}

export async function getStats(): Promise<{ users: number; messages: number; templates: number; topTemplates: { title: string; count: number }[] }> {
  const res = await fetch(`${API_BASE}/stats`);
  if (!res.ok) return { users: 0, messages: 0, templates: 0, topTemplates: [] };
  return res.json();
}
