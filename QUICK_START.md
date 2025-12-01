# ⚡ Quick Start - 2 Steps Only!

## Step 1: Web3Forms Key (2 minutes)

### Get Key:
1. Go to: **https://web3forms.com**
2. Click "Create New Form"
3. Enter email: **jawadrathore30@gmail.com**
4. Copy the access key

### Add to Code:
**File**: `/app/api/send-inquiry/route.ts`
**Line**: 49

```typescript
// BEFORE:
const accessKey = "YOUR_NEW_WEB3FORMS_ACCESS_KEY";

// AFTER (with your actual key):
const accessKey = "abc123-def456-ghi789";
```

---

## Step 2: WhatsApp Number (1 minute)

**File**: `/app/components/WhatsAppButton.tsx`
**Line**: 11

```typescript
// BEFORE:
const whatsappNumber = "971501234567"

// AFTER (with YOUR number):
const whatsappNumber = "971XXXXXXXXX"
```

### ⚠️ Important:
- Include country code: **971** (UAE)
- NO plus sign (+)
- NO spaces
- NO dashes

**Example**: `971501234567` ✅

---

## Test (5 minutes)

```bash
# Start server
npm run dev

# Open browser
http://localhost:3000
```

### Test Email:
1. Add product to cart
2. Submit order
3. Check terminal for: `✅ Email sent successfully!`
4. Check your email (including spam)

### Test WhatsApp:
1. Look for green button (bottom-right)
2. Click it
3. WhatsApp should open with your number

---

## That's It! 🎉

**Total Time**: 8 minutes
**Files to Edit**: 2
**Lines to Change**: 2

### If It Works:
- ✅ Orders will email you automatically
- ✅ Customers can WhatsApp you instantly
- ✅ Website is ready to launch!

### If Issues:
- Read: `README_URDU.md` (Urdu guide)
- Read: `SETUP_INSTRUCTIONS.md` (English guide)
- Check terminal for errors

---

## Files You Have:

| File | Purpose |
|------|---------|
| `QUICK_START.md` | This file (fastest setup) |
| `README_URDU.md` | Complete Urdu guide |
| `SETUP_INSTRUCTIONS.md` | Detailed English guide |
| `WHATSAPP_PREVIEW.md` | WhatsApp button details |
| `PROJECT_SUMMARY.md` | Full project documentation |

---

**Ready to Launch!** 🚀
