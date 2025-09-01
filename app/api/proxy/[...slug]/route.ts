import { getServerUrl } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const serverUrl = getServerUrl();

async function proxyRequest(
  req: NextRequest,
  method: string,
  params: Promise<{ slug: string[] }>
) {
  // ✅ Await params before using its properties (Next.js 15 requirement)
  const awaitedParams = await params;
  const path = awaitedParams.slug.join("/"); // dynamic path after /proxy/
  const url = `${serverUrl}/${path}${req.nextUrl.search}`;

  let requestData: any = undefined;
  if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    const contentType = req.headers.get("content-type") || "";

    try {
      if (contentType.includes("application/json")) {
        // Parse JSON data like axios does
        const bodyText = await req.text();
        if (bodyText.trim()) {
          requestData = JSON.parse(bodyText);
        }
      } else {
        // For form-data or other content types
        requestData = await req.text();
      }
    } catch (parseError) {
      // If parsing fails, try to get raw text
      try {
        requestData = await req.text();
      } catch (textError) {
        requestData = undefined;
      }
    }
  }

  try {
    const isFormData = requestData instanceof FormData;

    const response = await axios({
      method,
      url,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
      data: requestData || undefined,
      withCredentials: true,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    if (error.response) {
      // Axios error with response
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    } else {
      // Network or other error
      return NextResponse.json(
        { error: error.message ?? "Proxy error" },
        { status: 500 }
      );
    }
  }
}

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ slug: string[] }> }
) {
  return proxyRequest(req, "GET", ctx.params);
}

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ slug: string[] }> }
) {
  return proxyRequest(req, "POST", ctx.params);
}

export async function PUT(
  req: NextRequest,
  ctx: { params: Promise<{ slug: string[] }> }
) {
  return proxyRequest(req, "PUT", ctx.params);
}

export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ slug: string[] }> }
) {
  return proxyRequest(req, "PATCH", ctx.params);
}

export async function DELETE(
  req: NextRequest,
  ctx: { params: Promise<{ slug: string[] }> }
) {
  return proxyRequest(req, "DELETE", ctx.params);
}
