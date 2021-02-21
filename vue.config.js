module.exports = {
	transpileDependencies: ["vuetify"],
	devServer: {
		port: 1001,
		host: "0.0.0.0",
		watchOptions: {
			poll: true
		},
		disableHostCheck: true
	}
};
