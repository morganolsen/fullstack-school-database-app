'use strict';

const auth = require('basic-auth');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

exports.authenticate = async(req,res,next) => {
    const creds = auth(req);
    const denyAccess = () => {
        res.status(401).json({message: "Access Denied"});
    }

    // Did they provide authentication headers? If not, deny access.
    if(creds){

        // Did they provide a valid email? If not, deny access.
        const user = await User.findOne({
            where: {
                emailAddress: creds.name
            }
        });

        if(user){
            // Does the password match the one on file? If not, deny access.
            const authed = bcrypt.compareSync(creds.pass, user.password);
            if(authed){
                // Grant access when they made it this far.
                req.currentUser = user;
                next();
            }else{
                denyAccess();
            }
        }else{
            denyAccess();
        }
    }else{
        denyAccess();
    }
    
}