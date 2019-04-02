const User = require('./models/Users');

const userCrud = {
    /* Add a new user to db */
    addUser: (cid) => {
        return new Promise((resolve, reject) => {
            User.findOne({ cid: cid }).then(user => {
                // console.log('find',user)
                if(!user) {
                    new User({ cid: cid }).save().then(user => {
                        // console.log('user saved');
                        resolve();
                    })
                }
                else {
                    resolve();
                }
            })
        })
    },
    /* Find user */
    findUser: cid => {
        return new Promise((resolve, reject) => {
            User.findOne({ cid: cid }).then(user => {
                resolve(user);
            })
        })
    },
    /* Update user gender to db */
    updateUserGender: (cid, gender) => {
        return new Promise((resolve, reject) => {
            User.updateOne({ "cid": cid }, {$set: { "gender": gender }}).then(user => {
                // console.log('updated gender',user);
                resolve();
            })
        })
    },
    /* Delete user record from db */
    deleteUserRecord: cid => {
        return new Promise((resolve, reject) => {
            User.deleteOne({ cid: cid }).then(user => {
                // console.log('deleted user', user);
                resolve();
            })
        })
    }
};

module.exports = userCrud;