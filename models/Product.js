var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  productId: Number,
  productCategory: String,
  description: String,
  unitPrice: Number,
  stores: [{
         storeId: String,
         storeName: String,
         latitude: Number,
         longitude: Number,
         currentStock: Number,
         reorderLavel: Number,
  }],
  updatedDate: { type: Date, default: Date.now },
  updatedBy:  String,
});

module.exports = mongoose.model('Product', ProductSchema);