// recive trip data from frontend and send it to groq ai api and return the response to frontend
import { planTrip } from "../ai/tripPlanner.js";    
import {Property} from "../models/propertyModel.js";
import { generateDescription } from "../ai/generateDescription.js";

const cleanCity=(text)=>text.toLowerCase().replace(" ", "");

const createTripPlan = async (req, res) => {

  try {
    const { destination, budget, days, people, interests } = req.body;  

    if (!destination || !budget || !days || !people || !interests) {
      return res.status(400).json({ message: "Missing required fields" });
    } 

    const plan = await planTrip({ destination, budget, days, people, interests: interests||[] });

     const perNight = Number(budget) / Number(days);

     const city = cleanCity(destination);

    const properties = await Property.find({ 
        $or:[
            {"address.city": city},
            {"address.state": city},
            {"address.area": city}
        ],
        price: { $lte: perNight },
        maximumGuests: { $gte: Number(people) }

    }).limit(6);
   
    res.status(200).json({
        status: "success",
        data: {
            plan,
            properties,
            perNight
        }
    })
  } catch (error) {
    res.status(500).json({ 
        status: "fail",
        message: "could not create a trip plan try again later"
    });
  }
}
const writeDescription = async(req,res)=>{
    try {
      const description = await generateDescription(req.body);

      res.status(200).json({
        status: "success",
        data: { description },
      });
    } catch (error) {
      res.status(500).json({
        status: "fail",
        message: "could not generate a description",
      });
    }
 }

export { createTripPlan , writeDescription};