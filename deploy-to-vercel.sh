#!/bin/bash

# 🚀 Vercel Auto-Deployment Script
# This script automates the deployment process to Vercel

echo "🚀 Starting Vercel Auto-Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Step 1: Check if git is initialized
print_status "Checking git repository..."
if [ ! -d ".git" ]; then
    print_warning "Git repository not found. Initializing..."
    git init
    git add .
    git commit -m "Initial commit: Complete auth system with Supabase"
    print_success "Git repository initialized"
else
    print_success "Git repository found"
fi

# Step 2: Check if remote origin exists
print_status "Checking remote repository..."
if ! git remote get-url origin > /dev/null 2>&1; then
    print_warning "No remote repository found. Please add your GitHub repository:"
    echo "git remote add origin https://github.com/yourusername/your-repo.git"
    echo "Then run this script again."
    exit 1
else
    print_success "Remote repository found"
fi

# Step 3: Build the project
print_status "Building project for production..."
if npm run build; then
    print_success "Project built successfully"
else
    print_error "Build failed. Please fix build errors and try again."
    exit 1
fi

# Step 4: Commit and push changes
print_status "Committing and pushing changes..."
git add .
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
git push origin main

if [ $? -eq 0 ]; then
    print_success "Changes pushed to GitHub successfully"
else
    print_error "Failed to push changes to GitHub"
    exit 1
fi

# Step 5: Check if Vercel CLI is installed
print_status "Checking Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    print_warning "Vercel CLI not found. Installing..."
    npm install -g vercel
    if [ $? -eq 0 ]; then
        print_success "Vercel CLI installed successfully"
    else
        print_error "Failed to install Vercel CLI"
        exit 1
    fi
else
    print_success "Vercel CLI found"
fi

# Step 6: Deploy to Vercel
print_status "Deploying to Vercel..."
if vercel --prod; then
    print_success "Deployment to Vercel successful!"
    print_success "Your app is now live on Vercel!"
else
    print_error "Deployment to Vercel failed"
    exit 1
fi

# Step 7: Display deployment information
print_success "🎉 Deployment completed successfully!"
echo ""
echo "📋 Deployment Summary:"
echo "  • Project built for production"
echo "  • Changes committed to GitHub"
echo "  • Deployed to Vercel"
echo "  • Auto-deployment enabled"
echo ""
echo "🔗 Next Steps:"
echo "  1. Visit your Vercel dashboard to see the deployment"
echo "  2. Set up environment variables in Vercel project settings"
echo "  3. Configure custom domain (optional)"
echo "  4. Make changes and push to GitHub for auto-deployment"
echo ""
echo "🚀 Your app is now live with auto-deployment enabled!"

# Step 8: Set up auto-deployment instructions
print_status "Setting up auto-deployment instructions..."
cat > DEPLOYMENT_INSTRUCTIONS.md << EOF
# 🚀 Auto-Deployment Instructions

## ✅ Your project is now set up for auto-deployment!

### **How it works:**
1. Make changes to your code
2. Commit and push to GitHub: \`git push origin main\`
3. Vercel automatically deploys your changes
4. Your live site updates in real-time

### **Environment Variables to set in Vercel:**
- \`VITE_SUPABASE_URL\` = \`https://scpdntuuikcqasmfxkeq.supabase.co\`
- \`VITE_SUPABASE_PUBLISHABLE_KEY\` = \`your-supabase-anon-key\`

### **Daily Development Workflow:**
\`\`\`bash
# 1. Make changes to your code
# 2. Test locally
npm run dev

# 3. Commit and push
git add .
git commit -m "Your changes"
git push origin main

# 4. Vercel automatically deploys!
# 5. Visit your live URL to see changes
\`\`\`

### **Vercel Dashboard:**
- Go to: https://vercel.com/dashboard
- Find your project
- View deployments and logs
- Configure environment variables
- Set up custom domain

### **Benefits:**
- ✅ Automatic deployment on code changes
- ✅ Real-time updates for users
- ✅ Professional hosting with Vercel
- ✅ Automatic HTTPS and CDN
- ✅ Global edge network for fast loading
EOF

print_success "Deployment instructions created in DEPLOYMENT_INSTRUCTIONS.md"
print_success "🎉 Auto-deployment setup complete!"
