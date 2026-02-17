const express = require("express");
const SawitDB = require("@wowoengine/sawitdb");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

const db = new SawitDB("data.sawit");

// Setup tabel jika belum ada
async function setup() {
  try {
    await db.query("BUAT LAHAN users (id, nama, umur)");
    console.log("Tabel users dibuat");
  } catch (e) {
    console.log("Tabel sudah ada, lanjut...");
  }
}

setup();

// HALAMAN UTAMA
app.get("/", async (req, res) => {
  let result = await db.query("PANEN * DARI users");

  // Pastikan hasilnya array
  let users = [];

  if (Array.isArray(result)) {
    users = result;
  } else if (result && Array.isArray(result.data)) {
    users = result.data;
  }

  let html = `
    <h1>Mini SawitDB App 🌾</h1>

    <form method="POST" action="/tambah">
        <input type="number" name="id" placeholder="ID" required>
        <input type="text" name="nama" placeholder="Nama" required>
        <input type="number" name="umur" placeholder="Umur" required>
        <button type="submit">Tambah</button>
    </form>

    <hr>
    <h2>Data Users</h2>
    <ul>
    `;

  users.forEach((user) => {
    html += `<li>
            ${user.id} - ${user.nama} (${user.umur} tahun)
            <a href="/hapus/${user.id}">❌ Hapus</a>
        </li>`;
  });

  html += "</ul>";

  res.send(html);
});

// TAMBAH DATA
app.post("/tambah", async (req, res) => {
  const { id, nama, umur } = req.body;

  await db.query(`TANAM KE users (${id}, '${nama}', ${umur})`);

  res.redirect("/");
});

// HAPUS DATA
app.get("/hapus/:id", async (req, res) => {
  const id = req.params.id;

  await db.query(`TEBANG DARI users DIMANA id = ${id}`);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server jalan di http://localhost:${port}`);
});
