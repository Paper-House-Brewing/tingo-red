require('tingodb');

module.exports = function (RED) {
    function TingoDBFindOneNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.on('input', function (msg) {
            var db = RED.nodes.getNode(config.db).getDB();
            //console.log(msg.payload);
            //msg.payload = "tata"
            //node.send(msg);
            //collection.findOne({userId:msg.payload.params.userId}, printFunction)
            db.collection(config.collection).findOne(msg.payload,function (err, docs) {
                //TODO add error too. :\
                msg.payload = docs;
                node.send(msg);
            });
        });
    }
    RED.nodes.registerType("tingodb-findOne", TingoDBFindOneNode);
};
