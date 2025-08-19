import { getServerUrl } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

const serverUrl = getServerUrl();

async function proxyRequest(req: NextRequest, method: string, params: any) {
  const path = params.slug.join("/"); // dynamic path after /proxy/
  const url = `${serverUrl}/${path}${req.nextUrl.search}`;

  let body: BodyInit | undefined;
  if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    body = await req.text(); // get raw body (JSON, form-data, etc.)
  }

  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": req.headers.get("content-type") || "application/json",
        cookie: req.headers.get("cookie") ?? "",
      },
      body,
      credentials: "include",
    });

    // Return raw response (not always JSON)
    const contentType = res.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await res.json()
      : await res.text();

    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Proxy error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, ctx: any) {
  return proxyRequest(req, "GET", ctx.params);
}

export async function POST(req: NextRequest, ctx: any) {
  return proxyRequest(req, "POST", ctx.params);
}

export async function PUT(req: NextRequest, ctx: any) {
  return proxyRequest(req, "PUT", ctx.params);
}

export async function PATCH(req: NextRequest, ctx: any) {
  return proxyRequest(req, "PATCH", ctx.params);
}

export async function DELETE(req: NextRequest, ctx: any) {
  return proxyRequest(req, "DELETE", ctx.params);
}
