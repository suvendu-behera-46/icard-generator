# iCard Design Specifications

## Implemented Design Details

This document describes the exact specifications used to generate the employee iCard PNG files.

### Card Dimensions

- **Width**: 367px (scaled 3x to 1101px for high resolution)
- **Height**: 546px (scaled 3x to 1638px for high resolution)
- **Background**: White (#FFFFFF)

### Color Palette

- **Primary Orange**: `#FF8C42`
- **Dark Orange**: `#9C3D00`
- **Dark Gray**: `#364153`
- **Medium Gray**: `#999999`
- **Black**: `#111111` / `#000000`
- **Photo Background**: `#FFE4CC` (gradient approximation)

### Typography Styles

All text uses **Arial** font (Montserrat specified in CSS but Arial used for canvas compatibility):

1. **Employee ID**

   - Color: `#999999`
   - Size: 10px
   - Weight: 500
   - Letter spacing: 1px

2. **Employee Name**

   - Color: `#111111`
   - Size: 22px
   - Weight: 700

3. **Position**

   - Color: `#9C3D00`
   - Size: 14px
   - Weight: 500
   - Letter spacing: 1px

4. **"PHONE :" / "EMAIL :" Labels**

   - Color: `#000000`
   - Size: 12px
   - Weight: 700
   - Transform: Uppercase

5. **Phone/Email Values**

   - Color: `#364153`
   - Size: 10px
   - Weight: 500
   - Letter spacing: 1px

6. **"YOCTOTTA TECHNOLOGIES"** (Vertical)
   - Color: `#9C3D00`
   - Size: 16px
   - Weight: 400
   - Transform: Uppercase
   - Letter spacing: 4px
   - Rotation: -90 degrees

### Layout Positions (at base scale 1x)

- **Logo**: x: 28px, y: 55px, size: 41.25 × 42.97px
- **Photo**: x: 28px, y: 129px, size: 137.6 × 172px, radius: 4.5px
- **Employee ID**: x: 28px, y: 326px
- **Name**: x: 28px, y: 352px
- **Position**: x: 28px, y: 385px
- **Phone Label**: x: 28px, y: 431px
- **Phone Value**: x: 28px, y: 457px
- **Email Label**: x: 28px, y: 480px
- **Email Value**: x: 28px, y: 506px
- **QR Code**: x: 257px, y: 55px, size: 49.04 × 49.04px
- **Vertical Text**: x: 270px, y: 501px (rotated -90°)

### Orange Background Elements

1. **Rotated Rectangle**

   - Position: x: 166.78px, y: -47.86px
   - Size: 215.76 × 638.57px
   - Rotation: -10 degrees
   - Color: `#FF8C42`

2. **Overlay Rectangle**
   - Position: x: 238px, y: -20px
   - Size: 129 × 586px
   - Color: `rgba(255, 140, 66, 0.80)` (80% opacity)

### QR Code

- Size: 49.04 × 49.04px
- Color: Dark `#9C3D00`, Light `#FFFFFF`
- Contains: vCard with employee contact information
- Format: vCard 3.0

### Image Processing

- Employee photo is cropped to fit the rectangle area
- Maintains aspect ratio
- Centered within the photo container
- Rounded corners: 4.5px radius

## Output

- Format: PNG
- Filename: `{employeeId}-icard.png`
- Resolution: 3x scale (1101 × 1638px)
- DPI: Suitable for printing

## Browser Compatibility

The form works in all modern browsers. The PNG generation happens server-side, so it's consistent across all platforms.
