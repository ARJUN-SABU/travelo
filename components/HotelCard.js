import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useSession, signIn } from "next-auth/react";

//icons
import { AiFillStar } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";

const stripePromise = loadStripe(`${process.env.stripe_public_key}`);
function HotelCard(props) {
  const session = useSession();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    //call the backend to create a checkout session
    const checkoutSession = await axios.post("/api/create-checkout-session/", {
      items: [
        {
          id: 1,
          title: props.hotel_name,
          price: Number(props.hotel_price.replace("Rs", "").replace(",", "")),
          rating: Number(props.hotel_rating),
          description: props.hotel_address,
        },
      ],
      // email: "abc@abc.com",
    });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    console.log(result);

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center mx-8 my-4 py-8 border-b-gray-300 border-b-2">
      <div className="sm:mr-4 mb-4 sm:mb-0 flex justify-center items-center sm:w-3/4 w-full">
        <img
          src={props.hotel_img}
          alt={props.hotel_name}
          //   className="w-72 h-52"
          // height={290}
          // width={500}
          className="rounded-lg w-full"
        />
      </div>
      <div className="w-full h-full flex flex-col sm:justify-between sm:min-h-[184px]">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl mb-1">{props.hotel_name}</h1>
          <p>{`${props.hotel_address}`}</p>
        </div>
        <div className="w-full flex justify-between sm:mt-auto">
          <p className="flex items-center">
            <span className="text-red-500 text-2xl mr-1">
              <AiFillStar />
            </span>{" "}
            <span>{props.hotel_rating}</span>
          </p>
          <p className="flex items-center text-lg">
            <span className="mr-1">
              <FaRupeeSign />
            </span>
            <span>{props.hotel_price.replace("Rs", "")}</span>
          </p>
        </div>

        {session.data == null ? (
          <button
            className="bg-sky-400 px-2 py-2 mt-1 sm:mt-2 rounded cursor-pointer font-semibold hover:shadow-lg"
            onClick={signIn}
          >
            Sign In To Book
          </button>
        ) : (
          <button
            className="bg-sky-400 px-2 py-2 mt-1 sm:mt-2 rounded cursor-pointer font-semibold hover:shadow-lg"
            onClick={createCheckoutSession}
          >
            Book
          </button>
        )}
      </div>
    </div>
  );
}

export default HotelCard;
