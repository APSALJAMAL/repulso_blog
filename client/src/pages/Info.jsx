import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '@/hooks/useFetch'
import { getEvn } from '@/helpers/getEnv'
import Loading from '@/components/Loading'
import usericon from '@/assets/images/user.png'
import moment from 'moment'
import BlogCard from '@/components/BlogCard'

const Info = () => {
  const { id } = useParams()

  const { data: userData, loading: userLoading, error: userError } = useFetch(
    `${getEvn('VITE_API_BASE_URL')}/user/get-user/${id}`,
    {
      method: 'get',
      credentials: 'include'
    },
    [id]
  )

  const { data: blogData, loading: blogLoading, error: blogError } = useFetch(
    `${getEvn('VITE_API_BASE_URL')}/blog/blogs`,
    {
      method: 'get',
      credentials: 'include'
    }
  )

  if (userLoading || blogLoading) return <Loading />

  if (userError || !userData?.user) return <p className="text-center text-red-500">User not found.</p>

  const user = userData.user

  const filteredBlogs = blogData?.blog.filter(blog => blog.author.name === user.name)

  // Custom function to parse and render bio
  const renderBioWithLinks = (bio) => {
    const parts = bio.split(/(".*?")/g) // Split by quoted strings
    return parts.map((part, index) => {
      const match = part.match(/^"(.*?)"$/)
      if (match) {
        const url = match[1]
        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-500 underline mx-1"
          >
            {url}
          </a>
        )
      }
      return <span key={index}>{part}</span>
    })
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 space-y-10">
      {/* User Profile */}
      <div className="flex items-center gap-6 p-4 rounded-lg">
        <img
          src={user.avatar || usericon}
          alt={user.name}
          className="w-32 h-32 rounded-full border border-black object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
          {user.bio && (
            <p className="mt-1 text-sm text-gray-500 italic">
              {renderBioWithLinks(user.bio)}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-2">Role: {user.role}</p>
          <p className="text-xs text-gray-500">Joined: {moment(user.createdAt).format('DD-MM-YYYY')}</p>
        </div>
      </div>

      {/* Blog Cards */}
      <div className="p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Blogs by {user.name}</h3>
        {filteredBlogs?.length > 0 ? (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
            {filteredBlogs.map(blog => (
              <BlogCard key={blog._id} props={blog} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No blogs written yet.</p>
        )}
      </div>
    </div>
  )
}

export default Info
