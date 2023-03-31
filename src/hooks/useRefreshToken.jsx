import axios from '../api/axios';
import { axiosPrivate } from '../api/axios';
// import useAuth from './useAuth';
import { authActions } from '../store/features/authSlice';
import { useSelector, useDispatch } from 'react-redux';

const useRefreshToken = () => {
    // const { setAuth } = useAuth();
    const authInfo = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const refresh = async () => {
        // console.log('Before refresh!!!')
        const refreshResponse = await axiosPrivate.post('/refresh')
        // console.log('refreshHook: ')
        // console.log(refreshResponse.data);
        dispatch(authActions.changeAuthData({ id: refreshResponse?.data?.id, accessToken: refreshResponse?.data?.accessToken }))
        return refreshResponse?.data?.accessToken ? refreshResponse?.data?.accessToken : null;
    }
    return refresh;
};

export default useRefreshToken;
