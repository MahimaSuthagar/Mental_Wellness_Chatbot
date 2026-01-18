import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

export class GeminiService {
  private chat: Chat | null = null;

  private getAi() {
    // API key must be obtained exclusively from process.env.API_KEY using named parameter.
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  public initChat() {
    const ai = this.getAi();
    // Using 'gemini-3-flash-preview' for basic conversational text tasks.
    this.chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
        topP: 0.95,
      },
    });
  }

  public async sendMessage(message: string): Promise<string> {
    if (!this.chat) {
      this.initChat();
    }

    try {
      // sendMessage only accepts message parameter.
      const result: GenerateContentResponse = await this.chat!.sendMessage({
        message,
      });
      // Access text property directly (it's a getter, not a method).
      return (
        result.text ||
        "I'm sorry, I'm having trouble finding the words right now. Could you repeat that?"
      );
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }

  public async sendMessageStream(
    message: string,
    onChunk: (chunk: string) => void,
  ) {
    if (!this.chat) {
      this.initChat();
    }

    try {
      const response = await this.chat!.sendMessageStream({ message });
      for await (const chunk of response) {
        const c = chunk as GenerateContentResponse;
        // Access text property directly.
        if (c.text) {
          onChunk(c.text);
        }
      }
    } catch (error: any) {
      console.error("Gemini Streaming Error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
