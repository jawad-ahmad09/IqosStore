# 🚀 IQOS Store - Complete Setup Guide (Urdu/Roman Urdu)

## ✅ Kya Kaam Ho Gaya Hai

### 1. Email System Fixed ✅
- **File Updated**: `/app/api/send-inquiry/route.ts`
- **Status**: Code ready hai, sirf access key add karni hai
- **Kaam**: Jab customer order place kare, aapko email milegi

### 2. WhatsApp Button Added ✅
- **File Created**: `/app/components/WhatsAppButton.tsx`
- **Status**: Green button bottom-right corner pe show ho raha hai
- **Kaam**: Customer click kare toh aapka WhatsApp direct khul jayega

---

## 📋 Ab Aapko Kya Karna Hai (2 Simple Steps)

### Step 1: Web3Forms Access Key Add Karein

#### A. Access Key Hasil Karein:
1. **Website kholen**: https://web3forms.com
2. **"Create New Form" pe click karein**
3. **Apni email daalen**: `iqosstoredubai@gmail.com`
4. **Access Key copy karein** (example: `abc123-def456-ghi789`)

#### B. Code Mein Add Karein:
1. **File kholen**: `/app/api/send-inquiry/route.ts`
2. **Line 49 pe jayen**
3. **Ye line dhunden**:
   ```typescript
   const accessKey = "YOUR_NEW_WEB3FORMS_ACCESS_KEY"; // Replace with your new key
   ```
4. **Apni access key se replace karein**:
   ```typescript
   const accessKey = "abc123-def456-ghi789"; // Apni actual key yahaan
   ```
5. **Save karein** (Ctrl+S ya Cmd+S)

### Step 2: WhatsApp Number Add Karein

#### A. File Kholen:
1. **File**: `/app/components/WhatsAppButton.tsx`
2. **Line 11 pe jayen**
3. **Ye line dhunden**:
   ```typescript
   const whatsappNumber = "971501234567" // Replace with your actual number
   ```

#### B. Apna Number Daalen:
```typescript
const whatsappNumber = "971XXXXXXXXX" // Apna actual WhatsApp number
```

#### ⚠️ Number Format Zaroori Hai:
- **Country code shamel karein**: `971` (UAE ke liye)
- **+ (plus) sign NAHI lagana**
- **Spaces NAHI deni**
- **Dashes NAHI dene**

**Examples**:
- ❌ Ghalat: `+971 50 123 4567`
- ❌ Ghalat: `971-50-123-4567`
- ✅ Sahi: `971501234567`

#### C. Message Customize Karein (Optional):
**Line 15 pe jayen**:
```typescript
const defaultMessage = "Hello! I'm interested in your IQOS products. Can you help me?"
```

**Apne hisaab se change karein**:
```typescript
const defaultMessage = "Assalam o Alaikum! Main IQOS products ke baare mein janna chahta hun."
```

---

## 🧪 Test Kaise Karein

### Email Test:
```bash
# Terminal mein ye command run karein
npm run dev
```

1. **Browser mein kholen**: http://localhost:3000
2. **Koi product cart mein daalen**
3. **Contact form bharen**
4. **"Submit Order Inquiry" pe click karein**
5. **Terminal mein check karein** - ye lines dikhni chahiye:
   ```
   [sendEmail] Sending order to Web3Forms...
   [Web3Forms Response] { success: true }
   [Web3Forms] ✅ Email sent successfully!
   ```
6. **Apni email check karein** (iqosstoredubai@gmail.com)
   - Inbox check karein
   - **Spam folder bhi zaroor check karein**
   - Promotions tab bhi dekhein (Gmail mein)

### WhatsApp Test:
1. **Website kholen**: http://localhost:3000
2. **Green button dikhna chahiye** (bottom-right corner)
3. **Button pe click karein**
4. **WhatsApp khulna chahiye** with:
   - Aapka number
   - Pre-filled message
5. **Message send kar ke test karein**

---

## 🎯 Email Format Jo Aapko Milegi

```
Subject: New IQOS Store Order from [Customer ka naam]

New IQOS Store Order Inquiry
================================

Customer Information:
Name: Ahmed Khan
Email: ahmed@example.com
Phone: +971501234567
Address: Al Barsha, Dubai
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

## 🚨 Agar Email Nahi Aa Rahi

### Solution 1: Web3Forms Dashboard Check Karein
1. **Website**: https://web3forms.com/access
2. **Access key daalen**
3. **Verify karein**:
   - Email address sahi hai? (iqosstoredubai@gmail.com)
   - Form "Active" hai?
   - Koi error message toh nahi?

### Solution 2: Gmail Settings
1. **Spam folder zaroor check karein**
2. **"noreply@web3forms.com" ko contacts mein add karein**
3. **Agar spam mein mili toh**:
   - "Not Spam" mark karein
   - Next time inbox mein ayegi

### Solution 3: Naya Access Key Banayein
1. Web3Forms pe naya form create karein
2. Naya access key copy karein
3. Code mein update karein
4. Phir se test karein

---

## 💬 WhatsApp Button Kaise Kaam Karta Hai

### Kya Dikhega:
```
┌─────────────────────────────────────┐
│                                     │
│         YOUR WEBSITE                │
│                                     │
│                                     │
│                          ┌────┐     │
│                          │ 💬 │     │ ← Green button
│                          │Chat│     │   (pulsing)
│                          └────┘     │
└─────────────────────────────────────┘
```

### Customer Kya Karega:
1. **Green button pe click karega**
2. **WhatsApp khul jayega** (web ya app)
3. **Aapka number automatically aa jayega**
4. **Message pehle se likha hua hoga**:
   ```
   "Hello! I'm interested in your IQOS products. Can you help me?"
   ```
5. **Customer edit kar sakta hai message**
6. **Send button dabayega**
7. **Aapko WhatsApp pe message mil jayega**

### Aapko Kya Milega:
- ✅ Customer ka message
- ✅ Customer ka WhatsApp number
- ✅ Customer ka naam/profile picture (agar hai)
- ✅ Direct chat shuru kar sakte hain

---

## 📱 WhatsApp Business Tips

### 1. Quick Response Dein:
```
Customer: "Hello! I'm interested in your IQOS products."

