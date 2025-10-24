import { NextRequest, NextResponse } from "next/server";
import { createCanvas, loadImage } from "canvas";
import QRCode from "qrcode";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const employeeId = formData.get("employeeId") as string;
    const photoFile = formData.get("photo") as File;

    if (!name || !position || !phone || !email || !employeeId || !photoFile) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert photo to buffer
    const photoBuffer = Buffer.from(await photoFile.arrayBuffer());

    // Card dimensions - based on HTML (367px width scaled to ~1100px for high quality)
    const scaleFactor = 3; // Scale factor for high resolution
    const cardWidth = 367 * scaleFactor;
    const cardHeight = 546 * scaleFactor;
    const canvas = createCanvas(cardWidth, cardHeight);
    const ctx = canvas.getContext("2d");

    // Background - White base with rounded corners effect
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, cardWidth, cardHeight);

    // Orange rotated rectangle (background layer) - rotated -10 degrees
    ctx.save();
    ctx.translate(166.78 * scaleFactor, -130.86 * scaleFactor);
    ctx.rotate((-10 * Math.PI) / 180);
    ctx.fillStyle = "#FF8C42";
    ctx.fillRect(0, 0, 215.76 * scaleFactor, 808.57 * scaleFactor);
    ctx.restore();

    // Orange overlay rectangle (semi-transparent)
    ctx.fillStyle = "rgba(255, 140, 66, 0.80)";
    ctx.fillRect(
      238 * scaleFactor,
      -20 * scaleFactor,
      129 * scaleFactor,
      586 * scaleFactor
    );

    // Load and draw Yoctotta logo (top left)
    const logoPath = "./public/yocLogo.png";
    const logoImage = await loadImage(logoPath);
    const logoWidth = 41.25 * scaleFactor;
    const logoHeight = 42.97 * scaleFactor;
    const logoX = 28 * scaleFactor;
    const logoY = 55 * scaleFactor;

    ctx.drawImage(logoImage, logoX, logoY, logoWidth, logoHeight);

    // Load and draw employee photo with gradient background
    const employeePhoto = await loadImage(photoBuffer);
    const photoWidth = 137.6 * scaleFactor;
    const photoHeight = 172 * scaleFactor;
    const photoX = 28 * scaleFactor;
    const photoY = 129 * scaleFactor;
    const photoRadius = 4.5 * scaleFactor;

    // Draw photo background with gradient (approximated with solid color)
    ctx.fillStyle = "#FFE4CC"; // Approximation of gradient
    ctx.beginPath();
    ctx.roundRect(photoX, photoY, photoWidth, photoHeight, photoRadius);
    ctx.fill();

    // Draw the photo (crop and fit)
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(photoX, photoY, photoWidth, photoHeight, photoRadius);
    ctx.clip();

    // Calculate scaling to cover the rectangle
    const imageScale = Math.max(
      photoWidth / employeePhoto.width,
      photoHeight / employeePhoto.height
    );
    const scaledWidth = employeePhoto.width * imageScale;
    const scaledHeight = employeePhoto.height * imageScale;
    const offsetX = photoX + (photoWidth - scaledWidth) / 2;
    const offsetY = photoY + (photoHeight - scaledHeight) / 2;

    ctx.drawImage(employeePhoto, offsetX, offsetY, scaledWidth, scaledHeight);
    ctx.restore();

    // Employee ID label
    ctx.fillStyle = "#364153";
    ctx.font = `500 ${10 * scaleFactor}px Arial`;
    ctx.fillText(
      `Employee ID - ${employeeId}`,
      28 * scaleFactor,
      320 * scaleFactor
    );

    // Employee Name
    ctx.fillStyle = "#111111";
    ctx.font = `700 ${22 * scaleFactor}px Arial`;
    ctx.fillText(name, 28 * scaleFactor, 352 * scaleFactor);

    // Position (moved up 20px)
    ctx.fillStyle = "#9C3D00";
    ctx.font = `500 ${14 * scaleFactor}px Arial`;
    ctx.fillText(position, 28 * scaleFactor, 372 * scaleFactor);

    // Phone label (moved up 20px)
    ctx.fillStyle = "#000000";
    ctx.font = `700 ${12 * scaleFactor}px Arial`;
    ctx.fillText("PHONE :", 28 * scaleFactor, 411 * scaleFactor);

    // Phone value (moved up 20px)
    ctx.fillStyle = "#364153";
    ctx.font = `500 ${10 * scaleFactor}px Arial`;
    ctx.fillText(phone, 28 * scaleFactor, 427 * scaleFactor);

    // Email label (moved up 20px)
    ctx.fillStyle = "#000000";
    ctx.font = `700 ${12 * scaleFactor}px Arial`;
    ctx.fillText("EMAIL :", 28 * scaleFactor, 460 * scaleFactor);

    // Email value (moved up 20px)
    ctx.fillStyle = "#364153";
    ctx.font = `500 ${10 * scaleFactor}px Arial`;
    ctx.fillText(email, 28 * scaleFactor, 475 * scaleFactor);

    // Generate QR code (for contact info or website)
    const qrData = `BEGIN:VCARD
VERSION:3.0
FN:${name}
TITLE:${position}
TEL:${phone}
EMAIL:${email}
ORG:Yoctotta Technologies
END:VCARD`;

    const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
      width: 49 * scaleFactor,
      margin: 0,
      color: {
        dark: "#9C3D00",
        light: "#00000000", // Transparent background
      },
    });

    const qrImage = await loadImage(qrCodeDataUrl);
    const qrSize = 49.04 * scaleFactor;
    const qrX = 257 * scaleFactor;
    const qrY = 55 * scaleFactor;

    // Draw QR code
    ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);

    // Add "YOCTOTTA TECHNOLOGIES" vertical text on orange section
    ctx.save();
    ctx.translate((270 + 40) * scaleFactor, (501 - 10) * scaleFactor); // Move right 40px, up 30px
    ctx.rotate((-90 * Math.PI) / 180);
    ctx.fillStyle = "#9C3D00";
    ctx.font = `400 ${16 * scaleFactor}px Arial`;
    ctx.textAlign = "left";
    ctx.fillText("YOCTOTTA TECHNOLOGIES", 0, 0);
    ctx.restore();

    // Convert canvas to PNG buffer
    const buffer = canvas.toBuffer("image/png");

    // Return the PNG image
    return new NextResponse(buffer as unknown as BodyInit, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="${employeeId}-icard.png"`,
      },
    });
  } catch (error) {
    console.error("Error generating iCard:", error);
    return NextResponse.json(
      {
        error: "Failed to generate iCard",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
