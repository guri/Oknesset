

Ext.regModel('Party', {
    fields: ['name']
});

OKnesset.PartyStore = new Ext.data.Store({
    model: 'Party',
	sorters: [
		 	{
			property: 'members.length',
			direction: 'ASC'
			}
	],
    data: slimData
});

Ext.regModel('Member', {
    fields: ['name']
});

OKnesset.MemberStore = new Ext.data.Store({
    model: 'Member',
	sorters : []
});

Ext.regModel('MemberBills', {
    fields: ['title']
});

OKnesset.MemberBillsStore = new Ext.data.Store({
    model: 'MemberBills',
	filters : {
    filterFn: function(item) {
    	    return parseInt(item.data.stage) >= 2;
 	   }
	},
    sorters: {
			property: 'stage',
			direction: 'DESC'
			},
	getGroupString : function(record) {
        return record.get('stage_text');
    }
});

/*
Ext.regModel('Entity', {
    fields: ['name']
});

OKnesset.searchStore = new Ext.data.Store({
    model: 'Entity',
	sorters: [
		 	{
			property: 'members.length',
			direction: 'ASC'
			}
	],
    data: searchData
});

*/