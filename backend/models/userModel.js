const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.statics.signup = async function (email, password) {
    
    if (!email || !password) {
        throw Error('Email and password are required');
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough');
    }



    const exists = await this.findOne({ email });

    if (exists) {
        throw Error('User with this email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hashedPassword });
    return user;
}


userSchema.statics.login = async function (email, password) {

    if (!email || !password) {
        throw Error('Email and password are required');
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw Error('Invalid credentials');
    }

    return user;
}

module.exports = mongoose.model('User', userSchema)