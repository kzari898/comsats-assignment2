async function test() {
  try {
    const res = await fetch("http://localhost:3000/api/books?page=1&limit=1");
    const text = await res.text();
    console.log("STATUS:", res.status);
    console.log("RESPONSE:", text);
  } catch(e) {
    console.log("ERR:", e);
  }
}
test();
