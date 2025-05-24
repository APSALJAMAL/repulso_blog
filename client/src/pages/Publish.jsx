import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { RouteBlogEdit } from '@/helpers/RouteName'
import { useFetch } from '@/hooks/useFetch'
import { getEvn } from '@/helpers/getEnv'
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'
import Loading from '@/components/Loading'
import { useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import moment from 'moment'

const Publish = () => {
    const [refreshData, setRefreshData] = useState(false)
    const { data: blogData, loading } = useFetch(`${getEvn('VITE_API_BASE_URL')}/blog/blogs`, {
        method: 'get',
        credentials: 'include'
    }, [refreshData])

    const handleDelete = async (id) => {
        const response = await deleteData(`${getEvn('VITE_API_BASE_URL')}/blog/delete/${id}`)
        if (response) {
            setRefreshData(prev => !prev)
            showToast('success', 'Data deleted.')
        } else {
            showToast('error', 'Data not deleted.')
        }
    }

    const togglePublish = async (id, currentStatus) => {
        try {
            const res = await fetch(`${getEvn('VITE_API_BASE_URL')}/blog/toggle-publish/${id}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ publish: !currentStatus })
            })
            const result = await res.json()
            if (res.ok) {
                showToast('success', `Publish status updated.`)
                setRefreshData(prev => !prev)
            } else {
                showToast('error', result.message || 'Failed to update.')
            }
        } catch (error) {
            showToast('error', 'Error occurred while updating publish status.')
        }
    }

    if (loading) return <Loading />

    return (
        <div>
            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Author</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Publish</TableHead>
                                <TableHead>Dated</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {blogData?.blog?.length > 0 ?
                                blogData.blog.map(blog =>
                                    <TableRow key={blog._id}>
                                        <TableCell>{blog?.author?.name}</TableCell>
                                        <TableCell>{blog?.category?.name}</TableCell>
                                        <TableCell>{blog?.title}</TableCell>
                                        <TableCell>{blog?.slug}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant={blog.publish ? "default" : "default"}
                                                onClick={() => togglePublish(blog._id, blog.publish)}
                                                className={blog.publish ? 'bg-green-600 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'}
                                            >
                                                {blog.publish ? 'Published' : 'Unpublished'}
                                            </Button>
                                        </TableCell>
                                        <TableCell>{moment(blog?.createdAt).format('DD-MM-YYYY')}</TableCell>
                                        <TableCell className="flex gap-3">
                                            <Button variant="outline" className="hover:bg-violet-500 hover:text-white" asChild>
                                                <Link to={RouteBlogEdit(blog._id)}>
                                                    <FiEdit />
                                                </Link>
                                            </Button>
                                            <Button onClick={() => handleDelete(blog._id)} variant="outline" className="hover:bg-violet-500 hover:text-white" >
                                                <FaRegTrashAlt />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                                :
                                <TableRow>
                                    <TableCell colSpan="7">Data not found.</TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default Publish
