let baseURL:string =''
let environment = 'local'

if(environment === 'local'){
  baseURL = process.env.NEXT_PUBLIC_STORY_LOCAL_LINK_BASE_URL || ''
}
else if(environment === 'dev'){
  baseURL = process.env.NEXT_PUBLIC_STORY_STAGING_LINK_BASE_URL || ''
}
else if(environment === 'prod'){
    baseURL = process.env.NEXT_PUBLIC_STORY_PROD_LINK_BASE_URL || ''
}
export {baseURL}
