Ext.regController('Member', {

    // index action
    Index: function(options){
        if (!this.memberView) {
            this.memberView = this.render({
                xtype: 'MemberView',
            });
            var billList = this.memberView.query('#MemberBillList')[0];
			var memberController = this;
            billList.addListener('itemtap', function(that, index, item, e){
                var record = that.store.getAt(index);
                memberController._gotoBill(record);
            });
        }

        // TODO the memberController page should not rely on the MemberStore to contain party members
        // the way the stores are organized should change
        var member = OKnesset.MemberStore.findBy(function(r){
            return r.data.id === parseInt(options.id)
        });
        member = this.currentMember = OKnesset.MemberStore.getAt(member).data;

        GATrackMember(member.name);

        this.memberView.query('#MemberImage')[0].update({
            img_url: "images/members/" +
            member.img_url.substring(member.img_url.lastIndexOf('/') + 1)
        });

        this.updateData(member);

        // scroll bill list up
        if (options.pushed) {
            var billList = this.memberView.query('#MemberBillList')[0];
            if (billList.scroller) {
                billList.scroller.scrollTo({
                    x: 0,
                    y: 0
                });
            }
        }
        // if there are no bills for the current member, display a text explaining
        // that.
        if (this.hasExcuseForNoBills(member)) {
            this.memberView.query('#MemberBillList')[0].emptyText = "<br/><br/><br/>" +
            OKnesset.strings.excuseForNoBills;
        } else {
            this.memberView.query('#MemberBillList')[0].emptyText = "";
        }
        this.memberView.query('#MemberBillList')[0].refresh();

        this.application.viewport.setActiveItem(this.memberView, options.animation);
    },

    getReviewButtonText: function(){
        return Ext.util.Format.format(OKnesset.strings.emailMember, this.currentMember.name);
    },

    updateData: function(member){
        this.memberView.query('#MemberBillsTitle')[0].update({
            billNumber: member.bills.length,
            hasExcuseForNoBills: this.hasExcuseForNoBills(member)
        });
        this.memberView.query('#MemberInfo')[0].update(member);
        OKnesset.MemberBillsStore.loadData(member.bills);
        this.application.viewport.query('#toolbar')[0].setTitle(member.name);
    },

    refresh: function(){
        // get current member data from Party store, which is updated
        var party = getPartyFromPartyStoreByName(this.currentMember.party);
        Ext.iterate(party.data.members, function(value, index){
            if (value.data.id === this.currentMember.id) {
                this.updateData(value.data);
                return false;
            }
        }, this);

        var billList = this.memberView.query('#MemberBillList')[0];
        billList.refresh();
    },

    /**
     * Returns true if the member is a minister, or is the chairperson of the
     * Knesset.
     *
     * @param member
     * @returns {Boolean}
     */
    hasExcuseForNoBills: function(member){
        return (member.roles.indexOf(OKnesset.strings.ministerIndicator) != -1 || member.roles === OKnesset.strings.knessetChairman);
    },

    /**
     * Open Bill in browser. open the browser to display the bill in oknesset.org's
     * website
     */
    _gotoBill: function(record){
        var bill = record.data;
        var url = 'http://www.oknesset.org' + bill.url;
        if (isPhoneGap()) {
            if (isiOS()) {
                // Since in iOS opening the browser exists the application,
                // the user should be prompted if she wishes to do so.
				var that = this;
                navigator.notification.confirm(null, function(idx){
                    if (idx == 2) {
                        that._gotoBillCallback(url, bill.url)
                    } else {
                        // track bill cancel
                        GATrackBillCanceled(bill.url)
                    }
                }, OKnesset.strings.openBillText, OKnesset.strings.dialogOKCancel);
            } else {// android
                this._gotoBillCallback(url, bill.url);
            }
        }
        // TODO for web version - open a new browser tab

    },

    _gotoBillCallback: function(url, billUrl){
        // in iOS, this function is called form native code, and it is necessary
        // that the next call to native code via phonegap command would not be
        // executed in the same "thread".
        window.setTimeout(function(){
            GATrackBill(billUrl, function(){
                if (isAndroid()) {
                    window.plugins.webintent.startActivity({
                        action: WebIntent.ACTION_VIEW,
                        url: url
                    }, function(){
                        // success callback
                    }, function(){
                        alert(OKnesset.strings.errorOpenBill)
                    });
                } else if (isiOS()) {
                    document.location = url;
                }
            });
        }, 10);
    }


});
