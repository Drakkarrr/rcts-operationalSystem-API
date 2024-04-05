var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { migrate } from './migrate';
const paginatedList = (Model, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page ? parseInt(req.query.page.toString()) : 1;
    const limit = parseInt(req.query.items.toString()) || 10;
    const skip = page * limit - limit;
    const { sortBy = 'enabled', sortValue = -1, filter, equal, } = req.query;
    const fieldsArray = req.query.fields ? req.query.fields.split(',') : [];
    let fields;
    fields = fieldsArray.length === 0 ? {} : { $or: [] };
    for (const field of fieldsArray) {
        fields.$or.push({ [field]: { $regex: new RegExp(req.query.q.toString(), 'i') } });
    }
    //  Query the database for a list of all results
    const resultsPromise = Model.find(Object.assign({ removed: false, [filter]: equal }, fields))
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sortValue })
        .populate()
        .exec();
    const countPromise = Model.countDocuments(Object.assign({ removed: false, [filter]: equal }, fields));
    const [result, count] = yield Promise.all([resultsPromise, countPromise]);
    const pages = Math.ceil(count / limit);
    const pagination = { page, pages, count };
    if (count > 0) {
        const migratedData = result.map((x) => migrate(x));
        return res.status(200).json({
            success: true,
            result: migratedData,
            pagination,
            message: 'Successfully found all documents',
        });
    }
    else {
        return res.status(203).json({
            success: true,
            result: [],
            pagination,
            message: 'Collection is Empty',
        });
    }
});
export default paginatedList;
