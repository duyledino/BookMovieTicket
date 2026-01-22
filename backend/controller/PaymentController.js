import env from "dotenv";
import { v4 as uuid } from "uuid";
import QueryString from "qs";
import crypto from "node:crypto";
import dayjs from "dayjs";

env.config();

const createPaymentController = (req, res) => {
  let ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  console.log(ipAddr, "----------------", req.body);
  //   if (ipAddr === "::1") ipAddr = "http://localhost:5173";
  const tmnCode = process.env.vnp_TmnCode;
  const secretKey = process.env.vnp_HashSecret;
  console.log(secretKey);
  const book_id = req.body.book_id;
  const film_id = req.body.film_id;
  let vnpUrl = process.env.vnp_Url;
  console.log("process.env.vnp_ReturnUrl: ",process.env.vnp_ReturnUrl);
  const returnUrl = process.env.vnp_ReturnUrl;
  const amount = req.body.amount;
  // const bankCode = req.body.bankCode;
  const createDate = dayjs().format("YYYYMMDDHHmmss");
  let currCode = "VND";
  let vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = "vn";
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = book_id;
  vnp_Params["vnp_OrderInfo"] = book_id;
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl + "?film_id=" + film_id;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  vnp_Params["vnp_BankCode"] = "NCB"; // cannot use QRCODE because of testing only
  // if (bankCode !== null && bankCode !== "") {
  //   vnp_Params["vnp_BankCode"] = bankCode;
  // }else{
  //   vnp_Params["vnp_BankCode"] = 'VNPAYQR';
  // }
  vnp_Params = sortObject(vnp_Params);
  const signData = QueryString.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  console.log(signed);
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + QueryString.stringify(vnp_Params, { encode: false });
  console.log(vnp_Params);
  console.log(vnpUrl);
  return res.status(200).json(vnpUrl);
};

const getPaymentResult = (req, res) => {
  const paymentResult = req.query;
  const vnp_ResponseCode = paymentResult.vnp_ResponseCode;
  console.log("get payment result: ",vnp_ResponseCode);
  if (vnp_ResponseCode == "00") {
    return res.status(200).json("Thanh Toán Thành Công");
  } else if (vnp_ResponseCode == "11") {
    return res
      .status(200)
      .json(
        "Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch."
      );
  } else if (vnp_ResponseCode == "24") {
    return res.status(200).json("Khách hàng hủy giao dịch");
  } else if (vnp_ResponseCode == "51") {
    return res
      .status(200)
      .json("Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.");
  }
};

// transaction response
// {
//   vnp_Amount: '10000000',
//   vnp_BankCode: 'NCB',
//   vnp_BankTranNo: 'VNP15079080',
//   vnp_CardType: 'ATM',
//   vnp_OrderInfo: 'Thanh toan cho ma GD:6b0a2e7c-a',
//   vnp_PayDate: '20250716181728',
//   vnp_ResponseCode: '00',
//   vnp_TmnCode: 'OM89333P',
//   vnp_TransactionNo: '15079080',
//   vnp_TransactionStatus: '00',
//   vnp_TxnRef: '6b0a2e7c-a',
//   vnp_SecureHash: '9e0f23379e840998909aa77cd5211a521ec9b8aa0aa3d6cd0ac05fe5fed8eeac9075f9ca8b5f4889c0272efcae868b35d48af8cb87903bc3f904a7b75ca1db5d'
// }

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

export { createPaymentController, getPaymentResult };
