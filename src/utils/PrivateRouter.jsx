import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PrivateRouter({ children }) {
	const navigate = useNavigate();

	const user = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		if (!user.token) {
			return navigate('/');
		}
	}, [user.token, navigate, children]);

	return children;
}

export default PrivateRouter;
