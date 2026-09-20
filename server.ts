import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

// Body parsing with enlarged limit for image uploads (base64)
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded image files explicitly
app.get("/uploads/:filename", (req, res) => {
  const filename = path.basename(req.params.filename);
  const filePath = path.join(uploadsDir, filename);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    // Fallback to default product image if requested uploaded file is missing
    const defaultFallback = path.join(process.cwd(), "public", "cathy_doll_cushion.jpg");
    if (fs.existsSync(defaultFallback)) {
      res.sendFile(defaultFallback);
    } else {
      res.status(404).send("Image not found");
    }
  }
});

app.use("/uploads", express.static(uploadsDir));

// Store DB File path
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const dbPath = path.join(dataDir, "store.json");

// Initial Seed Data
const initialStoreData = {
  products: [
    {
      id: "cathy-doll-white-cushion-face-wash",
      name: "White Cushion Facial Foam Cleanser 120ml Cathy Doll Face Wash (Made In Korea)",
      brand: "Cathy Doll",
      shortDescription: "Gentle cushion foam face wash with Snail Mucin & Berry Extracts for deep cleansing, radiance & dark spot reduction.",
      description: "Experience Korean skincare excellence with Cathy Doll White Cushion Facial Foam Cleanser (120ml). Formulated with dense, plush cushion foam, this gentle facial cleanser penetrates deep into pores to lift away stubborn makeup, dirt, excess sebum, and daily urban pollutants without stripping your skin's natural moisture barrier. Enriched with Snail Mucin, Raspberry, Blueberry, and Redcurrant extracts, it actively brightens dull skin tones, fades dark spots, and restores a youthful, glowing complexion.",
      price: 790,
      originalPrice: 990,
      stockQuantity: 45,
      productStatus: "Active",
      rating: 4.9,
      reviewCount: 218,
      category: "Face Wash",
      image: "/cathy_doll_cushion.jpg",
      gallery: ["/cathy_doll_cushion.jpg", "/cathy_doll_foam.jpg"],
      isBestSeller: true,
      isNew: true,
      stockStatus: "In Stock",
      benefits: [
        "Deeply removes makeup, impurities & daily urban pollutants",
        "Infused with Snail Mucin & Antioxidant Berry Complex",
        "Cleanses & revives dull skin for a radiant, glowing finish",
        "Dullness & dark spot reduction with gentle non-drying cushion foam",
        "100% Genuine formulation — Made In Korea"
      ],
      howToUse: "Squeeze an appropriate amount (about 1-2 cm) onto wet palms. Work into a rich, dense cushion lather with a little water. Gently massage over face in circular motions for 30-60 seconds. Rinse thoroughly with lukewarm water.",
      ingredients: "Water, Myristic Acid, Glycerin, Potassium Hydroxide, Lauric Acid, Stearic Acid, Snail Secretion Filtrate, Rubus Idaeus (Raspberry) Fruit Extract, Vaccinium Angustifolium (Blueberry) Fruit Extract, Ribes Rubrum (Redcurrant) Fruit Extract, Niacinamide, Collagen Extract, Fragrance.",
      skinType: ["All Skin Types", "Dull Skin", "Oily", "Combination", "Sensitive"],
      volume: "120ml / 4.23 fl. oz."
    }
  ],
  orders: [
    {
      id: "ORD-8921",
      date: new Date(Date.now() - 3600000 * 5).toISOString(),
      items: [
        {
          product: {
            id: "cathy-doll-white-cushion-face-wash",
            name: "White Cushion Facial Foam Cleanser 120ml Cathy Doll Face Wash (Made In Korea)",
            price: 790,
            image: "/cathy_doll_cushion.jpg",
            category: "Face Wash",
            brand: "Cathy Doll"
          },
          quantity: 2
        }
      ],
      shippingAddress: {
        fullName: "Nusrat Jahan",
        phone: "01712345678",
        email: "nusrat.jahan@gmail.com",
        division: "Dhaka",
        district: "Dhaka",
        thanaArea: "Gulshan-2",
        fullAddress: "House 45, Road 11, Block D, Gulshan-2, Dhaka",
        notes: "Please call before delivery"
      },
      subtotal: 1580,
      shippingFee: 60,
      discount: 100,
      total: 1540,
      paymentMethod: "bkash",
      paymentStatus: "Paid",
      orderStatus: "Confirmed",
      estimatedDelivery: "2-3 Days",
      trxId: "8B73K9LM2"
    },
    {
      id: "ORD-8920",
      date: new Date(Date.now() - 3600000 * 28).toISOString(),
      items: [
        {
          product: {
            id: "cathy-doll-white-cushion-face-wash",
            name: "White Cushion Facial Foam Cleanser 120ml Cathy Doll Face Wash (Made In Korea)",
            price: 790,
            image: "/cathy_doll_cushion.jpg",
            category: "Face Wash",
            brand: "Cathy Doll"
          },
          quantity: 1
        }
      ],
      shippingAddress: {
        fullName: "Tanvir Hasan",
        phone: "01898765432",
        email: "tanvir.h@yahoo.com",
        division: "Chittagong",
        district: "Chittagong",
        thanaArea: "Agrabad",
        fullAddress: "Lane 3, House 12, Agrabad C/A, Chittagong",
        notes: ""
      },
      subtotal: 790,
      shippingFee: 120,
      discount: 0,
      total: 910,
      paymentMethod: "cod",
      paymentStatus: "Cash on Delivery",
      orderStatus: "Pending",
      estimatedDelivery: "3-5 Days"
    }
  ],
  customers: [
    {
      id: "CUST-101",
      fullName: "Nusrat Jahan",
      email: "nusrat.jahan@gmail.com",
      phone: "01712345678",
      address: "House 45, Road 11, Gulshan-2, Dhaka",
      totalOrders: 1,
      totalSpent: 1540,
      lastOrderDate: new Date(Date.now() - 3600000 * 5).toISOString()
    },
    {
      id: "CUST-102",
      fullName: "Tanvir Hasan",
      email: "tanvir.h@yahoo.com",
      phone: "01898765432",
      address: "Lane 3, Agrabad C/A, Chittagong",
      totalOrders: 1,
      totalSpent: 910,
      lastOrderDate: new Date(Date.now() - 3600000 * 28).toISOString()
    }
  ],
  coupons: [
    {
      id: "CPN-1",
      code: "KBEAUTY10",
      discountType: "percentage",
      discountValue: 10,
      minPurchase: 1000,
      usageCount: 14,
      usageLimit: 100,
      expiryDate: "2026-12-31",
      isActive: true
    },
    {
      id: "CPN-2",
      code: "ZED100",
      discountType: "fixed",
      discountValue: 100,
      minPurchase: 700,
      usageCount: 22,
      usageLimit: 200,
      expiryDate: "2026-12-31",
      isActive: true
    }
  ],
  settings: {
    storeName: "ZEDBEAUTY",
    announcementText: "✨ 100% Original Korean Skincare — Fast Shipping Across Bangladesh | Free Shipping Over ৳ 1,500!",
    supportPhone: "+880 1814-024099",
    supportEmail: "support@zedbeauty.com.bd",
    address: "House 8/1, Road 2, Block D, Nazira Bazar, Dhaka-1100, Bangladesh",
    insideDhakaFee: 60,
    outsideDhakaFee: 120,
    freeShippingThreshold: 1500
  },
  adminCredentials: {
    email: process.env.ADMIN_EMAIL || "admin@zedbeauty.com",
    password: process.env.ADMIN_PASSWORD || "admin123password"
  }
};

