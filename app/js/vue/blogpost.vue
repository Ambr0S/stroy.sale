<template lang="jade">
    .row.blogpost-wp
        .col-sm-12
            .post-date {{postDate}}
            h2.text-center.post-header {{postTitle}}
            .post
</template>

<script>
    module.exports = {
        name : 'blogpost',
        props : ['post'],
        data : function() {
            return {

            }
        },
        watch : {

        },
        computed : {
            postActive : function() {
                return this.post[this.postId];
            },
            postId : function() {
                return this.$route.params.id;
            },
            postText: function() {
                let text = this.postActive.text
                return text;
            },
            postTitle: function() {
                let title = this.postActive.title
                return title;
            },
            postDate: function() {
                let date = this.postActive.date
                return date;
            }
        },
        mounted : function() {
            let post = document.querySelector('.post');
            post.innerHTML = this.postText;
            //allPost.style.display = 'none';

            var allPost = document.querySelector('.allPost');
            console.log(allPost);
        }, 
        methods : {

        },
        filters: {

        }
    }
</script>