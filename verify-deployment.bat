@echo off
REM Pre-deployment verification script for Welth AI
REM Run this before deploying to Vercel

echo ========================================
echo Welth AI - Pre-Deployment Verification
echo ========================================
echo.

REM Check 1: Environment variables
echo [1/5] Checking environment variables...
if not defined GEMINI_API_KEY (
    echo [ERROR] GEMINI_API_KEY is not set in current environment
    echo [INFO] It should be in .env file for local dev
    echo [INFO] Make sure to set it in Vercel for production
) else (
    echo [OK] GEMINI_API_KEY is set in current environment
)
echo.

REM Check 2: Node modules
echo [2/5] Checking dependencies...
if exist node_modules\@google\generative-ai (
    echo [OK] @google/generative-ai is installed
) else (
    echo [ERROR] @google/generative-ai not found
    echo Run: pnpm install
    goto :error
)
echo.

REM Check 3: Build test
echo [3/5] Testing build...
call pnpm build
if %errorlevel% neq 0 (
    echo [ERROR] Build failed!
    goto :error
)
echo [OK] Build successful
echo.

REM Check 4: Key files exist
echo [4/5] Checking key files...
if exist actions\transaction.js (
    echo [OK] actions\transaction.js exists
) else (
    echo [ERROR] actions\transaction.js not found
    goto :error
)

if exist lib\inngest\function.js (
    echo [OK] lib\inngest\function.js exists
) else (
    echo [ERROR] lib\inngest\function.js not found
    goto :error
)
echo.

REM Check 5: Test Gemini setup
echo [5/5] Testing Gemini API...
call node test-gemini-setup.js
if %errorlevel% neq 0 (
    echo [ERROR] Gemini API test failed!
    goto :error
)
echo.

echo ========================================
echo [SUCCESS] All checks passed!
echo ========================================
echo.
echo Next steps:
echo 1. Commit your changes: git add . && git commit -m "Fix: Gemini API integration"
echo 2. Push to repository: git push
echo 3. Verify GEMINI_API_KEY in Vercel: https://vercel.com/dashboard
echo 4. Wait for automatic deployment
echo 5. Test in production
echo.
echo See GEMINI_DEPLOYMENT_CHECKLIST.md for detailed instructions
echo.
goto :end

:error
echo.
echo ========================================
echo [FAILED] Pre-deployment checks failed
echo ========================================
echo.
echo Please fix the errors above before deploying.
echo See GEMINI_DEPLOYMENT_CHECKLIST.md for help.
echo.
exit /b 1

:end
exit /b 0
