<template>
	<div id="app">
		<!-- MENU -->
		<div class="ui inverted massive menu">
			<div class="ui container" style="padding-top: 30px">
				<a href="https://www.crisaty.com" target="_blank">
					<img height="50px" src="/images/new-logo.png" />
				</a>
				<div class="right menu">
					<div class="item">
						<div class="ui action input">
							<input v-model="VIDEO_ID" type="text" placeholder="Ingresa ID del Video" />
							<button class="ui icon button" @click="loadVideo">
								<i class="search icon"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- CONTENT -->
		<div class="pusher" style="padding-top: 40px">
			<youtubeCard :videoId="videoId"></youtubeCard>
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
			VIDEO_ID: null,
			videoId: null
		};
	},
	methods: {
		loadVideo() {
			this.videoId = this.VIDEO_ID;
		}
	}
};
</script>

<style>
body {
	background-color: #252525;
}
</style>
