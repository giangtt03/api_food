const Restaurant = require('../models/Restaurant');

module.exports = {
    addRestaurant: async(req, res)=>{
        const newRestaurant = new Restaurant(req.body)

        try {
            await new Restaurant.bulkSave()
            res.status(201).json({status: true, message: "Restaurant saved successfully"})
            
        } catch (error) {
            res.status(500).json({status: true, message: "Error creating restaurant", error: error.message})
            
        }
    },

    serviceAvaibility: async(req, res) =>{
        const restaurantId = req.params.id;

        try {
            const restaurant = await Restaurant.findById(restaurantId)
            if(!restaurant){
                return res.status(404).json({status: false, message: "restaurant not found"})
            }
            restaurant.isAvaiable = !restaurant.isAvaiable

            await restaurant.save()
            res.status(200).json({status: true, message: "Availability successfully toggled", isAvaiable: restaurant.isAvaiable})

        } catch (error) {
            res.status(500).json({status: false, message: "Error toggling restaurant"})

            
        }

    },
    deleteRestaurant: async(req, res) =>{
        const restaurant = req.params.id;
        try {
            const restaurant = await Restaurant.findById(restaurantId)
            if(!restaurant){
                return res.status(404).json({status: false, message: "restaurant not found"})
            }
            await Restaurant.findByIdAndDelete(restaurantId)
            res.status(200).json({status: true, message: "Restaurant successfully detele"})

        } catch (error) {
            res.status(500).json({status: true, message: "Error delete restaurant"})

        }

    },
    getRestaurant: async(req, res)=>{
        const restaurant = req.params.id;

        try {
            const restaurant = await Restaurant.findById(restaurantId)
            if(!restaurant){
                return res.status(404).json({status: false, message: "restaurant not found"})
            }

            res.status(200).json(restaurant)
        } catch (error) {
            res.status(500).json({status: true, message: "Error retrieving the restaurant"}) 
        }
        
    },
    getRandomRestaurants: async(req, res) =>{
        try {
            let randomRestaurant = [];
            if(req.params.code){
                randomRestaurant = await Restaurant.aggregate([
                        {$match: {code: req.params.code}},
                        {$sample: {size: 5}},
                        {$project: {__v: 0}}
                    
                ]);
            }

            if(!randomRestaurant.length){
                randomRestaurant = await Restaurant.aggregate([ 
                        {$sample: {size: 5}},
                        {$project: {__v: 0}}
                ]);
            }

            if(randomRestaurant.length){
                res.status(200).json(randomRestaurant)
            }



        } catch (error) {
            res.status(500).json({status: false, message: "Error find toggling restaurant"})

            
        }
    }

}