require('tingodb');

module.exports = function (RED) {
    function TingoDBInsertNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.on('input', function (msg) {
            var db = RED.nodes.getNode(config.db).getDB();

            db.collection(config.collection).insert(msg.payload, function (err) {
                node.send(msg);
            });
        });
    }
    RED.nodes.registerType("tingodb-insert", TingoDBInsertNode);
};
