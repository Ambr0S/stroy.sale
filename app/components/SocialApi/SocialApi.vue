<template lang="jade">
    .socialApi
        .socialApi__block.socialApi__group--vk
            #vk_groups
        .socialApi__block.socialApi__group--fb
            <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9-%D0%B4%D0%B8%D1%81%D0%BA%D0%B0%D1%83%D0%BD%D1%82%D0%B5%D1%80-stroysale-798981756933631%2F&tabs=timeline&width=350&height=450&small_header=false&adapt_container_width=false&hide_cover=false&show_facepile=false&appId" width="350" height="450" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>
</template>

<script>
	export default {
		name : 'SocialApi',
		props : [],
		data : function() {
			return {}
		}
	}
</script>