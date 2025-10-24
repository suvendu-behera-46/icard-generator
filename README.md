# Employee iCard Generator 🆔

A Next.js application that generates professional employee ID cards as PNG images, matching your company's branding and design specifications.

## Features ✨

- **User-Friendly Form**: Collect employee details through an intuitive web interface
- **Photo Upload**: Upload employee photos with instant preview
- **Exact Design Match**: Generates iCards that precisely match your provided design template
- **QR Code Integration**: Includes QR code with employee contact information (vCard format)
- **Instant Download**: Automatically downloads the generated PNG file
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with Tailwind CSS for a clean, professional look

## Input Fields 📝

The form collects the following employee information:

- **Full Name** (e.g., Sandip Swain)
- **Employee ID** (e.g., YOCT9)
- **Position** (e.g., Principal Consultant)
- **Phone** (e.g., +91-9337150767)
- **Email** (e.g., sandip.swain@yoctotta.com)
- **Photo** (Employee photograph)

## Output 🎨

The generated iCard includes:

- **White base** with **orange curved section** on the right
- **Yoctotta branding** (logo and company name)
- **Employee photo** (square format, left side)
- **Employee details** (ID, name, position, phone, email)
- **QR code** (top right, containing vCard data)
- **Vertical company name** on the orange section
- **Exact color matching**: `#FF8C42` (Yoctotta orange)

## Getting Started 🚀

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation & Running

```bash
# Install dependencies (if not already done)
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## How to Use 📖

1. **Fill in the form** with employee details
2. **Upload a photo** of the employee (any image format)
3. **Click "Generate & Download iCard"**
4. The PNG file will automatically download to your device

The downloaded file will be named: `{employeeId}-icard.png` (e.g., `YOCT9-icard.png`)

## Tech Stack 💻

- **Framework**: Next.js 16.0.0 (App Router)
- **UI**: React 19 + Tailwind CSS 4
- **Image Generation**: node-canvas
- **QR Codes**: qrcode library
- **Language**: TypeScript

## Project Structure 📁

```
icard-generator/
├── src/
│   └── app/
│       ├── page.tsx                 # Main form UI
│       ├── layout.tsx               # Root layout
│       ├── globals.css              # Global styles
│       └── api/
│           └── generate-icard/
│               └── route.ts         # Backend API for PNG generation
├── public/                          # Static assets
├── package.json                     # Dependencies
└── README.md                        # This file
```

## API Endpoint 🔌

**POST** `/api/generate-icard`

**Request**: FormData with the following fields:

- `name`: string
- `position`: string
- `phone`: string
- `email`: string
- `employeeId`: string
- `photo`: File (image)

**Response**: PNG image file (image/png)

## Customization 🎨

To customize the design, edit `/src/app/api/generate-icard/route.ts`:

- **Colors**: Change the hex values (currently `#FF8C42` for orange)
- **Dimensions**: Modify `cardWidth` and `cardHeight` variables
- **Layout**: Adjust x/y coordinates for elements
- **Fonts**: Update font sizes and styles
- **Company branding**: Replace "yoctotta" with your company name

## Dependencies 📦

### Production

- `next`: 16.0.0
- `react`: 19.2.0
- `react-dom`: 19.2.0
- `canvas`: For server-side image generation
- `qrcode`: QR code generation

### Development

- `typescript`: ^5
- `tailwindcss`: ^4
- `eslint`: ^9

## Browser Compatibility 🌐

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

**Built with ❤️ using Next.js**

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
