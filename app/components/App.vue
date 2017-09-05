<template lang="jade">
	#app
		// - ROUTER
		router-view(:propCartList="rootPropCartList")
		// - END ROUTER

</template>

<script>


	export default {
		name: 'app',
		props: [
			'rootPropCartList'
		],
		data: function () {
			return {

			}
		},
		mounted: function () {

			//- запускаем виджет ВК в Footer.vue
			VK.Widgets.Group(
				"vk_groups",
				{
					mode: 4,
					width: "350",
					height: "450"
				},
				60332047
			);
			//- END

		}
	}
</script>