// Read store DB
function getDB() {
  try {
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, JSON.stringify(initialStoreData, null, 2), "utf-8");
      return initialStoreData;
    }
    const raw = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading database file, resetting to initial store:", err);
    return initialStoreData;
  }
}

// Save store DB
function saveDB(data: any) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving database file:", err);
  }
}

// Active session tokens
const activeAdminTokens = new Set<string>();

// Middleware to verify Admin Token
function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Admin login required" });
  }
  const token = authHeader.split(" ")[1];
  if (!activeAdminTokens.has(token)) {
    return res.status(403).json({ error: "Forbidden: Invalid or expired admin token" });
  }
  next();
}

// ------------------- API ROUTES -------------------

// 1. Admin Authentication
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;
  const db = getDB();
  const adminEmail = db.adminCredentials?.email || process.env.ADMIN_EMAIL || "admin@zedbeauty.com";
  const adminPassword = db.adminCredentials?.password || process.env.ADMIN_PASSWORD || "admin123password";

  if (email === adminEmail && password === adminPassword) {
    const token = "zed_admin_token_" + Date.now() + "_" + Math.random().toString(36).substring(2);
    activeAdminTokens.add(token);
    return res.json({
      success: true,
      token,
      user: {
        email: adminEmail,
        name: "ZEDBEAUTY Admin",
        role: "Super Admin"
      }
    });
  } else {
    return res.status(401).json({ error: "Invalid admin email or password" });
  }
});

