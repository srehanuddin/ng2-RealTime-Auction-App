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
    Category : String,
    Status : String,
    AuctionAwardedToUID : String,
    AuctionAwardedToFirstName : String,
    AuctionAwardedToLastName : String,
    AuctionAwardedToAmount : Number,
}
export interface AuctionModel {
    uid : String,
    pid : String,
    FirstName : String,
    LastName : String,
    Bid : Number,
    TimeStamp : Number,
    DateTime : String
}
export default ProductModel;
