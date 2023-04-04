import request from "@/utils/request";
import type { RootObject, Choice, Message ,Usage } from "./typings/chatgptApiType"
import { chatgpt } from "@/configs/chatgpt";

export const chatgptPost = (data: any): Promise<RootObject> =>
  request.post(chatgpt, data, {
    headers: {
      Authorization:
        "Bearer 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",
      "Content-Type": "application/json",
    },
  });
export const chatgptMyServer = (data: any): Promise<RootObject> => {
  return request.post("http://10.100.23.43:4000/test",data)
}
// const aa = {
//   id: "chatcmpl-6yw1k5Jzwb38dMejOVp62yycS613F",
//   object: "chat.completion",
//   created: 1679980756,
//   model: "gpt-3.5-turbo-0301",
//   usage: { prompt_tokens: 10, completion_tokens: 16, total_tokens: 26 },
//   choices: [
//     {
//       message: { role: "assistant", content: "你好，有什么需要帮忙的吗？" },
//       finish_reason: "stop",
//       index: 0,
//     },
//   ],
// };
