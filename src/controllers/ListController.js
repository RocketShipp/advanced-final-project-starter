import ListModel from '../models/ListModel';

const ListController = {
  create(req, res, next) {
    const list = new ListModel({title: req.body.title, userId: req.user._id});
    list.save().then(newList => res.json(newList)).catch(err => next(err));
  },
  update(req,res,next) {
    ListModel.findOne({_id: req.params.id, userId: req.user._id}).exec().then(list => {
      if (!list) {
        return next('Cannot update, no list found!');
      }
      list.title = req.params.title;
      return list.save();
    }).then(list => {
      return req.json(list);
    })
    .catc(err => next(err));
  },
  remove(req,res,next) {
    ListModel.findOne({_id: req.params.id, userId: req.user._id}).exec().then(list => {
      if (!list) {
        return next('Could not find that list!');
      }
      return list.save();
    })
    .then(list => {
      return res.json(list);
    })
    .catch(err => next(err));
  },
  show(req,res,next) {
    ListModel.find({userId: req.user._id}).exec()
    .then(list => {
      if (!list) {
        return next('No lists found!');
      }
      return res.json(list);
    })
    .catch(err => next(err));
  },
  specificList(req,res,next) {
    ListModel.findOne({_id: req.params.id, userId: req.user._id}).exec()
    .then(list => {
      if (!list) {
        return next('Could not find that list!');
      }
      return res.json(list);
    })
    .catch(err => next(err));
  }
};

export default ListController;
