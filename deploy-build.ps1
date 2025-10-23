# ================================
# إعداد المتغيرات
# ================================
$BUILD_DIR = "dist"
$BRANCH = "build"
$REPO_URL = "https://github.com/Ahmed11711/doha-arkan-front.git"

Write-Host "🚀 Starting deployment to branch '$BRANCH'..."

# ================================
# التأكد من أنك على الفرع الرئيسي
# ================================
git checkout main
git pull origin main

# ================================
# بناء المشروع
# ================================
Write-Host "🏗 Building project..."
npm run build

# ================================
# الدخول إلى مجلد البناء
# ================================
Set-Location $BUILD_DIR

# ================================
# حذف أي مستودع Git سابق داخل dist
# ================================
if (Test-Path ".git") {
    Write-Host "🧹 Removing old .git folder..."
    Remove-Item -Recurse -Force ".git"
}

# ================================
# إنشاء Git جديد داخل dist فقط
# ================================
git init
git remote add origin $REPO_URL
git checkout -b $BRANCH

# ================================
# إضافة الملفات وعمل commit جديد
# ================================
git add .
$commitMessage = "Deploy dist folder $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git commit -m $commitMessage

# ================================
# رفع الملفات إلى الفرع build (استبدال كامل)
# ================================
Write-Host "🚢 Deploying to branch '$BRANCH'..."
git push -f origin HEAD:$BRANCH

# ================================
# الرجوع للمجلد الأصلي
# ================================
Set-Location ..

Write-Host "✅ Only dist folder deployed successfully to '$BRANCH'!"