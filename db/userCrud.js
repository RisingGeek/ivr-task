const User = require('./models/Users');

const userCrud = {
    addUser: (cid) => {
        return new Promise((resolve, reject) => {
            User.findOne({ cid: cid }).then(user => {
                console.log('find',user)
                if(!user) {
                    new User({ cid: cid }).save().then(user => {
                        console.log('user saved');
                        resolve();
                    })
                }
                else {
                    resolve();
                }
            })
        })
    },
    findUser: cid => {
        return new Promise((resolve, reject) => {
            User.findOne({ cid: cid }).then(user => {
                resolve(user);
            })
        })
    },
    updateUserGender: (cid, gender) => {
        return new Promise((resolve, reject) => {
            User.updateOne({ "cid": cid }, {$set: { "gender": gender }}).then(user => {
                console.log('updated gender',user);
                resolve();
            })
        })
    },
    deleteUserRecord: cid => {
        return new Promise((resolve, reject) => {
            User.deleteOne({ cid: cid }).then(user => {
                console.log('deleted user', user);
                resolve();
            })
        })
    }
    // updateUserAge: (cid, age) => {
    //     return new Promise((resolve, reject) => {
    //         User.updateOne({ cid: cid}, {$set: { age: age }}).then(user => {
    //             console.log('updated age',user);
    //             resolve(user);
    //         });
    //     })
    // }
};

module.exports = userCrud;