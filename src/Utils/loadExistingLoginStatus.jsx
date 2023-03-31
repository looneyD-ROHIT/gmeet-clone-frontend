import { redirect } from 'react-router-dom';
import store from '../store/indexSlice.jsx';
import { authActions } from '../store/features/authSlice.jsx';
import { axiosPrivate } from '../api/axios.js';

const loadExistingLoginStatus = async ({ request, params }) => {
    try {
        const response = await axiosPrivate.post('/refresh');
        store.dispatch(authActions.changeAuthData({ id: response.data.id, accessToken: response.data.accessToken }));
        console.log(response.data);
        return redirect('/app');
    } catch (err) {
        console.log('LoaderData: ' + err);
        store.dispatch(authActions.changeAuthData({ id: '', accessToken: '' }));
    }
    return null;
}


export default loadExistingLoginStatus;