require('tingodb');

module.exports = function (RED) {
	function TingoDBReplaceOneNode(config) {
		RED.nodes.createNode(this, config);
		let node = this;

		node.upsert = config.upsert;

		node.on('input', function (msg) {
			let db = RED.nodes.getNode(config.db).getDB();
			/**
			 * Because the native TingoDB collection doesn't have the replaceOne function (and I'm too lazy to extend it)
			 * We are going to pull a bit of trickery.
			 * Usage: We wanted the replaceOne so that we can maintain a desired collection layout as well as prevent
			 * the collection from growing unnecessarily in overall size.
			 * Method: We combine the usage of collection}.update(.. , .. , upsert:true) and{collection}.compactCollection
			 */
			db.collection(config.collection).update(msg.predicate, msg.update, { upsert:node.upsert}, function (err) {
				if (err) {
					return node.send(err);
				}
			});
			db.collection(config.collection).compactCollection(function (err) {
				node.send(err || msg);
			});
		});
	}
	RED.nodes.registerType("tingodb-replaceone", TingoDBReplaceOneNode);
};