app.get("/api/admin/verify", requireAdmin, (req, res) => {
  const db = getDB();
  res.json({
    valid: true,
    user: {
      email: db.adminCredentials?.email || "admin@zedbeauty.com",
      name: "ZEDBEAUTY Admin",
      role: "Super Admin"
    }
  });
});

app.put("/api/admin/credentials", requireAdmin, (req, res) => {
  const { newEmail, newPassword } = req.body;
  const db = getDB();
  if (newEmail) db.adminCredentials.email = newEmail;
  if (newPassword) db.adminCredentials.password = newPassword;
  saveDB(db);
  res.json({ success: true, message: "Admin credentials updated successfully" });
});

// 2. Products API
app.get("/api/products", (req, res) => {
  const db = getDB();
  res.json(db.products || []);
});

app.post("/api/products", requireAdmin, (req, res) => {
  const db = getDB();
  const newProduct = {
    id: "prod-" + Date.now(),
    name: req.body.name || "New Product",
    brand: req.body.brand || "ZEDBEAUTY",
    shortDescription: req.body.shortDescription || "",
    description: req.body.description || "",
    price: Number(req.body.price) || 0,
    originalPrice: Number(req.body.originalPrice) || Number(req.body.price) || 0,
    stockQuantity: Number(req.body.stockQuantity) || 50,
    productStatus: req.body.productStatus || "Active",
    rating: req.body.rating || 5.0,
    reviewCount: req.body.reviewCount || 0,
    category: req.body.category || "Skincare",
    image: req.body.image || "/cathy_doll_cushion.jpg",
    gallery: req.body.gallery || [req.body.image || "/cathy_doll_cushion.jpg"],
    isBestSeller: Boolean(req.body.isBestSeller),
    isNew: Boolean(req.body.isNew),
    stockStatus: req.body.stockQuantity > 0 ? (req.body.stockQuantity < 10 ? "Low Stock" : "In Stock") : "Out of Stock",
    benefits: req.body.benefits || [],
    howToUse: req.body.howToUse || "",
    ingredients: req.body.ingredients || "",
    skinType: req.body.skinType || ["All Skin Types"],
    volume: req.body.volume || "120ml"
  };

  db.products.unshift(newProduct);
  saveDB(db);
  res.json({ success: true, product: newProduct });
});

