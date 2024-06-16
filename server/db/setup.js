import connectDB from "./db_connection.js";
import User from "./models/userModel.js";
import Therapist from "./models/therapistModel.js";

async function setup() {
    await connectDB();

    await User.init();
    console.log("User collection created");

    await Therapist.init();
    console.log("Therapist collection created");

    console.log("Setup complete");
}

export default setup;
