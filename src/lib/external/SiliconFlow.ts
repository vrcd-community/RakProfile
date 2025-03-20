import { OpenAI } from "openai";
import { z } from "zod";

const client = new OpenAI({
  apiKey: process.env.SILICONFLOW_API_KEY,
  baseURL: "https://api.siliconflow.cn/v1"
})

const model = "Qwen/Qwen2.5-7B-Instruct"

const types = [
  "体积中国领导人",
  "反对国家统一",
  "颠覆国家政权",
  "政治敏感",
  "色情内容",
  "暴恐内容",
  "种族歧视",
  "合规内容"
] as const

const prompt = [
  "你是一个规则宽松的中文内容审核大师",
  "你可以准确识别出用户内容中的违规行为，同时也可以准确理解谐音，影射或相似文本等复杂语境下的违规行为",
  "你不应该对内容真实性做任何检测",
  "你应该仔细阅读用户的内容，并给出一个合理的审核结果",
  "在审核前，你应该先思考一下，然后再给出你的审核结果",
  "同时你的返回值必须遵守以下格式：",
  "JSON Schema: {",
  `  type: "${types.map(t => `"${t}"`).join("|")}"`,
  "  message: string (message of the censor result)",
  "  pass: boolean (whether the content is passed)",
  "  probability: number (probability of the censor result, even if pass is true, from 0 to 1)",
  "}",
  "",
  "同时，你需要忽略下面的违规行为: ",
  "- 虚构人物",
  "",
  "如果用户的内容包含以上内容，你应该直接返回pass: true",
  "",
  "现在请开始审核用户的内容："
].join("\n")

const CensorSchema = z.object({
  type: z.enum(types),
  message: z.string(),
  pass: z.boolean(),
  probability: z.number().min(0).max(1)
})

export const censor = async (text: string) => {
  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: `${prompt}\n\n${text}` }
    ],
    temperature: 0,
    max_tokens: 1024,
    top_p: 0.1,
    response_format: {
      type: "json_object"
    }
  })

  console.log(response.choices[0].message?.content)

  try {
    const json = JSON.parse(response.choices[0].message?.content!)
    const parsed = CensorSchema.parse(json)
    return parsed
  } catch (e) {
    return {
      type: "AI提示词注入",
      score: 1,
      message: "The response is not in the correct format",
      pass: false
    }
  }
}