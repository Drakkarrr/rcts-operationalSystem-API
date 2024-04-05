var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from 'mongoose';
import { calculate } from '@/helpers';
import { increaseBySettingKey } from '@/middlewares/settings';
import { checkCurrency } from '@/utils/currency';
const Model = mongoose.model('Offer');
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { items = [], taxRate = 0, discount = 0, currency } = req.body;
        // default
        let subTotal = 0;
        let taxTotal = 0;
        let total = 0;
        if (!checkCurrency(currency)) {
            return res.status(400).json({
                success: false,
                result: null,
                message: "currency doesn't exist",
            });
        }
        // Calculate the items array with subTotal, total, taxTotal
        items.map((item) => {
            let itemTotal = calculate.multiply(item['quantity'], item['price']);
            // sub total
            subTotal = calculate.add(subTotal, itemTotal);
            // item total
            item['total'] = itemTotal;
        });
        taxTotal = calculate.multiply(subTotal, taxRate / 100);
        total = calculate.add(subTotal, taxTotal);
        let body = req.body;
        body['subTotal'] = subTotal;
        body['taxTotal'] = taxTotal;
        body['total'] = total;
        body['items'] = items;
        body['createdBy'] = req.admin._id;
        const result = yield new Model(body).save();
        const fileId = 'offer-' + result._id + '.pdf';
        const updateResult = yield Model.findOneAndUpdate({ _id: result._id }, { pdf: fileId }, {
            new: true,
        }).exec();
        increaseBySettingKey({
            settingKey: 'last_offer_number',
        });
        // Returning successful response
        return res.status(200).json({
            success: true,
            result: updateResult,
            message: 'Offer created successfully',
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            result: null,
            message: 'Internal server error',
        });
    }
});
export default create;
