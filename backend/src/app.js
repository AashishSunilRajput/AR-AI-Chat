import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


import testRoutes from "./routes/test.routes.js";
import authRoutes from "./routes/auth.routes.js";
import organizationRoutes from "./routes/organization.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import userRoutes from "./routes/user.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import chatbotRoutes from "./routes/chatbot.routes.js";
import chatbotSettingRoutes from "./routes/chatbot-setting.routes.js";
import knowledgeBaseRoutes from "./routes/knowledge-base.routes.js";
import knowledgeDocumentRoutes from "./routes/knowledge-document.routes.js";
import knowledgeChunkRoutes from "./routes/knowledge-chunk.routes.js";

import embeddingRoutes from "./routes/embedding.route.js";

import visitorRoutes from "./routes/visitor.route.js";
import conversationRoutes from "./routes/conversation.route.js";
import messageRoutes from "./routes/message.route.js";

import widgetRoutes from "./routes/widget.route.js";

import leadRoutes from "./routes/lead.routes.js";
import widgetMessageRoutes from "./routes/widget-message.routes.js";
import websiteImportRoutes from "./routes/website-import.routes.js";

const app = express();


// Middleware
app.use(cors({
    credentials: true,
    origin: true
}));

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(cookieParser());


// Home Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "🚀 AR AI Chat Backend Running Successfully",
        version: "1.0.0"
    });
});


// Health Check API
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        status: "Healthy",
        timestamp: new Date()
    });
});





// Auth Routes
app.use("/api/auth", authRoutes);

     
app.use("/api/organization", organizationRoutes);

// Error Handling Middleware
app.use(errorHandler);

// User Routes
app.use("/api/users", userRoutes);

app.use(
    "/api/dashboard",
    dashboardRoutes
);
app.use("/api/chatbots", chatbotRoutes);
app.use("/api/chatbot-settings", chatbotSettingRoutes);
app.use("/api/knowledge-bases", knowledgeBaseRoutes);
app.use("/api/knowledge-documents",knowledgeDocumentRoutes);
app.use("/api/knowledge-chunks", knowledgeChunkRoutes);
app.use("/api/embeddings", embeddingRoutes);

app.use("/api/visitors", visitorRoutes);

app.use("/api/conversations", conversationRoutes);

app.use("/api/messages", messageRoutes);
app.use("/api/widget", widgetRoutes);
app.use(
    "/api/leads",
    leadRoutes
);
app.use(

    "/api/widget/message",

    widgetMessageRoutes

);

app.use(
    "/api/knowledge-documents",
    websiteImportRoutes
);


// Test Routes
app.use("/api", testRoutes);

export default app;