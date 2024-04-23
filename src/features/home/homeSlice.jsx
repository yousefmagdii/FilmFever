import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // imageUrl: 'src/assets/InterStellar.jpg',
  // name: 'InterStellar',
  // description:
  //   'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, nihil aliquid architecto molestiae consequatur obcaecati. Eaque sapiente ex aliquid, dicta esse vero delectus obcaecati earum quae ad odio tempora sed.',
  selectedImageIndex: 0, // Add selectedImageIndex to track the selected image
  // rating: '9.4',
  // duration: '190',
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    updateSelectedImage(state, action) {
      state.selectedImageIndex = action.payload;
    },
  },
});

export const { updateSelectedImage } = homeSlice.actions;
export default homeSlice.reducer;
