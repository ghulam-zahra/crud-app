import User from "../model/userModel.js";
// user create
export const create = async (req, res) => {
    try{
        const userData = new User(req.body);
        if(!userData){
            return res.status(400).json({message: "User data is required"});
        }
        const savedData = await userData.save();
        res.status(200).json(savedData);
    } catch (error) {
        return res.status(500).json({message: "Error creating user", error: error.message});
    }
}

// get all users
export const gettAll = async (req,res)=>{
    try{
        const userData = await User.find();
        if(!userData){
            return res.status(404).json({msg:"User data not found"});
        }
        res.status(200).json(userData);
    } catch (error) {
        return res.status(500).json({message: "Error fetching users", error: error.message});
    }
}
// get user by id
export const getById = async (req,res)=>{
    try{
        const userData = await User.findById(req.params.id);
        if(!userData){
            return res.status(404).json({msg:"User not found"});
        }
        res.status(200).json(userData);
    } catch (error) {
        return res.status(500).json({message: "Error fetching user", error: error.message});
    }
}
// update user by id
export const updateById = async (req,res)=>{
   try{
    const userData = await User.findByIdAndUpdate(req.params.id, req.body
, {new: true});
    if(!userData){
        return res.status(404).json({msg:"User not found"});
    }
    res.status(200).json({msg:"User updated successfully"});
   }
    catch (error) {
        return res.status(500).json({message: "Error updating user", error: error.message});
    }
}

// delete user by id
export const deleteById = async (req,res)=>{
    try{
        const userData = await User.findByIdAndDelete(req.params.id);
        if(!userData){
            return res.status(404).json({msg:"User not found"});
        }
        res.status(200).json({msg:"User deleted successfully"});
    } catch (error) {
        return res.status(500).json({message: "Error deleting user", error: error.message});
    }
}
export default { create, gettAll, getById, updateById, deleteById };