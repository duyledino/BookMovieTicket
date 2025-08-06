// Popcorn.jsx

import { convertToVND } from "../utils/convertToVND";

const Popcorn = ({
  popCornId,
  base64Image,
  name,
  price,
  booked,
  total,
  handleClick,
  isClick,
}) => {
  return (
    <div
      className={`w-xs rounded overflow-hidden shadow-lg shadow-amber-400 bg-white hover:shadow-xl transition-shadow duration-300 ${
        isClick === popCornId ? "ring-4  ring-blue-600" : ""
      }`}
      onClick={() => handleClick(popCornId)}
    >
      {/* Product Image */}
      <div className="h-56 overflow-hidden flex items-center justify-center">
        <img
          src={base64Image || "/images/Popcorn.png"}
          alt={name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-800">{name}</div>
        <p className="text-gray-700 text-base">
          Price:{" "}
          <span className="font-semibold"> {price.toLocaleString('vi-VN')} VNĐ</span>
        </p>
        <p className="text-gray-700 text-base">
          Số Lượng Book: <span className="font-semibold">{booked}</span>
        </p>
        <p className="text-gray-700 text-base">
          Tổng doanh thu:{" "}
          <span className="font-semibold">{total.toLocaleString('vi-VN')} VNĐ</span>
        </p>
      </div>

      {/* Action Button */}
      {/* <div className="px-6 pt-2 pb-4">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
          Add to Cart
        </button>
      </div> */}
    </div>
  );
};

// Default props matching your model defaults
Popcorn.defaultProps = {
  pop_image_url: "/images/Popcorn.png",
  name: "bap nuoc tam",
  price: 0,
};

export default Popcorn;
