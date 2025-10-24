# Quick Start Guide

## How to Run the Application

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

3. **Fill in the form:**

   - Enter employee name (e.g., "Sandip Swain")
   - Enter employee ID (e.g., "YOCT9")
   - Enter position (e.g., "Principal Consultant")
   - Enter phone number (e.g., "+91-9337150767")
   - Enter email (e.g., "sandip.swain@yoctotta.com")
   - Upload employee photo (click "Choose File")

4. **Generate the iCard:**

   - Click "Generate & Download iCard" button
   - Wait a few seconds while the PNG is generated
   - The file will automatically download

5. **Check your downloads:**
   - Look for `{employeeId}-icard.png` in your Downloads folder
   - The PNG will match the exact design you provided

## Test with Sample Data

You can use these sample values to test:

- **Name:** Sandip Swain
- **Employee ID:** YOCT9
- **Position:** Principal Consultant
- **Phone:** +91-9337150767
- **Email:** sandip.swain@yoctotta.com
- **Photo:** Any portrait photo (JPG, PNG, etc.)

## Features to Test

✅ Form validation (all fields are required)
✅ Photo preview (shows uploaded image)
✅ Loading state (spinner while generating)
✅ Automatic download (PNG file)
✅ QR code generation (scan with phone to verify vCard data)
✅ Exact color matching (#FF8C42 orange)
✅ Responsive design (test on mobile)

## Production Deployment

To deploy to production:

```bash
# Build the application
npm run build

# Start production server
npm start
```

For deployment to Vercel, Netlify, or other platforms, simply push to your Git repository and connect the deployment service.

## Troubleshooting

### Server won't start

- Kill existing processes: `pkill -f "next dev"`
- Remove build cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Photo not uploading

- Check file size (should be < 10MB)
- Use common formats (JPG, PNG, WEBP)

### PNG not downloading

- Check browser popup blocker
- Ensure browser allows downloads
- Try a different browser

### Design doesn't match

- Verify colors in `/src/app/api/generate-icard/route.ts`
- Adjust coordinates and dimensions as needed
- Test with different canvas sizes

## Need Help?

Check the main [README.md](./README.md) for more detailed information.
