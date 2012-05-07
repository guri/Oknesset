Ext.regController('Search', {

    // index action
	Index: function(options)
    {
        if ( ! this.view)
        {
            this.view = this.render({
                xtype: 'SearchView',
            });

            this.view.query('#cancelSearchBtn')[0].setHandler(function(){
            	//OKnesset.searchStore.clearFilter();
            	OKnesset.app.controllers.navigation.dispatchBack();
            });

            searchview = this.view;
            console.log(searchview.query('#searchBtn')[0]);
            searchview.query('#searchBtn')[0].setHandler(function(searchview){
            	console.log(searchview);
            	//OKnesset.app.controllers.navigation.dispatchBack();
            });

            // guri : My efforts to impliment a listener/handler to the searchbox seperated from view...
            //console.log(this.view.query('#searchBox'));
            /*this.view.query('#searchBox')[0].addListener('#searc hBox','bla',function(){
            	console.log('search text typed');
            	//OKnesset.app.controllers.navigation.dispatchBack();
        	});*/           
            /*this.view.query('#searchBox')[0].setHandler(function(){
            	console.log('search text typed');
            	//OKnesset.app.controllers.navigation.dispatchBack();
            });*/        
 
        }


    	this.view.show(options.animation);

    },
});