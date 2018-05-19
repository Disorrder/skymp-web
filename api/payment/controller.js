const Model = require('./model');

class PaymentController {
    constructor() {
        this.model = Model;
    }

    async create(data) {
        var item = new Model(data);
        return await item.save();
    }
}
