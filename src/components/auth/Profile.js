import React, {useEffect, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../../context/Context';

const Profile = () => {
	const {userData} = useContext(Context);
	const history = useHistory();

	useEffect(() => {
		if(!userData.user) history.push('/login');
	}, [userData]);

    return (    
			<div class="container">
				<div class="row">
					<div class="col-6 mx-auto">
						<div class="card py-4 text-center">
							 <h2>Profile</h2>
						</div>
					</div>
				</div>
			</div>
    )
}

export default Profile