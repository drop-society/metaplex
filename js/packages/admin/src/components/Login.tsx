import { useMutation, useQuery } from '@apollo/client';
import {
  Avatar, Button, Grid, Theme
} from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import * as React from 'react';
import { useState } from 'react';
import { useGetAdminUserQuery, useGetUserQuery, useLoginAdminUserMutation, User} from 'src/gql/generated/generated';
import { IS_LOGGED_IN, LOG_OUT, SET_TOKEN } from 'src/gql/queries/users';
import DialogMaster, { StandardNoClose } from 'src/reusable/DialogWrapper';
import Form, { useForm } from 'src/reusable/Form';
import TextBoxField from 'src/reusable/Form/TextBoxField';


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

  const [err, setError] = useState('')
  const [user, setUser] = useState<User | null>()

  const {data: userData, error, refetch: fetchUser} = useGetAdminUserQuery({fetchPolicy: "no-cache"})
  const [logOut] = useMutation(LOG_OUT);

  const [setToken] = useMutation(SET_TOKEN);
  const {data: loggedIn, refetch: checkLoggedIn} = useQuery(IS_LOGGED_IN)
  const [loginUser, {data}] = useLoginAdminUserMutation({errorPolicy: "ignore"})

  const logOutUser = () => {
    logOut();
    setUser(null);
    checkLoggedIn();
  }


  // hooks to trigger to refetch log in for token access and to set error if it fails
  React.useEffect(() => {
    switch (data?.loginAdminUser.__typename) {
      case "LoginUserSuccess":
        setToken({variables: { token: data.loginAdminUser?.token }});
        checkLoggedIn();
        return
      case "LoginUserFailed":
        setError(data?.loginAdminUser.message);
        return
    }

  }, [data])

  React.useEffect(() => {
    if (error) {
      console.log(error.graphQLErrors)
      setError(error.message)
    }
  }, [error])

  // fetch user only if user is logged in
  React.useEffect(() => {
    if (loggedIn?.isLoggedIn && !user) {
      fetchUser()
      return 
    }  

    checkLoggedIn()
  }, [loggedIn, user])


  React.useEffect(() => {
    switch (userData?.getAdminUser?.__typename) {
      case "GetUserSuccess":
        setUser(userData?.getAdminUser?.user as User)
        setError(null)
        return
      case "GetUserError":
        setError(userData?.getAdminUser?.message)
        setUser(null)
        return
    }
  })

  return (
    <>
        {loggedIn?.isLoggedIn && user && <Avatar onClick={logOutUser} {...stringAvatar(user?.firstName, user?.lastName)}/>}
        <DialogMaster
            DialogType={StandardNoClose}
            open={!loggedIn?.isLoggedIn || !!err}
            maxWidth="xs"
            setOpen={() =>{}}
            title={`Login`}>
            <Form
                initialValues={emptyLoginForm}
                validate={() => {}}
                onSubmit={(value: LoginState) => {
                  setError('')
                  loginUser({
                    variables: {
                      email: value.email, 
                      password: value.password
                    }
                  })
                }}>
                <FormFields error={err}/>
            </Form>
        </DialogMaster>
    </>
  );
};


const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    gridExtraPadding: {
      paddingTop: theme.spacing(1)
    }
  });
})

const FormFields = ({error}: {error: string}) =>  {
  const {submitForm} = useForm();
  const classes = useStyles();

  return (
    <>
      <Grid className={classes.gridExtraPadding} container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <TextBoxField 
              fieldName={LoginFields.EMAIL}
              textFieldProps={{type: "email", fullWidth: true, error: !!error, label: error || 'Email'}} />
        </Grid>
        <Grid item xs={12}>
          <TextBoxField 
            fieldName={LoginFields.PASSWORD} 
            textFieldProps={{type: "password", fullWidth: true, label: 'Password'}} />
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