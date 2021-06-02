import { logout } from '../utils/auth';
import { tokenState, userState } from '../Recoil';
import { useRecoilState } from 'recoil';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

export const Logout = () => {
  // react-cookie
  const [cookies, setCookie] = useCookies(['user']);

  // recoil
  const [user, setUser] = useRecoilState(userState);
  const [token, setToken] = useRecoilState(tokenState);

  // react-router
  const history = useHistory();

  const handleLogout = () => {
    setCookie('user', null, { path: '/' }); // clear cookie
    setUser({}); // clear recoil state
    setToken({}); // clear recoil state
    logout(); // logout of firebase
    history.push('/');
  };

  return (
    <div>
      <div>Logger ud</div>
      <div>{handleLogout()}</div>
    </div>
  );
};
