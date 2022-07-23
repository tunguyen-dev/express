import {check, body} from 'express-validator';
import {userDb} from '../dbs/index.mjs'

const validate = (method) => {
    let err = [];
    switch (method) {
        case 'register': {
            err = [ 
                body('email', 'Email không hợp lệ').exists().isEmail().custom(value => {
                    return userDb.findByField(value, 'email').then(user => {
                        if (user) {
                            return Promise.reject('Email đã được sử dụng');
                        }
                    });
                })
            ]   
        }
        break;
    }

    return err;
}

export default validate;