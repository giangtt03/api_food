const Food = require('../models/food')

module.exports = {
    addFood: async (req, res) =>{
        const newFood = new Food(req.body)
    try {
        await newFood.save();
        res.status(200).json({status: true, message: "Food add complete"})
    } catch (error) {
        res.status(500).json({status: false, message: "Food add cannot complete"})
    }

    },

    getFoodById: async(req, res)=>{
        const id = req.params.id;
        try {
            const food = await Food.findById(foodId)

            if(!food){
                return res.status(404).json({status: false, message: "Food not found"})
            }
            res.status(200).json(food)
        } catch (error) {
            return res.status(500).json({status: false, message: "Fail to get food"})
        }
    },
    getFoodByRestaurant: async(req, res)=>{
        const restaurantId = req.params.restaurantId;

        try {
            const foods = await Food.find({restaurant: restaurantId});

            if(!foods || foods.length === 0){
                return res.status(404).json({status: false, message: "No Food items"})

                res.status(200).json(foods)
            }
        } catch (error) {
            res.status(500).json({status: false, message: error.message}) 
        }
    },

    deleteFoodById: async(req, res) =>{
        const foodId =req.params.is;

        try {
            const food = await Food.findById(foodId);
            if(!food){
                return res.status(404).json({status: false, message: "Food item not found"})
            }

            await Food.findByIdAndDelete(foodId)
            res.status(200).json({status: true, message: "Food item delete complete"})
        } catch (error) {
            res.status(500).json({status: false, message: error.message})
        }
    },

    foodAvailability: async(req, res)=>{
        const foodId = req.params.id;
        try {
            const food = await Food.findById(foodId)

            if(!food){
                return res.status(404).json({status: false, message:"Food item not found"})

            }

            await food.save();
            res.status(200).json({status: true, message: "Food Availability susscessfully"})
        } catch (error) {
            res.status(500).json({status: false, message: error.message})
        }
    },
    updateFoodById: async(req, res)=>{
        const foodId = req.params.id;

        try {
            const updateFood = await Food.findByIdAndUpdate(foodId, req.body, {new: true, runValidators: true});
            if(!updateFood){
                return res.status(404).json({status: false, message: "Food item not update"})
            }

            res.status(200).json({status: true, message:"Food item update complete"})
        } 
        catch (error) {
            res.status(500).json({status: false, message: error.message})            
        }
    },
    addFoodTag: async(req,res)=>{
        const foodId = req.params.id;
        const {tag} = req.body
        try {
            const food = await Food.findById(foodId)

            if(!food){
                return res.status(404).json({status: false, message: "Food item not found"})
            }
            if(food.foodTags.includes(tag)){
                return res.status(404).json({status: false, message: "Food tag add complete"})
            }

            food.foodTags.push(tag)
            await food.save();
            return res.status(200).json({status: true, message: "Food item not found"})

        } catch (error) {
            return res.status(500).json({status: false, message: error.message})

        }

    },
    getRandomFoodByCode: async(req,res)=>{
        try {
            const randomFoodItem = await Food.aggregate([
                {$match: {code: req.params.code}},
                {$sample: {size: 5}},
                {$project: {_id: 0}}

            ]);
        } catch (error) {
            res.status(500).json({status: false, message: error.message})
        }
    },
    addFoodType: async(req,res)=>{
        const foodId = req.params.id;
        const foodType = req.body.foodType;
        try {
            const food = await Food.findById(foodId)

            if(!food){
                return res.status(404).json({status: false, message: error.message})
            }

            if(food.foodTags.includes(tag)){
                return res.status(404).json({status: false, message: "Food type alreadly exist"})

            }
            food.foodType.push(foodType);
            await food.save();
            return res.status(200).json({status: true, message: "Type add complete"})
        } catch (error) {
             res.status(500).json({status: false, message: error.message})

            
        }

    },
    getRandomBycategoryAndCode: async(req,res)=>{
        const {category, code} = req.params;

        try {
            let food = await Food.aggregate([
                {$match: {category: category, code: code}},
                {$sample: {size: 10}}
            ]);
            if(!food|| foods.length === 0){
                food = await Food.aggregate([
                    {$match: {code: code}},
                    {$sample: {size: 10}}
                ]);
            }else{
                foods = await Food.aggregate([
                    {$sample: {size: 10}}
                ]);
            }

            res.status(200).json(foods)

        } catch (error) {
            res.status(500).json({status: false, message: error.message})

            
        }
    }
}