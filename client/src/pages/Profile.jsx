import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { getEvn } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { useFetch } from '@/hooks/useFetch'
import Loading from '@/components/Loading'
import { IoCameraOutline } from 'react-icons/io5'
import Dropzone from 'react-dropzone'
import { setUser } from '@/redux/user/user.slice'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const Profile = () => {
  const [filePreview, setPreview] = useState()
  const [file, setFile] = useState()
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  const user = useSelector((state) => state.user)

  const { data: userData, loading } = useFetch(
    `${getEvn('VITE_API_BASE_URL')}/user/get-user/${user.user._id}`,
    { method: 'get', credentials: 'include' }
  )

  const dispath = useDispatch()

  const formSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 character long.'),
    email: z.string().email(),
    bio: z.string().min(3, 'Bio must be at least 3 character long.'),
    password: z.string().optional(),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      bio: '',
      password: '',
    },
  })

  useEffect(() => {
    if (userData && userData.success) {
      form.reset({
        name: userData.user.name,
        email: userData.user.email,
        bio: userData.user.bio,
        password: '',
      })
    }
  }, [userData])

  async function onSubmit(values) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('data', JSON.stringify(values))

      const xhr = new XMLHttpRequest()
      xhr.open(
        'PUT',
        `${getEvn('VITE_API_BASE_URL')}/user/update-user/${userData.user._id}`
      )
      xhr.withCredentials = true

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round(
            (event.loaded / event.total) * 100
          )
          setUploadProgress(percentComplete)
        }
      }

      xhr.onloadstart = () => setUploading(true)
      xhr.onloadend = () => setUploading(false)

      xhr.onload = () => {
        const data = JSON.parse(xhr.responseText)
        if (xhr.status >= 200 && xhr.status < 300) {
          dispath(setUser(data.user))
          showToast('success', data.message)
        } else {
          showToast('error', data.message)
        }
      }

      xhr.onerror = () => {
        showToast('error', 'Upload failed')
        setUploading(false)
      }

      xhr.send(formData)
    } catch (error) {
      showToast('error', error.message)
    }
  }

  const handleFileSelection = (files) => {
    const file = files[0]
    const preview = URL.createObjectURL(file)
    setFile(file)
    setPreview(preview)
  }

  if (loading) return <Loading />

  return (
    <Card className="max-w-screen-md mx-auto">
      <CardContent>
        <div className="flex justify-center items-center mt-10">
          <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="relative w-36 h-36">
                <input {...getInputProps()} />
                <Avatar className="w-full h-full relative border-4 border-violet-500 shadow-lg group">
                  <AvatarImage
                    src={filePreview || userData?.user?.avatar}
                    className="w-full h-full rounded-full object-cover"
                  />
                  <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-20 rounded-full cursor-pointer">
                    {uploading ? (
                      <div className="w-16 h-16">
                        <CircularProgressbar
                          value={uploadProgress}
                          text={`${uploadProgress}%`}
                          styles={buildStyles({
                            pathColor: '#7c3aed',
                            textColor: '#fff',
                            trailColor: '#ddd',
                          })}
                        />
                      </div>
                    ) : (
                      <IoCameraOutline size={28} color="#7c3aed" />
                    )}
                  </div>
                </Avatar>
              </div>
            )}
          </Dropzone>
        </div>

        <div className="mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write something or include a link (e.g., https://example.com)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full" disabled={uploading}>
                {uploading ? 'Uploading...' : 'Save Changes'}
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  )
}

export default Profile
