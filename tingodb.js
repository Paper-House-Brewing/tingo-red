const Tingo = ((require('tingodb'))({}));
module.exports = function (RED) {
    function TingoDB(n) {
        RED.nodes.createNode(this, n);

        this.path = n.path;
    }

    TingoDB.prototype.getDB = function () {
        return new Tingo.Db(this.path, { name: this.path  });
    };
    RED.nodes.registerType("tingodb", TingoDB);
};