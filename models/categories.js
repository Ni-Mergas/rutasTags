
const {Schema, model} = require('mongoose');


const CategorieSchema = Schema({
    name:{
        type:String,
        required:[true,'nombre obligatorio']
    },
    category:{
        type:String,
        required:[true,'category es obligatorio']
    
    },
    status:{
        type:Boolean,
        default:true
    }
});

CategorieSchema.methods.toJSON = function (){
    const { __v, _id, ...categories} = this.toObject();
    return categories;
}
module.exports = model( 'Categorie',CategorieSchema);

