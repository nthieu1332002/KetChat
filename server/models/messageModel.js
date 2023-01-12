const mongoose = require('mongoose')

const messageSchema = mongoose.Schema(
    {
        message: {
            text: {
                type: 'string',
                default : ''
            },
            image: {
                type: 'string',
                default : ''
            }
        },
        users: Array,
        sender: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        status: {
            type: 'string',
            default: 'unseen'
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Message', messageSchema);
