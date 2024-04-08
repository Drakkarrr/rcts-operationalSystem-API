import mongoose from 'mongoose';
const Model = mongoose.model('Setting');
const readBySettingKey = async (req, res) => {
    try {
        // Find document by settingKey
        const settingKey = req.params.settingKey;
        if (!settingKey) {
            res.status(202).json({
                success: false,
                result: null,
                message: 'No settingKey provided',
            });
            return;
        }
        const result = await Model.findOne({
            settingKey,
        });
        // If no results found, return document not found
        if (!result) {
            res.status(404).json({
                success: false,
                result: null,
                message: `No document found by this settingKey: ${settingKey}`,
            });
        }
        else {
            // Return success response
            res.status(200).json({
                success: true,
                result,
                message: `Found document by this settingKey: ${settingKey}`,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            result: null,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};
export default readBySettingKey;
//# sourceMappingURL=readBySettingKey.js.map