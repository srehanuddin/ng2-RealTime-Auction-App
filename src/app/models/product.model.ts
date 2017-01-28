export const Categories = [
    "Mobiles",
    "Labtops",
    "Others"
]
interface ProductModel {
    uid : String,
    Location : String,
    FirstName : String,
    LastName : String,
    Title : String,
    Description : String,
    File : String,
    AutionEndDate : String,
    AutionEndTime : String,
    AutionEndTimeStamp : Number,
    BidStartingAmount : Number,
    MinimumBidAmount : Number,
    Category : String
}
export interface AuctionModel {
    uid : String,
    pid : String,
    FirstName : String,
    LastName : String,
    Bid : Number,
    TimeStamp : String,
    DateTime : String
}
export default ProductModel;
