import { axiosPrivate } from "../api/axios.jsx";
import { useCallback, useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from "@chakra-ui/toast";
import { authActions } from "../store/features/authSlice";
import store from '../store/indexSlice'
import { v4 as uuidv4 } from 'uuid';


const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const authenticationData = useSelector(state => state.auth);
    const dispatch = useDispatch();
    // const location = useLocation();
    const navigate = useNavigate();
    const toast = useToast();
    // console.log(authenticationData);

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                // console.log('config: ' + JSON.stringify(config.headers));
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${authenticationData?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => {
                // console.log(response);
                return response;
            },
            async (error) => {
                // console.log('axiosResIntErr: ' + error);
                const prevRequest = error?.config;
                // console.log('axiosResIntErr: ' + JSON.stringify(prevRequest));
                if ((error?.response?.status === 403 || error?.response?.status === 401) && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    // console.log('refreshing tokens due to 403/401');
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                    // }
                } else if (error?.response?.status === 511) {
                    dispatch(authActions.changeAuthData({ id: '', accessToken: '' }));
                    navigate(`/${uuidv4()}`);
                }
                else {
                    store.dispatch(authActions.changeAuthData({ id: '', accessToken: '' }));
                    navigate('/home');
                }
                return Promise.reject(error);
            }
        );

        return () => {
            // console.log('useAxiosPrivate CLEANUP!!!');
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [authenticationData])

    return axiosPrivate;
}

export default useAxiosPrivate;