import ListModel from '../models/ListModel';

export const create = function (req,res,next) {
  // Find list by ID, and make sure user owns it
  ListModel.findOne({_id: req.params.list_id, userId: req.user._id})
    .then(list => {
      // Create new obj to represent item
      const item = {
        text: req.body.text
      };
      console.log(list);
      // Add item to the list items array
      list.items.push(item);

      // Save list
      return list.save();
    })
    .then(list => {
      // Grab newest item from array
      const newItem = list.items[list.items.length - 1];

      // Return item
      return res.json(newItem);
    })
    .catch(err => next(err));
};

export const update = function (req, res, next) {
  const itemId = req.params.item_id;

  // Find list by ID, and make sure user owns it
  ListModel.findOne({_id: req.params.list_id, userId: req.user._id})
    .exec()
    .then(list => {
      // Find item by its ID
      const item = list.items.id(itemId);

      // Update the item if new attributes are sent, or use current attributes
      item.text = req.body.text || item.text;

      return list.save();
    })
    .then(list => {
      // Return updated item
      return res.json(list.items.id(itemId));
    })
    .catch(err => next(err));
};

export const show = function (req,res,next) {
  const itemId = req.params.item_id;

  // Verifies user ID owns the list
  ListModel.find({_id: req.params.list_id, userId: req.user._id}).exec()
  .then(list => {
    // Returns item
    return res.json(list.items.id(itemId));
  })
  .catch(err => next(err));
};

export const remove = function (req, res, next) {
  const itemId = req.params.item_id;

// Verifies user ID owns the list
  ListModel.findOne({_id: req.params.list_id, userId: req.user._id}).exec()
  .then(list => {
    list.items.id(itemId).remove();
    return list.save();
  })
  .then(list => {
    return res.json(list);
  })
  .catch(err => next(err));
};

const ListItemsController = { create, update, show, remove };

export default ListItemsController;
