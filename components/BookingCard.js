//icons
import { FaRupeeSign } from "react-icons/fa";

function BookingCard({ id, amount, hotel_name }) {
  return (
    <div className="px-4 py-4 border-t-2 border-slate-200">
      <h1 className="text-xl font-semibold mb-2">
        {hotel_name.replace("[", "").replace("]", "").replaceAll('"', "")}
      </h1>
      <p
        style={{ width: "max-content" }}
        className="flex items-center bg-green-200 px-2 py-1"
      >
        <span>
          <FaRupeeSign />
        </span>
        <span>{amount}</span>
      </p>
      <p className="mt-2">
        <span>id:</span> <span className="text-slate-800">{id}</span>
      </p>
    </div>
  );
}

export default BookingCard;
