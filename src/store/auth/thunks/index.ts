import { authSignInThunk } from './authSignIn.thunk';
import { authSignUpThunk } from './authSignUp.thunk';
import { authSignOutThunk } from './authSignOut.thunk';
import { authVerifyThunk } from './authVerify.thunk';
import { userChangeNameThunk } from './userChangeName.thunk';
import { userUploadPhotoThunk } from './userUploadPhoto.thunk';
import { authSendActivationLinkThunk } from './authSendActivationLink.thunk';
import { userChangePassThunk } from './userChangePass.thunk';
import { userChangeEmailThunk } from './userChangeEmail.thunk';

export const authThunks = {
  authSignInThunk,
  authSignUpThunk,
  authSignOutThunk,
  authVerifyThunk,
  userChangeEmailThunk,
  userChangePassThunk,
  userChangeNameThunk,
  userUploadPhotoThunk,
  authSendActivationLinkThunk,
};
