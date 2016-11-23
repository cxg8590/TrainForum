const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let DomoModel = {};

const setName = name => _.escape(name).trim();

const DomoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  message: {
    type: String,
    min: 0,
    required: true,
  },

  pic: {
    type: String,
    required: true,
  },

  color: {
    type: String,
    required: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

DomoSchema.statics.toAPI = doc => ({
  name: doc.name,
  message: doc.message,
  id: doc.id,
  color: doc.color,
});

DomoSchema.statics.findByOwner = (ownerId, callback) => DomoModel.find().select('name message pic color').exec(callback);

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;
