<template>
	<div id="app">
		<!-- MENU -->
		<div class="ui inverted massive menu">
			<div class="ui container">
				<a href="https://www.crisaty.com" target="_blank">
					<img height="80px" src="/images/logo-navbar.png"/>
				</a>
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
		<!-- CONTENT -->
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
