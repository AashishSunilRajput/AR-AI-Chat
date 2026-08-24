import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import testRoutes from "./routes/test.routes.js";
import authRoutes from "./routes/auth.routes.js";
import organizationRoutes from "./routes/organization.routes.js";
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
import widgetMessageRoutes from "./routes/widget-message.routes.js";

import leadRoutes from "./routes/lead.routes.js";

import websiteImportRoutes from "./routes/website-import.routes.js";

import analyticsRoutes from "./routes/analytics.routes.js";

import settingRoutes from "./routes/setting.routes.js";

import errorHandler from "./middleware/error.middleware.js";

import exportRoutes from "./routes/export.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import aiRoutes from "./routes/ai.routes.js";

const app = express();


// ==========================================
// Middleware
// ==========================================

app.use(
    cors({
        credentials: true,
        origin: true
    })
);


app.use(
    express.json()
);


app.use(
    express.urlencoded({
        extended: true
    })
);


app.use(
    cookieParser()
);



// ==========================================
// Static Upload Files
// ==========================================

app.use(

    "/uploads",

    express.static(

        path.join(
            process.cwd(),
            "src/uploads"
        )

    )

);



// ==========================================
// Home Route
// ==========================================

app.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        message:
        "🚀 TT AI Chat Backend Running Successfully",

        version:"1.0.0"

    });

});



// ==========================================
// Health Check
// ==========================================

app.get("/api/health", (req,res)=>{


    res.status(200).json({

        success:true,

        status:"Healthy",

        timestamp:new Date()

    });


});



// ==========================================
// Authentication
// ==========================================

app.use(
    "/api/auth",
    authRoutes
);



// ==========================================
// Organization
// ==========================================

app.use(
    "/api/organization",
    organizationRoutes
);



// ==========================================
// Users
// ==========================================

app.use(
    "/api/users",
    userRoutes
);



// ==========================================
// Dashboard
// ==========================================

app.use(
    "/api/dashboard",
    dashboardRoutes
);



// ==========================================
// Chatbot
// ==========================================

app.use(
    "/api/chatbots",
    chatbotRoutes
);


app.use(
    "/api/chatbot-settings",
    chatbotSettingRoutes
);



// ==========================================
// Knowledge Base
// ==========================================

app.use(
    "/api/knowledge-bases",
    knowledgeBaseRoutes
);


app.use(
    "/api/knowledge-documents",
    knowledgeDocumentRoutes
);


app.use(
    "/api/knowledge-chunks",
    knowledgeChunkRoutes
);


app.use(
    "/api/embeddings",
    embeddingRoutes
);



// ==========================================
// Website Import
// ==========================================

app.use(
    "/api/website-import",
    websiteImportRoutes
);



// ==========================================
// Visitor / Conversation / Message
// ==========================================

app.use(
    "/api/visitors",
    visitorRoutes
);


app.use(
    "/api/conversations",
    conversationRoutes
);


app.use(
    "/api/messages",
    messageRoutes
);



// ==========================================
// Widget
// ==========================================

app.use(
    "/api/widget",
    widgetRoutes
);


app.use(
    "/api/widget/message",
    widgetMessageRoutes
);



// ==========================================
// Leads
// ==========================================

app.use(
    "/api/leads",
    leadRoutes
);



// ==========================================
// Analytics
// ==========================================

app.use(
    "/api/analytics",
    analyticsRoutes
);



// ==========================================
// Settings
// ==========================================

app.use(
    "/api/settings",
    settingRoutes
);



// ==========================================
// Test Routes
// ==========================================

app.use(
    "/api",
    testRoutes
);
// ==========================================
// Export Routes
// ==========================================

app.use(
    "/api/export",
    exportRoutes
);


// ==========================================
// Notifications
// ==========================================
app.use(
    "/api/notifications",
    notificationRoutes
);


app.use(
    "/api/ai",
    aiRoutes
);


// ==========================================
// Error Handler (Always Last)
// ==========================================

app.use(
    errorHandler
);



export default app;