$(function(){

    
    var vm = new Vue({
        el: '#parser',
        data: function() {
            return {
                catalogList: '../json/first.json',
                myjson: [],
                outjson: [],
                sale: '0.3'
             }
        },
        mounted: function() {
            this.loadJSON(); 
        },
        methods: {
            loadJSON : function() {
                var self = this;
                axios.get(this.catalogList)
                .then(function(response) {
                        var i = response.data;
                        i.forEach(function(x) {           
                            x.sale = self.sale;
                            x.price = x.price.slice(0,-1);
                            if ( x.text.length == 0 ) {
                                delete x.text
                            }
                        })
                        self.myjson = i;
                        console.log(self.myjson[0].sale)    
                    }, 
                    function(err) {
                        console.log(err)
                    }
                )     
            }
        }
    })


})