import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { allTransaction, addTransaction, deleteTransaction,userTransaction,updateUserTransaction } from "../api";


//getall user transaction
export const userTrans = createAsyncThunk(

    "trans/usertransaction",
    async (_, { rejectWithValue }) => {
        try {
            const response = await allTransaction();
            // console.log(response);
            return response.data;

        } catch (err) {

            message.error(err.response?.data?.message);
            return rejectWithValue(err.response?.data?.message);
        }
    }


);

//addtrans
export const addTrans = createAsyncThunk(
    "trans/useraddtransaction",
    async ({ fromData, navigate, message }, { rejectWithValue }) => {
        try {
            const response = await addTransaction(fromData);
            // console.log(response);
            if (response?.data.status) {
                message.success(response.data.message);
                navigate("/transaction");
            }
            return response.data;
        } catch (err) {
            message.error(err.response?.data?.message);
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

//deletetransaction
export const deleteTrans = createAsyncThunk(
    "trans/userdeletetransaction",
    async ({ id, message }, { rejectWithValue }) => {
        try {
            //console.log(id);
            const response = await deleteTransaction(id);
            if (response?.data.status) {
                message.success(response.data.message);
            }
            return id;
        } catch (err) {
            message.error(err.response?.data?.message);
            return rejectWithValue(err.respose?.data?.message)
        }

    }
);

//usertransaction
export const userSingleTrans = createAsyncThunk(
    "trans/userSingleTrans",
    async ({id,message}, { rejectWithValue }) => {
        try {
            //console.log(id);
            const response = await userTransaction(id);
            // if (response?.data.status) {
            //     message.success(response.data.message);
            // }
            //console.log(response.data?.data);
            return response?.data?.data;
        } catch (err) {
            message.error(err.response?.data?.message);
            return rejectWithValue(err.respose?.data?.message)
        }

    }
);

export const usertransupdate = createAsyncThunk(
    "trans/usertransupdate",
    async ({fromData,id,message,navigate}, { rejectWithValue }) => {
        try {
            //console.log(id);
            const response = await updateUserTransaction({id,fromData});
            if (response?.data.status) {
                message.success(response.data.message);
                navigate("/transaction");
            }
            //console.log(response.data?.data);
            return response?.data?.data;
        } catch (err) {
            message.error(err.response?.data?.message);
            return rejectWithValue(err.respose?.data?.message)
        }

    }
);




const initialState = {
    loading: false,
    error: "",
    transactions: [],
    usertransactions: "",
}

const transSlice = createSlice({

    name: "trans",
    initialState,
    reducers: {
        clearTrans : () => initialState,
    },

    extraReducers: (builder) => {
        builder
            //getalltransaction
            .addCase(userTrans.pending, (state) => {
                state.error = "";
                state.loading = true;
            })
            .addCase(userTrans.fulfilled, (state, action) => {
                state.error = "";
                state.loading = false;
                state.transactions = action.payload?.data;
            })
            .addCase(userTrans.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            //addtransaction
            .addCase(addTrans.pending, (state) => {
                state.error = "";
                state.loading = true;
            })
            .addCase(addTrans.fulfilled, (state, action) => {
                state.error = "";
                state.loading = false;
                //state.transactions = [...state.transactions,action.payload];//no need this because i am using useeffect to fetch all data
            })
            .addCase(addTrans.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            //deleteTransaction
            .addCase(deleteTrans.pending, (state) => {
                state.error = "";
                state.loading = true;
            })
            .addCase(deleteTrans.fulfilled, (state, action) => {
                state.error = "";
                state.loading = false;
                const { arg: { id } } = action.meta;
                if (id) {
                    state.transactions = state.transactions.filter((trans) => trans._id !== id);
                }
            })
            .addCase(deleteTrans.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            //usersingletransaction
            .addCase(userSingleTrans.pending, (state) => {
                state.error = "";
                state.loading = true;
            })
            .addCase(userSingleTrans.fulfilled, (state, action) => {
                state.error = "";
                state.loading = false;
                state.usertransactions = action.payload;
                
            })
            .addCase(userSingleTrans.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })


            ///updateusertransaction
            .addCase(usertransupdate.pending, (state) => {
                state.error = "";
                state.loading = true;
            })
            .addCase(usertransupdate.fulfilled, (state, action) => {
                state.error = "";
                state.loading = false;
                state.usertransactions = action.payload;
                
            })
            .addCase(usertransupdate.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })


    }







});

export const {clearTrans} = transSlice.actions;

export default transSlice.reducer;