# Gemini API Deployment Checklist

## ✅ Completed Steps

### 1. Environment Variable Configuration
- [x] **Local Environment**: `GEMINI_API_KEY` exists in `.env` file
- [ ] **Deployment Environment**: Verify `GEMINI_API_KEY` is set in Vercel/deployment platform
  
  **How to verify in Vercel:**
  1. Go to your Vercel dashboard
  2. Select your project
  3. Go to Settings → Environment Variables
  4. Ensure `GEMINI_API_KEY` is set for all environments (Production, Preview, Development)
  5. Value should be: `AIzaSyA_NMotnwIbb3WCssIWIV4zsBAtlT3G2Zk` (or your actual key)

### 2. Package Version
- [x] **Updated to latest**: `@google/generative-ai@0.24.1` (latest as of update)
- [x] **Lock file updated**: `pnpm-lock.yaml` updated with new version

### 3. Model Name Configuration
- [x] **Receipt Scanner** (`actions/transaction.js`): Using `gemini-2.0-flash-exp`
- [x] **Financial Insights** (`lib/inngest/function.js`): Using `gemini-2.0-flash-exp`

### 4. Server-Side Security
- [x] **scanReceipt function**: Properly marked with `"use server"` directive at file top
- [x] **API key usage**: Only used in server-side code, never exposed to client
- [x] **Error handling**: Enhanced error messages without exposing API key

### 5. Code Improvements
- [x] **API key validation**: Added check for `process.env.GEMINI_API_KEY` existence
- [x] **File type validation**: Added validation for supported image types
- [x] **Better error messages**: User-friendly error messages for common issues
- [x] **Logging**: Added console logs for debugging in production
- [x] **Response validation**: Check for empty responses and missing required fields

## 🚀 Deployment Steps

### Before Deploying

1. **Verify environment variable locally:**
   ```bash
   echo %GEMINI_API_KEY%
   ```
   Should output your API key (not empty)

2. **Test locally:**
   ```bash
   pnpm dev
   ```
   - Navigate to the receipt scanner feature
   - Upload a test receipt
   - Verify it works correctly

### Deploy to Vercel

1. **Push to repository:**
   ```bash
   git add .
   git commit -m "Fix: Update Gemini API integration with better error handling"
   git push
   ```

2. **Verify Vercel Environment Variables:**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Project Settings → Environment Variables
   - Confirm `GEMINI_API_KEY` exists with your API key value
   - If missing, add it:
     - Name: `GEMINI_API_KEY`
     - Value: `AIzaSyA_NMotnwIbb3WCssIWIV4zsBAtlT3G2Zk`
     - Environments: Production, Preview, Development

3. **Deploy:**
   - Vercel will auto-deploy on push, or
   - Manually trigger deployment from Vercel dashboard

### After Deployment

1. **Check Build Logs:**
   - Vercel Dashboard → Deployments → Select latest deployment
   - Check build logs for any errors
   - Look for "Build succeeded" message

2. **Monitor Function Logs:**
   - Vercel Dashboard → Logs
   - Filter by "Function invocation"
   - Test receipt scanning feature on production
   - Watch for any errors in real-time

3. **Test in Production:**
   - Navigate to your production URL
   - Go to transaction creation page
   - Upload a test receipt image
   - Verify the extraction works correctly

## 🐛 Debugging Tips

### If errors persist after deployment:

1. **Check environment variable:**
   ```bash
   # In Vercel Function logs, you should see this error if key is missing:
   # "GEMINI_API_KEY is not set in environment variables"
   ```

2. **Verify API key is valid:**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Check if your API key is active and has proper permissions

3. **Test with development runtime:**
   ```bash
   # Run locally with Node.js runtime
   set NEXT_RUNTIME=nodejs
   pnpm dev
   ```

4. **Check function timeout:**
   - Vercel free tier: 10 second timeout
   - Pro tier: 60 second timeout
   - Receipt scanning should complete well under 10 seconds

5. **Verify model availability:**
   - Model `gemini-2.0-flash-exp` is experimental but stable
   - If issues persist, can fallback to `gemini-1.5-flash`

## 📝 Error Messages Reference

| Error Message | Cause | Solution |
|--------------|-------|----------|
| "Receipt scanning service is not configured" | GEMINI_API_KEY not set | Add to environment variables |
| "Invalid file type" | Unsupported image format | Use JPEG, PNG, WebP, or HEIC |
| "This doesn't appear to be a receipt" | Image is not a receipt or unclear | Upload clearer receipt image |
| "Could not extract required information" | Receipt text is unreadable | Use higher quality image |
| "Failed to scan receipt" | API error or network issue | Check logs, verify API key |

## 🔍 Testing Checklist

- [ ] Local development works
- [ ] Environment variables set in Vercel
- [ ] Successful deployment (no build errors)
- [ ] Receipt scanning works in production
- [ ] Error messages are user-friendly
- [ ] No API key exposed in client-side code
- [ ] Function logs show detailed debugging info

## 📚 Additional Resources

- [Google AI Studio](https://makersuite.google.com/app/apikey) - Manage API keys
- [Gemini API Docs](https://ai.google.dev/docs) - Official documentation
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables) - Configuration guide
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) - Best practices

## 🎯 Model Information

**Current Model:** `gemini-2.0-flash-exp`
- **Type:** Experimental flash model
- **Speed:** Fast inference
- **Capabilities:** Vision + text understanding
- **Best for:** Receipt scanning, image analysis
- **Fallback:** `gemini-1.5-flash` (more stable, slightly older)

## 🔐 Security Notes

1. **Never commit API keys** to version control
2. **Server-side only**: All Gemini API calls in `"use server"` functions
3. **Environment variables**: Use platform-specific secret management
4. **Rate limiting**: Consider implementing if high traffic expected
5. **Error handling**: Don't expose internal errors to users
