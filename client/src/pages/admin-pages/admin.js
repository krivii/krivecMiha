import React from 'react';
import { Admin, Resource } from 'react-admin'
import restProvider from 'ra-data-simple-rest'
// import UsersRes from './usersAdmin';
import UserList from '../../components/admin/UserList';


const AdminPage = () => {

    return (
        <Admin dataProvider={restProvider('http://localhost:3001/api/admin/user')}>
           <Resource name="admin" list={UserList} />
        </Admin>
    )
}

export default AdminPage;