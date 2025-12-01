# Email Delivery Troubleshooting Guide

## Current Status
Your order submission API is working correctly. The issue is likely with Web3Forms configuration or email delivery settings.

## Step 1: Verify Web3Forms Configuration

### Your Current Access Key
```
d09fea7a-554d-4f5f-94e8-bb4cb091d449
```

### Check Web3Forms Dashboard
1. Go to: https://web3forms.com/access
2. Enter your access key: `d09fea7a-554d-4f5f-94e8-bb4cb091d449`
3. Verify these settings:
   - **Email Address**: Should be `jawadrathore30@gmail.com`
   - **Status**: Should be "Active"
   - **Form Name**: Can be anything (e.g., "IQOS Store Orders")

## Step 2: Check Your Gmail

### Look in All Folders
1. **Inbox**: Check your main inbox
2. **Spam/Junk**: Web3Forms emails sometimes go here
3. **Promotions Tab**: If you have Gmail tabs enabled
4. **All Mail**: Search for "IQOS Store" or "Web3Forms"

### Add Web3Forms to Safe Senders
1. Open Gmail Settings (gear icon → See all settings)
2. Go to "Filters and Blocked Addresses"
3. Create a new filter:
   - From: `noreply@web3forms.com`
   - Action: "Never send it to Spam"

## Step 3: Test Order Submission

### Place a Test Order
1. Open your website: http://localhost:3000
2. Add a product to cart
3. Go to checkout/contact page
4. Fill in test information:
   ```
   Name: Test Customer
   Email: your-test-email@gmail.com
   Phone: +971501234567
   Address: Test Address
   City: Dubai
   Country: UAE
   ```
5. Submit the order

### Check Server Logs
After submitting, check your terminal/console for these logs:
```
[send-inquiry] Received form data: { name: '...', email: '...' }
[send-inquiry] Order details:
[sendEmail] Sending order to Web3Forms...
[sendEmail] Customer: Test Customer your-test-email@gmail.com
[Web3Forms Response] { success: true, message: '...' }
[Web3Forms] ✅ Email sent successfully to jawadrathore30@gmail.com
```

If you see `[Web3Forms Error]` instead, copy the error message.

## Step 4: Common Issues & Solutions

### Issue 1: Access Key Not Active
**Symptom**: Error message about invalid access key
**Solution**:
- Go to Web3Forms dashboard
- Create a new access key
- Replace in `/app/api/send-inquiry/route.ts` line 50

### Issue 2: Email Going to Spam
**Symptom**: Web3Forms says email sent, but you don't receive it
**Solution**:
- Check spam folder in Gmail
- Add noreply@web3forms.com to contacts
- Mark Web3Forms email as "Not Spam"

### Issue 3: Wrong Email Address Configured
**Symptom**: Emails going to different address
**Solution**:
- Check Web3Forms dashboard settings
- Verify email is `jawadrathore30@gmail.com`
- Update if needed and test again

### Issue 4: Web3Forms Service Down
**Symptom**: Connection timeout or 503 errors
**Solution**:
- Check https://status.web3forms.com/
- If down, orders are still logged to server console
- Process orders manually from console logs

## Step 5: Alternative Email Solution (If Web3Forms Fails)

If Web3Forms continues to fail, you can switch to Resend (recommended):

### Install Resend
```bash
npm install resend
```

### Get API Key
1. Sign up at https://resend.com
2. Get your API key
3. Verify your domain or use their test domain

### Update Code
Replace the `sendEmail` function in `/app/api/send-inquiry/route.ts`:

```typescript
import { Resend } from 'resend';

const resend = new Resend('your_resend_api_key');

async function sendEmail(data: ContactFormData) {
    const emailMessage = buildEmailText(data);

    const result = await resend.emails.send({
        from: 'IQOS Store <onboarding@resend.dev>',
        to: 'jawadrathore30@gmail.com',
        subject: `🛒 New IQOS Store Order from ${data.name}`,
        text: emailMessage,
    });

    return result;
}
```

## Step 6: Manual Order Processing

If emails still don't work, all orders are logged to server console with this format:

```
[IMPORTANT] MANUAL ORDER PROCESSING REQUIRED:
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

--------------------------------
TOTAL: AED 260.00

✓ Free delivery within UAE
✓ Authentic products guaranteed
```

You can manually process these orders from your terminal.

## Need Help?

If you're still having issues:

1. **Check Server Logs**: Run `npm run dev` and check terminal for error messages
2. **Test Web3Forms**: Try submitting directly on https://web3forms.com/
3. **Contact Support**: Email Web3Forms support with your access key
4. **Switch Services**: Consider Resend, SendGrid, or Mailgun as alternatives

## Quick Test Checklist

- [ ] Web3Forms access key is active
- [ ] Email address in dashboard is `jawadrathore30@gmail.com`
- [ ] Checked spam/junk folder in Gmail
- [ ] Added Web3Forms to safe senders
- [ ] Placed test order and checked server logs
- [ ] Verified order submission shows success message
- [ ] Checked all Gmail folders (Inbox, Spam, Promotions, All Mail)

---

**Current Implementation Status**: ✅ Code is working correctly
**Issue**: Email delivery configuration needs verification
