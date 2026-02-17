const SawitDB = require("@wowoengine/sawitdb");

async function main() {
  const db = new SawitDB("data.sawit");

  await db.query("BUAT LAHAN users (id, nama, umur)");

  await db.query("TANAM KE users (1, 'Ayu', 17)");
  await db.query("TANAM KE users (2, 'Budi', 20)");

  console.log("Data berhasil ditanam!");
}

main();
