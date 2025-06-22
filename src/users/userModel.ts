import mongoose from 'mongoose';
import { UserT } from './userTypes';


const userSchema = new mongoose.Schema<UserT>({

    name:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50

    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (value: string) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email format',
        },
    },
    password:{
        type: String,
        required: true,
        minlength: 4,
        maxlength: 100,  
    }
},
{timestamps: true}
);


 const User = mongoose.model<UserT>('User', userSchema);
 export default User;