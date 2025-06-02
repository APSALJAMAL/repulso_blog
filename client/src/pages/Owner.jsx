import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import { useFetch } from '@/hooks/useFetch'
import { getEvn } from '@/helpers/getEnv'
import Loading from '@/components/Loading'
import { FaRegTrashAlt } from "react-icons/fa"
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'
import usericon from '@/assets/images/user.png'
import moment from 'moment'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

// ...other imports
import { updateData } from '@/helpers/handleUpdate';

const roleOptions = ['user', 'admin', 'owner'];

const Owner = () => {
  const [refreshData, setRefreshData] = useState(false);
  const { data, loading } = useFetch(`${getEvn('VITE_API_BASE_URL')}/user/get-all-user`, {
    method: 'get',
    credentials: 'include'
  }, [refreshData]);

  const handleDelete = async (id) => {
    const response = await deleteData(`${getEvn('VITE_API_BASE_URL')}/user/delete/${id}`);
    if (response) {
      setRefreshData(!refreshData);
      showToast('success', 'User deleted.');
    } else {
      showToast('error', 'Delete failed.');
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    const success = await updateData(`${getEvn('VITE_API_BASE_URL')}/user/update-role/${userId}`, {
      role: newRole
    });
    if (success) {
      showToast('success', 'Role updated.');
      setRefreshData(!refreshData);
    } else {
      showToast('error', 'Failed to update role.');
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Avatar</TableHead>
                <TableHead>Dated</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.user.length > 0 ? (
                data.user.map(user => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="border px-2 py-1 rounded"
                      >
                        {roleOptions.map(role => (
                          <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
                        ))}
                      </select>
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <img
                        src={user.avatar }
                        className="w-10 h-10 rounded-full object-cover"
                      
                      />
                    </TableCell>
                    <TableCell>{moment(user.createdAt).format('DD-MM-YYYY')}</TableCell>
                    <TableCell className="flex gap-3">
                      <Button onClick={() => handleDelete(user._id)} variant="outline" className="hover:bg-violet-500 hover:text-white">
                        <FaRegTrashAlt />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="6" className="text-center">
                    Data not found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Owner;

