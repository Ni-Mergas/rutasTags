
const{ Schema, model } = require('mongoose');

const TagSchema = Schema({

    name:{
        type: String,
        required:[true, ' nombre obligatorio']
    },

    category:{
        type: String
    },

    status:{
        type:Boolean,
        default:true
    }
});

TagSchema.methods.toJSON = function(){
    const {__v, _id, ...tags} = this.toObject();
    return tags;
}

module.exports = model('tag',TagSchema);