import { Request, Response } from "express";
import { conversationService } from "../services/conversationService";
import { z } from "zod";

const sendMessageSchema = z.object({
  message: z.string().min(1),
  sessionId: z.string().min(1),
  userId: z.number().optional(),
});

export async function sendMessage(req: Request, res: Response) {
  try {
    const { message, sessionId, userId } = sendMessageSchema.parse(req.body);
    
    const response = await conversationService.processMessage(sessionId, message);
    
    res.json({
      success: true,
      response,
      sessionId,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error processing conversation message:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function getConversationHistory(req: Request, res: Response) {
  try {
    const sessionId = req.params.sessionId;
    
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        error: "sessionId parameter is required",
      });
    }
    
    const history = conversationService.getConversationHistory(sessionId);
    
    res.json({
      success: true,
      history,
      sessionId,
    });
  } catch (error) {
    console.error("Error getting conversation history:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}

export async function clearConversation(req: Request, res: Response) {
  try {
    const sessionId = req.params.sessionId;
    
    if (!sessionId) {
      return res.status(400).json({
        success: false,
        error: "sessionId parameter is required",
      });
    }
    
    const cleared = conversationService.clearConversation(sessionId);
    
    res.json({
      success: true,
      cleared,
      sessionId,
    });
  } catch (error) {
    console.error("Error clearing conversation:", error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}