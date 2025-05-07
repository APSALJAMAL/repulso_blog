import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'
import { useFetch } from '@/hooks/useFetch'
import { getEvn } from '@/helpers/getEnv'
import Loading from '@/components/Loading'
import usericon from '@/assets/images/user.png'
import moment from 'moment'
import { Link } from 'react-router-dom'

const UserProfile = () => {
  const { data, loading } = useFetch(
    `${getEvn('VITE_API_BASE_URL')}/user/get-all-user`,
    {
      method: 'get',
      credentials: 'include'
    }
  )

  if (loading) return <Loading />

  const adminUsers = data?.user?.filter(user => user.role === 'admin' || user.role === 'owner') || [];


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {adminUsers.length > 0 ? (
        adminUsers.map((user) => (
          <Link to={`/info/${user._id}`} key={user._id}>
            <Card className="shadow-md border border-gray-300 hover:shadow-xl transition-shadow cursor-pointer">
              <CardHeader className="flex items-center gap-4">
                <img
                  src={user.avatar || usericon}
                  alt={user.name}
                  className="w-32 h-32 rounded-full border border-black object-cover"
                />
                <div>
                  <h2 className="text-lg font-bold">{user.name}</h2>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Joined: {moment(user.createdAt).format('DD-MM-YYYY')}
                  </p>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))
      ) : (
        <p className="text-center col-span-full">No admin users found.</p>
      )}
    </div>
  )
}

export default UserProfile
