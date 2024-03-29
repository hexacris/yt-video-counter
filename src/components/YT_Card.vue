<template>
	<!-- eslint-disable -->
	<div class="card_component">
		<div class="ui two column centered grid">
			<div class="column">
				<div class="ui fluid raised card" id="card">
					<div class="image">
						<youtube
							id="video"
							:video-id="videoId"
							:player-width="700"
							:player-vars="{ autoplay: 1, controls: 0 }"
							:mute="true"
						></youtube>
					</div>
					<div class="content">
						<div class="header">
							<h1>{{ title }}</h1>
						</div>
						<div class="meta" style="padding-top: 5px; font-size: 1.3em">{{ category }}</div>

						<div class="ui two column centered grid" v-if="loaded">
							<div class="ui statistics" id="statistics">
								<div class="statistic">
									<div class="value">
										<i class="grey eye icon icon-animated"></i>
										<ICountUp :delay="delay" :endVal="viewCount" :options="options" @ready="counterViewStart" />
									</div>
									<div class="label">Visualizaciones</div>
								</div>

								<div class="statistic">
									<div class="value">
										<i class="red like icon icon-animated"></i>
										<ICountUp :delay="delay" :endVal="likeCount" :options="options" @ready="counterLikeStart" />
									</div>
									<div class="label">Me Gusta</div>
								</div>

								<div class="statistic">
									<div class="value">
										<i class="blue comment icon icon-animated"></i>
										<ICountUp :delay="delay" :endVal="commentCount" :options="options" @ready="counterCommentStart" />
									</div>
									<div class="label">Comentarios</div>
								</div>
							</div>
						</div>
					</div>
					<div class="ui bottom attached red progress" data-value="100" data-total="1000" id="progress-bar">
						<div class="bar"></div>
					</div>
					<div class="ui inverted segment">
						<div class="extra content" style="text-transform: capitalize; font-size: 1.3em">
							<span class="right floated">{{ date }}</span>
							<span>
								<img height="25px" src="/images/new-logo.png" />
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ICountUp from "vue-countup-v2";
import * as moment from "moment";

export default {
	name: "YOUTUBE_VIDEO_COUNTER",

	props: {
		videoId: {
			type: String
		}
	},

	components: {
		ICountUp
	},
	data: function() {
		return {
			IMG_URL: "/images/bg.png",
			// VIDEO_ID: process.env.VUE_APP_VIDEO_ID,
			title: "",
			category: "",
			viewCount: 0,
			likeCount: 0,
			commentCount: 0,
			date: "",
			// COUNTER
			delay: 200,
			options: {
				useEasing: true,
				useGrouping: true,
				separator: ".",
				decimal: ".",
				prefix: "",
				suffix: "",
				duration: 15
			},
			loaded: false
		};
	},
	methods: {
		clearState() {
			this.title = null;
			this.category = null;
			this.viewCount = 0;
			this.likeCount = 0;
			this.commentCount = 0;
			this.date = null;
		},

		async fetchVideoData() {
			const API_KEY = process.env.VUE_APP_API_KEY;
			const url = `https://www.googleapis.com/youtube/v3/videos?id=${this.videoId}&key=${API_KEY}&part=snippet,statistics`;

			try {
				const response = await fetch(url);
				const data = await response.json();
				var CATEGORY_ID = data["items"][0]["snippet"]["categoryId"];
				const url_category = `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&hl=es_ES&id=${CATEGORY_ID}&key=${API_KEY}`;
				const response_cat = await fetch(url_category);
				const data_cat = await response_cat.json();

				this.loaded = true;
				this.category = data_cat["items"][0]["snippet"]["title"];
				this.IMG_URL = data["items"][0]["snippet"]["thumbnails"]["high"]["url"];
				this.title = data["items"][0]["snippet"]["title"];
				this.viewCount = Number(data["items"][0]["statistics"]["viewCount"]);
				this.likeCount = Number(data["items"][0]["statistics"]["likeCount"]);
				this.commentCount = Number(data["items"][0]["statistics"]["commentCount"]);
				moment.locale("es");
				this.date = data["items"][0]["snippet"]["publishedAt"];
				this.date = moment(this.date).format("LLLL");

				// PROGRESS BAR
				window.fakeProgress = setInterval(function() {
					$("#progress-bar").progress("increment");
					// stop incrementing when complete
					if ($("#progress-bar").progress("is complete")) {
						clearInterval(window.fakeProgress);
						$(".img-animated")
							.transition("remove looping")
							.transition("browse in", "1000ms");
					}
				}, 10);

				$("#progress-bar").progress({
					duration: 1000,
					total: 1000
				});

				// ANIMATIONS
				$("#card").transition("browse in", "1000ms");

				$(".icon-animated")
					.transition("set looping")
					.transition("pulse", "2000ms");

				$(".img-animated")
					.transition("set looping")
					.transition("pulse", "2000ms");
			} catch (error) {
				this.loaded = false;
				this.clearState();
			}
		},

		counterViewStart: function(instance, CountUp) {
			instance.update(this.viewCount);
		},

		counterLikeStart: function(instance, CountUp) {
			instance.update(this.likeCount);
		},

		counterCommentStart: function(instance, CountUp) {
			instance.update(this.commentCount);
		}
	},

	watch: {
		videoId() {
			this.fetchVideoData();
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
* {
	color: rgba(255, 255, 255, 0.9);
}

.label {
	color: rgba(255, 255, 255, 0.7) !important;
}
#statistics {
	padding-top: 40px;
	padding-bottom: 40px;
	padding-left: 20px;
	padding-right: 20px;
}

#video {
	object-fit: cover;
	height: 360px;
}

.ui.fluid.card {
	max-width: 700px !important;
	max-height: 700px !important;
	background-image: url("/images/bg.png");
}

.ui.progress.attached,
.ui.progress.attached .bar {
	height: 0.6rem;
}

.ui.card .meta,
.ui.cards > .card .meta {
	font-size: 1em;
	color: rgba(255, 255, 255, 0.5);
	font-weight: 600;
}

@mixin filter($filter, $value) {
	-webkit-filter: $filter + unquote("(#{$value})");
	-moz-filter: $filter + unquote("(#{$value})");
	-ms-filter: $filter + unquote("(#{$value})");
	-o-filter: $filter + unquote("(#{$value})");
	filter: $filter + unquote("(#{$value})");
}

.image img {
	@include filter(opacity, 90%);
}

.ui.statistics > .statistic {
	margin: 0.5em !important;
}

.ui.card,
.ui.cards > .card {
	box-shadow: none !important;
}
</style>
