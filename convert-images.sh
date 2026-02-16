#!/bin/bash

# Image Optimization Script for Mobile Performance
# This script converts JPG/PNG images to WebP format for better mobile performance

echo "🚀 Starting image optimization for mobile performance..."
echo ""

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "⚠️  cwebp not found. Installing via Homebrew..."
    
    # Check if Homebrew is installed
    if ! command -v brew &> /dev/null; then
        echo "❌ Homebrew not installed. Please install Homebrew first:"
        echo "   /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
        exit 1
    fi
    
    # Install webp tools
    brew install webp
    echo "✅ WebP tools installed successfully!"
fi

# Navigate to images directory
cd "$(dirname "$0")/images" || exit

echo "📁 Converting images to WebP format..."
echo ""

# Counter for converted images
converted=0

# Convert JPG images to WebP
for img in *.jpg *.jpeg *.JPG *.JPEG 2>/dev/null; do
    if [ -f "$img" ]; then
        filename="${img%.*}"
        output="${filename}.webp"
        
        # Skip if WebP already exists
        if [ -f "$output" ]; then
            echo "⏭️  Skipping $img (WebP already exists)"
            continue
        fi
        
        echo "🔄 Converting: $img -> $output"
        cwebp -q 85 "$img" -o "$output"
        
        if [ $? -eq 0 ]; then
            # Get file sizes
            original_size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
            webp_size=$(stat -f%z "$output" 2>/dev/null || stat -c%s "$output" 2>/dev/null)
            
            # Calculate savings
            savings=$((100 - (webp_size * 100 / original_size)))
            
            echo "   ✅ Saved ${savings}% ($(numfmt --to=iec $original_size 2>/dev/null || echo "$original_size bytes") → $(numfmt --to=iec $webp_size 2>/dev/null || echo "$webp_size bytes"))"
            ((converted++))
        else
            echo "   ❌ Failed to convert $img"
        fi
        echo ""
    fi
done

# Convert PNG images to WebP
for img in *.png *.PNG 2>/dev/null; do
    if [ -f "$img" ]; then
        filename="${img%.*}"
        output="${filename}.webp"
        
        # Skip if WebP already exists
        if [ -f "$output" ]; then
            echo "⏭️  Skipping $img (WebP already exists)"
            continue
        fi
        
        echo "🔄 Converting: $img -> $output"
        cwebp -q 85 "$img" -o "$output"
        
        if [ $? -eq 0 ]; then
            # Get file sizes
            original_size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
            webp_size=$(stat -f%z "$output" 2>/dev/null || stat -c%s "$output" 2>/dev/null)
            
            # Calculate savings
            savings=$((100 - (webp_size * 100 / original_size)))
            
            echo "   ✅ Saved ${savings}% ($(numfmt --to=iec $original_size 2>/dev/null || echo "$original_size bytes") → $(numfmt --to=iec $webp_size 2>/dev/null || echo "$webp_size bytes"))"
            ((converted++))
        else
            echo "   ❌ Failed to convert $img"
        fi
        echo ""
    fi
done

echo ""
echo "========================================="
echo "✨ Optimization Complete!"
echo "========================================="
echo "📊 Total images converted: $converted"
echo ""
echo "📝 Next Steps:"
echo "   1. Update your HTML to use WebP images with fallbacks"
echo "   2. Test the website on mobile devices"
echo "   3. Run PageSpeed Insights again to see improvements"
echo ""
echo "Example HTML for responsive images with WebP:"
echo '   <picture>'
echo '     <source srcset="image.webp" type="image/webp">'
echo '     <img src="image.jpg" alt="Description">'
echo '   </picture>'
echo ""
