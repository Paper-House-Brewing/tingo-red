require('tingodb');

module.exports = function (RED) {
    function TingoDBUpdateNode(config) {
        RED.nodes.createNode(this, config);

        var node = this;
        node.multi = config.multi;
        node.upsert = config.upsert;
        node.on('input', function (msg) {
            var db = RED.nodes.getNode(config.db).getDB();
            db.collection(config.collection).update(msg.predicate, msg.update, { multi: node.multi, upsert:node.upsert}, function (err) {
                node.send(msg);
            });
        });
    }
    RED.nodes.registerType("tingodb-update", TingoDBUpdateNode);
};