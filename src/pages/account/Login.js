 // @flow
import React, { useEffect, useCallback, useState, useRef } from 'react';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import Lottie from "lottie-react";
import diamondAnimation from "../../assets/money.json";
import { APICore } from '../../helpers/api/apiCore';


//actions
import { resetAuth, loginUser } from '../../redux/actions';
import { useQuery } from '../../hooks/';

// components
import {VerticalForm, FormInput } from '../../components/';
import AccountLayout from './AccountLayout';
import reCAPTCHA from '../../components/reCAPTCHA';

const Login = (): React$Element<any> => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const query = useQuery();
    const next = query.get('next');
    const api = new APICore();
    let recaptcha = new reCAPTCHA("6LdQipEeAAAAAM9qmC0vs4WUEM8B40TLAgzX_iAs", "login");
    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    const { loading, userLoggedIn, user, error } = useSelector((state) => ({
        loading: state.Auth.loading,
        user: state.Auth.user,
        error: state.Auth.error,
        userLoggedIn: state.Auth.userLoggedIn,
    }));

    /*
    form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            apiURL: yup.string().required(t('Please enter API URL')),
            password: yup.string().required(t('Please enter Password')),
            code: yup.string()
        })
    );

    async function waitForCaptcha(){
    if(typeof someVariable !== "undefined"){
      return recaptcha;
    }
    else{
        setTimeout(waitForCaptcha, 250);
    }
}

    /*
    handle form submission
    */

    const onSubmit = async (formData) => {
      let token = await recaptcha.getToken();
      if(token){
        let code = formData['code'] ? formData['code'] : null
        dispatch(loginUser(formData['apiURL'], formData['password'], token, code));
      }
    };

    if (api.isUserAuthenticated() === true) {
        return <Redirect to={{ pathname: '/dashboard/validator'}} />;
    }

    return (
        <>
            {userLoggedIn && user ? <Redirect to={next ? next : '/'}></Redirect> : null}
            <AccountLayout>
                <div className="text-center w-75 m-auto">

                    <h4 className="text-dark-50 text-center mt-0 fw-bold">{t('Sign In')}</h4>
                    <p className="text-muted mb-4">
                        {t('Enter your API address and password to access admin panel.')}
                    </p>
                </div>

                {error && (
                  <Alert variant="danger" className="my-2">
                      {error}
                  </Alert>
                )}
                <VerticalForm
                  onSubmit={onSubmit}
                  resolver={schemaResolver}
                >
                    <FormInput
                        label={t('Validator URL')}
                        type="text"
                        name="apiURL"
                        placeholder={t('Enter your API URL')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('Password')}
                        type="password"
                        name="password"
                        placeholder={t('Enter your password')}
                        containerClass={'mb-3'}>
                    </FormInput>
                    <FormInput
                        label={'Google Authenticator Code'}
                        type="text"
                        name="code"
                        placeholder="Enter Google 2FA code if it's enabled"
                        containerClass={'mb-3'}>
                    </FormInput>
                    <div className="mb-3 mb-0 text-center">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {t('Log In')}
                        </Button>
                    </div>
                </VerticalForm>
            </AccountLayout>
        </>
    );
};

export default Login;
