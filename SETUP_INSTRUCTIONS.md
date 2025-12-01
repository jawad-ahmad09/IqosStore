# 🚀 Setup Instructions - Email & WhatsApp

## ✅ What Has Been Fixed

### 1. Email System - Web3Forms Integration
- **Status**: Code updated to use FormData (more reliable)
- **Location**: `/app/api/send-inquiry/route.ts`

### 2. WhatsApp Floating Button
- **Status**: ✅ Added and working
- **Location**: `/app/components/WhatsAppButton.tsx`
- **Features**:
  - Green WhatsApp button (bottom-right corner)
  - Pulsing animation for attention
  - Hover effect with text
  - Mobile-responsive
  - Opens WhatsApp chat directly

---

## 📧 Email Setup (Web3Forms)

### Step 1: Get Your Web3Forms Access Key

1. **Go to Web3Forms**: https://web3forms.com
2. **Click "Create New Form"**
3. **Enter your email**: `jawadrathore30@gmail.com` (or your email)
4. **Get Access Key**: Copy the access key (example: `abc123-def456-ghi789`)

### Step 2: Add Access Key to Code

**Open file**: `/app/api/send-inquiry/route.ts`

**Find this line (around line 49)**:
```typescript
const accessKey = "YOUR_NEW_WEB3FORMS_ACCESS_KEY"; // Replace with your new key
```

**Replace with your actual key**:
```typescript
const accessKey = "abc123-def456-ghi789"; // Your actual Web3Forms key
```

### Step 3: Test Email Delivery

1. **Start dev server**:
   ```bash
   npm run dev
   ```

2. **Open website**: http://localhost:3000

3. **Add product to cart** and **submit order**

4. **Check your terminal** for logs:
   ```
   [sendEmail] Sending order to Web3Forms...
   [sendEmail] Customer: Test Name test@email.com +971501234567
   [Web3Forms Response] { success: true }
   [Web3Forms] ✅ Email sent successfully!
   ```

5. **Check your email inbox** (jawadrathore30@gmail.com)
   - Also check **Spam/Junk folder**
   - Look in **Promotions tab** (if Gmail)

### Step 4: If Email Not Arriving

#### A. Verify Web3Forms Dashboard
1. Go to: https://web3forms.com/access
2. Enter your access key
3. Check:
   - ✅ Email address is correct
   - ✅ Form is "Active"
   - ✅ No error messages

#### B. Check Gmail Settings
1. **Add to Safe Senders**:
   - Search for "noreply@web3forms.com"
   - Mark as "Not Spam"
   - Add to contacts

2. **Check All Folders**:
   - Inbox
   - Spam/Junk
   - Promotions
   - All Mail

#### C. Test Web3Forms Directly
1. Go to: https://web3forms.com
2. Use their test form
3. Enter your access key
4. Send test email
5. If this works → Your code is fine
6. If this doesn't work → Issue with Web3Forms setup

### Email Format You'll Receive

```
Subject: New IQOS Store Order from [Customer Name]

New IQOS Store Order Inquiry
================================

Customer Information:
Name: John Doe
Email: customer@example.com
Phone: +971501234567
Address: 123 Main Street
City: Dubai
Country: UAE

Order Details:
--------------------------------
Terea Purple Wave
  Quantity: 2
  Unit Price: AED 130.00
  Subtotal: AED 260.00

Terea Yugen
  Quantity: 1
  Unit Price: AED 130.00
  Subtotal: AED 130.00

--------------------------------
TOTAL: AED 390.00

✓ Free delivery within UAE
✓ Authentic products guaranteed
```

---

## 📱 WhatsApp Setup

### Step 1: Add Your WhatsApp Number

**Open file**: `/app/components/WhatsAppButton.tsx`

**Find this line (around line 11)**:
```typescript
const whatsappNumber = "971501234567" // Replace with your actual number
```

**Replace with YOUR WhatsApp number**:
```typescript
const whatsappNumber = "971XXXXXXXXX" // Your actual number
```

### Important: Number Format
- **Include country code**: 971 (for UAE)
- **NO plus sign (+)**
- **NO spaces**
- **NO dashes**

**Examples**:
- ❌ Wrong: `+971 50 123 4567`
- ❌ Wrong: `971-50-123-4567`
- ✅ Correct: `971501234567`

### Step 2: Customize WhatsApp Message (Optional)

**Find this line (around line 15)**:
```typescript
const defaultMessage = "Hello! I'm interested in your IQOS products. Can you help me?"
```

**Change to any message you want**:
```typescript
const defaultMessage = "Assalam o Alaikum! Main IQOS products ke baare mein janna chahta hun."
```

### Step 3: Test WhatsApp Button

1. **Start dev server**:
   ```bash
   npm run dev
   ```

2. **Open website**: http://localhost:3000

3. **Look for green button** (bottom-right corner)

