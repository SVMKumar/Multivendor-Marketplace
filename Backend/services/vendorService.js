const vendor = require('../models/vendor');
const product = require('../models/product');
const order = require('../models/order');

const vendorValidator = require('../utilities/vendorValidator');
const productValidator = require('../utilities/productValidator');
const passwordMatcher = require('../utilities/passwordMatcher');

const vendorService = {};

vendorService.signUp = async (newVendor) => {
    try {
        await vendorValidator.findEmail(newVendor.email);
        await vendorValidator.findPhone(newVendor.phone);
        try {
            const vendorDetails = await vendor.insertOne(newVendor);
            return vendorDetails;
        }
        catch (e) {
            let error = new Error("Invalid request body");
            error.status = 400;
            throw error;
        }
    }
    catch (err) {
        throw(err);
    }
}

vendorService.login = async (identifier, password) => {
    try {
        const vendorDetails = await vendorValidator.checkForLogin(identifier);
        if (await passwordMatcher(password, vendorDetails.password)) {
            return vendorDetails;
        }
    }
    catch (err) {
        throw err;
    }
}

vendorService.getVendor = async (vendorId) => {
    try {
        await vendorValidator.findVendor(vendorId);
        const vendorDetails = await vendor.findOne({"vendorId": vendorId}, {"password": 0});
        if (vendorDetails) {
            return vendorDetails;
        }
    }
    catch (err) {
        throw(err);
    }
}

vendorService.updateVendor = async (vendorId, updatedDetails) => {
    try {
        await vendorValidator.findVendor(vendorId);
        const vendorDetails = await vendor.findOneAndUpdate({"vendorId": vendorId}, {$set: updatedDetails}, {new: true, runValidators: true, select: '-password'});
        if (vendorDetails) {
            return vendorDetails;
        }
    }
    catch (err) {
        throw err;
    }
}

vendorService.deleteVendor = async (vendorId) => {
    try {
        await vendorValidator.findVendor(vendorId);
        const vendorDetails = await vendor.findOneAndDelete({"vendorId": vendorId});
        if (vendorDetails) {
            return vendorDetails;
        }
    }
    catch (err) {
        throw err;
    }
}

vendorService.addProduct = async (productDetails) => {
    try {
        const addedProduct = await product.insertOne(productDetails);
        return addedProduct;
    }
    catch (err) {
        throw err;
    }
}

vendorService.getProducts = async (vendorId) => {
  try {
    await vendorValidator.findVendor(vendorId);

    const productsList = await product.aggregate([
      {
        $match: {
          vendorId: vendorId
        }
      },
      {
        $lookup: {
          from: "variants",
          let: { variantIds: "$variants" },
          pipeline: [
            { $match: { $expr: { $in: ["$_id", "$$variantIds"] } } },
            { $limit: 1 }
          ],
          as: "variant"
        }
      },
      { $unwind: { path: "$variant", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          vendorId: 1,
          name: 1,
          description: 1,
          category: 1,
          imageUrl: 1,
          variants: 1,
          createdOn: 1,
          vendorId: 1,
          price: "$variant.price",
          productId: 1
        }
      }
    ]);

    return productsList;
  } catch (err) {
    throw err;
  }
};



vendorService.deleteProduct = async (vendorId, productId) => {
    try {
        await vendorValidator.findVendor(vendorId);
        await productValidator.findProduct(productId);
        const productDetails = await product.findOneAndDelete({"vendorId": vendorId, "productId": productId});
        if (productDetails) {
            return productDetails;
        }
    }
    catch (err) {
        throw err;
    }
}

