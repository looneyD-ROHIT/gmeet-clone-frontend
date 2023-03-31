import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
const useNavClickHandler = (event, to) => {
    const authInfo = useSelector(state => state.auth);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const currentPathname = location.pathname.split('/')[1];
        const toPathname = location.pathname.split('/')[1];
        if (currentPathname === toPathname) {
            navigate(to);
        } else {
            // renew tokens if possible else redirect

        }
    }, [authInfo, location])
}

export default useNavClickHandler;