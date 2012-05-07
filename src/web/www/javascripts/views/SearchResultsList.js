
OKnesset.app.views.SearchView.SearchResultsList = new Ext.extend(Ext.List, {
	id : 'SearchResultsList',
	itemTpl : '<div>{#} {name}</div>',
	store : OKnesset.PartyStore,
	onItemDisclosure : true
});

Ext.reg('SearchResultsList', OKnesset.app.views.SearchView.SearchResultsList );




/**
 * The Member list panel (׳‘׳ ׳™׳�׳™׳� ׳ ׳×׳ ׳™׳”׳•, ׳’׳“׳¢׳•׳� ׳¡׳¢׳¨) shows a list of members
 * of the current selected party
 */
OKnesset.app.views.PartyView = new Ext.extend(Ext.Panel, {
			id : 'PartyView',
			layout : 'fit',
			title : '',
			currentParty : null,
		    initComponent: function()
		    {
		    	this.memberList = new OKnesset.app.views.PartyView.MemberList();
		    	this.items = [this.memberList];
		        OKnesset.app.views.PartyView.superclass.initComponent.apply(this, arguments);
		    }
		});

Ext.reg('PartyView', OKnesset.app.views.PartyView);

OKnesset.app.views.PartyView.MemberList = new Ext.extend(Ext.List, {
	id : 'MemberList',
	itemTpl : '<div>{#} {name}</div>',
	store : OKnesset.MemberStore,
	onItemDisclosure : true
});
