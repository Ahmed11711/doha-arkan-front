# إعدادات
$BUILD_DIR = "dist"
$BRANCH = "build"
$REPO_URL = "https://github.com/Ahmed11711/doha-arkan-front.git"

Write-Host "🚀 Starting deployment to branch '$BRANCH'..."

# بناء المشروع
npm run build

# الانتقال إلى مجلد dist
Set-Location $BUILD_DIR

# إنشاء git مؤقت
git init
git remote add origin $REPO_URL
git checkout -b $BRANCH

git add .
git commit -m "Deploy build $(Get-Date)"
git push -f origin $BRANCH

# الرجوع للمجلد الأصلي
Set-Location ..

Write-Host "✅ Build deployed successfully!"
