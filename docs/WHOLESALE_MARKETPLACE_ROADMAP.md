# Wholesale Clothing Marketplace Roadmap (Termux Stack)

## 🎯 Project Goal
Build a clothing wholesale e-commerce platform using **Termux + Node.js + MariaDB + EJS + Bootstrap 5** with:

- Admin panel with full controls (seller approvals, GST/HSN, discounts, settings)
- Seller panel with GST-verified onboarding and variant-based product management
- Customer panel with OTP verification, browsing filters, MOQ-based ordering, checkout, and returns
- Advanced wholesale-focused features (variant matrix, tier discounts, PWA, reports)

---

## ⚙️ Prerequisites (Termux Setup)

```bash
pkg update && pkg upgrade -y
pkg install nodejs git mariadb -y
npm install -g nodemon
```

Initialize MariaDB:

```bash
mysql_install_db
mysqld_safe &
mysql -u root
```

Create database and app user:

```sql
CREATE DATABASE clothing_wholesale;
CREATE USER 'wh_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON clothing_wholesale.* TO 'wh_user'@'localhost';
FLUSH PRIVILEGES;
```

---

## 🧱 PHASE 0 — Project Initialization

### Deliverables
- Initialize Node project and install core dependencies
- Create production-ready folder structure
- Configure `.env`
- Create base `server.js` with EJS layout support and DB connectivity

### Suggested dependencies

```bash
npm init -y
npm i express ejs ejs-mate mysql2 dotenv express-session connect-mysql2 jsonwebtoken bcryptjs multer sharp nodemailer twilio express-validator helmet cors compression cookie-parser method-override
npm i node-cron winston json2csv csv-parse
npm i -D nodemon
```

### Suggested structure

```text
src/
  config/
  models/
  controllers/
  routes/
  middlewares/
  services/
  workers/
  utils/
views/
public/
uploads/
```

### Checkpoint
- Server running at `http://localhost:3000`
- DB connection successful

---

## 🧑‍💻 PHASE 1 — Authentication (Customer/Seller/Admin)

### Scope
- Customer signup/login with **email OTP + phone OTP** (both required)
- Seller registration with GST regex validation and document uploads
- Admin seeded/hardcoded initially
- JWT-based login + role middleware

### Core tables
- `users` (role: customer/seller/admin)
- `seller_details` (GST, docs, approval status)
- `otp_verifications` (channel, code hash, expires_at, verified)

### APIs/Routes
- `POST /auth/register/customer`
- `POST /auth/register/seller`
- `POST /auth/verify-email-otp`
- `POST /auth/verify-phone-otp`
- `POST /auth/login`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`

### Checkpoint
- Customer can register, verify both OTPs, and login
- Seller remains blocked until admin approval

---

## 🛡️ PHASE 2 — Admin Panel Core

### Scope
- Dashboard with KPI counts
- Seller approval/rejection workflow
- HSN/GST management
- Global settings (default MOQ, default GST)

### Core tables
- `hsn_codes`
- `site_settings`

### Key routes
- `GET /admin/dashboard`
- `GET /admin/sellers`, `POST /admin/sellers/:id/approve`, `POST /admin/sellers/:id/reject`
- `GET/POST /admin/hsn`
- `GET/POST /admin/settings`

### Checkpoint
- Admin can approve sellers and configure HSN + MOQ

---

## 👕 PHASE 3 — Seller Product Variant Engine

### Scope
- Product creation with attributes (fabric, fit, category, gender, brand)
- HSN selection and GST include/exclude option
- Per-product MOQ with global fallback
- Dynamic size × color matrix with per-variant SKU/stock/price/images
- Image compression with `sharp`
- Product approval state: pending

### Core tables
- `products`
- `product_variants`
- `product_variant_images`
- `size_charts`

### Checkpoint
- Seller can add variant-rich products; admin sees pending queue

---

## 🛍️ PHASE 4 — Customer Browsing & Filters

### Scope
- Home with featured categories/products
- Filters: category, gender, size, color, brand, fabric, price, discount
- Product detail with variant selector, zoom, size chart, MOQ messaging
- Recently viewed via cookie

### Key routes
- `GET /products` (query-based filters + pagination)
- `GET /product/:slug`

### Checkpoint
- Customers can discover and inspect variant-level product data

---

## 🛒 PHASE 5 — Cart, Discounts, Checkout

### Scope
- Cart stores `variant_id + qty`
- MOQ enforcement when add/update cart
- Tiered bulk discounts (auto best-match)
- Coupon system (flat/percent, min amount, max cap, category scope)
- Server-side checkout totals and GST breakup
- Stock deduction and order placement

### Core tables
- `carts`, `cart_items`
- `bulk_discount_tiers`
- `coupons`, `coupon_redemptions`
- `orders`, `order_items`, `order_status_logs`

### Checkpoint
- Correct price pipeline: base → GST → tier discount → coupon

---

## 📦 PHASE 6 — Orders, Fulfillment & Returns

### Scope
- Customer order history/details, cancel (pending only), return requests
- Seller fulfillment state updates (confirmed/shipped/delivered)
- Admin global order visibility and override controls
- GST invoice rendering in printable EJS format

### Core tables
- `returns`
- `return_items`

### Checkpoint
- End-to-end order lifecycle works with return workflow

---

## 📊 PHASE 7 — Advanced Admin Features

### Scope
- Chart.js-powered dashboard analytics
- Product approval center
- Discount/coupon CRUD
- Returns overview + manual refund tracking
- CSV reports (sales, seller revenue)
- Abandoned cart recovery worker (`node-cron`)
- Admin activity logging (`winston`)

### Checkpoint
- Full operational admin controls + reporting

---

## 🔐 PHASE 8 — Security, Performance, PWA

### Scope
- `helmet`, `cors`, auth route rate limit
- Input validation + sanitization
- Compression + lazy-loaded images
- PWA setup (`manifest.json`, service worker, install prompt)

### Checkpoint
- Mobile-installable, secure, and performant app

---

## 🧪 PHASE 9 — QA & Launch

### Scope
- Functional test of auth, product, cart, checkout, order, return flows
- External access via ngrok/Cloudflare tunnel
- Seed dataset for demo/staging

### Launch checklist
- Environment variables verified
- DB migrations/seeds successful
- Backups enabled for MariaDB
- Logs monitored and alert strategy defined

---

## Suggested Milestones (Time-boxed)

1. **Week 1:** Phases 0–1
2. **Week 2:** Phases 2–3
3. **Week 3:** Phases 4–5
4. **Week 4:** Phases 6–7
5. **Week 5:** Phases 8–9 + bug fixing + launch prep

This plan keeps the marketplace implementation incremental while ensuring wholesale-specific logic (MOQ, variants, GST, bulk discounts) is designed from the start.
