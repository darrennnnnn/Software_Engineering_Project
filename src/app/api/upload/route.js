import { NextResponse } from "next/server";

export async function POST(request) {
    const apiKey = process.env.FOODVISOR_API_KEY;
    const apiUrl = "https://vision.foodvisor.io/api/1.0/en/analysis/";

    const formData = await request.formData();
    const file = formData.get("image");

    const body = new FormData();
    body.append("image", file);

    const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
            Authorization: `Api-Key ${apiKey}`,
        },
        body,
    });

    const data = await res.json();
    return NextResponse.json(data);
}