Aap: "Assalam o Alaikum! Thank you for contacting IQOS Store UAE.
      Aap konsa product chahte hain? Humein Terea Heats aur
      IQOS devices available hain."
```

### 2. Professional Rahein:
- Hamesha greet karein
- Clear pricing batayein
- Order confirm karein
- Delivery time batayein

### 3. WhatsApp Business App Use Karein:
- **Catalog**: Products WhatsApp mein hi dikha sakte hain
- **Quick Replies**: Common replies save karein
- **Labels**: Customers ko organize karein
- **Auto-replies**: "Thank you for message" automatic bhejen

---

## 🎉 Final Checklist (Launch Se Pehle)

### Email System:
- [ ] Web3Forms access key code mein add ki?
- [ ] `npm run dev` se test kiya?
- [ ] Order place karke email aayi?
- [ ] Email format sahi hai?
- [ ] Spam folder check kiya?

### WhatsApp:
- [ ] WhatsApp number code mein add kiya?
- [ ] Number format sahi hai? (971XXXXXXXXX)
- [ ] Green button dikhayi de rahi hai?
- [ ] Button click karke test kiya?
- [ ] WhatsApp khul raha hai?
- [ ] Sahi number aa raha hai?
- [ ] Pre-filled message aa raha hai?

### Website:
- [ ] Sab products dikh rahi hain?
- [ ] Search kaam kar raha hai?
- [ ] Filters kaam kar rahe hain?
- [ ] Cart sahi hai?
- [ ] Order submission successful hai?
- [ ] Mobile pe sahi dikh raha hai?

---

## 🔧 Commands Jo Use Karni Hain

```bash
# Development server start karein
npm run dev

# Build karein (production ke liye)
npm run build

# Production server start karein
npm run start

# Browser mein kholen
http://localhost:3000
```

---

## 📞 Agar Koi Problem Aaye

### Problem 1: Email nahi aa rahi
**Solution**: `SETUP_INSTRUCTIONS.md` file kholen, complete guide hai

### Problem 2: WhatsApp button nahi dikh raha
**Solution**:
1. File save kiya? (`Ctrl+S`)
2. Server restart kiya? (`Ctrl+C` phir `npm run dev`)
3. Browser refresh kiya? (`Ctrl+Shift+R`)

### Problem 3: Build error aa rahi hai
**Solution**:
```bash
# Ye commands run karein
npm install
rm -rf .next
npm run build
```

---

## 📚 Important Files

### Aapko Edit Karni Hain:
1. **`/app/api/send-inquiry/route.ts`** - Line 49 (Web3Forms key)
2. **`/app/components/WhatsAppButton.tsx`** - Line 11 (WhatsApp number)

### Guides Padhein:
1. **`SETUP_INSTRUCTIONS.md`** - Complete English guide
2. **`WHATSAPP_PREVIEW.md`** - WhatsApp button ki details
3. **`README_URDU.md`** - Ye file (Urdu guide)

---

## ✅ Success Kaise Pataa Chalegi?

### Email Success:
1. Customer order place kare
2. Terminal mein "✅ Email sent successfully!" dikhe
3. Aapko email mile with order details
4. Customer ko success message dikhe

### WhatsApp Success:
1. Customer green button dekhe
2. Click kare
3. WhatsApp khule
4. Aapka number aa jaye
5. Message pre-filled ho
6. Aapko notification mile

---

## 🎯 Next Steps (Priority)

### Abhi Karna Hai:
1. ✅ Web3Forms access key add karein (5 minutes)
2. ✅ WhatsApp number add karein (2 minutes)
3. ✅ Test karein (10 minutes)

### Baad Mein Karein:
1. Real product images add karein (placeholder ki jagah)
2. Domain buy karein aur setup karein
3. Google Analytics add karein
4. Social media profiles banayein

---

## 💡 Pro Tips

### Email Ke Liye:
- Gmail notifications ON rakhein
- Har order ka response zaroor dein
- Orders ka record rakhein
- Customer ko confirmation email send karein

### WhatsApp Ke Liye:
- WhatsApp Business app download karein
- Quick replies setup karein:
  - "Thank you for your order"
  - "Delivery within 2 hours"
  - "Payment methods: Cash/Transfer"
- Customer numbers save karein with names
- Regular customers ko special offers dein

---

**Status**: ✅ Code complete
**Akhri Step**: Access key aur number add karein
**Time Required**: 10-15 minutes total
**Difficulty**: Very Easy

**Questions?**
- `SETUP_INSTRUCTIONS.md` padhen (detailed English guide)
- Terminal logs check karein (errors wahan dikhte hain)
- Browser console check karein (F12 dabayen)

---

**Good Luck! 🚀**

Aapki website ready hai. Sirf 2 values add karni hain aur aap launch kar sakte hain!
