# 🚀 DEPLOYMENT GUIDE – Flexfolio Portfolio Template

This guide will walk you through how to **deploy your portfolio website** using Vercel, **customize it visually**, and **upload your images securely** — all without needing to write any code.

---

## 🧾 What You’ll Need

- A free [Vercel](https://vercel.com/signup) account (for hosting)
- A free [Resend](https://resend.com/signup) account (to receive contact form messages)

---

## ✅ STEP 1 – Deploy the Template

Click this button to instantly clone and deploy your portfolio:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/valeriomarcelli/flexfolio)

This will:

1. Create a copy of the template on Vercel (no GitHub needed)
2. Ask you to **add environment variables** (next step)
3. Deploy your site live in about 1–2 minutes

---

## 🔒 STEP 2 – Add Environment Variables

You will be prompted to set up several variables before deployment.

Here’s what to add and where to get each value:

---

### 🔑 `RESEND_API_KEY`

**Used for:** Sending messages from the contact form.

**How to get it:**

1. Log into [resend.com](https://resend.com)
2. Go to **Dashboard → API Keys**
3. Click **"Create API Key"**, then copy it
4. Paste it into Vercel under the name `RESEND_API_KEY`

---

### 🧠 `EDGE_ID`, `EDGE_TOKEN`, and `EDGE_CONFIG`

**Used for:** Storing and retrieving your portfolio content in the cloud.

**How to create them:**

1. After deploying, open your project in the [Vercel Dashboard](https://vercel.com/dashboard)
2. Go to the left menu → **Edge Config**
3. Click **"Create Edge Config"**, name it (e.g., `site-content`)
4. After it’s created:
   - Copy the **ID** → use it for `EDGE_ID`
   - Click **"Create Token"** → use it for `EDGE_TOKEN`
   - Copy the **"Read URL with Token"** → use it for `EDGE_CONFIG`

---

### 🔐 `VERCEL_API_TOKEN`

**Used for:** Updating your content from the customization panel.

**How to get it:**

1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click **"Create Token"**, name it `Flexfolio`
3. Copy the token → use it for `VERCEL_API_TOKEN`

---

### 🌍 `NEXT_PUBLIC_SITE_URL`

**Used for:** Telling your site where it is hosted.

After deploying, use your actual site URL, like:

https://your-site-name.vercel.app


Use this value for `NEXT_PUBLIC_SITE_URL`.

---

## 🛠 STEP 3 – Customize Your Website

Once deployed, go to:

https://your-site.vercel.app/customization


From this live panel, you can:

- Edit your name, tagline, and bio
- Add project cards with images and links
- Change the theme and site SEO
- Update your contact email
- Upload your own **profile photo and project thumbnails**

> All changes are saved instantly and applied live — no need to publish or redeploy.

---

## 🖼️ Image Uploads (Blob Support)

The customization panel supports **image upload** via drag & drop or file selection.

You can upload:

- Your **profile photo** (JPEG/PNG)
- **Project images** or thumbnails

These are stored as **temporary blobs** using Vercel’s internal storage, and linked automatically inside your site.

> You do not need to use external URLs or image hosting — just upload and save!

---

## ✉️ STEP 4 – Test the Contact Form

After setting your contact email and `RESEND_API_KEY`, test the form:

1. Go to the **Contact** section of your live site
2. Fill in the form and click "Send"
3. You should receive the email in your inbox

If it doesn’t work, double-check your Resend key and that your account is verified.

---

## 🌐 Optional – Add a Custom Domain

Want to use your own domain like `yourname.com`?

1. Go to your Vercel dashboard
2. Click on your project → **Settings → Domains**
3. Follow the instructions to connect your domain

---

## ✅ You're Done!

Congratulations — your portfolio is live, editable, and connected to email.

You can:

- Share your site immediately
- Update content anytime at `/customization`
- Replace images with your own in seconds

If you need help, revisit this guide or reach out through the support channel provided.

---
