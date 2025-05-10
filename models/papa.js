import mongoose from "mongoose";

const papaSchema = new mongoose.Schema(
{
    name:{ type: String, required: true },
    name_papa: { type: String, requiered: true },
    country: { type: String},
},
{
    timestamps: true,
}
);

export default mongoose.model("Papa", papaSchema);