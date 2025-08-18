// const express = require('express');
// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const PORT = process.env.PORT || 3000;

// /* ===== Middleware ===== */
// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public'))); // frontend
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // serve images

// /* ===== Multer Setup ===== */
// const ALLOWED_MIMES = new Set([
//   'image/png', 'image/jpeg', 'image/jpg',
//   'image/webp', 'image/gif', 'image/svg+xml'
// ]);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, 'uploads'));
//   },
//   filename: (req, file, cb) => {
//     // unique, safe filenames
//     const safeName = file.originalname.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '');
//     cb(null, Date.now() + '-' + safeName);
//   }
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//   fileFilter: (req, file, cb) => {
//     if (ALLOWED_MIMES.has(file.mimetype)) cb(null, true);
//     else cb(new Error('Invalid file type'));
//   }
// });

// /* ===== Routes ===== */

// // Chat reply (dummy example)
// app.post('/chat', (req, res) => {
//   const { message } = req.body;
//   if (!message) return res.status(400).json({ error: 'Message required' });

//   console.log(`💬 User: ${message}`);
//   // Simulate reply
//   res.json({ reply: `Echo: ${message}` });
// });

// // Upload image
// app.post('/upload', upload.single('image'), (req, res) => {
//   if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

//   const fileUrl = `/uploads/${req.file.filename}`;
//   console.log(`📷 Uploaded: ${req.file.originalname} -> ${req.file.filename}`);
//   res.json({ imageUrl: fileUrl });
// });

// // Delete image
// app.delete('/uploads/:filename', (req, res) => {
//   const filepath = path.join(__dirname, 'uploads', req.params.filename);

//   fs.unlink(filepath, err => {
//     if (err) {
//       console.error(`❌ Delete failed: ${err.message}`);
//       return res.status(500).json({ error: 'Failed to delete file' });
//     }
//     console.log(`🗑️ Deleted: ${req.params.filename}`);
//     res.json({ success: true });
//   });
// });

// /* ===== Error Handler ===== */
// app.use((err, req, res, next) => {
//   if (err instanceof multer.MulterError) {
//     return res.status(400).json({ error: err.message });
//   }
//   if (err) {
//     console.error(`⚠️ ${err.message}`);
//     return res.status(500).json({ error: err.message });
//   }
//   next();
// });

// /* ===== Start Server ===== */
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });



// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fetch = require('node-fetch'); // works with node-fetch@2
  // ✅ correct import for fetch (Node <18)

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(".")); // serve index.html and assets

// === Config ===
let LMSTUDIO_API_URL = "http://172.19.21.241:1234/v1/chat/completions";
const MODEL_NAME = "phi-3.5-mini-instruct";

// Serve UI
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// API to update LM Studio URL without restarting
app.post("/set_api", (req, res) => {
    if (req.body.url) {
        LMSTUDIO_API_URL = req.body.url;
        console.log(`✅ LMSTUDIO_API_URL updated to: ${LMSTUDIO_API_URL}`);
        res.json({ status: "ok", url: LMSTUDIO_API_URL });
    } else {
        res.status(400).json({ error: "No URL provided" });
    }
});

// Chat endpoint — the UI expects { reply: "..." }
app.post("/chat", async (req, res) => {
    const { message, temperature = 0.7, max_tokens = 200 } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    const payload = {
        model: MODEL_NAME,
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: message }
        ],
        temperature,
        max_tokens
    };

    try {
        const response = await fetch(LMSTUDIO_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`LM Studio API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content?.trim();

        if (!reply) {
            return res.status(500).json({ error: "Empty reply from model" });
        }

        res.json({ reply });
    } catch (error) {
        console.error("❌ Chat API error:", error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
