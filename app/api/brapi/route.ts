import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";

  const urlParams: Record<string, string> = { search };

  const path = `https://brapi.dev/api/quote/list?${new URLSearchParams(
    urlParams
  )}`;

  const response = await fetch(path, {
    headers: {
      Authorization: process.env.BRAPI_TOKEN as string,
    },
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: response.statusText },
      { status: response.status }
    );
  }

  const data = await response.json();

  return NextResponse.json(data);
}
