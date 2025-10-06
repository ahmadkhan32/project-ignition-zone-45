@echo off
REM 🚀 Vercel Auto-Deployment Script for Windows
REM This script automates the deployment process to Vercel

echo 🚀 Starting Vercel Auto-Deployment...

REM Step 1: Check if git is initialized
echo [INFO] Checking git repository...
if not exist ".git" (
    echo [WARNING] Git repository not found. Initializing...
    git init
    git add .
    git commit -m "Initial commit: Complete auth system with Supabase"
    echo [SUCCESS] Git repository initialized
) else (
    echo [SUCCESS] Git repository found
)

REM Step 2: Check if remote origin exists
echo [INFO] Checking remote repository...
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo [WARNING] No remote repository found. Please add your GitHub repository:
    echo git remote add origin https://github.com/yourusername/your-repo.git
    echo Then run this script again.
    pause
    exit /b 1
) else (
    echo [SUCCESS] Remote repository found
)

REM Step 3: Build the project
echo [INFO] Building project for production...
npm run build
if errorlevel 1 (
    echo [ERROR] Build failed. Please fix build errors and try again.
    pause
    exit /b 1
) else (
    echo [SUCCESS] Project built successfully
)

REM Step 4: Commit and push changes
echo [INFO] Committing and pushing changes...
git add .
git commit -m "Deploy: %date% %time%"
git push origin main

if errorlevel 1 (
    echo [ERROR] Failed to push changes to GitHub
    pause
    exit /b 1
) else (
    echo [SUCCESS] Changes pushed to GitHub successfully
)

REM Step 5: Check if Vercel CLI is installed
echo [INFO] Checking Vercel CLI...
vercel --version >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Vercel CLI not found. Installing...
    npm install -g vercel
    if errorlevel 1 (
        echo [ERROR] Failed to install Vercel CLI
        pause
        exit /b 1
    ) else (
        echo [SUCCESS] Vercel CLI installed successfully
    )
) else (
    echo [SUCCESS] Vercel CLI found
)

REM Step 6: Deploy to Vercel
echo [INFO] Deploying to Vercel...
vercel --prod
if errorlevel 1 (
    echo [ERROR] Deployment to Vercel failed
    pause
    exit /b 1
) else (
    echo [SUCCESS] Deployment to Vercel successful!
    echo [SUCCESS] Your app is now live on Vercel!
)

REM Step 7: Display deployment information
echo [SUCCESS] 🎉 Deployment completed successfully!
echo.
echo 📋 Deployment Summary:
echo   • Project built for production
echo   • Changes committed to GitHub
echo   • Deployed to Vercel
echo   • Auto-deployment enabled
echo.
echo 🔗 Next Steps:
echo   1. Visit your Vercel dashboard to see the deployment
echo   2. Set up environment variables in Vercel project settings
echo   3. Configure custom domain (optional)
echo   4. Make changes and push to GitHub for auto-deployment
echo.
echo 🚀 Your app is now live with auto-deployment enabled!

REM Step 8: Set up auto-deployment instructions
echo [INFO] Setting up auto-deployment instructions...
(
echo # 🚀 Auto-Deployment Instructions
echo.
echo ## ✅ Your project is now set up for auto-deployment!
echo.
echo ### **How it works:**
echo 1. Make changes to your code
echo 2. Commit and push to GitHub: `git push origin main`
echo 3. Vercel automatically deploys your changes
echo 4. Your live site updates in real-time
echo.
echo ### **Environment Variables to set in Vercel:**
echo - `VITE_SUPABASE_URL` = `https://scpdntuuikcqasmfxkeq.supabase.co`
echo - `VITE_SUPABASE_PUBLISHABLE_KEY` = `your-supabase-anon-key`
echo.
echo ### **Daily Development Workflow:**
echo ```bash
echo # 1. Make changes to your code
echo # 2. Test locally
echo npm run dev
echo.
echo # 3. Commit and push
echo git add .
echo git commit -m "Your changes"
echo git push origin main
echo.
echo # 4. Vercel automatically deploys!
echo # 5. Visit your live URL to see changes
echo ```
echo.
echo ### **Vercel Dashboard:**
echo - Go to: https://vercel.com/dashboard
echo - Find your project
echo - View deployments and logs
echo - Configure environment variables
echo - Set up custom domain
echo.
echo ### **Benefits:**
echo - ✅ Automatic deployment on code changes
echo - ✅ Real-time updates for users
echo - ✅ Professional hosting with Vercel
echo - ✅ Automatic HTTPS and CDN
echo - ✅ Global edge network for fast loading
) > DEPLOYMENT_INSTRUCTIONS.md

echo [SUCCESS] Deployment instructions created in DEPLOYMENT_INSTRUCTIONS.md
echo [SUCCESS] 🎉 Auto-deployment setup complete!
pause
