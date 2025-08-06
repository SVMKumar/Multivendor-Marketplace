const product = require('../models/product');
const variant = require('../models/variant');
const productValidator = require('../utilities/productValidator');
const variantValidator = require('../utilities/variantValidator');

const productService = {};


productService.getProducts = async () => {
    try {
      const productList = await product.aggregate([
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
            price: "$variant.price",
            createdOn: 1,
            productId: 1
          }
        }
      ]);
  
      return productList;
    } catch (err) {
      let error = new Error("Internal Server Error");
      error.status = 500;
      throw error;
    }
  };
  

productService.getProductDetails = async (productId) => {
    try {
        await productValidator.findProduct(productId);
        const productDetails = await product.findOne({"productId": productId});
        if (productDetails) {
            return productDetails;
        }
    }
    catch (err) {
        throw err;
    }
}

productService.getVariantDetails = async(productId, variantId) => {
    try {
        await productValidator.findProduct(productId);
        await variantValidator.findVariant(variantId);
        const variantDetails = await variant.findOne({"_id": variantId});
        if (variantDetails) {
            return variantDetails;
        }
    }
    catch (err) {
        throw err;
    }
}

productService.getCategories = async () => {
    try {
      const itemDetails = await product.aggregate([
        {
          $group: {
            _id: "$category",
            product: { $first: "$$ROOT" }
          }
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            imageUrl: "$product.imageUrl"
          }
        }
      ]);
      return itemDetails;
    } catch (err) {
      const error = new Error("Internal Server Error");
      error.status = 500;
      throw error;
    }
};

productService.getProductsByCategory = async (category) => {
    try {
        const productsList = await product.aggregate([
          {
            $match: {
              category: category
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
}


productService.getProductsBySearch = async (identifier) => {
    try {
      const products = await product.aggregate([
        {
          $match: {
            $or: [
              { name: { $regex: identifier, $options: 'i' } },
              { description: { $regex: identifier, $options: 'i' } },
              { category: { $regex: identifier, $options: 'i' } }
            ]
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
            price: "$variant.price",
            productId: 1
          }
        }
      ]);
      return products;
    }
    catch (err) {
      console.log(err);
      let error = new Error("Internal Server Error");
      error.status = 500;
      throw error;
    }
  };
  

module.exports = productService;