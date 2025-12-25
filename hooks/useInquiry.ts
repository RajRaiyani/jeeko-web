import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '@/services/api/httpServices'

// Type definitions
export interface CreateInquiryData {
  fullname: string
  phonenumber: string
  email: string
  description: string
}

export interface Inquiry {
  id?: string
  _id?: string
  name?: string
  fullname?: string
  phone_number?: string
  phonenumber?: string
  email?: string
  message?: string
  description?: string
  subject?: string
  status?: string
  created_at?: string
}

export interface InquiriesResponse {
  data: Inquiry[]
}

interface ApiError {
  response?: {
    data?: {
      error?: string
      details?: string | string[]
    }
    status?: number
  }
  message?: string
}

interface DeleteContext {
  previousInquiries: unknown
  deletedId: string
}

// Fetch all inquiries
export const useInquiries = () => {
  return useQuery<InquiriesResponse>({
    queryKey: ['inquiries'],
    queryFn: async (): Promise<InquiriesResponse> => {
      // axiosInstance interceptor already returns response.data
      return await axiosInstance.get('/inquiry') as InquiriesResponse
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  })
}

// Create new inquiry
export const useCreateInquiry = () => {
  const queryClient = useQueryClient()

  return useMutation<unknown, ApiError, CreateInquiryData>({
    mutationFn: async (inquiryData: CreateInquiryData) => {
      console.log('Creating inquiry:', inquiryData)
      
      // Transform frontend data to match API structure
      // Use description directly as message
      const apiData = {
        name: inquiryData.fullname,
        phone_number: inquiryData.phonenumber,
        email: inquiryData.email.toLowerCase(),
        message: inquiryData.description,
      }
      
      // Use public /inquiry endpoint (no auth required)
      return await axiosInstance.post('/inquiry', apiData)
    },
    onSuccess: (data) => {
      console.log('Inquiry created successfully:', data)
      queryClient.invalidateQueries({ queryKey: ['inquiries'] })
    },
    onError: (error: ApiError) => {
      console.error('Create inquiry failed:', error)
      throw error // Re-throw to let the form handle the error
    }
  })
}

// Delete inquiry with optimistic updates
export const useDeleteInquiry = () => {
  const queryClient = useQueryClient()

  return useMutation<unknown, ApiError, string, DeleteContext>({
    mutationFn: async (id: string) => {
      console.log('Deleting inquiry with ID:', id)
      // axiosInstance interceptor already returns response.data
      const response = await axiosInstance.delete(`/inquiry/${id}`)
      console.log('Delete API response:', response)
      return response
    },
    onMutate: async (deletedId: string) => {
      console.log('Starting optimistic delete for:', deletedId)
      
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['inquiries'] })

      // Snapshot previous value
      const previousInquiries = queryClient.getQueryData(['inquiries'])

      // Optimistically remove inquiry from cache
      queryClient.setQueryData<InquiriesResponse>(['inquiries'], (oldData) => {
        if (!oldData?.data) return oldData
        
        return {
          ...oldData,
          data: oldData.data.filter(inquiry => inquiry._id !== deletedId && inquiry.id !== deletedId)
        }
      })

      // Remove individual inquiry from cache
      queryClient.removeQueries({ queryKey: ['inquiry', deletedId] })

      // Return context for rollback
      return { previousInquiries, deletedId }
    },
    onSuccess: (_data, deletedId: string) => {
      console.log('Delete successful for inquiry:', deletedId)
      
      // Ensure inquiry is removed from cache
      queryClient.removeQueries({ queryKey: ['inquiry', deletedId] })
    },
    onError: (error: ApiError, _deletedId: string, context?: DeleteContext) => {
      console.error('Delete failed:', error)
      
      // Rollback optimistic update
      if (context?.previousInquiries) {
        queryClient.setQueryData(['inquiries'], context.previousInquiries)
      }
      
      // Show error to user
      const errorMessage = error.response?.data?.error || error.message || 'Delete failed'
      console.error('Delete error:', errorMessage)
    },
    onSettled: () => {
      // Always invalidate to ensure consistency
      queryClient.invalidateQueries({ queryKey: ['inquiries'] })
    }
  })
}

// Get single inquiry by ID
export const useInquiry = (id: string | undefined) => {
  return useQuery<{ data: Inquiry }>({
    queryKey: ['inquiry', id],
    queryFn: async (): Promise<{ data: Inquiry }> => {
      // axiosInstance interceptor already returns response.data
      return await axiosInstance.get(`/inquiry/${id}`) as { data: Inquiry }
    },
    enabled: !!id,
    retry: (failureCount: number, error: ApiError) => {
      // Don't retry on 404 errors
      if (error.response?.status === 404) return false
      return failureCount < 3
    },
  })
}

// Update inquiry (bonus hook for future use)
interface UpdateInquiryVariables {
  id: string
  data: Partial<CreateInquiryData>
}

export const useUpdateInquiry = () => {
  const queryClient = useQueryClient()

  return useMutation<{ data: Inquiry }, ApiError, UpdateInquiryVariables>({
    mutationFn: async ({ id, data }: UpdateInquiryVariables): Promise<{ data: Inquiry }> => {
      // axiosInstance interceptor already returns response.data
      return await axiosInstance.put(`/inquiry/${id}`, data) as { data: Inquiry }
    },
    onSuccess: (data, variables) => {
      // Update the individual inquiry cache
      queryClient.setQueryData(['inquiry', variables.id], data)
      
      // Update the inquiries list cache
      queryClient.setQueryData<InquiriesResponse>(['inquiries'], (oldData) => {
        if (!oldData?.data) return oldData
        
        return {
          ...oldData,
          data: oldData.data.map(inquiry => 
            (inquiry._id === variables.id || inquiry.id === variables.id) ? data.data : inquiry
          )
        }
      })
      
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ['inquiries'] })
      queryClient.invalidateQueries({ queryKey: ['inquiry', variables.id] })
    },
    onError: (error: ApiError) => {
      console.error('Update inquiry failed:', error)
      throw error
    }
  })
}

// Search inquiries (bonus hook for future use)
export const useSearchInquiries = (searchTerm: string | undefined) => {
  return useQuery<InquiriesResponse>({
    queryKey: ['inquiries', 'search', searchTerm],
    queryFn: async (): Promise<InquiriesResponse> => {
      if (!searchTerm) throw new Error('Search term is required')
      // axiosInstance interceptor already returns response.data
      return await axiosInstance.get(
        `/inquiry/search?q=${encodeURIComponent(searchTerm)}`
      ) as InquiriesResponse
    },
    enabled: !!searchTerm && searchTerm.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

// Bulk delete inquiries (bonus hook for future use)
export const useBulkDeleteInquiries = () => {
  const queryClient = useQueryClient()

  return useMutation<PromiseSettledResult<unknown>[], ApiError, string[]>({
    mutationFn: async (inquiryIds: string[]) => {
      const promises = inquiryIds.map(id => 
        axiosInstance.delete(`/inquiry/${id}`)
      )
      const results = await Promise.allSettled(promises)
      return results
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] })
    }
  })
}
