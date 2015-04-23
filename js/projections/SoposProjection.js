var Immutable = require('immutable');
var Decimal = require('decimal.js');

module.exports = {
  path: [ 'cart' ],
  getInitialState: function() {
    return Immutable.fromJS({
      items: Immutable.List(),
      totalAmount: '0.00',
      payments: Immutable.OrderedMap().withMutations(map => map.set('cash','0.00').set('creditCard','0.00')),
      totalPayed: '0.00',
      change: '0.00'
    });
  },
  plus: function(s, e) {
    console.log(e);
    return s.mergeDeep({totalAmount: 10101.99});
  },





  'SoposEvent:SoposStoreStateLoaded': function(s, e) {
    return s.mergeDeep(e.state);
  },
  'SoposEvent:PriceListItemScanned': function(s, e) {  
    var pli = e.priceListItem;
    var barCode = pli.get('barCode');
    var newQty = s.getIn(['items', barCode, 'quantity'], 0) + 1;
    var newPrice = new Decimal(pli.get('price')).times(1 - pli.get('discount')).toFixed(2);
    var newDiscount = pli.get('discount');
    var newAmount = new Decimal(newPrice).times(newQty).toFixed(2);
    var newItem = {priceListItem: pli, quantity: newQty, price: newPrice, discount: newDiscount, amount: newAmount };

    var newTotalAmount = new Decimal(s.getIn(['totalAmount'])).plus(newPrice).toFixed(2);
    var newChange = new Decimal(s.getIn(['totalPayed'])).minus(newTotalAmount).toFixed(2);

    var newState = {
      items: {
        [barCode]: newItem
      },
      totalAmount: newTotalAmount,
      change: newChange
    };
    return s.mergeDeep(newState);
  },
  'SoposEvent:PaymentReceived': function(s, e) {  
    var newPayments = s.getIn(['payments']).merge({[e.paymentType]: e.amount});
    var newTotalPayed = newPayments.reduce( (a, v) => a.plus(v), new Decimal(0)).toFixed(2);
    var newChange = new Decimal(s.getIn(['totalAmount'])).minus(newTotalPayed).toFixed(2);
    var newState = {
      payments: newPayments,
      totalPayed: newTotalPayed,
      change: newChange
    };
    return s.mergeDeep(newState);
  },
  'SoposEvent:ReceiptPrinted': function(s, e) {
    return this.getInitialState();
  }
};
