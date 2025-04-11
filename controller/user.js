
// models ke file ko call karenge
const { render } = require('ejs')
const homes = require('../models/homes')
const Favourite = require('../models/favourite')

const Reserved = require('../models/reserved');
const Favourites = require('../models/favourite');


exports.homePage = (req, res, next) => {
    let opacity = {}; // Define opacity as an object

    homes.fetch().then(registerHomes => {
        Favourite.getFavourite().then(favourites => {  
            favourites = favourites.map(fav => fav.houseId.toString()); // Convert IDs to string if needed
            
            registerHomes.forEach(home => {
                opacity[home._id] = favourites.includes(home._id.toString()) ? 10 : 0; // Assign opacity
            });

            res.render('./store/home', { homes: registerHomes, title: "Home Page", opacity: opacity });
        }).catch(error => console.log("Error fetching favorites", error));
    }).catch(error => console.log("Error fetching homes", error));
};

// const {registerHomes}=require('../routes/host')--------iski jarurat nhi padegi kyunki registerHomes isi file me declare kiya gaya hai

// home-details
exports.homeDetails = (req, res, next) => {
    let opacity = {};
    const homeId = req.params.homeId;
    homes.findById(homeId).then(home=>{
        // const home=homes[0];//iski jarurat nhi padegi kyunki iski jarurat nhi padegi kyunki ab sirf home ki baat hogi, sirf ek home ayega...
        if (!home) {
            res.redirect('/user/home-list');
        } else {
            res.render('./store/home-details', { home: home, title: "home details", opacity: opacity  })
            // Favourite.getFavourite(favourites => {
            //         opacity[homeId] = favourites.includes(homeId) ? 0 : 10; 
            // res.render('./store/home-details', { home: home, title: "home details", opacity: opacity  })//ye pata nhi kyu nhi chal rha hai????????????????????????????
            // })
        }
    })
        
}

// ************************************VERY IMPORTANT********************************
// favourite list
exports.favouriteList = (req, res, next) => {
    Favourite.getFavourite().then(favourites => {
        favourites=favourites.map(fav=>fav.houseId);
        homes.fetch().then(registerHomes=>{
            const matchedHomes = registerHomes.filter(regHome =>{
                return favourites.includes(regHome._id.toString())
            })
            res.render('./store/favourite_list', { homes: matchedHomes, title: "favourite list" })
        })
    })


}
// post favourite list
exports.postfavouriteList = (req, res, next) => {
    let opacity={};
    console.log("post favourite list");
    const Id = req.body.homeId;
    const Fav=new Favourites(Id);
    Fav.save().then(result=>{
        console.log("Favourite added",result)
        res.redirect('/user/favourite_list')

    })
    
}
// unfavourite home
exports.postUnfavourite=(req,res,next)=>{
    const homeId=req.params.homeId
    Favourite.unfavourite(homeId)
    res.redirect('/user/favourite_list')
}

// booking
exports.booking = (req, res, next) => {
    const homeId = req.params.homeId;
    homes.findById(homeId).then(home=>{
        // const home=homes[0];//iski jarurat nhi padegi kyunki ab sirf home ki baat hogi, sirf ek home ayega...
        if (!home) {
            // console.log("no home")
            res.redirect('/user/home-list');
        } else {
            res.render('./store/booking', { home: home, title: "booking" })
        }
    })

}


exports.userPage = (req, res, next) => {
    // registerHomes ka variable me, fetch() ko call karenge
    res.render('./store/user', { title: "User Page" })

}
// post booking(pehle uss page pe leke jayega.....)
exports.Postbooking=(req,res,next)=>{
    const Id=req.params.homeId
    console.log(Id,"added successfully")
    const reserve=new Reserved(Id);
    reserve.addReserve().then(result=>{
        console.log("reserved home added")
        res.redirect('/user/submit_booking')
    })
    
}
exports.submitBooking=(req,res,next)=>{
    res.render('./store/submitBooking', {title: "submit booking" })
}
exports.reserved=(req,res,next)=>{
    Reserved.getReserve().then(reserved=>{
        reserved=reserved.map(reserve=>reserve.homeId);
        homes.fetch().then(resgisterHomes=>{
            const matchedHomes=resgisterHomes.filter(regHome=>{
                return reserved.includes(regHome._id.toString());
            })
            res.render('./store/reserve', { homes: matchedHomes, title: "Reserved Home list" })
        })
    })
}
exports.Postreserved=(req,res,next)=>{
    const id=req.params.homeId
    Reserved.cancle(id)
    console.log("button clicked")
    res.redirect('/user/reserve')
}


// exports.registerHomes=registerHomes;//-------------ab iski jarurat nhi padegi
