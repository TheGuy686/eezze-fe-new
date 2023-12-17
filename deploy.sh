#! /bin/bash

echo --------------------------------------------------
echo -- Minify website and compile to ./dist folder  --
echo --------------------------------------------------
npm run generate
echo --------------------------------------------------
echo ------- Synchronize data to AWS S3 bucket --------
echo --------------------------------------------------
aws s3 sync dist s3://app.eezze.io --profile eezze-prod
echo --------------------------------------------------
echo ------- Invalidate AWS CloudFront cache ----------
echo --------------------------------------------------
aws cloudfront create-invalidation --distribution-id E2I05RKIEJWO1E --paths "/*" --profile eezze-prod
echo --------------------------------------------------
echo ------------- Successfully deployed --------------
echo --------------------------------------------------
