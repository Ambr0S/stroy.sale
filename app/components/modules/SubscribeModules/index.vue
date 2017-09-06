<template lang="jade">
    .container-fluid.subscribe
        .row
            .col-sm-12
                .subscribe__header.text-center Не нашли нужный товар?
                .subscribe__description.text-center Оставьте заявку и мы уведомим вас о поступлении и<br>подарим 500 рублей на покупку!
                form-order(:propTemplate="'subscribe'", :propButtonStyle="'green'")
</template>

<script>
    import FormOrder from '../FormOrderModules/index.vue'
    export default {
        name : 'SubscribeComponent',
        data : function() {
            return {}
        },
        components: {
        	FormOrder
        }
    }
</script>