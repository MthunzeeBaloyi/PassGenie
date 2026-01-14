# PassGenie 🧞‍♂️

A fun, static password generator built and deployed while learning AWS.

## What it does
- Generates strong passwords from user input
- Uses 3-question “genie wishes” flow
- Fully client-side (HTML, CSS, JS)

## Architecture
- Amazon S3 (Static Website Hosting)
- Amazon CloudFront (Global CDN)
- Public-read bucket policy for website access

## What I learned
- S3 Static Website vs REST endpoints
- CloudFront caching & invalidations
- Browser cache vs CDN cache
- Cache-busting for CSS/JS
- Real-world debugging of 403 AccessDenied

## Live Demo
https://d10zuwqgn4r566.cloudfront.net

⚠️ Demo only. Do not use generated passwords for real accounts.
