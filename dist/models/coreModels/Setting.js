import mongoose, { Schema } from 'mongoose';
const settingSchema = new Schema({
    removed: {
        type: Boolean,
        default: false,
    },
    enabled: {
        type: Boolean,
        default: true,
    },
    settingCategory: {
        type: String,
        required: true,
        lowercase: true,
    },
    settingKey: {
        type: String,
        lowercase: true,
        required: true,
    },
    settingValue: {
        type: mongoose.Schema.Types.Mixed,
    },
    valueType: {
        type: String,
        default: 'String',
    },
    isPrivate: {
        type: Boolean,
        default: false,
    },
    isCoreSetting: {
        type: Boolean,
        default: false,
    },
});
export default mongoose.model('Setting', settingSchema);
//# sourceMappingURL=Setting.js.map