app.put("/api/products/:id", requireAdmin, (req, res) => {
  const { id } = req.params;
  const db = getDB();
  const idx = db.products.findIndex((p: any) => p.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  const updatedProduct = {
    ...db.products[idx],
    ...req.body,
    price: Number(req.body.price ?? db.products[idx].price),
    originalPrice: Number(req.body.originalPrice ?? db.products[idx].originalPrice),
    stockQuantity: Number(req.body.stockQuantity ?? db.products[idx].stockQuantity),
    stockStatus: Number(req.body.stockQuantity ?? db.products[idx].stockQuantity) > 0 ? (Number(req.body.stockQuantity ?? db.products[idx].stockQuantity) < 10 ? "Low Stock" : "In Stock") : "Out of Stock"
  };

  db.products[idx] = updatedProduct;
  saveDB(db);
  res.json({ success: true, product: updatedProduct });
});

app.delete("/api/products/:id", requireAdmin, (req, res) => {
  const { id } = req.params;
  const db = getDB();
  db.products = db.products.filter((p: any) => p.id !== id);
  saveDB(db);
  res.json({ success: true, message: "Product deleted successfully" });
});

// 3. Image Upload Endpoint
app.post("/api/upload", requireAdmin, (req, res) => {
  try {
    const { imageBase64 } = req.body;
    if (!imageBase64 || typeof imageBase64 !== "string") {
      return res.status(400).json({ error: "Image data is required" });
    }

    const matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      if (imageBase64.startsWith("http") || imageBase64.startsWith("/")) {
        return res.json({ success: true, url: imageBase64 });
      }
      return res.status(400).json({ error: "Invalid base64 image string" });
    }

    const mimeType = matches[1].toLowerCase();
    const mimeMap: Record<string, string> = {
      "image/jpeg": "jpg",
      "image/jpg": "jpg",
      "image/png": "png",
      "image/webp": "webp"
    };

    const ext = mimeMap[mimeType];
    if (!ext) {
      return res.status(400).json({ error: "Unsupported image format. Only JPG, JPEG, PNG, and WEBP formats are allowed." });
    }

    const buffer = Buffer.from(matches[2], "base64");
    if (buffer.length > 10 * 1024 * 1024) {
      return res.status(400).json({ error: "Image file size exceeds 10MB limit." });
    }

    const safeName = `product_${Date.now()}_${Math.floor(Math.random() * 1000)}.${ext}`;
    const filePath = path.join(uploadsDir, safeName);

    fs.writeFileSync(filePath, buffer);
    const publicUrl = `/uploads/${safeName}`;

    res.json({ success: true, url: publicUrl });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

// 4. Orders API
app.get("/api/orders", requireAdmin, (req, res) => {
  const db = getDB();
  res.json(db.orders || []);
});

app.post("/api/orders", (req, res) => {
  const db = getDB();
  const { items, shippingAddress, subtotal, shippingFee, discount, total, paymentMethod, trxId } = req.body;

  const newOrder = {
    id: "ORD-" + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString(),
    items: items || [],
    shippingAddress: shippingAddress || {},
    subtotal: Number(subtotal) || 0,
    shippingFee: Number(shippingFee) || 0,
    discount: Number(discount) || 0,
    total: Number(total) || 0,
    paymentMethod: paymentMethod || "cod",
    paymentStatus: paymentMethod === "cod" ? "Cash on Delivery" : "Paid",
    orderStatus: "Pending",
    estimatedDelivery: shippingAddress?.district?.toLowerCase() === "dhaka" ? "1-2 Days" : "3-5 Days",
    trxId: trxId || ""
  };

  db.orders.unshift(newOrder);

  // Update customer record
  if (shippingAddress?.email || shippingAddress?.phone) {
    const existingCustIdx = db.customers.findIndex(
      (c: any) => c.phone === shippingAddress.phone || (shippingAddress.email && c.email === shippingAddress.email)
    );

    if (existingCustIdx >= 0) {
      db.customers[existingCustIdx].totalOrders += 1;
      db.customers[existingCustIdx].totalSpent += newOrder.total;
      db.customers[existingCustIdx].lastOrderDate = newOrder.date;
      db.customers[existingCustIdx].address = shippingAddress.fullAddress;
    } else {
      db.customers.unshift({
        id: "CUST-" + (100 + db.customers.length + 1),
        fullName: shippingAddress.fullName || "Customer",
        email: shippingAddress.email || "",
        phone: shippingAddress.phone || "",
        address: shippingAddress.fullAddress || "",
        totalOrders: 1,
        totalSpent: newOrder.total,
        lastOrderDate: newOrder.date
      });
    }
  }

  // Deduct stock
  if (Array.isArray(items)) {
    items.forEach((item: any) => {
      const pIdx = db.products.findIndex((p: any) => p.id === item.product?.id);
      if (pIdx >= 0) {
        const currentQty = db.products[pIdx].stockQuantity || 50;
        const newQty = Math.max(0, currentQty - (item.quantity || 1));
        db.products[pIdx].stockQuantity = newQty;
        db.products[pIdx].stockStatus = newQty > 0 ? (newQty < 10 ? "Low Stock" : "In Stock") : "Out of Stock";
      }
    });
  }

  saveDB(db);
  res.json({ success: true, order: newOrder });
});

app.put("/api/orders/:id/status", requireAdmin, (req, res) => {
  const { id } = req.params;
  const { orderStatus } = req.body;
  const db = getDB();

  const idx = db.orders.findIndex((o: any) => o.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: "Order not found" });
  }

  db.orders[idx].orderStatus = orderStatus;
  if (orderStatus === "Delivered" && db.orders[idx].paymentMethod === "cod") {
    db.orders[idx].paymentStatus = "Paid";
  }

  saveDB(db);
  res.json({ success: true, order: db.orders[idx] });
});

// 5. Customers API
app.get("/api/customers", requireAdmin, (req, res) => {
  const db = getDB();
  res.json(db.customers || []);
});

// 6. Coupons API
app.get("/api/coupons", (req, res) => {
  const db = getDB();
  res.json(db.coupons || []);
});

app.post("/api/coupons", requireAdmin, (req, res) => {
  const db = getDB();
  const newCoupon = {
    id: "CPN-" + Date.now(),
    code: (req.body.code || "").toUpperCase().trim(),
    discountType: req.body.discountType || "percentage",
    discountValue: Number(req.body.discountValue) || 0,
    minPurchase: Number(req.body.minPurchase) || 0,
    usageCount: 0,
    usageLimit: req.body.usageLimit ? Number(req.body.usageLimit) : undefined,
    expiryDate: req.body.expiryDate || "2026-12-31",
    isActive: req.body.isActive !== false
  };

  db.coupons.unshift(newCoupon);
  saveDB(db);
  res.json({ success: true, coupon: newCoupon });
});

app.delete("/api/coupons/:id", requireAdmin, (req, res) => {
  const { id } = req.params;
  const db = getDB();
  db.coupons = db.coupons.filter((c: any) => c.id !== id);
  saveDB(db);
  res.json({ success: true, message: "Coupon deleted" });
});

app.post("/api/coupons/validate", (req, res) => {
  const { code, subtotal } = req.body;
  const db = getDB();
  const coupon = db.coupons.find((c: any) => c.code.toUpperCase() === (code || "").toUpperCase() && c.isActive);

  if (!coupon) {
    return res.status(400).json({ error: "Invalid or inactive promo coupon code" });
  }

  if (coupon.minPurchase && Number(subtotal) < coupon.minPurchase) {
    return res.status(400).json({ error: `Minimum order amount for code ${coupon.code} is ৳ ${coupon.minPurchase}` });
  }

  let discountAmount = 0;
  if (coupon.discountType === "percentage") {
    discountAmount = Math.round((Number(subtotal) * coupon.discountValue) / 100);
  } else {
    discountAmount = coupon.discountValue;
  }

  res.json({
    valid: true,
    code: coupon.code,
    discountAmount,
    coupon
  });
});

// 7. Site Settings API
app.get("/api/settings", (req, res) => {
  const db = getDB();
  res.json(db.settings);
});

app.put("/api/settings", requireAdmin, (req, res) => {
  const db = getDB();
  db.settings = {
    ...db.settings,
    ...req.body
  };
  saveDB(db);
  res.json({ success: true, settings: db.settings });
});

// 8. Analytics API
app.get("/api/analytics", requireAdmin, (req, res) => {
  const db = getDB();
  const orders = db.orders || [];

  const totalRevenue = orders.reduce((sum: number, o: any) => (o.orderStatus !== "Cancelled" ? sum + o.total : sum), 0);
  const totalOrders = orders.length;
  const pendingOrdersCount = orders.filter((o: any) => o.orderStatus === "Pending").length;
  const deliveredOrdersCount = orders.filter((o: any) => o.orderStatus === "Delivered").length;
  const totalCustomers = (db.customers || []).length;

  res.json({
    totalRevenue,
    totalOrders,
    pendingOrdersCount,
    deliveredOrdersCount,
    totalCustomers,
    orders
  });
});

// Vite Middleware Integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
