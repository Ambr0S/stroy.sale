<template lang="jade">
    .socialApi
        .socialApi__block.socialApi__group--vk
            #vk_groups
        .socialApi__block.socialApi__group--fb
          <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F%25D0%25A1%25D1%2582%25D1%2580%25D0%25BE%25D0%25B8%25D1%2582%25D0%25B5%25D0%25BB%25D1%258C%25D0%25BD%25D1%258B%25D0%25B9-%25D0%25B4%25D0%25B8%25D1%2581%25D0%25BA%25D0%25B0%25D1%2583%25D0%25BD%25D1%2582%25D0%25B5%25D1%2580-stroysale-798981756933631%2F&tabs=timeline&width=300&height=450&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="300" height="450" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>
</template>

<script>
	export default {
		name : 'SocialApiComponent',
		data : function() {
			return {}
		},
		mounted() {


			
			// запускаем виджет ВК
			VK.Widgets.Group(
				"vk_groups",
				{
					mode: 4,
          width: "300",
					height: "450"
				},
				60332047
			);

		}
	}
</script>