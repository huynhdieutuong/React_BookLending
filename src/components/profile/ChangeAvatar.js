import React, { Fragment, useContext, useRef } from 'react';

import Spinner from '../layouts/Spinner';

import AuthContext from '../../contexts/auth/authContext';

const ChangeAvatar = () => {
  const { user, loadingAvatar, changeAvatar } = useContext(AuthContext);

  const { avatarUrl, name } = user;

  const fileInput = useRef(null);

  const onUpload = (e) => {
    const formData = new FormData();
    formData.append('avatar', e.target.files[0]);
    changeAvatar(formData);
  };

  if (loadingAvatar) return <Spinner />;

  return (
    <Fragment>
      <input
        style={{ display: 'none' }}
        type='file'
        ref={fileInput}
        onChange={onUpload}
      />
      <img
        style={{ width: '100%', cursor: 'pointer' }}
        src={avatarUrl}
        alt={name}
        title='Change Avatar'
        onClick={() => fileInput.current.click()}
      />
    </Fragment>
  );
};

export default ChangeAvatar;
