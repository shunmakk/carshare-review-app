import {createSlice} from '@reduxjs/toolkit'
import {InitialUserState} from '../utils/type'

const inistalState: InitialUserState = {
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState: inistalState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        }
    }
})


export const {login,logout} = userSlice.actions;
export default userSlice.reducer;