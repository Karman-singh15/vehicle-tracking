import mongoose ,{Schema} from "mongoose";

const deliverySchema=new Schema(
    {
        driver:String,
        end_position:String,
        total_time:Number,
    },
    {
        timestamps:true
    }
);

const Delivery=mongoose.models.Delivery || mongoose.model("Delivery",deliverySchema);

export default Delivery;