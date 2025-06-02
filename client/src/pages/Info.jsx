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

  const filteredBlogs = blogData?.blog.filter(blog => blog.author?.name === user.name)


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
    <div className="max-w-6xl mx-auto p-4 sm:py-6 space-y-10">
    {/* User Profile */}
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6  bg-white dark:bg-gray-900 ">
      <img
        src={user.avatar || usericon}
        alt={user.name || "unknown"}
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-black object-cover"
      />
      <div className="text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl font-bold">{user.name || "unknown"}</h2>
        <p className="text-sm text-gray-600">{user.email || "unknown"}</p>
        {user.bio && (
          <p className="mt-1 text-sm text-gray-500 italic break-words">
            {renderBioWithLinks(user.bio || "unknown")}
          </p>
        )}
        <p className="text-xs text-gray-500 mt-2">Role: {user.role || "unknown"}</p>
        <p className="text-xs text-gray-500">Joined: {moment(user.createdAt).format('DD-MM-YYYY')}</p>
      </div>
    </div>
  
    {/* Blog Cards */}
    <div className="py-4 bg-white dark:bg-gray-900 ">
      <h3 className="text-lg sm:text-xl font-semibold mb-4">Blogs by {user.name || "unknown"}</h3>
      {filteredBlogs?.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {filteredBlogs.map(blog => (
            <BlogCard key={blog._id} props={blog} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic text-center">No blogs written yet.</p>
      )}
    </div>
  </div>
  
  )
}

export default Info
