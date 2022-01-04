import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const cameraSlice = createSlice({
  name: 'camera',
  initialState: {
      cameraImage: null,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCameraImage: (state, action) => {
        state.cameraImage = action.payload
    },
    resetCameraImage: (state, action) => {
        state.cameraImage = null
    }
  }
});

export const { setCameraImage, resetCameraImage } = cameraSlice.actions;

export const selectCameraImage = (state) => state.camera.cameraImage;


export default cameraSlice.reducer;
