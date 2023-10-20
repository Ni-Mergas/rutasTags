
const{ Schema, model } = require('mongoose');

const TagSchema = Schema({

    name:{
        type: String,
        required:[true, ' nombre obligatorio']
    },

    status:{
        type:Boolean,
        default:true
    }
});

TagSchema.methods.toJSON = function(){
    const {__v, _id, ...tags} = thi.toObject();
    return tags;
}

module.exports = model('tag',TagSchema);