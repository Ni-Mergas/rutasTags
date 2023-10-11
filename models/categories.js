
const {Schema, model} = require('mongoose');


const CategorieSchema = Schema({
    name:{
        type:String,
        required:[true,'nombre obligatorio']
    },
    category:{
        type:String,
        required:[true,'catetgoria obligatoria']
    },
    status:{
        type:Boolean,
        default:true
    }
});

CategorieSchema.methods.toJSON = function (){
    const { __v, password, _id, ...categories} = this.toObject();
    return categories;
}
module.exports = model( 'Categorie',CategorieSchema);

