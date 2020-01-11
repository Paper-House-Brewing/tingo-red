require('tingodb');

module.exports = function (RED) {
    function TingoDBRemoveNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.on('input', function (msg) {
            var db = RED.nodes.getNode(config.db).getDB();

            db.collection(config.collection).remove(msg.payload, { multi: true }, function (err) {
                node.send(msg);
            });
        });
    }
    RED.nodes.registerType("tingodb-remove", TingoDBRemoveNode);
};