vendorService.getOutstandingPayment = async (vendorId) => {
    try {
        await vendorValidator.findVendor(vendorId);

        const outstandingPayments = await order.aggregate([
            { $unwind: '$products' },
            {
                $match: {
                    'products.vendorId': vendorId,
                    'products.orderStatus': 'Pending'
                }
            },
            {
                $group: {
                    _id: '$products.vendorId',
                    totalOutstanding: {
                        $sum: {
                            $multiply: ['$products.quantity', '$products.price']
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: 'vendors',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'vendor'
                }
            },
            { $unwind: '$vendor' },
            {
                $project: {
                    vendorId: '$_id',
                    vendorName: '$vendor.name',
                    totalOutstanding: 1,
                    _id: 0
                }
            }
        ]);

        return outstandingPayments.length > 0
            ? outstandingPayments[0]
            : { vendorId, totalOutstanding: 0 };
    } catch (err) {
        throw err;
    }
};

vendorService.getPaymentMethods = async (vendorId) =>{
    try{
        await vendorValidator.findVendor(vendorId);
        const paymentDetails=await vendor.findOne({"vendorId":vendorId},{"_id":0,"paymentMethods":1});
        if(paymentDetails){
            return paymentDetails;
        }
    }
    catch(err){
        throw err;
    }
}

vendorService.addPaymentMethods = async (vendorId,paymentMethod) =>{
    try{
        await vendorValidator.findVendor(vendorId);
        const addedPaymentMethodDetails = await vendor.updateOne({"vendorId": vendorId}, {$push: {paymentMethods: paymentMethod}});
        if (addedPaymentMethodDetails) {
            return addedPaymentMethodDetails;
        }
    }
    catch(err){
        throw err;
    }
}

vendorService.deletePaymentMethods =async(vendorId,paymentMethod)=>{
    const deletedPaymentMethodDetails= await vendor.updateOne({"vendorId": vendorId}, {$pull: {paymentMethods: paymentMethod}});
    if(deletedPaymentMethodDetails){
        return deletedPaymentMethodDetails;
    }
}

vendorService.getStats = async (vendorId) => {
  try {
    await vendorValidator.findVendor(vendorId);
    const startOfYear = new Date(new Date().getFullYear(), 0, 1);
    const monthlyStats = await order.aggregate([
      {
        $match: {
          orderDate: { $gte: startOfYear },
          'products.vendorId': vendorId
        }
      },
      { $unwind: "$products" },
      {
        $match: {
          'products.vendorId': vendorId
        }
      },
      {
        $group: {
          _id: {
            month: { $month: "$orderDate" },
            status: "$products.orderStatus"
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.month",
          stats: {
            $push: {
              status: "$_id.status",
              count: "$count"
            }
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const pendingOrders = Array(12).fill(0);
    const totalOrders = Array(12).fill(0);

    for (const month of monthlyStats) {
      for (const s of month.stats) {
        totalOrders[month._id - 1] += s.count;
        if (s.status === "Pending") {
          pendingOrders[month._id - 1] += s.count;
        }
      }
    }

    const listingsAgg = await product.aggregate([
      {
        $match: {
          vendorId: vendorId,
          createdOn: { $gte: startOfYear }
        }
      },
      {
        $group: {
          _id: { month: { $month: "$createdOn" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.month": 1 } }
    ]);

    const listings = Array(12).fill(0);
    listingsAgg.forEach(item => {
      listings[item._id.month - 1] = item.count;
    });

    const outstandingPayAgg = await order.aggregate([
  {
    $match: {
      orderDate: { $gte: startOfYear }
    }
  },
  { $unwind: "$products" },
  {
    $match: {
      "products.vendorId": vendorId,
      "products.orderStatus": "Pending"
    }
  },
  {
    $lookup: {
      from: "variants",
      localField: "products.variantId",
      foreignField: "_id",
      as: "variant"
    }
  },
  { $unwind: "$variant" },
  {
    $group: {
      _id: { month: { $month: "$orderDate" } },
      totalOutstanding: {
        $sum: {
          $multiply: ["$products.quantity", "$variant.price"]
        }
      }
    }
  },
  { $sort: { "_id.month": 1 } }
]);

const outstandingPay = Array(12).fill(0);
outstandingPayAgg.forEach(item => {
  outstandingPay[item._id.month - 1] = item.totalOutstanding;
});

    function getLastSixMonthsLabels() {
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const result = [];
      const today = new Date();
      let monthIndex = today.getMonth();

      for (let i = 0; i < 6; i++) {
        result.unshift(months[monthIndex]);
        monthIndex--;
        if (monthIndex < 0) monthIndex = 11;
      }
      return result;
    }

    const getLastSixMonthsData = (fullData) => {
      const today = new Date();
      let monthIndex = today.getMonth();
      const data = [];
      for (let i = 0; i < 6; i++) {
        data.unshift(fullData[monthIndex]);
        monthIndex--;
        if (monthIndex < 0) monthIndex = 11;
      }
      return data;
    };

    const last6Months = getLastSixMonthsLabels();

    return {
      months: last6Months,
      pendingOrders: getLastSixMonthsData(pendingOrders),
      totalOrders: getLastSixMonthsData(totalOrders),
      listings: getLastSixMonthsData(listings),
      outstandingPay: getLastSixMonthsData(outstandingPay)
    };
  }
  catch (err) {
    throw err;
  }
}

module.exports = vendorService;