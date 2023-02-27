import mongoose from "mongoose";
const validateMongoDbId = (id: any) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error("This id is not valid or not Found");
};
export default validateMongoDbId;
