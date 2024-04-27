"use server";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { redirect } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";

export const doSignInWithEmailAndPassword = async (formData: FormData) => {
  try {
    console.log(formData);
    const res = await signInWithEmailAndPassword(
      auth,
      formData.get("email") as string,
      formData.get("password") as string
    );

    if (res?.user) {
      // Redirect on the client-side
      return redirect("/");
    }
  } catch (error) {
    return "Invalid email or password.";
  }
};

export const doSignOut = () => {
  return auth.signOut();
};
let zipcodesList: number[] | undefined = undefined;

export const getZipcodesList = async () => {
  if (!zipcodesList) {
    const querySnapshot = await getDocs(collection(db, "zipcodes"));
    const docSnap = querySnapshot.docs[0];
    if (docSnap) {
      zipcodesList = docSnap.data()?.zipcodesList || [];
    } else {
      console.error("No documents found in the zipcodes collection");
    }
  }
  return zipcodesList;
};

export const validateZipCode = async (zipCode: string) => {
  try {
    if (zipCode.length !== 5) {
      return {
        isValid: false,
        errorMessage: "Zip Code Must be 5 digits.",
      };
    }

    const parsedZipCode = parseInt(zipCode);
    const zipcodesList = await getZipcodesList();

    if (zipcodesList?.includes(parsedZipCode)) {
      return { isValid: true };
    } else {
      return { isValid: false, errorMessage: "Invalid zip code." };
    }
  } catch (err) {
    console.error("Error validating zip code:", err);
    return {
      isValid: false,
      errorMessage: "An error occurred while validating the zip code.",
    };
  }
};
// export const addZipcodes = async () => {
//     console.log("hererere")
//   const zipcodes = [
//     76117,76111,76190,76103,76118,76137,76112,76148,76053,76180,76102,76120,76105,76106,76164,76166,76104,76182,76101,76113,76121,76124,76130,76136,76147,76150,76161,76162,76163,76181,76185,76191,76192,76193,76195,76196,76197,76198,76199,76054,76022,76012,76095,76119,76131,76110,76107,76013,76021,76114,76016,76129,76248,76040,76034,76244,76115,76122,76006,76019,76127,76094,76096,76003,76004,76005,76007,76109,76015,76177,76017,76011,76039,76060,76134,76010,76179,76092,76155,76135,76133,76014,76140,76116,76132,75368,76001,76099,76018,76052,76051,75261,76123,76262,76108,75053,75050,76002,75051,75038,75062,75061,76098,75052,75022,75099,76036,76063,75060,75014,75015,75016,75017,75063,76097,76028,75054,75039,75028,76071,75019,75027,75059,76247,76020,76126,75249,75236,75211,76061,75067,75077,75212,75116,75247,76226,75104,75234,75029,75138,75220,75106,75057,75137,75233,76008,75006,75229,75011,76078,75235,75237,75358,76058,75208,75209,76085,75224,75260,75007,75207,76210,76009,75219,75065,75267,75244,75342,75370,75010,75242,75232,76023,75262,75263,75398,75202,75270,75115,75221,75222,75250,75264,75265,75266,75275,75277,75283,75284,75285,75301,75303,75312,75313,75315,75320,75326,75336,75339,75354,75355,75356,75357,75359,75360,75367,75371,75372,75373,75374,75376,75378,75379,75380,75381,75382,75389,75390,75391,75392,75393,75394,75395,75397,75201,75001,75205,76084,75203,75204,75225,75056,75123,76205,75287,76259,75230,76035,75226,75246,75206,75254,76059,75216,75240,76207,76065,75215,76082,75248,75251,76202,76203,76204,76206,76201,75223,76044,75214
//   ];

//   console.log("Adding zipcodes...");

//   try {await addDoc(collection(db, "zipcodes"), { zipcodesList: [...zipcodes] });

//     console.log("Zipcodes added successfully.");
//   } catch (error) {
//     console.error("Error adding zipcodes:", error);
//   }
// };
