import { authSignInThunk } from './authSignIn.thunk';
import { authSignUpThunk } from './authSignUp.thunk';
import { authSignOutThunk } from './authSignOut.thunk';
import { authVerifyThunk } from './authVerify.thunk';
import { userChangeNameThunk } from './userChangeName.thunk';
import { userUploadPhotoThunk } from './userUploadPhoto.thunk';

export const authThunks = {
  authSignInThunk,
  authSignUpThunk,
  authSignOutThunk,
  authVerifyThunk,
  userChangeNameThunk,
  userUploadPhotoThunk,
};
