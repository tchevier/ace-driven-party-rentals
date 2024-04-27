import { Datepicker } from "flowbite-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { validateZipCode } from "../actions/users";

export default function NavbarForm() {
  const todaysDate = new Date();

  // Create a new date by adding one day to today's date
  const tomorrowsDate = new Date(todaysDate);
  tomorrowsDate.setDate(todaysDate.getDate() + 1);
  const router = useRouter();
  const params = useSearchParams();
  const [rentalDate, setRentalDate] = useState<Date>(
    params.get("date") ? new Date(params.get("date")!) : tomorrowsDate
  );
  const [zipCode, setZipCode] = useState(params.get("zipcode") || "");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { isValid, errorMessage } = await validateZipCode(zipCode);

      if (isValid) {
        setErrorMessage("")
        // Construct the query string with selected parameters
        const queryParams = `?date=${rentalDate}&zipcode=${zipCode}`;
        // Redirect to the home route with query parameters
        router.push(`/${queryParams}`);
      } else {
        setErrorMessage(errorMessage);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while validating the zip code.");
    }
  };

  return (
    <>
      <div className="mt-5 w-full rounded flex items-center justify-center overflow-scroll sm:overflow-visible">
        <form onSubmit={handleSubmit} className="shadow-xl rounded-full border">
          <div className="flex items-center justify-center">
            <div className="relative rounded-l-full border-e">
              <Datepicker
                id="rentalDate"
                className="outline-none "
                style={{
                  border: "none",
                  borderTopLeftRadius: "9999px",
                  borderBottomLeftRadius: "9999px",
                  padding: "1.5rem 2rem",
                  paddingTop: "2rem",
                  color: "gray",
                  margin: "0",
                  backgroundColor: "white",
                }}
                name="rentalDate"
                showTodayButton={false}
                minDate={tomorrowsDate}
                defaultDate={rentalDate}
                onSelectedDateChanged={(date) => setRentalDate(date)}
              />
              <label
                htmlFor="rentalDate"
                className="absolute left-8 bottom-10 text-gray-700 font-semibold text-sm"
              >
                Rental Date
              </label>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative rounded-l-full">
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  className="text-sm outline-none  border-none"
                  style={{
                    paddingLeft: "2rem",
                    paddingRight: "0",
                    paddingBottom: "1.3rem",
                    paddingTop: "2.1rem",
                    color: "gray",
                    margin: "0",
                  }}
                  placeholder="..."
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  maxLength={5}
                />
                {errorMessage ? (
                  <label
                    htmlFor="zipCode"
                    className="absolute left-8 bottom-10 text-red-600 font-semibold text-xs"
                  >
                    {errorMessage}
                  </label>
                ) : (
                  <label
                    htmlFor="zipCode"
                    className="absolute left-8 bottom-10 text-gray-700 font-semibold text-sm"
                  >
                    Event Zip Code
                  </label>
                )}
              </div>
              <button
                type="submit"
                className="bg-green-500 p-3 rounded-full m-3 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
