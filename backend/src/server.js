import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("======================================");
  console.log("🚀 TT AI Chat Backend Started");
  console.log(`🌐 Server : http://localhost:${PORT}`);
  console.log(`❤️ Health : http://localhost:${PORT}/api/health`);
  console.log("======================================");
});