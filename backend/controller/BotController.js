import { Ollama } from "@langchain/ollama";
import { pool } from "../utils/configPostgres.js";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import env from "dotenv";
const llm = new Ollama({
  model: "llama3.2:3b",
  temperature: 0,
  maxRetries: 2,
  // numGpu: 1,
  numCtx: 1024,
  // numPredict: 200,
});

env.config();

const model = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  apiKey: process.env.gemini_api_key,
  maxOutputTokens: 2048,
  temperature: 0.3,
});

const sesstion = new Map();
let chat_history = [];

const validateInput = async (userInput) => {
  const systemPrompt = `
Bạn là một công cụ chuyển đổi tiếng Việt thành SQL. Chỉ làm một việc duy nhất: chuyển đầu vào thành chuỗi SQL.

Luật:
- Nếu người dùng chỉ chào hỏi: trả về: chào bạn
- Nếu câu hỏi không phù hợp: trả về: NULL
- Nếu hợp lệ: trả về chuỗi SQL thô (không thêm chú thích, không dùng markdown, không lời giải thích)
- Lưu ý:
1. ✅ Tên bảng và cột luôn luôn phải nằm trong dấu nháy kép "..."  
   ❌ Ví dụ sai: SELECT * FROM film  
   ✅ Ví dụ đúng: SELECT * FROM "film"

3. ✅ Truy vấn phải an toàn, không gây lỗi cú pháp, có thể dùng join để thực hiện liên kết các bảng nếu cần thiết.  
Chỉ sử dụng các bảng và cột sau:

film: 
  film_id (String)
  film_name (String), 
  poster_path (String), 
  backdrop_path (String), 
  overview (String), 
  vote_average (Int), 
  book_frequency (Int), 
  adult (Boolean), 
  tagline (String), 
  runtime (Int), 
  release_date (String), 
  active (Boolean)

popcorn: 
  name (String), 
  price (BigInt), 
  booked (Int), 
  total (BigInt)

genres_film: 
  name (String)

theater: 
  theater_id  (String)
  theater_name (String)

seat_calendar:
  seat_id       (String)
  theater_id    (String)
  seat_name     (String)
  price         (BigInt) 

calendar: 
  available_seat (Int), 
  total_seat (Int), 
  showtime (DateTime), 
  film_name (String), 
  theater_name (String),
  film_id (String)

genres_film: 
  genre_name (String)

Từ khóa logic:
- "hôm nay" => WHERE date(showtime) = date('now')
- "ngày mai" => WHERE date(showtime) = date('now', '+1 day')
- "sắp chiếu" => WHERE active = FALSE
- "đang chiếu" => WHERE active = TRUE
- "hot", "nhiều người xem", "xu hướng" => ORDER BY book_frequency DESC
- "hay", "điểm cao", "đánh giá tốt" => ORDER BY vote_average DESC
- "mới nhất" => ORDER BY release_date DESC
- "còn vé", "còn chỗ" => WHERE available_seat > 0

- Nếu người dùng hỏi tên phim: WHERE film_name LIKE '%<từ khóa>%'
- Nếu người dùng hỏi loại bắp nước: SELECT name FROM popCorn
- Nếu hỏi giá bắp nước: SELECT price FROM popCorn WHERE name LIKE '%<tên>%'
- Nếu hỏi rạp nào: SELECT DISTINCT theater_name FROM Theater
- Nếu hỏi suất chiếu: SELECT * FROM calendar c join film f on f.film_id = c.film_id WHERE film_name = '...' AND theater_name LIKE '%...%'
- Nếu hỏi tổng số ghế hoặc ghế còn: SELECT total_seat, available_seat FROM calendar
- Nếu hỏi phim thuộc thể loại nào: JOIN film_genre_link với genres_film để lấy genre_name
- Nếu hỏi những phim thuộc một thể loại cụ thể: JOIN film_genre_link với genres_film WHERE genre_name = '...'
- Các cụm như "phim gì hay", "phim nào hay", "có phim gì hay không","có phim gì" ,"phim đánh giá cao", "phim điểm cao", "phim nào tốt": SELECT film_name,overview,vote_average,book_frequency,adult,runtime FROM film WHERE active = TRUE ORDER BY vote_average DESC LIMIT 5
`.trim();

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", systemPrompt],
    ["human", "Validate this input: {input}"],
  ]);
  //   const prompt = `${systemPrompt}\n\nNgười dùng: ${userInput}\nTrả lời (chỉ là SQL hoặc từ khóa):`;

  // const chain = prompt.pipe(llm);
  const messages = await prompt.formatMessages({ input: userInput });
  console.log("✅ Prompt messages:", messages);

  const response = await model.invoke(messages);
  console.log("✅ LLM response:", response); // Ollam doesn't need response.content but gemini needs

  //   const response = await llm.invoke(prompt);

  return response.content;
};

