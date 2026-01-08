import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
// import { useUserStore } from '@/stores/user'
// const userStore = useUserStore()
import { address } from '../../address'
const { baseURL } = address
// console.log(process.env.NODE_ENV === 'development')
/**
 * API响应数据结构
 */
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

/**
 * 请求配置选项
 */
export interface RequestOptions {
  // 是否显示加载状态
  showLoading?: boolean
  // 是否处理错误
  handleError?: boolean
  // 自定义错误处理函数
  errorHandler?: (error: AxiosError) => void
}

/**
 * API请求封装类
 */
export class ApiService {
  private instance: AxiosInstance

  constructor() {
    // 创建axios实例
    this.instance = axios.create({
      baseURL: process.env.NODE_ENV === 'development' ? baseURL : window.location.origin,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 可以在这里添加token等认证信息
        const token = sessionStorage.getItem('a_token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        const res = response.data
        // 根据业务逻辑处理响应
        if (res.code !== 0) {
          // 可以在这里添加全局错误提示
          console.error('API Error:', res.message)
          return Promise.reject(new Error(res.message || 'Error'))
        }
        return response
      },
      (error: AxiosError) => {
        // 处理网络错误等
        console.error('Network Error:', error.message)
        return Promise.reject(error)
      }
    )
  }

  /**
   * GET请求
   * @param url 请求地址
   * @param params 查询参数
   * @param options 配置选项
   * @returns 响应数据
   */
  async get<T = any>(url: string, params?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    try {
      if (options?.showLoading) {
        // 可以在这里添加加载状态
        console.log('Loading...')
      }
      const response = await this.instance.get<ApiResponse<T>>(url, {
        params
      })
      return response.data
    } catch (error) {
      if (options?.handleError) {
        options.errorHandler?.(error as AxiosError)
      }
      throw error
    }
  }

  /**
   * POST请求
   * @param url 请求地址
   * @param data 请求数据
   * @param options 配置选项
   * @returns 响应数据
   */
  async post<T = any>(url: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    try {
      if (options?.showLoading) {
        // 可以在这里添加加载状态
        console.log('Loading...')
      }
      const response = await this.instance.post<ApiResponse<T>>(url, data)
      return response.data
    } catch (error) {
      if (options?.handleError) {
        options.errorHandler?.(error as AxiosError)
      }
      throw error
    }
  }

  /**
   * PUT请求
   * @param url 请求地址
   * @param data 请求数据
   * @param options 配置选项
   * @returns 响应数据
   */
  async put<T = any>(url: string, data?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    try {
      if (options?.showLoading) {
        // 可以在这里添加加载状态
        console.log('Loading...')
      }
      const response = await this.instance.put<ApiResponse<T>>(url, data)
      return response.data
    } catch (error) {
      if (options?.handleError) {
        options.errorHandler?.(error as AxiosError)
      }
      throw error
    }
  }

  /**
   * DELETE请求
   * @param url 请求地址
   * @param params 查询参数
   * @param options 配置选项
   * @returns 响应数据
   */
  async delete<T = any>(url: string, params?: any, options?: RequestOptions): Promise<ApiResponse<T>> {
    try {
      if (options?.showLoading) {
        // 可以在这里添加加载状态
        console.log('Loading...')
      }
      const response = await this.instance.delete<ApiResponse<T>>(url, {
        params
      })
      return response.data
    } catch (error) {
      if (options?.handleError) {
        options.errorHandler?.(error as AxiosError)
      }
      throw error
    }
  }

  /**
   * 上传文件
   * @param url 请求地址
   * @param formData 表单数据
   * @param options 配置选项
   * @returns 响应数据
   */
  async upload<T = any>(url: string, formData: FormData, options?: RequestOptions): Promise<ApiResponse<T>> {
    try {
      if (options?.showLoading) {
        // 可以在这里添加加载状态
        console.log('Uploading...')
      }
      const response = await this.instance.post<ApiResponse<T>>(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      if (options?.handleError) {
        options.errorHandler?.(error as AxiosError)
      }
      throw error
    }
  }
}

// 导出API服务实例
export const api = new ApiService()

// 导出常用请求方法
export const { get, post, put, delete: del, upload } = {
  get: api.get.bind(api),
  post: api.post.bind(api),
  put: api.put.bind(api),
  delete: api.delete.bind(api),
  upload: api.upload.bind(api)
}
