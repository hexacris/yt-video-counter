<template>
	<div id="app">
		<!-- Following Menu -->
		<div class="ui inverted massive menu">
			<div class="ui container">
				<img height="80" src="/images/logo-navbar.png" />
				<div class="right menu">
					<div class="item">
						<div class="ui inverted left icon input">
							<input v-model="VIDEO_ID" type="text" placeholder="Ingresa ID del Video" />
							<i class="search icon"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Page Contents -->
		<div class="pusher" style="padding-top: 40px">
			<youtubeCard :VIDEO_ID="VIDEO_ID"></youtubeCard>
		</div>
	</div>
</template>

<script>
import youtubeCard from "./components/YT_Card.vue";

export default {
	name: "App",
	components: {
		youtubeCard
	},
	data() {
		return {
			VIDEO_ID: null
		};
	}
};
</script>

<style>
body {
	background-color: #1b1c1e;
}
</style>
