import mongoose from 'mongoose';
const Model = mongoose.model('Setting');
const readBySettingKey = async ({ settingKey }) => {
    try {
        if (!settingKey) {
            return null;
        }
        const result = await Model.findOne({ settingKey });
        if (!result) {
            return null;
        }
        else {
            return result;
        }
    }
    catch (error) {
        console.error(error);
        return null;
    }
};
export default readBySettingKey;
//# sourceMappingURL=readBySettingKey.js.map