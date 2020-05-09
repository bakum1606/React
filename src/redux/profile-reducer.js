import {authAPI as profileAPI, usersAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USERS_PROFILE = 'SET-USERS_PROFILE';
const SET_STATUS = 'SET-STATUS';
const DELETE_POST = 'DELETE_POST';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ],
    profile: null,
    status: ""
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };

            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        case SET_USERS_PROFILE:
            return {
                ...state,
                profile: action.profile

            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return {
                ...state,
           posts: state.posts.filter(p  => p.id != action.postId)
            }

        default:
            return state;
    }


}

export const addPost = (newPostText) => ({type: ADD_POST, newPostText});
export const setUsersProfile = (profile) => ({type: SET_USERS_PROFILE, profile});
export const setStatus = (status) =>  ({type: SET_STATUS, status});
export const deletePost = (postId) =>  ({type: DELETE_POST, postId});


export const getUsersProfile = (userId) => (dispatch) =>
    usersAPI.getProfile(userId).then(data => {
        dispatch(setUsersProfile(data));
    })

export const getStatus = (userId) => (dispatch) =>
    profileAPI.getStatus(userId).then(data => {
        dispatch(setStatus(data));
    })

export const updateStatus = (status) => (dispatch) =>
    profileAPI.updateStatus(status).then(data => {
        if(data.resultCode === 0){
            dispatch(setStatus(status));
        }

    })


export default profileReducer;