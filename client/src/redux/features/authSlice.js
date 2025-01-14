import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {loginUser,signUpuser,userDetails,updateUser} from "../api";

//loginUser
export const userLogin = createAsyncThunk(
    "auth/userLogin",
    async({fromValues,navigate,message},{rejectWithValue })=>{
        try{
            const response = await loginUser(fromValues);
            //console.log(response);
            if(response.data?.status){
                localStorage.setItem("token",response.data?.token);
                navigate("/");
                message.success(response.data?.message);
            }
            
            return response.data;

        }catch(err){
           // console.log(err.response.data);
            message.error(err.response?.data?.message);
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

//signupuser
export const signUpUser = createAsyncThunk(
    "auth/userSignup",
    async({fromData,navigate,message},{rejectWithValue })=>{
        try{
            const response = await signUpuser(fromData);
            //console.log(response);
            if(response.data?.status){
                navigate("/login");
                message.success(response.data?.message);
            }
            
            return response.data;

        }catch(err){
           // console.log(err.response.data);
            message.error(err.response?.data?.message);
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

//getuser
export const userdetails = createAsyncThunk(
    "auth/userDetails",
    async(_,{rejectWithValue })=>{
        try{
            const response = await userDetails();
            //console.log(response);
            return response.data;

        }catch(err){
           // console.log(err.response.data);
            message.error(err.response?.data?.message);
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

//update user
export const updateuser = createAsyncThunk(
    "auth/updateuser",
    async({incomeCategories,expenseCategories,navigate,message},{rejectWithValue })=>{
        try{
            const response = await updateUser({incomeCategories,expenseCategories});
            //console.log(response);
            if(response.data?.status){
                navigate("/");
                message.success(response.data?.message);
            }
            
            return response.data;

        }catch(err){
           // console.log(err.response.data);
            message.error(err.response?.data?.message);
            return rejectWithValue(err.response?.data?.message);
        }
    }
);



const initialState = {
    loading:false,
    error:"",
    token:"",
    user:"",
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{

        logout:()=> initialState,

    },
    extraReducers:(builder)=>{
        builder
        //loginUser
        .addCase(userLogin.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userLogin.fulfilled,(state,action)=>{
            state.loading = false;
            state.token = action.payload?.token;
            state.error ="";
        })
        .addCase(userLogin.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        //signupuser
        .addCase(signUpUser.pending,(state)=>{
            state.loading = true;
        })
        .addCase(signUpUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.error ="";
        })
        .addCase(signUpUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        //getuser
        .addCase(userdetails.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userdetails.fulfilled,(state,action)=>{
            state.loading = false;
            state.error ="";
            state.user = action.payload?.data;
        })
        .addCase(userdetails.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        //updateuser
        .addCase(updateuser.pending,(state)=>{
            state.loading = true;
        })
        .addCase(updateuser.fulfilled,(state,action)=>{
            state.loading = false;
            state.error ="";
            state.user = action.payload?.data;
        })
        .addCase(updateuser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })


    }
})

export const {logout} = authSlice.actions;

export default authSlice.reducer;