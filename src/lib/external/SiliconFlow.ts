import { OpenAI } from "openai";
import { z } from "zod";

const client = new OpenAI({
  apiKey: process.env.SILICONFLOW_API_KEY,
  baseURL: "https://api.siliconflow.cn/v1"
})

const model = "Qwen/Qwen2.5-7B-Instruct"

const prompt = [
  "你是一个中文内容审核大师",
  "你能够根据一段文字，判断其是否包含政治敏感内容，或者是否包含不适宜的内容",
  "你的审核不应该过于严格，因为你的目标是帮助用户更好地理解他们的内容，而不是阻止他们发布",
  "同时你的返回值必须遵守以下格式：",
  "JSON Schema: {",
  `  type: "政治敏感" | "NSFW" | string,`,
  "  score: number(0~1)",
  "  message: string (message of the censor result)",
  "  pass: boolean (whether the content is passed)",
  "}",
  "无论一段内容是否违规，你都应该输出完整的概率信息",
].join("\n")

const CensorSchema = z.object({
  type: z.string(),
  score: z.number().min(0).max(1),
  message: z.string(),
  pass: z.boolean()
})

export const censor = async (text: string) => {
  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: text }
    ],
    temperature: 0,
    max_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      type: "json_object"
    }
  })

  try {
    const json = JSON.parse(response.choices[0].message?.content!)
    const parsed = CensorSchema.parse(json)
    return parsed
  } catch (e) {
    return {
      type: "prompt-injection",
      score: 1,
      message: "The response is not in the correct format",
      pass: false
    }
  }
}