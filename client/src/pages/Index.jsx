import BlogCard from '@/components/BlogCard'
import Loading from '@/components/Loading'
import { getEvn } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'

const Index = () => {
    const { data: blogData, loading, error } = useFetch(`${getEvn('VITE_API_BASE_URL')}/blog/blogs`, {
        method: 'get',
        credentials: 'include'
    })

    if (loading) return <Loading />

    const publishedBlogs = blogData?.blog?.filter(blog => blog.publish === true)

    return (
        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
            {publishedBlogs && publishedBlogs.length > 0
                ? publishedBlogs.map(blog => <BlogCard key={blog._id} props={blog} />)
                : <div>Data Not Found.</div>
            }
        </div>
    )
}

export default Index
