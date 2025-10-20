# إعدادات
$BUILD_DIR = "dist"
$BRANCH = "build"
$REPO_URL = "https://github.com/Ahmed11711/doha-arkan-front.git"

Write-Host "🚀 Starting deployment to branch '$BRANCH'..."

git checkout main

# بناء المشروع
npm run build

# الدخول إلى مجلد dist
Set-Location $BUILD_DIR

# إنشاء git مؤقت داخل dist فقط
git init
git remote add origin $REPO_URL
git checkout -b $BRANCH

# إضافة الملفات الموجودة في dist فقط
git add .
git commit -m "Deploy dist folder $(Get-Date)"

# رفع الملفات فقط إلى الفرع build (استبدال كامل)
git push -f origin $BRANCH

# الرجوع للمجلد الأصلي
Set-Location ..

Write-Host "✅ Only dist folder deployed successfully to '$BRANCH'!"
