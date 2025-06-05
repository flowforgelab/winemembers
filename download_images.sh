#!/bin/bash

# Create images directory if it doesn't exist
mkdir -p images

# Download and optimize hero background
curl -o images/hero-bg.jpg "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1920&q=80&auto=format&fit=crop"
magick images/hero-bg.jpg -resize 1920x1080 -quality 80 -blur 0x5 images/hero-bg.jpg

# Download and optimize distribution background
curl -o images/distribution-bg.jpg "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&q=80&auto=format&fit=crop"
magick images/distribution-bg.jpg -resize 1920x1080 -quality 80 -blur 0x5 images/distribution-bg.jpg

# Download and optimize contact background
curl -o images/contact-bg.jpg "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=1920&q=80&auto=format&fit=crop"
magick images/contact-bg.jpg -resize 1920x1080 -quality 80 -blur 0x5 images/contact-bg.jpg

# Download and optimize service images
curl -o images/service-1.jpg "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80&auto=format&fit=crop"
magick images/service-1.jpg -resize 800x600 -quality 85 images/service-1.jpg

curl -o images/service-2.jpg "https://images.pexels.com/photos/1407854/pexels-photo-1407854.jpeg?auto=compress&w=800"
magick images/service-2.jpg -resize 800x600 -quality 85 images/service-2.jpg

curl -o images/service-3.jpg "https://images.pexels.com/photos/3952042/pexels-photo-3952042.jpeg?auto=compress&w=800"
magick images/service-3.jpg -resize 800x600 -quality 85 images/service-3.jpg

curl -o images/service-4.jpg "https://images.pexels.com/photos/1407855/pexels-photo-1407855.jpeg?auto=compress&w=800"
magick images/service-4.jpg -resize 800x600 -quality 85 images/service-4.jpg

# Create social media preview images
magick images/hero-bg.jpg -resize 1200x630 -quality 80 images/og-image.jpg
magick images/hero-bg.jpg -resize 1200x600 -quality 80 images/twitter-card.jpg

# Create favicon
magick images/hero-bg.jpg -resize 32x32 -quality 80 images/favicon.png 