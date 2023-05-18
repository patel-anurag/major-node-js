module.exports = (sequelize, Sequelize) => {
  const Item = sequelize.define("item", {
    itemName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    yearOfBuy: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    bidPrice: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    image: {
      type: Sequelize.STRING,
      allowNull: true
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },{
    timestamps: false
  });

  return Item;
};
