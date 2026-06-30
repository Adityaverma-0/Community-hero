import express, { type Express } from "express";
import path from "path";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";


const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api", router);

// --- ADD THIS TO SERVE THE FRONTEND WEBSITE ---
// Find the built frontend files
const frontendPath = path.join(__dirname, "../../../mockup-sandbox/dist");
app.use(express.static(frontendPath));

// If a user refreshes a page, route them back to the main website file
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});
// ----------------------------------------------

export default app;