const testGetReponseBot = async (userInput) => {
  console.log(userInput);
  const input = await validateInput(userInput);
  console.log("in testGetReponseBot:   ", input);
  console.log(input);

  // ✅ Nếu input là NULL → trả phản hồi mặc định
  if (input == "NULL" || input == "\nNULL" || input == "NULL\n") {
    const message = "Yêu cầu của bạn không thực hiện được ạ.";
    chat_history.push(new HumanMessage(userInput));
    chat_history.push(new AIMessage(message));
    console.log(message);
    return message;
  } else if (
    input == "chào bạn" ||
    input == "\nchào bạn" ||
    input == "chào bạn\n" ||
    input == ' "chào bạn" '
  ) {
    console.log("go in greeting");
    const message = "Xin chào quý khách ạ";
    chat_history.push(new HumanMessage(userInput));
    chat_history.push(new AIMessage(message));
    console.log(message);
    return message;
  }
  const sqlResult = await pool.query(input);
  console.log("sql result: ",JSON.stringify(sqlResult.rows)+"\t"+sqlResult.rows.length);
  if (sqlResult.rows.length == 0) {
    const message = "Yêu cầu của bạn không thực hiện được ạ.";
    chat_history.push(new HumanMessage(userInput));
    chat_history.push(new AIMessage(message));
    console.log(message);
    return message;
  }
  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `
Bạn là một trợ lý chuyên nghiệp, có nhiệm vụ **diễn giải dữ liệu JSON trả về từ truy vấn SQL** để trả lời người dùng bằng tiếng Việt một cách ngắn gọn, đầy đủ và dễ hiểu.

---

❗❗❗ CÁC LUẬT BẮT BUỘC:

1. Nếu dữ liệu là [] hoặc null hoặc không hợp lệ → Trả lời: **"Yêu cầu của bạn không thực hiện được ạ."**

2. Nếu có dữ liệu:
   - ✨ TUYỆT ĐỐI KHÔNG được chào hỏi hoặc mở đầu như: "Tôi có thể giúp...", "Dưới đây là..."
   - ✨ KHÔNG dùng markdown: không dấu **, không bảng, không dấu ---
   - ✨ KHÔNG chế thêm thông tin không có sẵn trong dữ liệu
   - ✨ CHỈ trả lời đúng định dạng mẫu bên dưới
    - ✨ Chỉ lấy dữ liệu cần thiết trong JSON query
---

📌 Lưu ý:
- Ngăn cách mỗi phim bằng 2 dòng trắng
- Nếu không có tagline thì bỏ qua dòng cuối
- Chỉ cần thông tin trong bảng film
- Các số như book_frequency, vote_average, runtime phải ghi đơn vị rõ ràng
`.trim(),
    ],
    new MessagesPlaceholder("chat_history"),
    ["human", "Làm ơn diễn giải ngắn gọn dữ liệu JSON sau: {input}"],
  ]);

  //   📌 MẪU TRẢ LỜI CHUẨN:

  // Tên phim: Moana 2
  // Ngày phát hành: 21/11/2024
  // Thời lượng: 100 phút
  // Điểm đánh giá: 7/10
  // Phù hợp mọi độ tuổi
  // 0 lượt đặt
  // The ocean is calling them back.

  // Tên phim: Warfare
  // Ngày phát hành: 09/04/2025
  // Thời lượng: 96 phút
  // Điểm đánh giá: 7/10
  // Phù hợp mọi độ tuổi
  // 0 lượt đặt
  // Everything is based on memory.

  // const chain = prompt.pipe(llm);
  // ✅ Format prompt đúng từ ChatPromptTemplate

  try {
    const messages = await prompt.formatMessages({
      chat_history,
      input: JSON.stringify(sqlResult.rows),
    });

    // ✅ Gọi LLM trực tiếp
    console.log("go to LLM");
    const response = await model.invoke(messages);
    console.log("✅ LLM response:", response.content);

    chat_history.push(new HumanMessage(userInput));
    chat_history.push(new AIMessage(response.content));
    return response.content;
  } catch (error) {
    console.log("Error here:  ", error);
  }
};
const testGetReponseBot1 = async (req, res) => {
  const { userInput } = req.body;
  console.log(userInput);
  const input = await validateInput(userInput);
  console.log("in testGetReponseBot:   ", input);
  console.log(input);

  // ✅ Nếu input là NULL → trả phản hồi mặc định
  if (input == "NULL" || input == "\nNULL" || input == "NULL\n") {
    const message = "Yêu cầu của bạn không thực hiện được ạ.";
    chat_history.push(new HumanMessage(userInput));
    chat_history.push(new AIMessage(message));
    console.log(message);
    return message;
  } else if (
    input == "chào bạn" ||
    input == "\nchào bạn" ||
    input == "chào bạn\n"
  ) {
    const message = "Xin chào quý khách ạ";
    chat_history.push(new HumanMessage(userInput));
    chat_history.push(new AIMessage(message));
    console.log(message);
    return message;
  }
  const sqlResult = await pool.query(input);
  console.log(sqlResult.rows);
  if (!sqlResult.rows || sqlResult.rows.length === 0) {
    const message = "Yêu cầu của bạn không thực hiện được ạ.";
    chat_history.push(new HumanMessage(userInput));
    chat_history.push(new AIMessage(message));
    console.log(message);
    return message;
  }
  //   📌 CÁCH TRẢ LỜI THEO TỪNG LOẠI DỮ LIỆU:

  // **1. film**
  // - Với mỗi phim, trả lời theo mẫu:
  // Tên phim: [film_name]
  // Ngày phát hành: [release_date] (định dạng DD/MM/YYYY)
  // Thời lượng: [runtime] phút
  // Điểm đánh giá: [vote_average]/10
  // [adult == true → Không phù hợp trẻ em]
  // [adult == false → Phù hợp mọi độ tuổi]
  // [book_frequency] lượt đặt
  // Nếu có tagline → ghi ở cuối đoạn
  // Ngăn cách mỗi phim bằng **2 dòng trắng**.

  // **2. calendar**
  // - Với mỗi suất chiếu:
  // Phim: [film_name]
  // Rạp: [theater_name]
  // Thời gian chiếu: [showtime]
  // Số ghế còn lại: [available_seat] / [total_seat]

  // **3. popCorn**
  // - Với mỗi loại bắp nước:
  // Loại bắp nước: [name]
  // Giá: [price] đồng
  // Đã đặt: [booked]
  // Tổng số: [total]

  // **4. genres_film**
  // - Nếu dữ liệu chứa film_name + genre_name:
  // Phim [film_name] thuộc thể loại: [genre_name1], [genre_name2], ...
  // - Nếu chỉ có danh sách các thể loại:
  // Các thể loại phim bao gồm: [genre_name1], [genre_name2], ...

  // **5. theater**
  // - Nếu trả về danh sách rạp:
  // Các rạp chiếu bao gồm: [theater_name1], [theater_name2], ...
  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `Bạn là một trợ lý chuyên nghiệp, có nhiệm vụ **diễn giải dữ liệu JSON trả về từ truy vấn SQL** để trả lời người dùng bằng tiếng Việt một cách ngắn gọn, đầy đủ và dễ hiểu.

❗ QUY TẮC:
- Nếu dữ liệu là [] hoặc null hoặc không có dữ liệu hợp lệ → Trả lời: "Yêu cầu của bạn không thực hiện được ạ."
- Nếu có dữ liệu → Trình bày rõ ràng, không dư thừa, chỉ dùng dữ liệu có sẵn.
- Không chào hỏi người dùng.
- Không bịa thêm thông tin.
- Không dùng markdown, không dùng bảng, không dùng dấu ---.

📌 LƯU Ý:
- Ngôn ngữ phải tự nhiên, nhưng tuyệt đối không được chế thêm nội dung không nằm trong dữ liệu.
- Các số liệu như price, book_frequency, runtime phải có đơn vị rõ ràng.
`,
    ],
    new MessagesPlaceholder("chat_history"),
    ["human", "Làm ơn diễn giải ngắn gọn dữ liệu JSON sau: {input}"],
  ]);

  try {
    const messages = await prompt.formatMessages({
      chat_history,
      input: JSON.stringify(sqlResult.rows),
    });

    console.log("✅ Prompt messages:", messages);

    // ✅ Gọi LLM trực tiếp
    const response = await model.invoke(messages);
    console.log("✅ LLM response:", response);

    console.log(response);
    chat_history.push(new HumanMessage(userInput));
    chat_history.push(new AIMessage(response));
    console.log(chat_history);
    return res.status(200).json({ botResponse: response });
  } catch (error) {
    console.log("Error here:  ", error);
  }
};
export { testGetReponseBot, testGetReponseBot1 };
