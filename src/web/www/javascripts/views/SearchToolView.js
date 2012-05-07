
OKnesset.app.views.SearchView = new Ext.extend(Ext.Panel, {
			id : 'SearchPanel',
			layout : 'vbox',
			cls : 'textCenter',
			floating : true,
			centered : true,
			width : "90%",
			height : "85%",
			items : [ {
				xtype : 'spacer',
				height : "2em",
				flex :1
			}, {
				xtype : 'searchfield',
				flex :1,
				id: 'searchBox',
				width : "90%",
				//style: 'font-size:.9em;border-radius:.9em;input::-webkit-input-border-radius:.9em',
				style: 'border-top: 0.1em solid rgba(0, 0, 0, 0.2); border-left: 0.1em solid rgba(0, 0, 0, 0.125); border-right: 0.1em solid rgba(0, 0, 0, 0.125); border-bottom: 0.1em solid rgba(0, 0, 0, 0.05);font-size:.9em;border-radius:.9em;input::-webkit-input-border-radius:.9em',
				autoComplete: true,
				autoDestroy: true,
				margin: '2px',
				placeHolder: OKnesset.strings.search,
				text : OKnesset.strings.search,
				listeners : {
					keyup : function() {
						var searchStore = OKnesset.PartyStore;
						//var searchStore = OKnesset.searchStore;
						makeSearchExpression = this.getValue();
						console.log(searchStore.find('name',makeSearchExpression,0,true));

						searchStore.clearFilter();
						var makeSearchExpression=new RegExp(this.getValue(),'i');
						searchStore.filterBy(function (record, id) {
							return (record.data.name.search(makeSearchExpression)>=0);
						});
						console.log(searchStore);
						
					},
				},
				
			}, {
				xtype : 'button',
				id : 'searchBtn',
				width : "50%",
				text : OKnesset.strings.doSearch,
				flex :1
			}, {
				xtype : 'spacer',
				height : "2em"
			}, {
				xtype : 'PartyView',
				scrollable: true,
				flex :6,
				width : "90%",
				height : '90%',				
			}
			
			],
			dockedItems : [ {
				dock : 'top',
				xtype : 'toolbar',
				title : OKnesset.strings.searchTool
			}, {
				dock : 'bottom',
				ui : 'light',
				items : [ {
					xtype : 'button',
					id : 'cancelSearchBtn',
					ui : 'confirm',
					text : OKnesset.strings.back
				} ]
			} ],
			
			initComponent : function() {
		    	var viewport = Ext.ApplicationManager.get("oknesset").viewport;
				this.width = viewport.getWidth() * 0.9;
				this.height = viewport.getHeight() * 0.9;
				OKnesset.app.views.SearchView.superclass.initComponent.apply(this,
						arguments);
			}

});
		

Ext.reg('SearchView', OKnesset.app.views.SearchView);
