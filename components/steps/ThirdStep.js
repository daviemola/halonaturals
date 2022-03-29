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

  // after form submit validating the form data using validator
  const submitFormData = async (e) => {
    e.preventDefault();
    setLoading(true);

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
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Toaster />
      <form className="max-w-md w-full space-y-8" onSubmit={submitFormData}>
        <div>
          <p className="uppercase text-sm tracking-widest font-bold text-blue-500 pb-4">
            Step 3 out of 4
          </p>
          <p className="text-gray-700 font-bold text-2xl uppercase">
            Please tell us which free product you&apos;d like to recieve.
          </p>
        </div>

        <div className="mb-2">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Select a product.
          </label>
          <select
            name="freeProduct"
            onChange={handleFormData("freeProduct")}
            className="border-2 border-gray-300 sm:w-3/4 w-full bg-white h-12 px-5 pr-16 rounded text-md focus:outline-none"
          >
            <option></option>
            <option value="Vegan D3 drops for babies">
              Vegan D3 drops for babies
            </option>
          </select>
        </div>
        <div>
          <p className="text-gray-700 font-bold text-2xl uppercase tracking-widest">
            THANK YOU FOR BEING A CUSTOMER! BUT WE NEED YOUR HELP!
          </p>
          {satisfactionlevel && (
            <p className="text-gray-600">
              There aren’t many organic, baby vegan D3 drops delivering one dose
              in one small drop available. In fact, we’re the only ones. (We
              checked!) The only other similar vitamin uses sheep cholesterol as
              an ingredient which is cruel to the sheep to obtain. If you agree
              with us that more families should be using safe, natural, kind
              products like ours, we would adore it if you left us an honest
              review on Amazon to help others learn about us. We aren’t a huge
              corporation with TV commercials. We run on love, mom power and
              passion. That’s why your review is SO important! Thank you for
              your honesty, The Halo Naturals Family
            </p>
          )}
        </div>
        <div className="flex items-center justify-center">
          {satisfactionlevel && (
            <Image
              src="/Amazon_logo.svg"
              height={50}
              width={200}
              alt="amazonlogo"
            />
          )}
        </div>

        <div className="mb-2">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Your review/comment here. (min 150 characters to qualify for free
            product)
          </label>
          <textarea
            rows="2"
            className="border-2 border-gray-300 w-full bg-white px-5 pr-16 py-3 rounded text-md focus:outline-none"
            placeholder="Your review here."
            required
            type="text"
            name="review"
            value={values.review}
            onChange={handleFormData("review")}
          ></textarea>
        </div>
        {satisfactionlevel && (
          <button className="bg-gray-800 text-white py-2 rounded uppercase font-semibold px-4">
            click to submit review on amazon
          </button>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded uppercase font-semibold px-4"
        >
          {loading
            ? `Saving your information`
            : `
          Submit and get your free item
          
          `}
        </button>
      </form>
    </div>
  );
}
