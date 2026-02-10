import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { showLoadingToast, closeToast } from 'vant';

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
  msg: string
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
      baseURL: process.env.NODE_ENV === 'development' ? baseURL : window.location.origin + '/api',
      timeout: 10000,
      headers: {
        // 不硬编码Content-Type，让具体请求方法根据数据类型动态设置
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
          console.error('API Error:', res?.msg)
          return Promise.reject(res)
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
        // console.log('Loading...')
        // showLoading()
        showLoadingToast({
          message: '',
          duration: 0
        })
      }
      const response = await this.instance.get<ApiResponse<T>>(url, {
        params
      })
      closeToast()
      return response.data
    } catch (error) {
      if (options?.handleError) {
        options.errorHandler?.(error as AxiosError)
      }
      closeToast()
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

      // 根据数据类型设置请求配置
      const config: any = {
        headers: {}
      }

      // 如果不是FormData类型，设置Content-Type为application/json
      // console.log('data instanceof FormData', data instanceof FormData)
      // if (!(data instanceof FormData)) {
      //   (config.headers as Record<string, string>)['Content-Type'] = 'application/json'
      // }
      config.headers['Content-Type'] = 'multipart/form-data'
      // if (!(data instanceof FormData)) {
      //   (config.headers as Record<string, string>)['Content-Type'] = 'application/json'
      // }
      // 如果是FormData类型，不设置Content-Type，让axios自动处理

      const response = await this.instance.post<ApiResponse<T>>(url, data, config)
      console.log('post',  response.data)
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

      // 根据数据类型设置请求配置
      const config = {
        headers: {}
      }

      // 如果不是FormData类型，设置Content-Type为application/json
      if (!(data instanceof FormData)) {
        (config.headers as Record<string, string>)['Content-Type'] = 'application/json'
      }
      // 如果是FormData类型，不设置Content-Type，让axios自动处理

      const response = await this.instance.put<ApiResponse<T>>(url, data, config)
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
