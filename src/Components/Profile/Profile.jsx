import React, { useContext, useEffect } from 'react';
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import UserAuthContext from '../../Context/UserAuthContext';
import secureAxios from '../../utils/firebaseAxios';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Profile = () => {
  const { user } = useContext(UserAuthContext)
  const queryClient = useQueryClient()

  const { data: users, isLoading, isFetched } = useQuery({
    queryKey: ['users', user?.email],
    queryFn: async () => {
      const response = await secureAxios.get(`/users?email=${user?.email}`)
      return response.data
    }
  })

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      photo: '',
      phoneNumber: '',
      address: '',
    }
  })

  useEffect(() => {
    if (users) {
      reset({
        photo: users.photo || '',
        phoneNumber: users.phoneNumber || '',
        address: users.address || '',
      })
    }
  }, [users, reset])

  const muntation = useMutation({
    mutationFn: async (data) => {
      const response = await secureAxios.patch(`/users/update`, data, {
        params: { email: user?.email }
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', user?.email] })
    }
  })

  const handledatasubmit = async (data) => {
    muntation.mutate(data)
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-neutral-900 shadow-lg rounded-2xl p-6 space-y-6 border border-neutral-200 dark:border-neutral-700">
      {isLoading && <h1 className="text-center text-neutral-500">Loading...</h1>}

      {/* Profile Header */}
      {users && (
        <div className="flex flex-col items-center space-y-2">
          <Avatar className="h-20 w-20 ring-2 ring-orange-400 shadow-md">
            <AvatarImage src={users?.photo || ''} />
            <AvatarFallback className="bg-orange-200 text-orange-800 font-semibold">
              {user?.email?.[0]?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
            {user?.displayName || "User"}
          </h2>
          <p className="text-sm text-neutral-500">{user?.email}</p>
        </div>
      )}

      {isFetched && (
        <form onSubmit={handleSubmit(handledatasubmit)} className="space-y-5">
          {/* Photo */}
          <div>
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 block">
              Profile Image URL
            </label>
            <Input
              {...register('photo')}
              placeholder={users ? users?.photo : ''}
              type="text"
              className="rounded-lg focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <Separator />

          {/* Address */}
          <div>
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 block">
              Address
            </label>
            <Input
              {...register('address')}
              placeholder={users ? users?.address : ''}
              type="text"
              className="rounded-lg focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <Separator />

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1 block">
              Phone Number
            </label>
            <Input
              {...register('phoneNumber')}
              placeholder={users ? users?.phoneNumber : ''}
              type="text"
              className="rounded-lg focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Submit */}
          <Button
            className="w-full py-2 mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-md transition-all"
            type="submit"
          >
            Update Profile
          </Button>
        </form>
      )}
    </div>
  );
};

export default Profile;
