const order = require('../models/order');
const customerValidator = require('../utilities/customerValidator');
const orderValidator = require('../utilities/orderValidator');
const vendorValidator = require('../utilities/vendorValidator');

const orderService = {};

orderService.order = async (orderDetails) => {
    try {
        const orderedDetails = await order.insertOne(orderDetails);
        if (orderedDetails) {
            await orderValidator.manageQuantity(orderDetails);
            return orderedDetails;
        }
    }
    catch (err) {
        throw err;
    }
}

orderService.getOrder = async (orderId) => {
    try {
        await orderValidator.findOrder(orderId);
        const orderDetails = await order.findOne({"orderId": orderId});
        if (orderDetails) {
            return orderDetails;
        }
    }
    catch (err) {
        throw err;
    }
}

orderService.getOrdersByCustomer = async(customerId) => {
    try {
        await customerValidator.findCustomer(customerId);
        const ordersList = await order.find({"customerId": customerId});
        if (ordersList) {
            return ordersList;
        }
    }
    catch (err) {
        throw err;
    }
}

orderService.setOrderStatus = async(orderId, variantId, status) => {
    try {
        await orderValidator.findOrder(orderId);
        const orderDetails = await order.findOneAndUpdate({"orderId": orderId, "products.variantId": variantId}, {$set: {"products.$.orderStatus": status}}, {new: true, runValidations: true});
        if (orderDetails) {
            return orderDetails;
        }
    }
    catch (err) {
        throw err;
    }
}

orderService.getOrdersByVendor = async(vendorId) => {
    try {
        await vendorValidator.findVendor(vendorId);
        const orderDetails = await order.aggregate([
            {
                $addFields: {
                  filteredProducts: {
                    $filter: {
                      input: "$products",
                      as: "product",
                      cond: { $eq: ["$$product.vendorId", vendorId] }
                    }
                  }
                }
              },
              {
                $match: {
                  $expr: {
                    $eq: [{ $size: "$filteredProducts" }, { $size: "$products" }]
                  }
                }
              },
              {
                $project: {
                  products: "$filteredProducts",
                  customer: 1,
                  createdAt: 1,
                  status: 1
                }
              }
        ]);
        return orderDetails;
    }
    catch (err) {
        throw err;
    }
}

orderService.getPendingOrdersByVendor = async(vendorId) => {
    try {
        await vendorValidator.findVendor(vendorId);
        const orderDetails = await order.aggregate([
            {
                $addFields: {
                  filteredProducts: {
                    $filter: {
                      input: "$products",
                      as: "product",
                      cond: {
                        $and: [
                          { $eq: ["$$product.vendorId", vendorId] },
                          { $eq: ["$$product.orderStatus", "Pending"] }
                        ]
                      }
                    }
                  }
                }
              },
              {
                $match: {
                  "filteredProducts.0": { $exists: true }
                }
              },
              { $unwind: "$filteredProducts" },
              {
                $lookup: {
                  from: "products",
                  localField: "filteredProducts.productId",
                  foreignField: "_id",
                  as: "productDetails"
                }
              },
              { $unwind: "$productDetails" },
              {
                $addFields: {
                  "filteredProducts.imageUrl": "$productDetails.imageUrl"
                }
              },
              {
                $group: {
                  _id: "$_id",
                  customer: { $first: "$customerId" },
                  orderDate: { $first: "$orderDate" },
                  orderStatus: { $first: "$orderStatus" },
                  deliveryAddress: { $first: "$deliveryAddress" },
                  products: { $push: "$filteredProducts" }
                }
              },
              {
                $project: {
                  products: 1,
                  customer: 1,
                  orderDate: 1,
                  deliveryAddress: 1,
                  status: 1
                }
              }
        ]);
        return orderDetails;
    }
    catch (err) {
        throw err;
    }
}

orderService.getTopVendors = async () => {
    try {
        const topVendors = await order.aggregate([
            { $unwind: "$products" },
            {
              $match: {
                "products.orderStatus": "Completed"
              }
            },
            {
              $group: {
                _id: "$products.vendorId",
                totalOrders: { $sum: 1 }
              }
            },
            { $sort: { totalOrders: -1 } },
            {
              $lookup: {
                from: "vendors",
                localField: "_id",
                foreignField: "_id",
                as: "vendor"
              }
            },
            { $unwind: "$vendor" },
            {
              $project: {
                _id: 0,
                vendorId: "$vendor._id",
                vendorName: "$vendor.name",
                storeName: "$vendor.storeName",
                rating: "$vendor.rating",
                totalOrders: 1
              }
            }
        ]);
        return topVendors;
    }
    catch (err) {
        throw err;
    }
}

orderService.getTopProducts = async () => {
  try {
    const topProducts = await order.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.productId",
          totalSold: { $sum: "$products.quantity" }
        }
      },
      { $sort: { totalSold: -1 } },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },
      { $unwind: "$product" },
      {
        $lookup: {
          from: "variants",
          let: { variantIds: "$product.variants" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$_id", "$$variantIds"]
                }
              }
            },
            { $limit: 1 }
          ],
          as: "variant"
        }
      },
      { $unwind: "$variant" },

      {
        $project: {
          _id: 0,
          productId: "$_id",
          name: "$product.name",
          imageUrl: "$product.imageUrl",
          totalSold: 1,
          price: "$variant.price"
        }
      }
    ]);

    return topProducts;
  } catch (err) {
    throw err;
  }
};




module.exports = orderService;