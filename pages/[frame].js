import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Dialog, DialogContent } from "@material-ui/core";

import {SECRET} from '../app/constants/config';
import { SET_USER, AUTH } from '../app/constants/actions';
import { getBalance } from '../app/redux/actions/game';

const jwt = require('jsonwebtoken');

const Frame = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { token } = router.query;

  const decodeToken = tokenPhrase => {
    jwt.verify(tokenPhrase, SECRET, async (err, decoded) => {
      if (err) {
        console.log(err);
        throw err;
      } else {
        await dispatch(getBalance(tokenPhrase, decoded.userId));
        await localStorage.setItem('token', tokenPhrase);
        await localStorage.setItem('user', JSON.stringify(decoded));
        console.log(decoded);  
        await dispatch(dispatchController => 
          dispatchController({
            type: SET_USER,
            payload: {
              token: tokenPhrase,
              user: decoded
            },
          })  
        );
        await dispatch(dispatchController => 
          dispatchController({ type: AUTH.SUCCESS })
        );
        router.push("/");
      }
    });
  };

  useEffect(() => {
    if (token) {
      decodeToken(token);
    }
  }, [token]);

  return (
    <div>
      <Dialog
        open
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent className="loading_dlg_content">
          <DialogContent style={{textAlign: 'center'}}>
            <img src="/images/working.gif" className="loading_icon" alt="working" />
          </DialogContent>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Frame;