import * as React from 'react';
import {
  Avatar, Button, Grid,
} from '@mui/material';
import Form, { useForm } from 'src/reusable/Form';
import DialogMaster, { StandardNoClose } from 'src/reusable/DialogWrapper';
import TextBoxField from 'src/reusable/Form/TextBoxField';
import { useMutation, useQuery } from '@apollo/client';
import {  IS_LOGGED_IN, LOGIN_USER, SET_TOKEN } from 'src/gql/queries/users';
import { GetUserSuccess, useGetUserQuery } from 'src/gql/generated/generated';


export enum LoginFields {
  EMAIL = 'email',
  PASSWORD = 'password',
}

export interface LoginState {
  [LoginFields.EMAIL]: string,
  [LoginFields.PASSWORD]: string,
}

// initializing state
export const emptyLoginForm: LoginState = {
  [LoginFields.EMAIL]: '',
  [LoginFields.PASSWORD]: '',
};

/**
 * LoginButton is a pop up component
 */
export const LoginButton: React.FC = () => {

  const {data: userData} = useGetUserQuery()

  const [setToken] = useMutation(SET_TOKEN);
  const {data: loggedIn, refetch} = useQuery(IS_LOGGED_IN)
  const [loginUser, {data}] = useMutation(LOGIN_USER)
  React.useEffect(() => {
    if (data?.loginUser?.token) {
      setToken({variables: { token: data.loginUser.token }})
      refetch()
    }
  }, [data])





  console.log("loggedIn: ", loggedIn)

  const getUserResponse = userData?.getUser as GetUserSuccess
  return (
    <>
        {loggedIn && <Avatar {...stringAvatar(getUserResponse?.user?.firstName, getUserResponse?.user?.lastName)}/>}
        <DialogMaster
            DialogType={StandardNoClose}
            open={!loggedIn?.isLoggedIn}
            maxWidth="xs"
            setOpen={() =>{}}
            title={`Login`}>
            <Form
                initialValues={emptyLoginForm}
                validate={() => console.log('hi')}
                onSubmit={(value: LoginState) => {
                  loginUser({
                    variables: {
                      email: value.email, 
                      password: value.password
                    }
                  })
                }}>
                <FormFields/>
            </Form>
        </DialogMaster>
    </>
  );
};


const FormFields = () =>  {
  const {submitForm} = useForm();
  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <TextBoxField 
              fieldName={LoginFields.EMAIL}
              textFieldProps={{type: "email", placeholder: "Email", fullWidth: true}} />
        </Grid>
        <Grid item xs={12}>
          <TextBoxField 
            fieldName={LoginFields.PASSWORD} 
            textFieldProps={{type: "password", placeholder: "Password", fullWidth: true}} />
        </Grid>
        <Grid item xs={12} alignContent={"center"}>
          <Button onClick={() => submitForm()} type="submit" fullWidth>Login</Button>
        </Grid>
      </Grid>
    </>
  )
}

function stringToColor(string: string) {
  if (!string) {
    return '#ffffff';
  }
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */
  return color;
}

function stringAvatar(firstName: string = '', lastName: string = '') {
  return {
    sx: {
      bgcolor: stringToColor(firstName),
    },
    children: `${firstName[0]}${lastName[0]}`,
  };
}