4. **Click WhatsApp button**:
   - Should open WhatsApp Web or WhatsApp app
   - Should have your number
   - Should have pre-filled message

---

## 🎨 WhatsApp Button Customization

### Change Position

**Open**: `/app/components/WhatsAppButton.tsx`

**Current position** (bottom-right):
```typescript
className="fixed bottom-6 right-6 z-50"
```

**Change to bottom-left**:
```typescript
className="fixed bottom-6 left-6 z-50"
```

**Change to top-right**:
```typescript
className="fixed top-24 right-6 z-50"
```

### Change Color

**Current color** (WhatsApp green):
```typescript
className="... bg-[#25D366] hover:bg-[#20BA5A] ..."
```

**Change to blue**:
```typescript
className="... bg-blue-500 hover:bg-blue-600 ..."
```

### Hide on Mobile (Optional)

**Add this class**:
```typescript
className="... hidden md:flex ..."
```

---

## 🧪 Complete Testing Checklist

### Email Testing:
- [ ] Web3Forms access key added to code
- [ ] Server running (`npm run dev`)
- [ ] Added product to cart
- [ ] Filled contact form with valid data
- [ ] Submitted order successfully
- [ ] Checked terminal logs (should show success)
- [ ] Checked email inbox (including spam)
- [ ] Email received with correct order details

### WhatsApp Testing:
- [ ] WhatsApp number added to code (correct format)
- [ ] Green button visible on website (bottom-right)
- [ ] Button shows on mobile
- [ ] Button shows on desktop
- [ ] Clicking opens WhatsApp
- [ ] Correct number appears in WhatsApp
- [ ] Pre-filled message appears
- [ ] Can send message successfully

---

## 🚨 Troubleshooting

### Problem 1: Email Not Sending
**Error in terminal**: `Web3Forms failed with status: 403`

**Solution**:
1. Verify access key is correct (copy-paste from Web3Forms)
2. Check Web3Forms dashboard - form should be "Active"
3. Create a NEW access key if needed
4. Make sure you saved the file after updating

### Problem 2: Email Goes to Spam
**Email arrives but in spam folder**

**Solution**:
1. Mark as "Not Spam" in Gmail
2. Add noreply@web3forms.com to contacts
3. Create filter in Gmail settings:
   - From: noreply@web3forms.com
   - Never send to Spam

### Problem 3: WhatsApp Button Not Visible
**Button doesn't appear on website**

**Solution**:
1. Check if you saved `/app/components/WhatsAppButton.tsx`
2. Restart dev server: `Ctrl+C` then `npm run dev`
3. Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
4. Check browser console for errors (F12 → Console tab)

### Problem 4: WhatsApp Opens But Wrong Number
**WhatsApp opens but shows different number**

**Solution**:
1. Check `/app/components/WhatsAppButton.tsx` line 11
2. Verify number format: `971XXXXXXXXX` (no spaces, no +)
3. Save file and refresh browser

### Problem 5: Build Errors
**Error when running `npm run build`**

**Solution**:
1. Run: `npm install`
2. Check for TypeScript errors in terminal
3. Make sure all files are saved
4. Try: `rm -rf .next` then `npm run build`

---

## 📞 Final Checklist Before Going Live

### Email System:
- [ ] Web3Forms access key is in production environment
- [ ] Email arrives to correct address
- [ ] Email format looks professional
- [ ] Order details are complete and accurate
- [ ] Test with multiple orders

### WhatsApp:
- [ ] Correct WhatsApp Business number added
- [ ] Message is professional and clear
- [ ] Button visible on all pages
- [ ] Button works on mobile and desktop
- [ ] Team ready to respond to WhatsApp messages

### Website:
- [ ] All products display correctly
- [ ] Search works
- [ ] Filters work
- [ ] Cart works
- [ ] Checkout form validates
- [ ] Order submission shows success message
- [ ] Mobile responsive
- [ ] Fast loading

---

## 🎉 Success!

When everything works:

1. **Customer adds products to cart**
2. **Customer fills contact form**
3. **Customer clicks "Submit Order Inquiry"**
4. **You receive email with order details**
5. **Customer can click WhatsApp button anytime**
6. **WhatsApp chat opens with pre-filled message**
7. **You respond and confirm order**

---

## 📝 Quick Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Open website
http://localhost:3000
```

---

## 🆘 Need Help?

If you're still having issues:

1. **Check terminal logs** - All errors appear here
2. **Check browser console** (F12 → Console)
3. **Test Web3Forms directly** on their website
4. **Try a fresh access key** from Web3Forms
5. **Restart everything**:
   ```bash
   # Stop server (Ctrl+C)
   rm -rf .next
   npm install
   npm run dev
   ```

---

**Last Updated**: December 1, 2025
**Status**: ✅ Code ready, requires configuration
**Next Step**: Add Web3Forms access key and WhatsApp number
