module.exports = (sequelize, Sequelize) => {
  const Bids = sequelize.define("bids", {
    bidderName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    bidPrice: {
      type: Sequelize.STRING,
      allowNull: false
    },
    itemId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },{
    timestamps: false
  });

  return Bids;
};
