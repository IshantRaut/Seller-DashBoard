const Items = require("../models/items");

exports.addItem = ((req,res,next)=>{
    const name = req.body.name;
    const desc=req.body.desc;
    const price = req.body.price;
    const quantity = req.body.quantity;

   data= Items.create ({
        name:name,
        desc:desc,
        price:price,
        quantity:quantity
    })
    .then(data=>{
        console.log('created Product')
        res.status(201).json({newItems: data});
    })
    .catch(err=>{
        console.log(err)
    })
    
});

exports.getItem = ((req,res,next)=>{
totalItems = Items.findAll()
.then(totalItems=>{
res.status(200).json({allItems: totalItems});
})
.catch(err=>{
    console.log("Get Items is Failing", JSON.stringify(err))
    res.status(500).json({ error: err });
})
});


exports.editItem = (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  Items.findByPk(id)
    .then((item) => {
      if (!item) {
        return res.status(404).send('Item not found');
      }
      return item.update({ quantity });
    })
    .then(() => {
      res.send('Item quantity updated successfully');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Internal server error');
    });
};
  
  
exports.deleteItem = (req, res) => {
  if (req.params.id == "undefined") {
    console.log("ID is Missing");
    return res.status(400).json({ err: "ID is missing" });
  }

  const uId = req.params.id;

  Items.destroy({ where: { id: uId } })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};