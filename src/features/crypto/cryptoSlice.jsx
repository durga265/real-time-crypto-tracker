import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchCryptoData = createAsyncThunk(
  'crypto/fetchCryptoData',
  async () => {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',                     
        ids: 'bitcoin,ethereum,tether,ripple,cardano', 
        order: 'market_cap_desc',              
        per_page: 5,                            
        page: 1,
        sparkline: true,                        
        price_change_percentage: '1h,24h,7d',   
      },
    });

    // Return only the data part of the response
    return response.data;
  }
);


const initialState = {
  assets: [],        
  status: 'idle',    
  error: null,       
};


const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {}, 

  
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.assets = action.payload;
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export default cryptoSlice.reducer;
