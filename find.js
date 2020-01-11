require('tingodb');

module.exports = function (RED) {
    function TingoDBFindNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.on('input', function (msg) {
            var db = RED.nodes.getNode(config.db).getDB();

            db.collection(config.collection).find(msg.payload).toArray(function (err, docs) {
                msg.payload = docs;
                node.send(msg);
            });
        });
    }
    RED.nodes.registerType("tingodb-find", TingoDBFindNode);
};
