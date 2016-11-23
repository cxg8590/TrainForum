const models = require('../models');
const Domo = models.Domo;
let idnum = 0;
const makerPage = (req, res) => {
  Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    console.log('Domo Here');
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.render('app', { csrfToken: req.csrfToken(), domos: docs, profImg: req.session.account.pic });
  });
    // res.render('app');
};

const makeDomo = (req, res) => {
  if (!req.body.name || !req.body.age) {
    // console.log("req: "+req.session.account+" res: "+res);
  }

  idnum++;

  const domoData = {
    name: req.session.account.username,
    message: req.body.message,
    id: idnum,
    color: req.session.account.color,
    pic: req.session.account.pic,
    owner: req.session.account._id,
  };


  const newDomo = new Domo.DomoModel(domoData);

  return newDomo.save((err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    return res.json({ redirect: '/maker' });
  });
};

module.exports.makerPage = makerPage;
module.exports.make = makeDomo;
