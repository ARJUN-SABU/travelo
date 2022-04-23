import Image from "next/image";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

//icons
import { AiFillStar } from "react-icons/ai";

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
    <div className="flex">
      <div>
        <Image
          src={props.hotel_img}
          alt={props.hotel_name}
          //   className="w-72 h-52"
          height={100}
          width={200}
        />
      </div>
      <div className="w-full">
        <div>
          <h1>{props.hotel_name}</h1>
          <p>{`${props.hotel_address}`}</p>
        </div>
        <div className="w-full flex justify-between">
          <p className="flex items-center">
            <span>
              <AiFillStar />
            </span>{" "}
            <span>{props.hotel_rating}</span>
          </p>
          <p>{props.hotel_price}</p>
        </div>

        {session.data == null ? (
          <p>Sign In To Book</p>
        ) : (
          <button
            className="bg-sky-400 px-2 py-1 rounded cursor-pointer"
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
