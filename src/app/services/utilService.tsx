import axios, {AxiosResponse} from 'axios'

const UNSPLASH_ACCESS_TOKEN='CCupz7mwFGMZh48vYyRullNDe_Y1BhiNVUrJ03-18vc'
const getRandomPhoto = (): any => {
  return axios
    .get(`https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_TOKEN}`)
    .then((response: any) => response.data);
};

const getPhotoByTag = (tag: string): any => {
  return axios
    .get(`https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_TOKEN}&query=${tag}`)
    .then((response: any) => response.data)
    .catch((error: any) => {
      // If no photos found for the tag, get a random photo without a tag
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        if (errors.includes('No photos found.')) {
          return getRandomPhoto();
        }
      }
      // If there's an error other than "No photos found," throw the error
      throw error;
    });
};

//const createUser = (user: User): Promise<User | undefined> => {
//  return axios
//    .put(USER_URL, user)
//    .then((response: AxiosResponse<Response<User>>) => response.data)
//    .then((response: Response<User>) => response.data)
//}

//const updateUser = (user: User): Promise<User | undefined> => {
//  return axios
//    .post(`${USER_URL}/${user.id}`, user)
//    .then((response: AxiosResponse<Response<User>>) => response.data)
//    .then((response: Response<User>) => response.data)
//}

//const deleteUser = (userId: ID): Promise<void> => {
//  return axios.delete(`${USER_URL}/${userId}`).then(() => {})
//}

//const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
//  const requests = userIds.map((id) => axios.delete(`${USER_URL}/${id}`))
//  return axios.all(requests).then(() => {})
//}

export {getRandomPhoto,getPhotoByTag}
