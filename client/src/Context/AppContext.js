import React, { createContext, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';


export const AppContext = createContext();


export const AppContextProvider = ({ children }) => {

    // #region State Variables

    const [userData, setUserData] = useState(null);


    const BACKEND_URL = process.env.REACT_APP_NODE_ENV === 'development'
        ? process.env.REACT_APP_BACKEND_URL
        : process.env.REACT_APP_BACKEND_URL_PROD;

    const FRONTEND_URL = process.env.REACT_APP_NODE_ENV === 'development'
        ? process.env.REACT_APP_FRONTEND_URL
        : process.env.REACT_APP_FRONTEND_URL_PROD;

    // #endregion State Variables






    // #region Axios Instance

    const axiosInstance = axios.create({
        baseURL: BACKEND_URL,
        withCredentials: true
    });

    // #endregion Axios Instance




    // #region Verify Email Function
    const sendVerificationOtp = async () => {

        try {
            const { data } = await axiosInstance.post(`/api/auth/send-account-activation-email`);

            if (data.success) {
                message.success(data.message);
                return true;
            }
            else {
                message.error(data.message);
                return false;
            }

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred. Please try again later.';
            message.error(errorMessage);
            return false;
        }
    }


    // #region Get User Data Function
    const getUserData = async () => {

        try {

            const { data } = await axiosInstance.post('/api/user/get-user-details');

            if (data.success) {
                setUserData(data.data);
                return true;
            }
            else {
                // message.error(data.message);
                return false;
            }

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred. Please try again later.';
            // message.error(errorMessage);
            return false;
        }
    }


    // #region Register Function
    const register = async ({ name, email, firstName, lastName, password }) => {

        try {
            const { data } = await axiosInstance.post('/api/auth/register', {
                name,
                email,
                firstName,
                lastName,
                password
            });

            if (data.success) {
                message.success(data.message);
                await sendVerificationOtp();
                await getUserData();
                return true;
            }
            else {
                message.error(data.message);
                return false;
            }


        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred. Please try again later.';
            message.error(errorMessage);
            return false;
        }
    }




    // #region Login Function
    const login = async ({ email, password }) => {

        try {
            const { data } = await axiosInstance.post('/api/auth/login', {
                email,
                password
            });

            if (data.success) {
                message.success(data.message);
                await getUserData();
                return true;
            }
            else {
                message.error(data.message);
                return false;
            }

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred. Please try again later.';
            message.error(errorMessage);
            return false;
        }
    }



    // #region Logout Function
    const logout = async () => {

        try {
            const { data } = await axiosInstance.post('/api/auth/logout');

            if (data.success) {
                message.success(data.message);
                setUserData(null);
                return true;
            }
            else {
                message.error(data.message);
                return false;
            }

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred. Please try again later.';
            message.error(errorMessage);
            return false;
        }
    };




    // #region Verify Email Function
    const verifyEmail = async ({ otp }) => {

        try {

            const { data } = await axiosInstance.post('/api/auth/verify-account', {
                otp
            });

            if (data.success) {
                message.success(data.message);
                await getUserData();
                return true;
            }
            else {
                message.error(data.message);
                return false;
            }

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred. Please try again later.';
            message.error(errorMessage);
            return false;
        }

    }




    // #region Send Reset Password Email Function
    const sendResetPasswordEmail = async ({ email }) => {

        try {
            const { data } = await axiosInstance.post('/api/auth/send-reset-password-otp', {
                email
            });

            if (data.success) {
                message.success(data.message);
                return true;
            }
            else {
                message.error(data.message);
                return false;
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred. Please try again later.';
            message.error(errorMessage);
            return false;
        }
    }




    // #region Reset Password Function
    const resetPassword = async ({ email, password, otp }) => {

        try {
            const { data } = await axiosInstance.post('/api/auth/reset-password', {
                email,
                password,
                otp
            });

            if (data.success) {
                message.success(data.message);
                return true;
            }
            else {
                message.error(data.message);
                return false;
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred. Please try again later.';
            message.error(errorMessage);
            return false;
        }
    }




    const createRoom = async ({ roomName, roomLanguage }) => {

        try {

            const { data } = await axiosInstance.post('/api/room/create', {
                roomName,
                roomLanguage
            });

            if (data.success) {
                message.success(data.message);
                return data.data;
            }
            else {
                message.error(data.message);
                return null;
            }


        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred. Please try again later.';
            message.error(errorMessage);
            return null;
        }

    }


    const joinRoom = async ({ roomUUID }) => {

        try {

            const { data } = await axiosInstance.post('/api/room/join', {
                roomUUID
            });

            if (data.success) {
                message.success(data.message);
                return data.data;
            }
            else {
                message.error(data.message);
                return null;
            }

        }
        catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred. Please try again later.';
            message.error(errorMessage);
            return null;
        }

    }


    const leaveRoom = async ({ roomUUID }) => {

        try {

            const { data } = await axiosInstance.post('/api/room/leave', {
                roomUUID
            });

            if (data.success) {
                message.success(data.message);
                return true;
            }
            else {
                message.error(data.message);
                return false;
            }

        }
        catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred. Please try again later.';
            message.error(errorMessage);
            return false;
        }
    }


    const getRoomData = async ({ roomUUID }) => {

        try {

            const { data } = await axiosInstance.post('/api/room/get-room-data', {
                roomUUID
            });

            if (data.success) {
                return data.data;
            }
            else {
                message.error(data.message);
                return null;
            }

        }
        catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred. Please try again later.';
            message.error(errorMessage);
            return null;
        }
    }

    // #region Ask Regular Question Function
    const askRegularQuestion = async ({ question, history }) => {

        try {


            const { data } = await axiosInstance.post('/api/gemini/ask-regular', {
                question,
                history
            });

            if (data.success) {
                return data.response;
            }
            else {
                message.error(data.message);
                return null;
            }

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred. Please try again later.';
            message.error(errorMessage);
            return null;
        }

    }


    // #region Context Provider
    const value = {

        userData,
        setUserData,


        BACKEND_URL,
        FRONTEND_URL,

        register,
        login,
        logout,

        verifyEmail,
        sendVerificationOtp,

        sendResetPasswordEmail,
        resetPassword,

        getUserData,

        createRoom,
        joinRoom,
        leaveRoom,
        getRoomData,

        askRegularQuestion
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}