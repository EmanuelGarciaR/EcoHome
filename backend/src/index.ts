import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables — supports both .env and .env.local
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

dotenv.config({ path: path.join(rootDir, ".env.local") });
dotenv.config({ path: path.join(rootDir, ".env") });

// Now import everything else (env validation runs on import)
const { env } = await import("./lib/env.js");
const { default: app } = await import("./app.js");

const port = env.PORT;

app.listen(port, () => {
  console.log(`🏠 EcoHome backend running on http://localhost:${port}`);
  console.log(`   Health:  http://localhost:${port}/api/health`);
  console.log(`   Auth:    http://localhost:${port}/api/auth/ok`);
  console.log(`   API v1:  http://localhost:${port}/api/v1`);
  console.log(`   CORS:    ${env.FRONTEND_URL}`);
});
