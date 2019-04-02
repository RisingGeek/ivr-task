const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const userCrud = require('./db/userCrud');


app.get('/', (req, res) => {

    /* Gender Response (First Question) */
    const genderResponse = `
    <response>
        <collectdtmf l="1">
            <playtext type="ggl">
                If you are male, press <say-as format="501" lang="EN">1</say-as>
            </playtext>
            <playtext type="ggl">
                If you are female, press <say-as format="501" lang="EN">2</say-as>
            </playtext>
        </collectdtmf>
    </response>`;

    /* Input not Valid Response */
    const notValidResponse = `
    <response>
        <playtext type="ggl">Please enter a valid option.</playtext>
        <collectdtmf l="1">
        </collectdtmf>
    </response>`;

    res.set('Content-Type', 'text/xml');

    /* New Call Event */
    if(req. query.event==='NewCall') {
        //Add the user to temporary database
        userCrud.addUser(req.query.cid).then(() => {
            res.send(genderResponse);
        })
    }

    /* Got a response from user */
    else if(req.query.event==='GotDTMF') {
        userCrud.findUser(req.query.cid).then(user => {
            let age = user.gender==='1'?'21':'18';
            /* Age Response (second question) */
            let ageResponse = `
            <response>
                <collectdtmf l="1">
                    <playtext type="ggl">
                        If you are above ${age}, press <say-as format="501" lang="EN">1</say-as>
                    </playtext>
                    <playtext type="ggl">
                        Else press <say-as format="501" lang="EN">2</say-as>
                    </playtext>
                </collectdtmf>
            </response>`;
            //Save gender to database
            if(!user.gender) {
                if(req.query.data==='1' || req.query.data==='2') {
                    age = req.query.data==='1'?'21':'18';
                    ageResponse = `
                    <response>
                        <collectdtmf l="1">
                            <playtext type="ggl">
                                If you are above ${age}, press <say-as format="501" lang="EN">1</say-as>
                            </playtext>
                            <playtext type="ggl">
                                Else press <say-as format="501" lang="EN">2</say-as>
                            </playtext>
                        </collectdtmf>
                    </response>`;
                    userCrud.updateUserGender(user.cid, req.query.data).then(() => {
                        res.send(ageResponse);
                    });
                }
                else if(!req.query.data) {
                    res.send(genderResponse);
                }
                else {
                    res.send(notValidResponse);
                }
            }
            else if(!user.age) {
                if(req.query.data==='1' || req.query.data==='2') {
                let message='Minors are not allowed';
                if((user.gender==='1' && req.query.data==='1') || (user.gender==='2' && req.query.data==='1')) {
                    message = 'You are an adult';
                }
                userCrud.deleteUserRecord(req.query.cid).then(() => {});
                res.send(`
                <response>
                    <playtext type="ggl">${message}</playtext>
                    <hangup></hangup>
                </response>
                `);
                }
                else if(!req.query.data) {
                    res.send(ageResponse);
                }
                else {
                    res.send(notValidResponse);
                }
            }
        })
    }

    /* User hangs up call */
    else if(req.query.event==='Hangup') {
        userCrud.deleteUserRecord(req.query.cid).then(() => {
            res.send(`<response><hangup /></response>`)
        })
    }
})

app.listen(PORT, () => console.log('server started'));