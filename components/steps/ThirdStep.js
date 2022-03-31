import Image from "next/image";
import React, { useState } from "react";
import validator from "validator";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function ThirdStep({ nextStep, handleFormData, values }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  let satisfactionlevel;

  if (
    values.satisfaction === "very satisfied" ||
    values.satisfaction === "somewhat satisfied"
  ) {
    satisfactionlevel = true;
  }

  console.log(values);

  // after form submit validating the form data using validator
  const submitFormData = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (values.review.length < 150) {
      setError(true);
      toast.error("Review must be atleast 150 characters");
      setLoading(false);
      return;
    }

    // checking if value of first name and last name is empty show error else take to step 2
    if (
      validator.isEmpty(values.freeProduct) ||
      validator.isEmpty(values.review)
    ) {
      setError(true);
      toast.error("Fill all required fields.");
    } else {
      try {
        const collectionRef = collection(db, "customers");
        const docRef = await addDoc(collectionRef, {
          ...values,
          timestamp: serverTimestamp(),
        });
        toast.success(`customer with id ${docRef.id} is added successfully `);
        window.localStorage.removeItem("values");
        nextStep();
        setLoading(false);
      } catch (error) {
        toast.error("Something went wrong saving your info. Try Again.");
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Toaster />
      <form className="max-w-md w-full space-y-8" onSubmit={submitFormData}>
        <div>
          <p className="uppercase text-sm tracking-widest font-bold text-gray-500 pb-4 text-center">
            Step 3 of 4
          </p>
          <p className="text-gray-700 font-bold text-2xl uppercase text-center">
            Please tell us which free product you&apos;d like to recieve.
          </p>
        </div>

        <div className="mb-2">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Select a product *
          </label>
          <select
            name="freeProduct"
            onChange={handleFormData("freeProduct")}
            className="border-2 border-gray-300 w-full bg-white h-12 px-5 pr-16 rounded text-md focus:outline-none"
          >
            <option></option>
            <option value="Vegan D3 drops for babies - 55 drops sample">
              Vegan D3 drops for babies - 55 drops sample
            </option>
          </select>
        </div>
        <div>
          <p className="text-gray-700 font-bold text-2xl uppercase tracking-widest text-center">
            {/* THANK YOU FOR BEING A CUSTOMER, BUT WE NEED YOUR HELP! */}
          </p>
          {satisfactionlevel && (
            <p className="text-gray-600">
              There aren’t many organic, baby vegan D3 drops delivering one dose
              in one small drop available. In fact, we’re the only ones. (We
              checked!) The only other similar supplement cholesterol as an
              ingredient which is cruel to the sheep to obtain. If you agree
              with us that more families should be using safe, natural, kind
              products like ours, we would adore it if you left us an honest
              review below on Amazon to help others learn about us. We aren’t a
              huge corporation with TV commercials. We run on love, mom power
              and passion. That’s why your review is SO important! Thank you for
              your honesty, The Halo Naturals Family
            </p>
          )}
        </div>
        <div className="flex items-center justify-center">
          {satisfactionlevel && (
            <div className="flex flex-col">
              <Image
                src="/Amazon_logo.svg"
                height={50}
                width={200}
                alt="amazonlogo"
              />
              <Image
                src="/fivestars.png"
                height={40}
                width={150}
                alt="amazonlogo"
              />
            </div>
          )}
        </div>

        <div className="">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Review / Comments* (Minimum 150 characters qualify for your free
            item)
          </label>
          <textarea
            rows="3"
            className="border-2 border-gray-300 w-full bg-white px-5 pr-16 py-3 rounded text-md focus:outline-none"
            placeholder="Your review here."
            required
            type="text"
            name="review"
            minLength={150}
            value={values.review}
            onChange={handleFormData("review")}
          ></textarea>
        </div>
        <div className="flex justify-center">
          {satisfactionlevel && (
            <a
              className="bg-gray-700 text-white py-2 rounded uppercase px-4"
              href="https://www.amazon.com/review/create-review?&asin=B09189HG87"
              target={"_blank"}
              rel={"noreferrer"}
            >
              Click to post review on Amazon
            </a>
          )}
        </div>
        <div className="flex justify-center">
          {loading ? (
            <button
              disabled
              type="button"
              className="bg-gray-800 text-white py-2 rounded px-4"
            >
              <svg
                role="status"
                className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                />
              </svg>
              Submitting...
            </button>
          ) : (
            <button
              type="submit"
              className="bg-gray-800 text-white py-2 rounded uppercase px-4"
            >
              Submit to get your free item
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
